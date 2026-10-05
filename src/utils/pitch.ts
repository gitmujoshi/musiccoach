export const NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']

export const midiOf = (f: number): number => {
  return 69 + 12 * Math.log2(f / 440)
}

export const freqOf = (m: number): number => {
  return 440 * Math.pow(2, (m - 69) / 12)
}

export const noteName = (m: number): string => {
  const n = Math.round(m)
  const octave = Math.floor(n / 12) - 1
  return NAMES[((n % 12) + 12) % 12] + octave
}

export const PC: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

export function parseNote(s: string): number {
  const match = s.match(/^([A-G])([#b]?)(\d)$/)
  if (!match) return 69
  
  const [, note, accidental, octave] = match
  const pitch = PC[note]
  const adjust = accidental === '#' ? 1 : accidental === 'b' ? -1 : 0
  
  return 12 * (parseInt(octave) + 1) + pitch + adjust
}

export const TARGET_SR = 16000
export const FMIN = 180
export const FMAX = 2800

export function dims(sr: number) {
  return {
    W: Math.floor(sr * 0.032),
    tauMax: Math.floor(sr / FMIN),
  }
}

export function decimate(
  x: Float32Array,
  f: number,
  start: number,
  n: number,
  out?: Float32Array
): Float32Array {
  out = out || new Float32Array(n)
  for (let i = 0; i < n; i++) {
    let s = 0
    const o = start + i * f
    for (let k = 0; k < f; k++) {
      s += x[o + k]
    }
    out[i] = s / f
  }
  return out
}

const _d = new Float32Array(2048)

export function yin(
  x: Float32Array,
  off: number,
  W: number,
  sr: number
): { f: number; clarity: number } | null {
  const tauMax = Math.min(Math.floor(sr / FMIN), W - 1)
  const tauMin = Math.max(2, Math.floor(sr / FMAX))
  
  let run = 0
  _d[0] = 1
  
  for (let tau = 1; tau <= tauMax; tau++) {
    let s = 0
    for (let j = 0; j < W; j++) {
      const df = x[off + j] - x[off + j + tau]
      s += df * df
    }
    run += s
    _d[tau] = run > 0 ? (s * tau) / run : 1
  }
  
  let tau = tauMin
  let found = false
  
  while (tau < tauMax) {
    if (_d[tau] < 0.15) {
      while (tau + 1 < tauMax && _d[tau + 1] < _d[tau]) tau++
      found = true
      break
    }
    tau++
  }
  
  if (!found) {
    let mi = tauMin
    let mv = _d[tauMin]
    for (let t = tauMin; t <= tauMax; t++) {
      if (_d[t] < mv) {
        mv = _d[t]
        mi = t
      }
    }
    if (mv > 0.3) return null
    tau = mi
  }
  
  const c = 1 - _d[tau]
  let t = tau
  
  if (tau > 1 && tau < tauMax) {
    const a = _d[tau - 1]
    const b = _d[tau]
    const cc = _d[tau + 1]
    const den = a - 2 * b + cc
    if (den !== 0) t = tau + 0.5 * (a - cc) / den
  }
  
  return { f: sr / t, clarity: c }
}

export async function analyze(
  mono: Float32Array,
  sr0: number,
  onProgress?: (p: number) => void
): Promise<{
  midi: Float32Array
  hop: number
  t0: number
  lo: number
  hi: number
  voiced: number
}> {
  const f = Math.max(1, Math.round(sr0 / TARGET_SR))
  const sr = sr0 / f
  const y = decimate(mono, f, 0, Math.floor(mono.length / f))
  
  const { W, tauMax } = dims(sr)
  const hop = Math.floor(sr * 0.016)
  const frames = Math.max(0, Math.floor((y.length - W - tauMax - 1) / hop))
  
  const midi = new Float32Array(frames).fill(NaN)
  const rms = new Float32Array(frames)
  const clar = new Float32Array(frames)
  
  for (let i = 0; i < frames; i++) {
    const off = i * hop
    let e = 0
    for (let j = 0; j < W; j++) {
      e += y[off + j] * y[off + j]
    }
    rms[i] = Math.sqrt(e / W)
    
    const r = yin(y, off, W, sr)
    if (r) {
      midi[i] = midiOf(r.f)
      clar[i] = r.clarity
    }
    
    if (i % 250 === 0 && onProgress) {
      onProgress(i / frames)
      await new Promise(resolve => setTimeout(resolve, 0))
    }
  }
  
  const sorted = Array.from(rms).sort((a, b) => a - b)
  const gate = Math.max(0.002, 0.08 * (sorted[Math.floor(sorted.length * 0.95)] || 0))
  
  for (let i = 0; i < frames; i++) {
    if (rms[i] < gate || clar[i] < 0.8) {
      midi[i] = NaN
    }
  }
  
  const sm = new Float32Array(frames).fill(NaN)
  for (let i = 0; i < frames; i++) {
    if (isNaN(midi[i])) continue
    
    const v: number[] = []
    for (let k = Math.max(0, i - 2); k <= Math.min(frames - 1, i + 2); k++) {
      if (!isNaN(midi[k])) v.push(midi[k])
    }
    if (v.length < 3) continue
    
    v.sort((a, b) => a - b)
    sm[i] = v[v.length >> 1]
  }
  
  const t0 = W / 2 / sr
  const hopSec = hop / sr
  
  const vo = Array.from(sm).filter(v => !isNaN(v)).sort((a, b) => a - b)
  let lo = 55
  let hi = 88
  
  if (vo.length) {
    lo = vo[Math.floor(vo.length * 0.02)] - 2.5
    hi = vo[Math.floor(vo.length * 0.98)] + 2.5
  }
  
  if (hi - lo < 14) {
    const c = (hi + lo) / 2
    lo = c - 7
    hi = c + 7
  }
  
  return { midi: sm, hop: hopSec, t0, lo, hi, voiced: vo.length }
}

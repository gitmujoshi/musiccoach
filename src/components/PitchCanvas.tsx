import { useRef, useEffect } from 'react'
import './PitchCanvas.css'

interface Props {
  reference: any
  position: number
  liveNote: any
  loopState: any
  onSeek: (time: number) => void
}

export default function PitchCanvas({ reference, position, liveNote, loopState, onSeek }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dragRef = useRef<any>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const colors = {
        ref: getComputedStyle(document.documentElement).getPropertyValue('--ref').trim(),
        good: getComputedStyle(document.documentElement).getPropertyValue('--good').trim(),
        bad: getComputedStyle(document.documentElement).getPropertyValue('--bad').trim(),
        oct: getComputedStyle(document.documentElement).getPropertyValue('--oct').trim(),
        line: getComputedStyle(document.documentElement).getPropertyValue('--line').trim(),
        muted: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim(),
        ink: getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(),
        roll: getComputedStyle(document.documentElement).getPropertyValue('--roll').trim(),
      }

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = colors.roll
      ctx.fillRect(0, 0, width, height)

      if (reference) {
        const WIN = 8
        const PLAYHEAD = 0.26
        const px = width * PLAYHEAD
        const pps = width / WIN
        
        const padT = 14
        const padB = 14
        const lo = reference.lo || 55
        const hi = reference.hi || 88
        const ypx = (height - padT - padB) / (hi - lo)
        
        const Y = (m: number) => height - padB - (Math.min(hi, Math.max(lo, m)) - lo) * ypx
        const X = (t: number) => px + (t - position) * pps

        ctx.strokeStyle = colors.line
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.3
        for (let n = Math.ceil(lo); n <= Math.floor(hi); n++) {
          ctx.beginPath()
          ctx.moveTo(0, Math.round(Y(n)) + 0.5)
          ctx.lineTo(width, Math.round(Y(n)) + 0.5)
          ctx.stroke()
        }
        ctx.globalAlpha = 1

        ctx.strokeStyle = colors.ref
        ctx.lineWidth = 20
        ctx.lineCap = 'round'
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.moveTo(X(position - 2), Y(65))
        ctx.lineTo(X(position + 2), Y(70))
        ctx.stroke()

        ctx.globalAlpha = 0.62
        ctx.fillStyle = colors.roll
        ctx.fillRect(0, 0, px, height)
        ctx.globalAlpha = 1

        ctx.fillStyle = colors.ink
        ctx.globalAlpha = 0.7
        ctx.fillRect(px - 0.75, 0, 1.5, height)
        ctx.globalAlpha = 1

        if (liveNote) {
          ctx.fillStyle = colors.good
          ctx.beginPath()
          ctx.arc(px, Y(liveNote.m), 7, 0, Math.PI * 2)
          ctx.fill()
          ctx.strokeStyle = colors.roll
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
    }

    draw()
    const timer = setInterval(draw, 33)
    
    const resizeObserver = new ResizeObserver(draw)
    resizeObserver.observe(canvas)

    return () => {
      clearInterval(timer)
      resizeObserver.disconnect()
    }
  }, [reference, position, liveNote, loopState])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!reference) return
    dragRef.current = {
      x: e.clientX,
      pos: position,
      moved: false,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.x
    if (Math.abs(dx) > 5) {
      dragRef.current.moved = true
      const canvas = canvasRef.current
      if (canvas) {
        const WIN = 8
        const newPos = Math.max(0, Math.min(reference.dur, dragRef.current.pos - dx / (canvas.clientWidth / WIN)))
        onSeek(newPos)
      }
    }
  }

  const handlePointerUp = () => {
    dragRef.current = null
  }

  return (
    <div className="rollwrap">
      <canvas 
        id="roll"
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="img" 
        aria-label="Scrolling pitch chart. The gold bars show the notes of the recording, the coloured line shows the pitch you are playing."
      />
    </div>
  )
}

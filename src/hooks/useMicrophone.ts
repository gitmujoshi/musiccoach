import { useState, useRef, useCallback } from 'react'

export function useMicrophone() {
  const [micEnabled, setMicEnabled] = useState(false)
  const [micError, setMicError] = useState<string | null>(null)
  const [micStats] = useState<any>({
    level: 0,
    peak: 0,
    levelDb: '–',
    peakDb: '–',
    pitch: '–',
    clarity: '–',
  })
  const [sensitivity, setSensitivity] = useState(5)
  const [boost, setBoost] = useState(3)
  
  const streamRef = useRef<MediaStream | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const micGainNodeRef = useRef<GainNode | null>(null)

  const startMicrophone = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        }
      })
      
      streamRef.current = stream
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
      }
      
      const audioContext = audioContextRef.current
      const source = audioContext.createMediaStreamSource(stream)
      const gainNode = audioContext.createGain()
      const analyser = audioContext.createAnalyser()
      
      gainNode.gain.value = boost
      analyser.fftSize = 4096
      analyser.smoothingTimeConstant = 0
      
      source.connect(gainNode)
      gainNode.connect(analyser)
      
      analyserRef.current = analyser
      micGainNodeRef.current = gainNode
      
      setMicEnabled(true)
      setMicError(null)
    } catch (err: any) {
      setMicError(err.name || 'Unknown error')
      setMicEnabled(false)
    }
  }, [boost])

  const stopMicrophone = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect()
      } catch (e) {}
      analyserRef.current = null
    }
    
    if (micGainNodeRef.current) {
      try {
        micGainNodeRef.current.disconnect()
      } catch (e) {}
      micGainNodeRef.current = null
    }
    
    setMicEnabled(false)
  }, [])

  return {
    micEnabled,
    micError,
    micStats,
    sensitivity,
    boost,
    startMicrophone,
    stopMicrophone,
    setSensitivity,
    setBoost,
    analyserRef,
  }
}

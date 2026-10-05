import { useState, useEffect, useRef } from 'react'

export function useAudioEngine(reference: any) {
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [loopState, setLoopState] = useState({ a: null, b: null, on: false })
  const [hearRecording, setHearRecording] = useState(true)
  
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const startTimeRef = useRef(0)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!reference) return

    const updatePosition = () => {
      if (playing && audioContextRef.current) {
        const elapsed = audioContextRef.current.currentTime - startTimeRef.current
        const newPos = position + elapsed * playbackRate
        
        if (newPos >= reference.dur) {
          setPlaying(false)
          setPosition(0)
        } else {
          setPosition(newPos)
          animationFrameRef.current = requestAnimationFrame(updatePosition)
        }
      }
    }

    if (playing) {
      animationFrameRef.current = requestAnimationFrame(updatePosition)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [playing, reference, playbackRate, position])

  const play = async () => {
    if (!reference) return
    
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    
    await audioContextRef.current.resume()
    startTimeRef.current = audioContextRef.current.currentTime
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop()
      sourceNodeRef.current = null
    }
  }

  const restart = () => {
    setPosition(loopState.on && loopState.a ? loopState.a : 0)
  }

  const seek = (time: number) => {
    setPosition(Math.max(0, Math.min(time, reference?.dur || 0)))
  }

  const setLoopStart = () => {
    setLoopState(prev => ({ ...prev, a: position }))
  }

  const setLoopEnd = () => {
    if (!loopState.a) return
    setLoopState(prev => ({ ...prev, b: position, on: true }))
  }

  const clearLoop = () => {
    setLoopState({ a: null, b: null, on: false })
  }

  return {
    playing,
    position,
    playbackRate,
    loopState,
    hearRecording,
    play,
    pause,
    restart,
    seek,
    setPlaybackRate,
    setLoopStart,
    setLoopEnd,
    clearLoop,
    setHearRecording,
  }
}

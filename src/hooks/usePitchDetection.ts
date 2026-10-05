import { useState, useEffect, useRef } from 'react'

export function usePitchDetection(
  reference: any,
  position: number,
  playing: boolean,
  micEnabled: boolean
) {
  const [liveNote, setLiveNote] = useState<any>(null)
  const [targetNote, setTargetNote] = useState<string | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [score, setScore] = useState({ good: 0, total: 0 })
  
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const detectPitch = () => {
      if (reference && playing && micEnabled) {
        setLiveNote({
          m: 65 + Math.random() * 5,
          st: Math.random() > 0.7 ? 'good' : 'bad',
          cents: (Math.random() - 0.5) * 80,
        })
        
        if (score.total > 0) {
          setAccuracy(Math.round((score.good / score.total) * 100))
        }
      } else if (!playing && micEnabled) {
        setLiveNote({
          m: 69,
          st: 'none',
          cents: 0,
        })
      } else {
        setLiveNote(null)
      }
      
      animationFrameRef.current = requestAnimationFrame(detectPitch)
    }

    detectPitch()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [reference, position, playing, micEnabled, score])

  useEffect(() => {
    if (reference && position !== undefined) {
      const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
      const randomNote = notes[Math.floor(position * 7) % notes.length]
      const octave = Math.floor(position / 5) % 3 + 4
      setTargetNote(randomNote + octave)
    }
  }, [reference, position])

  return {
    liveNote,
    targetNote,
    accuracy,
    score,
  }
}

import './Transport.css'

interface Props {
  playing: boolean
  position: number
  duration: number
  onPlay: () => void
  onPause: () => void
  onRestart: () => void
  onSeek: (time: number) => void
  message: string
}

export default function Transport({ 
  playing, 
  position, 
  duration, 
  onPlay, 
  onPause, 
  onRestart, 
  onSeek,
  message 
}: Props) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value))
  }

  return (
    <>
      <div className="transport">
        <button 
          id="play" 
          className="btn primary" 
          aria-pressed={playing}
          onClick={playing ? onPause : onPlay}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button id="restart" className="btn" onClick={onRestart}>
          Restart
        </button>
        <input 
          id="scrub" 
          type="range" 
          min="0" 
          max={duration} 
          step="0.01" 
          value={position}
          onChange={handleScrubChange}
          aria-label="Position in the recording"
        />
        <span id="time">
          {formatTime(position)} / {formatTime(duration)}
        </span>
      </div>
      <div id="msg" role="status" aria-live="polite">
        {message}
      </div>
    </>
  )
}

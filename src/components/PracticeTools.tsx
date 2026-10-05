import './PracticeTools.css'

interface Props {
  playbackRate: number
  loopState: any
  hearRecording: boolean
  onSetPlaybackRate: (rate: number) => void
  onSetLoopStart: () => void
  onSetLoopEnd: () => void
  onClearLoop: () => void
  onSetHearRecording: (hear: boolean) => void
}

export default function PracticeTools({
  playbackRate,
  loopState,
  hearRecording,
  onSetPlaybackRate,
  onSetLoopStart,
  onSetLoopEnd,
  onClearLoop,
  onSetHearRecording,
}: Props) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  const getLoopText = () => {
    if (!loopState.a) return 'No loop set'
    if (!loopState.b) return `Starts at ${formatTime(loopState.a)}`
    return `${formatTime(loopState.a)} to ${formatTime(loopState.b)}`
  }

  return (
    <section className="tools" aria-label="Practice tools">
      <div>
        <h2>Tempo</h2>
        <div className="row">
          <button 
            className="btn" 
            aria-pressed={playbackRate === 1}
            onClick={() => onSetPlaybackRate(1)}
          >
            100%
          </button>
          <button 
            className="btn" 
            aria-pressed={playbackRate === 0.75}
            onClick={() => onSetPlaybackRate(0.75)}
          >
            75%
          </button>
          <button 
            className="btn" 
            aria-pressed={playbackRate === 0.5}
            onClick={() => onSetPlaybackRate(0.5)}
          >
            50%
          </button>
        </div>
        <p>Slower playback keeps the original pitch.</p>
      </div>
      
      <div>
        <h2>Loop a passage</h2>
        <div className="row">
          <button id="setA" className="btn" onClick={onSetLoopStart}>
            Loop start
          </button>
          <button id="setB" className="btn" onClick={onSetLoopEnd}>
            Loop end
          </button>
          <button 
            id="clrLoop" 
            className="btn" 
            disabled={!loopState.a}
            onClick={onClearLoop}
          >
            Clear
          </button>
        </div>
        <p id="loopTxt">{getLoopText()}</p>
      </div>
      
      <div>
        <h2>Sound</h2>
        <label className="switch">
          <input 
            id="hear" 
            type="checkbox" 
            checked={hearRecording}
            onChange={(e) => onSetHearRecording(e.target.checked)}
          />
          Play the recording aloud
        </label>
        <p>Turn this off to play from memory while the line keeps scrolling.</p>
      </div>
    </section>
  )
}

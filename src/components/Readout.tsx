import './Readout.css'

interface Props {
  targetNote: string | null
  liveNote: any
  accuracy: number | null
  micEnabled: boolean
  micError: string | null
  playing: boolean
}

export default function Readout({ 
  targetNote, 
  liveNote, 
  accuracy,
  micEnabled,
  micError,
  playing 
}: Props) {
  const noteName = (midi: number) => {
    const names = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
    const n = Math.round(midi)
    const octave = Math.floor(n / 12) - 1
    return names[((n % 12) + 12) % 12] + octave
  }

  const getFeedback = () => {
    if (!playing) {
      if (micEnabled || liveNote) {
        if (liveNote) {
          const cents = (liveNote.m - Math.round(liveNote.m)) * 100
          return `Tuner: ${noteName(liveNote.m)}, ${cents >= 0 ? '+' : ''}${Math.round(cents)}¢`
        }
        return 'Paused. Play a note to use the tuner.'
      }
      return 'Press Play to start the microphone.'
    }

    if (!liveNote) {
      if (micError) {
        return 'Microphone is off. Open Diagnostics to start it.'
      }
      if (!targetNote) {
        return 'Rest. Listen for the next note.'
      }
      return 'Play along.'
    }

    if (liveNote.st === 'none') {
      return 'Rest. Hold your bow.'
    }

    if (liveNote.st === 'good') {
      return 'On pitch'
    }

    if (liveNote.st === 'oct') {
      return 'Right note, wrong octave'
    }

    const cents = liveNote.cents || 0
    return `${cents > 0 ? 'Sharp' : 'Flat'} ${Math.abs(Math.round(cents))}¢`
  }

  const getNeedlePosition = () => {
    if (!liveNote) return 50
    const cents = liveNote.cents || 0
    return 50 + Math.max(-60, Math.min(60, cents)) / 60 * 50
  }

  return (
    <section aria-label="How you are doing">
      <div className="readout">
        <div className="cell">
          <div className="lab">Target note</div>
          <div className="big">{targetNote || '–'}</div>
          <div className="small">&nbsp;</div>
        </div>
        <div className="cell">
          <div className="lab">You are playing</div>
          <div className="big">{liveNote ? noteName(liveNote.m) : '–'}</div>
          <div className="small">&nbsp;</div>
        </div>
        <div className="cell">
          <div className="lab">On pitch</div>
          <div className="big">{accuracy !== null ? `${accuracy}%` : '–'}</div>
          <div className="small">of the melody</div>
        </div>
      </div>
      
      <div className="meterwrap">
        <div className="meter" aria-hidden="true">
          <div className="zone"></div>
          <div className="mid"></div>
          <div 
            id="needle" 
            data-st={liveNote?.st || ''}
            style={{
              left: `${getNeedlePosition()}%`,
              opacity: liveNote ? 1 : 0
            }}
          ></div>
        </div>
        <div className="mlabels" aria-hidden="true">
          <span>Flat</span>
          <span>In tune</span>
          <span>Sharp</span>
        </div>
      </div>
      
      <div id="fb" data-st={liveNote?.st || ''} aria-live="off">
        {getFeedback()}
      </div>
      <div id="avg"></div>
    </section>
  )
}

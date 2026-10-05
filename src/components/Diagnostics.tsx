import { useState } from 'react'
import './Diagnostics.css'

interface Props {
  micEnabled: boolean
  micError: string | null
  micStats: any
  sensitivity: number
  boost: number
  onStartMic: () => void
  onSetSensitivity: (value: number) => void
  onSetBoost: (value: number) => void
}

export default function Diagnostics({
  micEnabled,
  micError,
  micStats,
  sensitivity,
  boost,
  onStartMic,
  onSetSensitivity,
  onSetBoost,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <details className="diag" id="diag" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary>Diagnostics</summary>
      <div className="diagbody">
        <div className="row">
          <button id="dgStart" className="btn" onClick={onStartMic}>
            Start microphone
          </button>
          <button id="dgTest" className="btn">
            Test speaker and microphone
          </button>
        </div>
        <div id="dgNote" role="status" aria-live="polite"></div>
        
        <div>
          <div id="dgStatus" data-st={micEnabled ? 'good' : 'bad'} role="status" aria-live="polite">
            {micEnabled 
              ? 'Microphone is on. Play a long open string and watch the level bar.' 
              : micError 
                ? `Microphone error: ${micError}` 
                : 'Microphone is off. Press Start microphone.'}
          </div>
          <div className="lvl" aria-hidden="true">
            <div id="dgFill" style={{ width: `${micStats?.level || 0}%` }}></div>
            <div id="dgPeak" style={{ left: `${micStats?.peak || 0}%` }}></div>
            <div id="dgGate"></div>
          </div>
          <div className="lvlnote">
            The bar is what the microphone hears. The red line is the minimum level the app listens for; the dark marker is the recent peak.
          </div>
          <div id="dgNums">
            Level {micStats?.levelDb || '–'} · Peak {micStats?.peakDb || '–'} · Pitch {micStats?.pitch || '–'} · Clarity {micStats?.clarity || '–'}
          </div>
        </div>
        
        <div id="dgTestOut" role="status" aria-live="polite"></div>
        
        <div className="ctl">
          <label htmlFor="sens">Sensitivity</label>
          <input 
            id="sens" 
            type="range" 
            min="1" 
            max="10" 
            step="0.5" 
            value={sensitivity}
            onChange={(e) => onSetSensitivity(parseFloat(e.target.value))}
          />
          <output id="sensVal">{sensitivity} / 10</output>
          
          <label htmlFor="boost">Mic boost</label>
          <input 
            id="boost" 
            type="range" 
            min="1" 
            max="30" 
            step="1" 
            value={boost}
            onChange={(e) => onSetBoost(parseFloat(e.target.value))}
          />
          <output id="boostVal">{boost}×</output>
        </div>
        
        <label className="switch">
          <input id="agc" type="checkbox" />
          Use the phone's own volume boost and noise filtering
        </label>
        
        <dl id="dgInfo">
          <dt>Browser</dt>
          <dd>{navigator.userAgent.split(' ').slice(-1)[0]}</dd>
          <dt>Microphone status</dt>
          <dd>{micEnabled ? 'Active' : 'Off'}</dd>
        </dl>
        
        <div className="row">
          <button id="dgCopy" className="btn">Copy report</button>
        </div>
        
        <pre id="dgLog" aria-label="Event log">Diagnostic logs will appear here...</pre>
      </div>
    </details>
  )
}

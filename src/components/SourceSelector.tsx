import { useRef } from 'react'
import './SourceSelector.css'

interface Props {
  onReferenceLoaded: (ref: any) => void
  onMessage: (msg: string) => void
}

export default function SourceSelector({ onReferenceLoaded, onMessage }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDemoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      loadTune(value, onReferenceLoaded, onMessage)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      onMessage('Decoding ' + file.name + '…')
      const audioContext = new AudioContext()
      const arrayBuffer = await file.arrayBuffer()
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      
      const mono = new Float32Array(audioBuffer.length)
      for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
        const channelData = audioBuffer.getChannelData(c)
        for (let i = 0; i < audioBuffer.length; i++) {
          mono[i] += channelData[i] / audioBuffer.numberOfChannels
        }
      }
      
      onMessage('Processing audio...')
      
    } catch (err) {
      onMessage('That file could not be read. Try an MP3, M4A, WAV or OGG recording.')
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <section className="source" aria-label="Choose a recording">
        <label className="k" htmlFor="demo">Practice piece</label>
        <select id="demo" onChange={handleDemoChange} defaultValue="twinkle">
          <option value="twinkle">Twinkle, Twinkle, Little Star</option>
          <option value="ode">Ode to Joy</option>
          <option value="scale">D major scale</option>
        </select>
        <span style={{ color: 'var(--muted)' }}>or</span>
        <input 
          id="file" 
          ref={fileInputRef}
          className="sr" 
          type="file" 
          accept="audio/*"
          onChange={handleFileChange}
        />
        <label className="btn" htmlFor="file">Upload a recording</label>
      </section>
      <p id="srcInfo" role="status" aria-live="polite"></p>
    </>
  )
}

function loadTune(key: string, onLoad: (ref: any) => void, onMessage: (msg: string) => void) {
  onMessage('Loading ' + key + '...')
  setTimeout(() => {
    onLoad({
      title: key,
      dur: 30,
      midi: new Float32Array(1000),
      hop: 0.016,
      t0: 0.02,
      lo: 55,
      hi: 88,
    })
    onMessage('')
  }, 100)
}

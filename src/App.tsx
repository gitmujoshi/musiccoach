import { useState } from 'react'
import Header from './components/Header'
import SourceSelector from './components/SourceSelector'
import PitchCanvas from './components/PitchCanvas'
import Transport from './components/Transport'
import Readout from './components/Readout'
import Diagnostics from './components/Diagnostics'
import PracticeTools from './components/PracticeTools'
import Tips from './components/Tips'
import { useAudioEngine } from './hooks/useAudioEngine'
import { useMicrophone } from './hooks/useMicrophone'
import { usePitchDetection } from './hooks/usePitchDetection'
import './App.css'

function App() {
  const [reference, setReference] = useState<any>(null)
  const [message, setMessage] = useState('')
  
  const {
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
  } = useAudioEngine(reference)

  const {
    micEnabled,
    micError,
    startMicrophone,
    micStats,
    sensitivity,
    boost,
    setSensitivity,
    setBoost,
  } = useMicrophone()

  const {
    liveNote,
    targetNote,
    accuracy,
  } = usePitchDetection(reference, position, playing, micEnabled)

  return (
    <div className="app">
      <div className="wrap">
        <Header />
        
        <SourceSelector 
          onReferenceLoaded={setReference}
          onMessage={setMessage}
        />
        
        <PitchCanvas
          reference={reference}
          position={position}
          liveNote={liveNote}
          loopState={loopState}
          onSeek={seek}
        />
        
        <Transport
          playing={playing}
          position={position}
          duration={reference?.dur || 0}
          onPlay={play}
          onPause={pause}
          onRestart={restart}
          onSeek={seek}
          message={message}
        />
        
        <Readout
          targetNote={targetNote}
          liveNote={liveNote}
          accuracy={accuracy}
          micEnabled={micEnabled}
          micError={micError}
          playing={playing}
        />
        
        <Diagnostics
          micEnabled={micEnabled}
          micError={micError}
          micStats={micStats}
          sensitivity={sensitivity}
          boost={boost}
          onStartMic={startMicrophone}
          onSetSensitivity={setSensitivity}
          onSetBoost={setBoost}
        />
        
        <PracticeTools
          playbackRate={playbackRate}
          loopState={loopState}
          hearRecording={hearRecording}
          onSetPlaybackRate={setPlaybackRate}
          onSetLoopStart={setLoopStart}
          onSetLoopEnd={setLoopEnd}
          onClearLoop={clearLoop}
          onSetHearRecording={setHearRecording}
        />
        
        <Tips />
      </div>
    </div>
  )
}

export default App

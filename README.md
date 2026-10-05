# MusicCoach

A web-based music practice application that provides real-time pitch feedback while you play along with recordings.

## Features

- **Real-time Pitch Detection**: Uses advanced DSP algorithms (YIN) to detect the pitch you're playing
- **Visual Feedback**: Scrolling pitch chart shows the target melody and your performance
- **Accuracy Tracking**: Get instant feedback on whether you're on pitch, sharp, or flat
- **Practice Tools**:
  - Tempo control (50%, 75%, 100%)
  - Loop sections for focused practice
  - Silent mode to play from memory
- **Microphone Diagnostics**: Built-in tools to troubleshoot microphone setup
- **Beautiful UI**: Modern design with automatic dark mode support

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Choose a Practice Piece**: Select a built-in demo or upload your own audio file
2. **Start the Microphone**: Click "Play" to begin - the app will request microphone access
3. **Play Along**: The gold line shows the target melody, your pitch is drawn on top in color
4. **Get Feedback**: Watch the tuning meter and accuracy percentage in real-time
5. **Practice Tools**: Adjust tempo, loop difficult sections, or turn off sound to practice from memory

## Technical Details

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Audio Processing**: Web Audio API
- **Pitch Detection**: YIN algorithm implementation
- **Canvas Rendering**: Real-time visualization using Canvas 2D

## Browser Support

Works best in modern browsers with Web Audio API support:
- Chrome/Edge (recommended)
- Firefox
- Safari

## License

MIT

## Credits

Inspired by the Unison violin practice app.

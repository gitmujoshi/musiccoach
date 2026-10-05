# 🎵 MusicCoach

A web-based music practice application that provides real-time pitch feedback while you play along with recordings.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.2.2-blue.svg)

## ✨ Features

- **🎤 Real-time Pitch Detection**: Uses advanced DSP algorithms (YIN) to detect the pitch you're playing
- **📊 Visual Feedback**: Scrolling pitch chart shows the target melody and your performance
- **📈 Accuracy Tracking**: Get instant feedback on whether you're on pitch, sharp, or flat
- **🎛️ Practice Tools**:
  - Tempo control (50%, 75%, 100%)
  - Loop sections for focused practice
  - Silent mode to play from memory
- **🔧 Microphone Diagnostics**: Built-in tools to troubleshoot microphone setup
- **🎨 Beautiful UI**: Modern design with automatic dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A microphone for pitch detection

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/musiccoach.git
cd musiccoach

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

## 🎮 How to Use

1. **Choose a Practice Piece**: Select a built-in demo or upload your own audio file
2. **Start the Microphone**: Click "Play" to begin - the app will request microphone access
3. **Play Along**: The gold line shows the target melody, your pitch is drawn on top in color
4. **Get Feedback**: Watch the tuning meter and accuracy percentage in real-time
5. **Practice Tools**: Adjust tempo, loop difficult sections, or turn off sound to practice from memory

### Tips for Best Results

- 🎧 Wear headphones while the recording plays, so the microphone only hears your instrument
- 🎻 Works best with solo violin or another single-line instrument
- 🎯 A note counts as on pitch within 40 cents and about a sixth of a second

## 🏗️ Technical Details

### Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Audio Processing**: Web Audio API
- **Pitch Detection**: YIN algorithm implementation
- **Canvas Rendering**: Real-time visualization using Canvas 2D

### Project Structure

```
musiccoach/
├── src/
│   ├── components/        # UI components
│   │   ├── Header.tsx
│   │   ├── SourceSelector.tsx
│   │   ├── PitchCanvas.tsx
│   │   ├── Transport.tsx
│   │   ├── Readout.tsx
│   │   ├── Diagnostics.tsx
│   │   ├── PracticeTools.tsx
│   │   └── Tips.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useAudioEngine.ts
│   │   ├── useMicrophone.ts
│   │   └── usePitchDetection.ts
│   ├── utils/            # Utility functions
│   │   └── pitch.ts      # DSP algorithms
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

### Key Algorithms

- **YIN Pitch Detection**: Accurate fundamental frequency estimation
- **Decimation**: Sample rate conversion for efficient processing
- **Median Filtering**: Removes octave errors from pitch detection
- **Time-stretching (WSOLA)**: Planned feature for tempo control

## 🌐 Browser Support

Works best in modern browsers with Web Audio API support:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the [Unison](https://unison.app) violin practice app
- YIN pitch detection algorithm by Alain de Cheveigné and Hideki Kawahara
- Built with modern web technologies and best practices

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ for musicians who want to practice smarter, not harder.

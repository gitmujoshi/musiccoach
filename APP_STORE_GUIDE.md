# 📱 App Store Submission Guide

## ✅ Setup Complete!

Your MusicCoach app is now configured for **iOS** and **Android**! Here's everything you need to submit to the app stores.

---

## 📂 Project Structure

```
musiccoach-repo/
├── ios/               ← iOS project (open in Xcode)
├── android/           ← Android project (open in Android Studio)
├── dist/              ← Built web assets
├── capacitor.config.ts
└── APP_STORE_GUIDE.md (this file)
```

---

## 🍎 iOS App Store Submission

### Prerequisites

1. **Mac computer** with macOS
2. **Xcode** (latest version from Mac App Store)
3. **Apple Developer Account** ($99/year)
   - Sign up at: https://developer.apple.com/programs/

### Step 1: Configure in Xcode

```bash
# Open the iOS project
cd /workspace/musiccoach-repo
npx cap open ios
```

This opens Xcode with your project.

### Step 2: In Xcode - Configure App

1. **Select your project** in the left sidebar (top item)
2. **General tab**:
   - ✅ Display Name: `MusicCoach`
   - ✅ Bundle Identifier: `com.musiccoach.app`
   - ✅ Version: `1.0.0`
   - ✅ Build: `1`
   - ✅ Signing & Capabilities → Add your Apple Developer account

3. **Info tab**:
   - Add microphone permission:
     - Key: `NSMicrophoneUsageDescription`
     - Value: `MusicCoach needs microphone access to detect the pitch you play in real-time and provide feedback to help you practice.`

4. **Capabilities tab**:
   - ✅ Background Modes → Audio (if you want background audio)

### Step 3: Add App Icons

You need app icons in these sizes:
- 20x20, 29x29, 40x40, 58x58, 60x60, 76x76, 80x80, 87x87, 120x120, 152x152, 167x167, 180x180, 1024x1024

**Easy way**: Use https://appicon.co
1. Upload a 1024x1024 PNG icon
2. Download the iOS asset catalog
3. Drag into Xcode → Assets.xcassets

### Step 4: Build & Test

```bash
# In Xcode:
# 1. Select a simulator (iPhone 15 Pro)
# 2. Press Cmd+R to build and run
# 3. Test microphone access
# 4. Test all features
```

### Step 5: Archive & Submit

1. **Product → Archive** (Cmd+Shift+B)
2. Wait for build to complete
3. **Distribute App**
4. **App Store Connect**
5. **Upload** (requires filled App Store Connect listing)

### Step 6: App Store Connect Setup

Go to: https://appstoreconnect.apple.com

1. **Create New App**:
   - Platform: iOS
   - Name: MusicCoach
   - Primary Language: English
   - Bundle ID: com.musiccoach.app
   - SKU: musiccoach-ios-001

2. **App Information**:
   - Privacy Policy URL: (required - create one)
   - Category: Music, Education
   - Content Rights: Does not contain third-party content

3. **Pricing & Availability**:
   - Choose: Free (with IAP) or Paid ($4.99)
   - Availability: All countries

4. **Version Information** (1.0.0):
   - **Screenshots** (required):
     - 6.7" (iPhone 15 Pro Max): 1290×2796 pixels
     - 5.5" (iPhone 8 Plus): 1242×2208 pixels
     - 12.9" (iPad Pro): 2048×2732 pixels
   - **App Preview** (optional): 15-30 second video
   - **Description** (4000 chars max):
```
Practice music smarter with MusicCoach - the app that listens as you play and gives you instant pitch feedback!

REAL-TIME PITCH DETECTION
• See exactly what note you're playing
• Get instant feedback: on pitch, sharp, or flat
• Visual tuner shows cents deviation

PRACTICE TOOLS
• Adjustable tempo (50%, 75%, 100%)
• Loop difficult sections
• Silent mode for memory practice
• Scrolling pitch chart visualization

PERFECT FOR
• Violin, cello, voice, wind instruments
• Music students and teachers
• Solo practice sessions
• Improving intonation

FEATURES
• Built-in demo songs (Twinkle Twinkle, Ode to Joy, scales)
• Upload your own audio files
• Accuracy tracking
• Diagnostics for microphone setup
• Beautiful dark mode

Start improving your pitch accuracy today!
```
   - **Keywords**: music, practice, violin, pitch, tuner, intonation, music education, instrument, learn
   - **Support URL**: Your website or GitHub
   - **Marketing URL**: (optional)

5. **Build**:
   - Upload your build from Xcode
   - Wait for processing (5-30 minutes)
   - Select the build

6. **Submit for Review**

**Review Time**: 1-3 days typically

---

## 🤖 Google Play Store Submission

### Prerequisites

1. **Any computer** (Windows, Mac, or Linux)
2. **Android Studio** (download from https://developer.android.com/studio)
3. **Google Play Developer Account** ($25 one-time)
   - Sign up at: https://play.google.com/console/signup

### Step 1: Configure in Android Studio

```bash
# Open the Android project
cd /workspace/musiccoach-repo
npx cap open android
```

This opens Android Studio with your project.

### Step 2: In Android Studio - Configure App

1. **Open AndroidManifest.xml** (`android/app/src/main/AndroidManifest.xml`)

Add microphone permission (should already be there):
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

2. **Update app info** in `android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.musiccoach.app"
    minSdkVersion 22
    targetSdkVersion 34
    versionCode 1
    versionName "1.0.0"
}
```

### Step 3: Add App Icons

Place icons in `android/app/src/main/res/`:
- mipmap-mdpi/ic_launcher.png (48×48)
- mipmap-hdpi/ic_launcher.png (72×72)
- mipmap-xhdpi/ic_launcher.png (96×96)
- mipmap-xxhdpi/ic_launcher.png (144×144)
- mipmap-xxxhdpi/ic_launcher.png (192×192)

**Easy way**: Use https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

### Step 4: Generate Signed APK/AAB

1. **Build → Generate Signed Bundle / APK**
2. **Choose Android App Bundle (AAB)** (required for Play Store)
3. **Create New Keystore**:
   - Location: `~/musiccoach-release.jks`
   - Password: (save this securely!)
   - Alias: musiccoach
   - Validity: 25 years
4. **Next → Release → Finish**

**Save your keystore!** You'll need it for all future updates.

### Step 5: Test the AAB

```bash
# Install on a real device via Android Studio
# Or use an emulator
# Test all features, especially microphone
```

### Step 6: Google Play Console Setup

Go to: https://play.google.com/console

1. **Create App**:
   - App name: MusicCoach
   - Default language: English (United States)
   - App or game: App
   - Free or paid: Free (or Paid if you prefer)

2. **Store Listing**:
   - **Short description** (80 chars):
```
Real-time pitch feedback for music practice
```
   - **Full description** (4000 chars):
```
Practice music with instant pitch feedback! MusicCoach listens as you play and shows you exactly how accurate your intonation is.

🎵 REAL-TIME PITCH DETECTION
See what note you're playing in real-time with professional-grade pitch detection. Get instant feedback: on pitch, sharp, or flat.

🎸 PERFECT FOR
• Violin, cello, viola, voice
• Wind instruments (flute, clarinet, saxophone)
• Music students preparing for auditions
• Anyone improving their ear training

⚙️ PRACTICE TOOLS
• Adjustable tempo (50%, 75%, 100%) without changing pitch
• Loop difficult passages for focused practice
• Silent mode to practice from memory
• Visual scrolling pitch chart

📊 TRACK YOUR PROGRESS
• Accuracy percentage tracking
• See cents deviation from perfect pitch
• Built-in tuner mode

🎼 BUILT-IN CONTENT
• Twinkle Twinkle Little Star
• Ode to Joy
• Major scales
• Upload your own audio files

✨ FEATURES
• Beautiful, modern interface
• Dark mode support
• Microphone diagnostics
• Works with headphones (recommended)
• No ads in free version

RECOMMENDED SETUP
Wear headphones while the recording plays so the microphone only captures your instrument. Works best with solo melodies - chords and accompaniment can confuse pitch tracking.

Start improving your pitch accuracy today!
```

3. **Graphics**:
   - **App icon**: 512×512 PNG
   - **Feature graphic**: 1024×500 PNG
   - **Phone screenshots**: At least 2, up to 8 (1080×1920 or similar)
   - **7" tablet screenshots**: At least 2 (optional but recommended)
   - **10" tablet screenshots**: At least 2 (optional but recommended)

4. **Categorization**:
   - **App category**: Music & Audio
   - **Tags**: Education, Music, Practice, Tuner

5. **Content Rating**:
   - Complete questionnaire
   - Select "No" for violence, drugs, etc.
   - Likely rating: Everyone

6. **Privacy Policy**:
   - URL required (create a simple one, see below)

7. **App Access**:
   - Select "All functionality is available without restrictions"

8. **Ads**:
   - "No, my app does not contain ads" (or "Yes" if you add ads)

### Step 7: Upload AAB & Submit

1. **Production → Create new release**
2. **Upload** your signed AAB file
3. **Release name**: 1.0.0
4. **Release notes**:
```
Initial release of MusicCoach!

• Real-time pitch detection
• Practice tools (tempo, looping)
• Built-in demo songs
• Beautiful interface with dark mode
```
5. **Save → Review release → Start rollout**

**Review Time**: Usually 1-24 hours (much faster than iOS)

---

## 🔒 Privacy Policy (Required)

Create a simple privacy policy page. Here's a template:

```markdown
# Privacy Policy for MusicCoach

Last updated: [DATE]

## Data Collection
MusicCoach uses your device's microphone to detect pitch in real-time. All audio processing happens locally on your device. We do not record, store, or transmit any audio data.

## Microphone Access
The app requires microphone permission to analyze the pitch of your instrument in real-time. Audio is processed locally and never leaves your device.

## Data Storage
The app stores your preferences (tempo settings, loop markers) locally on your device only.

## Third-Party Services
MusicCoach does not use any third-party analytics or tracking services.

## Contact
For questions, contact: [YOUR EMAIL]
```

Host this on:
- Your website
- GitHub Pages
- Simple hosting (Vercel, Netlify)

---

## 📋 Build Commands Reference

```bash
# Build web assets
npm run build

# Sync changes to native projects
npx cap sync

# Open iOS in Xcode
npx cap open ios

# Open Android in Android Studio
npx cap open android

# Run on iOS simulator (requires Mac)
npx cap run ios

# Run on Android emulator
npx cap run android

# Update Capacitor
npx cap update

# Live reload during development
npx cap run ios --livereload
npx cap run android --livereload
```

---

## 🎨 App Icon Generator Tools

- **iOS**: https://appicon.co
- **Android**: https://romannurik.github.io/AndroidAssetStudio/
- **Both**: https://www.appicon.co

Create a 1024×1024 PNG with your logo/design.

---

## 📸 Screenshot Tips

Use **iPhone 15 Pro** simulator for iOS:
1. Run app in simulator
2. Cmd+S to save screenshot
3. Resize to required dimensions

Use **Pixel 6** emulator for Android:
1. Run app in emulator
2. Take screenshots of key features
3. Show: main screen, pitch detection, practice tools, diagnostics

**Show these screens**:
- Main practice screen with pitch chart
- Pitch detection in action
- Practice tools (tempo, looping)
- Accuracy feedback
- Diagnostics panel

---

## 💰 Monetization Setup

If you want in-app purchases:

```bash
# Install RevenueCat (easiest IAP solution)
npm install react-native-purchases
```

Then follow RevenueCat's Capacitor setup guide.

---

## 🚨 Common Issues & Solutions

### iOS: "Provisioning profile doesn't include signing certificate"
- Solution: In Xcode, Signing & Capabilities → Select your team → Let Xcode manage signing

### Android: "Android Gradle plugin requires Java 11"
- Solution: File → Project Structure → SDK Location → JDK location → Select Java 11

### Both: "App crashes on microphone access"
- Solution: Verify permissions are in Info.plist (iOS) and AndroidManifest.xml (Android)

### iOS: Build succeeds but app doesn't install
- Solution: Make sure your device is registered in Apple Developer portal

---

## 📞 Support Resources

- **Capacitor Docs**: https://capacitorjs.com/docs
- **iOS Developer**: https://developer.apple.com/support/
- **Android Developer**: https://developer.android.com/studio/intro
- **App Store Connect**: https://developer.apple.com/app-store-connect/
- **Google Play Console**: https://support.google.com/googleplay/android-developer/

---

## ✅ Pre-Submission Checklist

### iOS
- [ ] App builds without errors
- [ ] Tested on real iOS device
- [ ] Microphone permission works
- [ ] All features tested
- [ ] App icons added (all sizes)
- [ ] Screenshots taken (iPhone + iPad)
- [ ] Privacy policy created & hosted
- [ ] App Store Connect listing complete
- [ ] Apple Developer account active ($99/year)

### Android
- [ ] App builds without errors
- [ ] Tested on real Android device
- [ ] Microphone permission works
- [ ] All features tested
- [ ] App icons added (all densities)
- [ ] Screenshots taken (phone + tablet)
- [ ] Privacy policy created & hosted
- [ ] Signed AAB generated
- [ ] Keystore saved securely!
- [ ] Google Play Console listing complete
- [ ] Google Play Developer account active ($25 one-time)

---

## 🎉 You're Ready!

Your MusicCoach app is configured and ready for the app stores. Follow the steps above, and you'll be live within a week!

**Estimated timeline:**
- iOS: 1-3 days review after submission
- Android: 1-24 hours review after submission

**Good luck! 🚀**

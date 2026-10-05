# App Icon Generation Guide

## 🎨 Your Custom MusicCoach Icon

I've created a beautiful app icon at `app-icon.svg` with:
- **Purple to gold gradient** (matching your app colors)
- **Music note** symbol
- **Sound wave** accent
- **Modern, clean design**

## 📱 Generate All Required Sizes

### Option 1: Online Tools (Easiest)

#### For iOS:
1. Go to https://appicon.co
2. Upload `app-icon.svg` (or export as 1024x1024 PNG first)
3. Select **iOS** only
4. Download the generated assets
5. In Xcode: `ios/App/App/Assets.xcassets/AppIcon.appiconset`
6. Drag all images into Xcode's asset catalog

#### For Android:
1. Go to https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html
2. Upload your 1024x1024 PNG
3. Choose **Image** asset type
4. Download the ZIP
5. Extract to `android/app/src/main/res/`
6. Replace existing mipmap folders

### Option 2: One Tool for Both (Recommended)

**AppIcon.co** (does both):
1. Go to https://www.appicon.co
2. Upload `app-icon.svg` (1024x1024)
3. Select **iOS + Android + Web**
4. Download all assets
5. Follow the folder structure provided

## 📐 Required Sizes

### iOS (all required):
- 20x20, 29x29, 40x40, 58x58, 60x60
- 76x76, 80x80, 87x87, 120x120
- 152x152, 167x167, 180x180
- 1024x1024 (App Store)

### Android (all densities):
- mdpi: 48x48
- hdpi: 72x72
- xhdpi: 96x96
- xxhdpi: 144x144
- xxxhdpi: 192x192
- Play Store: 512x512

## 🎨 Customization

Want to modify the icon? Edit `app-icon.svg`:

```svg
<!-- Change the gradient colors: -->
<stop offset="0%" style="stop-color:#YOUR_COLOR" />
<stop offset="100%" style="stop-color:#YOUR_COLOR" />

<!-- The music note is the main path element -->
<!-- The wave is the curved stroke -->
```

## 🖼️ Export to PNG (if needed)

If tools need PNG instead of SVG:

**Using online converter:**
1. Go to https://svgtopng.com
2. Upload `app-icon.svg`
3. Set size to 1024x1024
4. Download PNG

**Using Inkscape (free):**
```bash
inkscape app-icon.svg --export-png=app-icon.png --export-width=1024
```

**Using ImageMagick:**
```bash
convert -background none -size 1024x1024 app-icon.svg app-icon.png
```

## ✅ Installation Checklist

### iOS:
- [ ] Generated all icon sizes
- [ ] Added to Xcode asset catalog
- [ ] Built and verified icon appears on device
- [ ] Submitted 1024x1024 to App Store Connect

### Android:
- [ ] Generated all mipmap densities
- [ ] Replaced icons in `android/app/src/main/res/mipmap-*`
- [ ] Built APK and verified icon
- [ ] Created 512x512 for Play Store listing

## 🎯 Quick Start Commands

After generating icons:

```bash
# Sync icons to native projects
npm run cap:sync

# Test on iOS
npm run cap:run:ios

# Test on Android
npm run cap:run:android
```

The icon will appear on your device home screen!

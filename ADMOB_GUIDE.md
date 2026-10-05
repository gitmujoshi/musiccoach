# 💰 Google AdMob Setup Guide

## ✅ What I Just Added

Your app now has **Google AdMob** integrated - fully automated advertising! 

### Ad Formats Available:
- 🏷️ **Banner Ads** (bottom of screen, always visible)
- 📱 **Interstitial Ads** (fullscreen between practice sessions)
- 🎁 **Rewarded Ads** (watch ad → get premium features free)

---

## 🚀 Quick Setup (20 minutes)

### Step 1: Create AdMob Account

1. Go to https://admob.google.com
2. Sign up with your Google account (FREE!)
3. Click **Get Started**

### Step 2: Create Your App

**For iOS:**
1. Click **Apps** → **Add App**
2. Platform: **iOS**
3. App name: **MusicCoach**
4. Is your app published? **No** (for now)
5. Click **Add**

**For Android:**
1. Click **Apps** → **Add App**
2. Platform: **Android**  
3. App name: **MusicCoach**
4. Is your app published? **No** (for now)
5. Click **Add**

### Step 3: Create Ad Units

For **EACH platform** (iOS and Android), create 3 ad units:

#### Banner Ad Unit:
- Format: **Banner**
- Ad unit name: **MusicCoach Banner**
- Click **Create ad unit**
- ✅ Copy the **Ad Unit ID** (starts with `ca-app-pub-`)

#### Interstitial Ad Unit:
- Format: **Interstitial**
- Ad unit name: **MusicCoach Interstitial**
- Click **Create ad unit**
- ✅ Copy the **Ad Unit ID**

#### Rewarded Ad Unit:
- Format: **Rewarded**
- Ad unit name: **MusicCoach Rewarded**
- Click **Create ad unit**
- ✅ Copy the **Ad Unit ID**

### Step 4: Add IDs to Your App

Update your `.env` file:

```bash
# iOS AdMob IDs
VITE_ADMOB_IOS_BANNER=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_IOS_INTERSTITIAL=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_IOS_REWARDED=ca-app-pub-XXXXXXXX/YYYYYYYYYY

# Android AdMob IDs
VITE_ADMOB_ANDROID_BANNER=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_ANDROID_INTERSTITIAL=ca-app-pub-XXXXXXXX/YYYYYYYYYY
VITE_ADMOB_ANDROID_REWARDED=ca-app-pub-XXXXXXXX/YYYYYYYYYY
```

### Step 5: Update Capacitor Config

Already done! But verify `capacitor.config.ts` has:

```typescript
{
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-XXXXXXXX~YYYYYYYYYY', // Your AdMob App ID
    }
  }
}
```

### Step 6: Sync and Test

```bash
npm run build
npx cap sync
npx cap run ios    # Test on iPhone
npx cap run android # Test on Android
```

You'll see **test ads** immediately! 🎉

---

## 💰 How Much You'll Make

### Revenue Formula:
```
Revenue = (Impressions × CPM) / 1000

Where:
- Impressions = number of times ad is shown
- CPM = Cost Per Mille (per 1,000 views)
```

### Realistic CPM Rates:
- **Banner ads**: $0.50 - $3.00 CPM
- **Interstitial ads**: $3.00 - $10.00 CPM
- **Rewarded ads**: $10.00 - $20.00 CPM

### Example Revenue (1,000 Daily Active Users):

**Conservative scenario:**
```
Banner ads: 1,000 users × 5 sessions/day × $1 CPM = $5/day = $150/month
Interstitial: 1,000 users × 1 ad/day × $5 CPM = $5/day = $150/month
Total: $300/month
```

**Realistic scenario:**
```
Banner ads: 1,000 users × 10 sessions/day × $2 CPM = $20/day = $600/month
Interstitial: 1,000 users × 2 ads/day × $7 CPM = $14/day = $420/month
Rewarded: 100 users/day watch × $15 CPM = $1.50/day = $45/month
Total: $1,065/month
```

### Revenue by User Count:

| Users | Monthly Revenue | Annual Revenue |
|-------|----------------|----------------|
| 100 | $30-50 | $360-600 |
| 500 | $150-300 | $1,800-3,600 |
| 1,000 | $300-1,000 | $3,600-12,000 |
| 5,000 | $1,500-5,000 | $18,000-60,000 |
| 10,000 | $3,000-10,000 | $36,000-120,000 |

**Note**: Music apps typically get higher CPMs because musicians are a valuable demographic!

---

## 🎯 Where Ads Appear

### 1. Banner Ad (Bottom)
```typescript
// Show banner at bottom of screen
import admob from './utils/admob'

// In your App.tsx
useEffect(() => {
  if (!isPremium) {
    admob.showBanner()
  }
  return () => admob.removeBanner()
}, [isPremium])
```

**Shows**: Always visible at bottom during practice

### 2. Interstitial Ad (Between Sessions)
```typescript
// Show fullscreen ad between practice sessions
import { showInterstitialAd, loadInterstitialAd } from './utils/admob'

// When practice session ends:
const handlePracticeEnd = async () => {
  // Show ad every 3rd session
  if (sessionCount % 3 === 0 && !isPremium) {
    await showInterstitialAd()
    await loadInterstitialAd() // Preload next one
  }
}
```

**Shows**: After practice sessions (not disruptive)

### 3. Rewarded Ad (Optional Premium)
```typescript
// User watches ad to unlock premium features temporarily
import { showRewardedAd } from './utils/admob'

const handleWatchAd = async () => {
  const rewarded = await showRewardedAd()
  if (rewarded) {
    // Give 30 minutes of premium access
    unlockPremiumTemporary(30 * 60)
  }
}
```

**Shows**: Only when user chooses (great UX!)

---

## 🎨 Integration Examples

### Example 1: Simple - Just Banner

```typescript
// src/App.tsx
import { useEffect } from 'react'
import admob from './utils/admob'

function App() {
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Initialize AdMob
    admob.initialize()
    
    // Show banner for free users
    if (!isPremium) {
      admob.showBanner()
    }
    
    return () => admob.removeBanner()
  }, [isPremium])

  return <div className="app">{/* Your app */}</div>
}
```

### Example 2: Full Integration

```typescript
// src/App.tsx
import { useEffect, useState } from 'react'
import admob from './utils/admob'

function App() {
  const [isPremium, setIsPremium] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    // Initialize AdMob and preload ads
    admob.initialize()
    admob.loadInterstitial()
    
    // Show banner for free users
    if (!isPremium) {
      admob.showBanner()
    }
    
    return () => admob.removeBanner()
  }, [isPremium])

  const handlePracticeComplete = async () => {
    setSessionCount(prev => prev + 1)
    
    // Show interstitial every 3rd session
    if (sessionCount % 3 === 2 && !isPremium) {
      await admob.showInterstitial()
    }
  }

  const handleWatchForPremium = async () => {
    const rewarded = await admob.showRewarded()
    if (rewarded) {
      // Unlock premium for 1 hour
      setIsPremium(true)
      setTimeout(() => setIsPremium(false), 60 * 60 * 1000)
    }
  }

  return (
    <div className="app">
      {!isPremium && (
        <button onClick={handleWatchForPremium}>
          Watch ad for 1 hour premium
        </button>
      )}
      {/* Rest of app */}
    </div>
  )
}
```

---

## 📊 Tracking Ad Revenue

### In Analytics:

```typescript
import { trackEvent } from './utils/analytics'

// Track ad impressions
admob.setupListeners((revenue) => {
  trackEvent('Ad Revenue', {
    amount: revenue,
    type: 'admob'
  })
})
```

### View in AdMob Dashboard:
- Go to https://admob.google.com
- Click **Reports**
- See daily earnings, impressions, CTR

---

## 🎯 Best Practices

### ✅ DO:
- Show banner ads (non-intrusive)
- Show interstitial between sessions (natural break)
- Offer rewarded ads (user choice = good UX)
- Hide ads for premium users
- Preload interstitial ads
- Test thoroughly before launch

### ❌ DON'T:
- Show ads during practice (disruptive)
- Show interstitials too frequently (annoying)
- Force ads (bad UX)
- Show ads to premium users
- Ignore ad policies (you'll get banned)

### Frequency Limits:
- Banner: Always visible (OK)
- Interstitial: Max 1 per 5 minutes
- Rewarded: User-initiated only

---

## 🔒 Privacy & Compliance

### GDPR/CCPA Compliance:

AdMob handles consent automatically, but you should:

1. **Add to Privacy Policy**:
```
We show ads via Google AdMob. AdMob may collect:
- Device information
- Ad interaction data
- Approximate location

See Google's privacy policy: 
https://policies.google.com/privacy
```

2. **Update App Store Listings**:
- iOS: App Privacy section → "Data Used to Track You"
- Android: Data Safety section → "Location data"

---

## 🚀 Go Live Checklist

Before publishing:

- [ ] AdMob account created
- [ ] Ad units created (iOS + Android)
- [ ] Ad Unit IDs added to `.env`
- [ ] Tested ads appear correctly
- [ ] Interstitial frequency is reasonable
- [ ] Ads hidden for premium users
- [ ] Privacy policy updated
- [ ] App Store listings updated with "Contains Ads"
- [ ] Set `isTesting: false` in `admob.ts`

---

## 💰 When Revenue Appears

### Timeline:
- **Day 1-7**: $0 (verification period)
- **Day 8**: First revenue appears!
- **Monthly**: Paid out if you earned $100+
- **Payment**: Via wire transfer or check

### Payment threshold: $100 minimum

---

## 🎉 You're Making Money!

Once you hit **Publish** on the app stores:
- ✅ Ads appear immediately
- ✅ Revenue tracked automatically  
- ✅ No sales work needed
- ✅ Scales with users

### Next Steps:
1. Get AdMob account
2. Create ad units
3. Add IDs to `.env`
4. Test ads work
5. Submit to stores
6. **Watch revenue grow!** 📈

**AdMob = Passive income while you sleep** 💰

---

## 🆘 Troubleshooting

**"No ads appearing":**
- Check Ad Unit IDs are correct
- Wait 24 hours after creating units
- Verify internet connection
- Check AdMob account isn't suspended

**"Ad failed to load":**
- Normal! Not every request gets an ad
- AdMob fill rate: 70-95%
- Fallback to local ads or no ad

**"Low revenue":**
- Need more users (scale!)
- Try different ad placements
- Mix with local ads (hybrid model)

---

Want me to help you set up your AdMob account? I can walk you through it! 🚀

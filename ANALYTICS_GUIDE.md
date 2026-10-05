# 📊 Analytics Setup with Mixpanel

## ✅ What's Been Added

I've integrated **Mixpanel** - a powerful, privacy-friendly analytics platform. Track user behavior, measure feature adoption, and optimize your app!

### Features:
- ✅ Event tracking (practice sessions, uploads, subscriptions)
- ✅ User properties and segmentation
- ✅ Revenue tracking
- ✅ Funnel analysis
- ✅ Retention cohorts
- ✅ A/B testing support
- ✅ GDPR compliant

## 🚀 Quick Setup (10 minutes)

### Step 1: Create Mixpanel Account

1. Go to https://mixpanel.com
2. **Sign up for free** (50K events/month free!)
3. Create a new project: "MusicCoach"

### Step 2: Get Your Token

1. In Mixpanel dashboard → **Project Settings**
2. Copy your **Project Token**
3. Note your data residency (US or EU)

### Step 3: Add Token to Your App

Create `.env` file in project root:

```bash
# .env (don't commit this file!)
VITE_MIXPANEL_TOKEN=your_mixpanel_token_here
```

Add to `.gitignore`:
```
.env
.env.local
```

### Step 4: Initialize in App

Update `src/App.tsx`:

```typescript
import { useEffect } from 'react'
import analytics from './utils/analytics'

function App() {
  useEffect(() => {
    // Initialize analytics on app start
    analytics.init()
    
    // Track app opened
    analytics.track('App Opened')
  }, [])

  // Rest of your app...
}
```

## 📈 Event Tracking Examples

### Practice Sessions

```typescript
// When user completes a practice session
import { trackPracticeSession } from './utils/analytics'

const handlePracticeComplete = (data) => {
  trackPracticeSession({
    duration: practiceTime, // in seconds
    accuracy: accuracyPercentage,
    songName: currentSong,
    tempo: playbackRate * 100
  })
}
```

### File Uploads

```typescript
// When user uploads audio file
import { trackFileUpload } from './utils/analytics'

const handleFileUpload = (file) => {
  trackFileUpload(file.type, file.size)
}
```

### Feature Usage

```typescript
// Track when users use features
import { trackFeatureUsed } from './utils/analytics'

// When user sets a loop
trackFeatureUsed('Loop Control')

// When user changes tempo
trackFeatureUsed('Tempo Adjust')

// When user opens diagnostics
trackFeatureUsed('Diagnostics')
```

### Subscriptions

```typescript
// Track subscription events
import { trackSubscription, trackRevenue } from './utils/analytics'

// When user subscribes
trackSubscription('started', 'monthly')
trackRevenue(9.99, 'premium_monthly')

// When subscription renews
trackSubscription('renewed', 'monthly')

// When user cancels
trackSubscription('cancelled', 'monthly')
```

### Errors

```typescript
// Track errors for debugging
import { trackError } from './utils/analytics'

try {
  // Your code
} catch (error) {
  trackError('Microphone Access', error.message)
}
```

## 🎯 Key Metrics to Track

### Engagement Metrics:

```typescript
// Daily Active Users (automatic with Mixpanel)
analytics.track('App Opened')

// Practice frequency
analytics.trackPracticeSession({...})

// Session duration
analytics.track('Session Ended', {
  duration: sessionDuration
})

// Feature adoption
analytics.trackFeatureUsed('Feature Name')
```

### Conversion Metrics:

```typescript
// Paywall views
analytics.track('Paywall Viewed')

// Trial starts
analytics.track('Trial Started', {
  plan: 'monthly'
})

// Purchases
analytics.trackRevenue(9.99, 'premium_monthly')

// Cancellations
analytics.trackSubscription('cancelled', 'monthly')
```

### Quality Metrics:

```typescript
// Accuracy tracking
analytics.track('Practice Session Completed', {
  accuracy: 85,
  improvement: +5 // vs last session
})

// Microphone issues
analytics.trackError('Mic Permission Denied', reason)

// App crashes (automatic with Capacitor)
```

## 📊 Funnels to Create in Mixpanel

### 1. **Onboarding Funnel**
```
App Opened
→ Microphone Granted
→ First Practice Started
→ First Practice Completed
```

### 2. **Subscription Funnel**
```
App Opened
→ Paywall Viewed
→ Pricing Selected
→ Purchase Started
→ Purchase Completed
```

### 3. **Feature Adoption**
```
App Opened
→ Loop Set
→ Tempo Changed
→ Diagnostics Opened
```

## 👥 User Segmentation

```typescript
// Set user properties for segmentation
import { setUserProperties, incrementUserProperty } from './utils/analytics'

// On signup/login
setUserProperties({
  subscription_status: 'free', // or 'premium'
  primary_instrument: 'violin',
  skill_level: 'intermediate',
  signup_date: new Date().toISOString()
})

// Increment counts
incrementUserProperty('practice_sessions_completed', 1)
incrementUserProperty('files_uploaded', 1)
```

## 🧪 A/B Testing

```typescript
// In Mixpanel, create experiments
// Then track which variant users see

import { track } from './utils/analytics'

const paywallVariant = Math.random() > 0.5 ? 'A' : 'B'

track('Paywall Viewed', {
  variant: paywallVariant,
  price_monthly: paywallVariant === 'A' ? 9.99 : 12.99
})

// Later, analyze conversion rates by variant
```

## 📱 Platform-Specific Tracking

```typescript
import { Capacitor } from '@capacitor/core'

const platform = Capacitor.getPlatform() // 'ios', 'android', 'web'

analytics.track('App Opened', {
  platform,
  device: Capacitor.isNativePlatform() ? 'mobile' : 'web'
})
```

## 🔒 Privacy & GDPR Compliance

### Opt-Out Option:

```typescript
// Add to settings
const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

if (!analyticsEnabled) {
  analytics.reset() // Stop tracking
}
```

### Privacy Policy Text:

```markdown
## Analytics
We use Mixpanel to understand how users interact with MusicCoach.
We collect:
- App usage (which features you use)
- Practice session data (duration, accuracy - no audio)
- Device information (platform, app version)

We do NOT collect:
- Audio recordings
- Personal information
- Location data

You can opt out in Settings.
```

## 📈 Mixpanel Dashboard Setup

### 1. **Key Reports to Create**:

**Insights Report**:
- Daily/Weekly Active Users
- Practice sessions per user
- Average session duration
- Feature usage breakdown

**Funnels**:
- Onboarding completion rate
- Subscription conversion rate
- Feature discovery rate

**Retention**:
- Day 1, 7, 30 retention
- Cohort analysis by signup date
- Retention by feature usage

### 2. **Alerts to Set**:

```
- Daily active users drops > 20%
- Subscription cancellations spike
- Error rate increases
- App crashes detected
```

### 3. **Custom Properties**:

In Mixpanel, go to **Lexicon** and define:
- Events (what users do)
- User properties (who they are)
- Custom properties (event details)

## 💡 Advanced Analytics

### Cohort Analysis:

```typescript
// Track user cohorts
setUserProperties({
  signup_week: getWeekNumber(new Date()),
  acquisition_channel: 'organic' // or 'paid', 'referral'
})

// Later in Mixpanel, compare cohorts:
// Week 1 users vs Week 2 users
// Organic vs Paid users
```

### Revenue Analytics:

```typescript
// Track lifetime value
trackRevenue(9.99, 'premium_monthly')

// Mixpanel automatically calculates:
// - Total revenue
// - Revenue per user
// - Average purchase value
// - LTV by cohort
```

## 🎯 Success Metrics

### North Star Metric:
**Weekly Active Practicers** - users who complete at least one practice session per week

Track with:
```typescript
analytics.trackPracticeSession({
  duration: practiceTime,
  accuracy: accuracyScore,
  songName: song,
  tempo: tempo
})
```

### Supporting Metrics:
1. **Retention**: % users who return after 7 days
2. **Engagement**: Average practice sessions per week
3. **Quality**: Average accuracy improvement over time
4. **Monetization**: Free-to-paid conversion rate

## 🔧 Debugging

```typescript
// Enable debug mode in development
import.meta.env.DEV // Automatically enables Mixpanel debug logs

// Check in browser console:
// You'll see "[Mixpanel] tracking: Event Name"
```

## ✅ Pre-Launch Checklist

- [ ] Mixpanel account created
- [ ] Project token added to `.env`
- [ ] Analytics initialized in App.tsx
- [ ] Key events tracked:
  - [ ] App opened
  - [ ] Practice sessions
  - [ ] Feature usage
  - [ ] Subscriptions
  - [ ] Errors
- [ ] Funnels created in Mixpanel
- [ ] Privacy policy updated
- [ ] Opt-out option added (optional)
- [ ] Tested events appear in Mixpanel

## 🎉 You're Tracking!

With Mixpanel integrated, you'll know:
- 📊 How users interact with your app
- 💰 What drives subscriptions
- 🎯 Which features to prioritize
- 🐛 Where bugs happen
- 📈 How to grow faster

**Mixpanel is free for 50K events/month!**

After that, starts at $28/month. Much cheaper than losing users to a broken experience!

## 📚 Resources

- **Mixpanel Docs**: https://docs.mixpanel.com
- **Event Naming Guide**: https://mixpanel.com/blog/event-naming-conventions/
- **Mixpanel University**: Free courses on analytics

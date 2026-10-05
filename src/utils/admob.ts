import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, AdMobBannerSize, InterstitialAdPluginEvents, AdmobConsentStatus, AdMobError } from '@capacitor-community/admob'
import { Capacitor } from '@capacitor/core'

let admobInitialized = false

export async function initializeAdMob() {
  if (admobInitialized) return
  
  try {
    // Only initialize on native platforms
    if (!Capacitor.isNativePlatform()) {
      console.log('AdMob: Not on native platform, skipping')
      return
    }

    await AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true, // Set to false in production
    })
    
    admobInitialized = true
    console.log('AdMob initialized successfully')
  } catch (error) {
    console.error('AdMob initialization error:', error)
  }
}

// Banner Ad
export async function showBannerAd() {
  if (!admobInitialized) {
    await initializeAdMob()
  }

  const options: BannerAdOptions = {
    adId: getAdUnitId('banner'),
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: true, // Set to false in production
  }

  try {
    await AdMob.showBanner(options)
    console.log('Banner ad shown')
  } catch (error) {
    console.error('Error showing banner ad:', error)
  }
}

export async function hideBannerAd() {
  try {
    await AdMob.hideBanner()
    console.log('Banner ad hidden')
  } catch (error) {
    console.error('Error hiding banner ad:', error)
  }
}

export async function removeBannerAd() {
  try {
    await AdMob.removeBanner()
    console.log('Banner ad removed')
  } catch (error) {
    console.error('Error removing banner ad:', error)
  }
}

// Interstitial Ad (fullscreen between sessions)
export async function loadInterstitialAd() {
  if (!admobInitialized) {
    await initializeAdMob()
  }

  try {
    await AdMob.prepareInterstitial({
      adId: getAdUnitId('interstitial'),
      isTesting: true, // Set to false in production
    })
    console.log('Interstitial ad loaded')
  } catch (error) {
    console.error('Error loading interstitial ad:', error)
  }
}

export async function showInterstitialAd(): Promise<boolean> {
  try {
    await AdMob.showInterstitial()
    console.log('Interstitial ad shown')
    return true
  } catch (error) {
    console.error('Error showing interstitial ad:', error)
    return false
  }
}

// Rewarded Ad (watch ad for premium features)
export async function loadRewardedAd() {
  if (!admobInitialized) {
    await initializeAdMob()
  }

  try {
    await AdMob.prepareRewardVideoAd({
      adId: getAdUnitId('rewarded'),
      isTesting: true, // Set to false in production
    })
    console.log('Rewarded ad loaded')
  } catch (error) {
    console.error('Error loading rewarded ad:', error)
  }
}

export async function showRewardedAd(): Promise<boolean> {
  try {
    const result = await AdMob.showRewardVideoAd()
    console.log('Rewarded ad shown, reward granted:', result)
    return true
  } catch (error) {
    console.error('Error showing rewarded ad:', error)
    return false
  }
}

// Get Ad Unit IDs (you'll replace these with real ones)
function getAdUnitId(type: 'banner' | 'interstitial' | 'rewarded'): string {
  const platform = Capacitor.getPlatform()
  
  // Test IDs (these work for testing)
  const testIds = {
    ios: {
      banner: 'ca-app-pub-3940256099942544/2934735716',
      interstitial: 'ca-app-pub-3940256099942544/4411468910',
      rewarded: 'ca-app-pub-3940256099942544/1712485313',
    },
    android: {
      banner: 'ca-app-pub-3940256099942544/6300978111',
      interstitial: 'ca-app-pub-3940256099942544/1033173712',
      rewarded: 'ca-app-pub-3940256099942544/5224354917',
    },
  }

  // Production IDs (replace with your real AdMob IDs)
  const productionIds = {
    ios: {
      banner: import.meta.env.VITE_ADMOB_IOS_BANNER || testIds.ios.banner,
      interstitial: import.meta.env.VITE_ADMOB_IOS_INTERSTITIAL || testIds.ios.interstitial,
      rewarded: import.meta.env.VITE_ADMOB_IOS_REWARDED || testIds.ios.rewarded,
    },
    android: {
      banner: import.meta.env.VITE_ADMOB_ANDROID_BANNER || testIds.android.banner,
      interstitial: import.meta.env.VITE_ADMOB_ANDROID_INTERSTITIAL || testIds.android.interstitial,
      rewarded: import.meta.env.VITE_ADMOB_ANDROID_REWARDED || testIds.android.rewarded,
    },
  }

  // Use test IDs in development, production IDs in production
  const ids = import.meta.env.DEV ? testIds : productionIds
  
  if (platform === 'ios') {
    return ids.ios[type]
  } else if (platform === 'android') {
    return ids.android[type]
  }
  
  return testIds.android[type] // fallback
}

// Track ad revenue (for analytics)
export function setupAdListeners(onAdRevenue?: (value: number) => void) {
  // Listen for ad events
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
    console.log('Interstitial ad loaded')
  })

  AdMob.addListener(InterstitialAdPluginEvents.Showed, () => {
    console.log('Interstitial ad showed')
  })

  AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error: AdMobError) => {
    console.error('Interstitial ad failed to show:', error)
  })

  AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
    console.log('Interstitial ad dismissed')
    // Preload next ad
    loadInterstitialAd()
  })
}

export default {
  initialize: initializeAdMob,
  showBanner: showBannerAd,
  hideBanner: hideBannerAd,
  removeBanner: removeBannerAd,
  loadInterstitial: loadInterstitialAd,
  showInterstitial: showInterstitialAd,
  loadRewarded: loadRewardedAd,
  showRewarded: showRewardedAd,
  setupListeners: setupAdListeners,
}

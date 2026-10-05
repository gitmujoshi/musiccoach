import mixpanel, { Dict } from 'mixpanel-browser'
import { Capacitor } from '@capacitor/core'

let analyticsInitialized = false

export function initAnalytics() {
  if (analyticsInitialized) return
  
  // Replace with your actual Mixpanel token
  const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN || 'YOUR_MIXPANEL_TOKEN'
  
  if (MIXPANEL_TOKEN === 'YOUR_MIXPANEL_TOKEN') {
    console.warn('Mixpanel token not configured. Analytics disabled.')
    return
  }
  
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
    api_host: 'https://api-eu.mixpanel.com', // or api.mixpanel.com for US
  })
  
  analyticsInitialized = true
  
  // Set user properties
  const platform = Capacitor.getPlatform()
  mixpanel.register({
    platform,
    app_version: '1.0.0',
  })
  
  console.log('Analytics initialized')
}

export function identifyUser(userId: string, traits?: Dict) {
  if (!analyticsInitialized) return
  
  mixpanel.identify(userId)
  
  if (traits) {
    mixpanel.people.set(traits)
  }
}

export function trackEvent(eventName: string, properties?: Dict) {
  if (!analyticsInitialized) return
  
  mixpanel.track(eventName, {
    timestamp: new Date().toISOString(),
    ...properties,
  })
}

// Convenience functions for common events

export function trackPracticeSession(data: {
  duration: number
  accuracy: number
  songName: string
  tempo: number
}) {
  trackEvent('Practice Session Completed', data)
}

export function trackFileUpload(fileType: string, fileSize: number) {
  trackEvent('Audio File Uploaded', {
    file_type: fileType,
    file_size_mb: (fileSize / 1024 / 1024).toFixed(2),
  })
}

export function trackSubscription(action: 'started' | 'cancelled' | 'renewed', plan: string) {
  trackEvent('Subscription ' + action.charAt(0).toUpperCase() + action.slice(1), {
    plan,
  })
}

export function trackFeatureUsed(featureName: string) {
  trackEvent('Feature Used', {
    feature: featureName,
  })
}

export function trackError(errorType: string, errorMessage: string) {
  trackEvent('Error Occurred', {
    error_type: errorType,
    error_message: errorMessage,
  })
}

export function trackMicrophonePermission(granted: boolean) {
  trackEvent('Microphone Permission', {
    granted,
  })
}

export function trackScreenView(screenName: string) {
  trackEvent('Screen Viewed', {
    screen: screenName,
  })
}

// User properties
export function setUserProperties(properties: Dict) {
  if (!analyticsInitialized) return
  
  mixpanel.people.set(properties)
}

export function incrementUserProperty(property: string, amount: number = 1) {
  if (!analyticsInitialized) return
  
  mixpanel.people.increment(property, amount)
}

// Revenue tracking
export function trackRevenue(amount: number, productId: string) {
  if (!analyticsInitialized) return
  
  mixpanel.people.track_charge(amount, {
    product_id: productId,
    time: new Date().toISOString(),
  })
  
  trackEvent('Purchase Completed', {
    amount,
    product_id: productId,
  })
}

// Reset on logout
export function resetAnalytics() {
  if (!analyticsInitialized) return
  
  mixpanel.reset()
}

export default {
  init: initAnalytics,
  identify: identifyUser,
  track: trackEvent,
  trackPracticeSession,
  trackFileUpload,
  trackSubscription,
  trackFeatureUsed,
  trackError,
  trackMicrophonePermission,
  trackScreenView,
  setUserProperties,
  incrementUserProperty,
  trackRevenue,
  reset: resetAnalytics,
}

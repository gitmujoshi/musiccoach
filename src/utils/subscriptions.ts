import { Purchases, CustomerInfo } from '@revenuecat/purchases-capacitor'
import { Capacitor } from '@capacitor/core'

let initialized = false

export async function initializeRevenueCat() {
  if (initialized) return
  
  try {
    const platform = Capacitor.getPlatform()
    
    // Replace with your actual RevenueCat API keys
    const IOS_API_KEY = import.meta.env.VITE_REVENUECAT_IOS_KEY || 'YOUR_IOS_KEY'
    const ANDROID_API_KEY = import.meta.env.VITE_REVENUECAT_ANDROID_KEY || 'YOUR_ANDROID_KEY'
    
    if (platform === 'ios' && IOS_API_KEY !== 'YOUR_IOS_KEY') {
      await Purchases.configure({
        apiKey: IOS_API_KEY
      })
      initialized = true
      console.log('RevenueCat initialized for iOS')
    } else if (platform === 'android' && ANDROID_API_KEY !== 'YOUR_ANDROID_KEY') {
      await Purchases.configure({
        apiKey: ANDROID_API_KEY
      })
      initialized = true
      console.log('RevenueCat initialized for Android')
    } else {
      console.warn('RevenueCat not configured. Add API keys to .env')
    }
  } catch (error) {
    console.error('RevenueCat initialization error:', error)
  }
}

export async function checkPremiumStatus(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    return isPremiumActive(customerInfo.customerInfo)
  } catch (error) {
    console.error('Error checking premium status:', error)
    return false
  }
}

export function isPremiumActive(customerInfo: CustomerInfo): boolean {
  return customerInfo.entitlements.active['premium'] !== undefined
}

export async function getUserId(): Promise<string | null> {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    return customerInfo.customerInfo.originalAppUserId
  } catch (error) {
    return null
  }
}

// Helper to check specific entitlements
export async function hasEntitlement(entitlementId: string): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    return customerInfo.customerInfo.entitlements.active[entitlementId] !== undefined
  } catch (error) {
    console.error(`Error checking entitlement ${entitlementId}:`, error)
    return false
  }
}

// Get subscription expiration date
export async function getSubscriptionExpirationDate(): Promise<Date | null> {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    const premiumEntitlement = customerInfo.customerInfo.entitlements.active['premium']
    
    if (premiumEntitlement && premiumEntitlement.expirationDate) {
      return new Date(premiumEntitlement.expirationDate)
    }
    
    return null
  } catch (error) {
    console.error('Error getting expiration date:', error)
    return null
  }
}

// Check if user is in trial period
export async function isInTrialPeriod(): Promise<boolean> {
  try {
    const customerInfo = await Purchases.getCustomerInfo()
    const premiumEntitlement = customerInfo.customerInfo.entitlements.active['premium']
    
    if (premiumEntitlement) {
      return premiumEntitlement.periodType === 'TRIAL'
    }
    
    return false
  } catch (error) {
    console.error('Error checking trial status:', error)
    return false
  }
}

export default {
  initialize: initializeRevenueCat,
  checkPremiumStatus,
  isPremiumActive,
  getUserId,
  hasEntitlement,
  getSubscriptionExpirationDate,
  isInTrialPeriod,
}

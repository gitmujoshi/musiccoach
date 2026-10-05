import { useEffect, useState } from 'react'
import { Purchases, PurchasesPackage, PurchasesOfferings } from '@revenuecat/purchases-capacitor'
import './Paywall.css'

interface Props {
  onDismiss: () => void
  onSubscribe: () => void
}

export default function Paywall({ onDismiss, onSubscribe }: Props) {
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadOfferings()
  }, [])

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings()
      if (offerings.current) {
        setOfferings(offerings)
      }
    } catch (e: any) {
      console.error('Error loading offerings:', e)
      setError('Unable to load subscription options')
    }
  }

  const purchasePackage = async (pkg: PurchasesPackage) => {
    setLoading(true)
    setError(null)
    
    try {
      const purchase = await Purchases.purchasePackage({ aPackage: pkg })
      
      if (purchase.customerInfo.entitlements.active['premium']) {
        onSubscribe()
      }
    } catch (e: any) {
      if (e.code !== '1') { // User cancelled
        setError('Purchase failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const restorePurchases = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const customerInfo = await Purchases.restorePurchases()
      
      if (customerInfo.customerInfo.entitlements.active['premium']) {
        onSubscribe()
      } else {
        setError('No active subscriptions found')
      }
    } catch (e: any) {
      setError('Failed to restore purchases')
    } finally {
      setLoading(false)
    }
  }

  const currentOffering = offerings?.current

  return (
    <div className="paywall-overlay">
      <div className="paywall">
        <button className="close-btn" onClick={onDismiss} aria-label="Close">
          ×
        </button>

        <div className="paywall-header">
          <h2>🎵 Upgrade to Premium</h2>
          <p className="subtitle">Unlock unlimited practice and advanced features</p>
        </div>

        <div className="features">
          <div className="feature">
            <span className="icon">✅</span>
            <span>Unlimited practice time</span>
          </div>
          <div className="feature">
            <span className="icon">✅</span>
            <span>Upload unlimited audio files</span>
          </div>
          <div className="feature">
            <span className="icon">✅</span>
            <span>Advanced loop controls</span>
          </div>
          <div className="feature">
            <span className="icon">✅</span>
            <span>Progress tracking & analytics</span>
          </div>
          <div className="feature">
            <span className="icon">✅</span>
            <span>Multiple instrument profiles</span>
          </div>
          <div className="feature">
            <span className="icon">✅</span>
            <span>Priority support</span>
          </div>
        </div>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="packages">
          {currentOffering?.availablePackages.map((pkg) => {
            const isAnnual = pkg.packageType === 'ANNUAL'
            const isMonthly = pkg.packageType === 'MONTHLY'
            
            return (
              <button
                key={pkg.identifier}
                className={`package-btn ${isAnnual ? 'recommended' : ''}`}
                onClick={() => purchasePackage(pkg)}
                disabled={loading}
              >
                {isAnnual && <span className="badge">Best Value</span>}
                
                <div className="package-title">
                  {pkg.product.title}
                </div>
                
                <div className="package-price">
                  {pkg.product.priceString}
                  {isAnnual && (
                    <span className="price-detail">
                      {' '}($
                      {(parseFloat(pkg.product.price) / 12).toFixed(2)}/month)
                    </span>
                  )}
                </div>
                
                <div className="package-description">
                  {pkg.product.description}
                </div>
              </button>
            )
          })}
        </div>

        {!currentOffering && !error && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading options...</p>
          </div>
        )}

        <button
          className="restore-btn"
          onClick={restorePurchases}
          disabled={loading}
        >
          Restore Purchases
        </button>

        <p className="legal">
          Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period.
          Manage subscriptions in your App Store or Google Play account settings.
        </p>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import './AdBanner.css'

export interface Ad {
  id: string
  businessName: string
  imageUrl: string
  tagline: string
  ctaText: string
  targetUrl: string
  type: 'music-store' | 'tutor' | 'instrument-shop' | 'concert'
}

interface Props {
  position: 'bottom' | 'card' | 'fullscreen'
  onAdClick?: (ad: Ad) => void
}

// These would come from your backend/CMS in production
const SAMPLE_ADS: Ad[] = [
  {
    id: '1',
    businessName: "Joe's Music Store",
    imageUrl: '/ads/sample-store.jpg',
    tagline: '20% off all violin strings this week!',
    ctaText: 'Shop Now',
    targetUrl: 'https://example.com/music-store',
    type: 'music-store'
  },
  {
    id: '2',
    businessName: 'Sarah Smith - Violin Teacher',
    imageUrl: '/ads/sample-tutor.jpg',
    tagline: 'Professional lessons, first session free',
    ctaText: 'Book Lesson',
    targetUrl: 'https://example.com/tutor',
    type: 'tutor'
  },
  {
    id: '3',
    businessName: 'Downtown Symphony Hall',
    imageUrl: '/ads/sample-concert.jpg',
    tagline: 'Spring Concert - This Saturday 7pm',
    ctaText: 'Get Tickets',
    targetUrl: 'https://example.com/concert',
    type: 'concert'
  }
]

export default function AdBanner({ position, onAdClick }: Props) {
  const [currentAd, setCurrentAd] = useState<Ad>(SAMPLE_ADS[0])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Rotate ads every 30 seconds
    const interval = setInterval(() => {
      setCurrentAd(prev => {
        const currentIndex = SAMPLE_ADS.findIndex(ad => ad.id === prev.id)
        const nextIndex = (currentIndex + 1) % SAMPLE_ADS.length
        return SAMPLE_ADS[nextIndex]
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleAdClick = () => {
    // Track ad click
    if (onAdClick) {
      onAdClick(currentAd)
    }
    
    // Open ad URL
    window.open(currentAd.targetUrl, '_blank')
  }

  const handleClose = () => {
    setIsVisible(false)
    // Set a timer to show again after some time
    setTimeout(() => setIsVisible(true), 300000) // 5 minutes
  }

  if (!isVisible) return null

  if (position === 'bottom') {
    return (
      <div className="ad-banner bottom">
        <button className="ad-close" onClick={handleClose} aria-label="Close ad">
          ×
        </button>
        <div className="ad-content" onClick={handleAdClick}>
          <div className="ad-label">Sponsored</div>
          <div className="ad-info">
            <div className="ad-business">{currentAd.businessName}</div>
            <div className="ad-tagline">{currentAd.tagline}</div>
          </div>
          <button className="ad-cta">{currentAd.ctaText}</button>
        </div>
      </div>
    )
  }

  if (position === 'card') {
    return (
      <div className="ad-card">
        <div className="ad-label">Sponsored</div>
        <button className="ad-close" onClick={handleClose} aria-label="Close ad">
          ×
        </button>
        <div className="ad-image-wrapper">
          <img src={currentAd.imageUrl} alt={currentAd.businessName} />
        </div>
        <div className="ad-card-content">
          <h3>{currentAd.businessName}</h3>
          <p>{currentAd.tagline}</p>
          <button className="ad-cta-full" onClick={handleAdClick}>
            {currentAd.ctaText}
          </button>
        </div>
      </div>
    )
  }

  // fullscreen interstitial
  return (
    <div className="ad-overlay">
      <div className="ad-fullscreen">
        <button className="ad-close" onClick={handleClose} aria-label="Close ad">
          ×
        </button>
        <div className="ad-label">Sponsored</div>
        <div className="ad-fullscreen-content">
          <div className="ad-image-large">
            <img src={currentAd.imageUrl} alt={currentAd.businessName} />
          </div>
          <h2>{currentAd.businessName}</h2>
          <p className="ad-tagline-large">{currentAd.tagline}</p>
          <button className="ad-cta-large" onClick={handleAdClick}>
            {currentAd.ctaText}
          </button>
          <button className="ad-skip" onClick={handleClose}>
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

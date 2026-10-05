# MusicCoach Website

Professional landing page for the MusicCoach app.

## 🚀 Quick Start

### Option 1: Deploy to Netlify/Vercel (Recommended)

1. **Deploy to Netlify:**
   ```bash
   cd website
   npx netlify-cli deploy --prod
   ```

2. **Or deploy to Vercel:**
   ```bash
   cd website
   npx vercel --prod
   ```

### Option 2: Run Locally

```bash
cd website
python3 -m http.server 8000
# Visit http://localhost:8000
```

Or use any static server:
```bash
npx serve .
```

## 📁 Files Structure

```
website/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── help.html           # Help/FAQ page
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # Interactive features
└── images/
    ├── app-screenshot.png      # Main hero screenshot
    ├── app-store-badge.svg     # Apple App Store badge
    ├── google-play-badge.svg   # Google Play badge
    └── og-image.jpg            # Social media preview
```

## 🎨 Getting Images

### 1. App Store Badges (Official)

**Apple App Store:**
Download from: https://developer.apple.com/app-store/marketing/guidelines/#downloadOnAppstore

**Google Play:**
Download from: https://play.google.com/intl/en_us/badges/

Save them to `website/images/`

### 2. App Screenshots

Take screenshots from your iOS/Android simulators:
- iPhone: Cmd+S in simulator
- Android: Screenshot tool in Android Studio

Recommended sizes:
- Hero image: 1242x2688 (iPhone 13 Pro Max)
- Feature screenshots: 1170x2532

### 3. Social Media Preview (og-image)

Create a 1200x630px image with:
- App logo
- Tagline: "Practice Music Smarter"
- App screenshot preview

Tools: Canva, Figma, or Photoshop

## ⚙️ Configuration

### Update Links

In `index.html`, replace these placeholders:

```html
<!-- App Store Links -->
https://apps.apple.com/app/musiccoach
https://play.google.com/store/apps/details?id=com.musiccoach.app

<!-- Social Media -->
https://twitter.com/musiccoachapp
https://instagram.com/musiccoachapp
https://facebook.com/musiccoachapp

<!-- Support Email -->
support@musiccoach.app
```

### Email Signup

In `js/script.js`, add your email collection endpoint:

```javascript
// Replace this line:
// await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

// With your service (examples):

// Mailchimp
await fetch('https://your-domain.us1.list-manage.com/subscribe/post-json?u=...', {
    method: 'POST',
    body: JSON.stringify({ EMAIL: email })
});

// ConvertKit
await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, api_key: 'YOUR_API_KEY' })
});
```

### Analytics

Add to `<head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

<!-- Or Mixpanel -->
<script type="text/javascript">
  (function(f,b){...mixpanel snippet...})
</script>
```

## 🌐 Custom Domain

### Netlify

1. Go to Domain Settings
2. Add custom domain: `musiccoach.app`
3. Configure DNS:
   ```
   A record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```

### Vercel

1. Go to Project Settings → Domains
2. Add domain
3. Update DNS as instructed

## 📱 SEO Optimization

Already included:
- ✓ Meta descriptions
- ✓ Open Graph tags
- ✓ Twitter Cards
- ✓ Semantic HTML
- ✓ Mobile responsive
- ✓ Fast loading

**Add sitemap.xml:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://musiccoach.app/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://musiccoach.app/privacy.html</loc>
    <priority>0.5</priority>
  </url>
</urlset>
```

**Add robots.txt:**

```
User-agent: *
Allow: /
Sitemap: https://musiccoach.app/sitemap.xml
```

## 🎯 Marketing Checklist

- [ ] Get official App Store badges
- [ ] Take professional app screenshots
- [ ] Create social media preview image
- [ ] Set up email collection (Mailchimp/ConvertKit)
- [ ] Add Google Analytics
- [ ] Connect custom domain
- [ ] Submit to Google Search Console
- [ ] Create social media accounts
- [ ] Write blog posts for SEO
- [ ] Run Google/Facebook ads

## 💡 Content Tips

### Headlines that Convert
- Current: "Practice Music Smarter, Not Harder"
- Alternatives:
  - "Perfect Your Pitch in 30 Days"
  - "Real-Time Feedback for Musicians"
  - "Your Personal Music Practice Coach"

### Call-to-Actions
- "Start Free Trial" (better than "Download")
- "Get Instant Feedback" (outcome-focused)
- "Practice Better Today" (urgency)

### Social Proof
Add:
- Number of users: "Join 10,000+ musicians"
- Ratings: "Rated 4.9 ★ on App Store"
- Press: "Featured in Music Teacher Magazine"

## 🔧 Troubleshooting

**Images not loading?**
- Check file paths are correct
- Ensure images are in `website/images/`
- Use relative paths: `images/app-screenshot.png`

**Styles not applying?**
- Clear browser cache
- Check CSS file path
- Inspect browser console for errors

**Form not submitting?**
- Add your email service endpoint
- Check CORS settings
- Test with browser DevTools Network tab

## 📊 Performance

Current optimizations:
- Minimal dependencies (no frameworks)
- Compressed CSS
- Lazy loading animations
- Mobile-first responsive design

Target metrics:
- Lighthouse Score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s

## 🚀 Next Steps

1. **Launch Checklist:**
   - [ ] Add real app screenshots
   - [ ] Get App Store badges
   - [ ] Set up email collection
   - [ ] Deploy to production
   - [ ] Connect custom domain
   - [ ] Add analytics

2. **Marketing:**
   - [ ] Submit to Product Hunt
   - [ ] Post on Reddit (/r/musiclessons)
   - [ ] Share on music teacher forums
   - [ ] Create YouTube demo video
   - [ ] Run Facebook/Instagram ads

3. **SEO:**
   - [ ] Write blog posts
   - [ ] Get backlinks from music sites
   - [ ] Submit to directories
   - [ ] Optimize for keywords

## 📞 Support

For questions or help:
- Email: support@musiccoach.app
- Website: https://musiccoach.app

---

Built with ❤️ for musicians

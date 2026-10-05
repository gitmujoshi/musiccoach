# Quick Deploy Guide

## 🚀 Deploy Your MusicCoach Website in 5 Minutes

### Option 1: Netlify (Recommended - Free)

1. **Install Netlify CLI** (if you haven't):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd /workspace/musiccoach-repo/website
   netlify deploy --prod
   ```

3. **Follow prompts**:
   - Authorize Netlify (opens browser)
   - Create new site or link existing
   - Set publish directory: `.` (current directory)
   - Confirm deployment

4. **Get your URL**: `https://your-site-name.netlify.app`

### Option 2: Vercel (Also Free)

```bash
cd /workspace/musiccoach-repo/website
npx vercel --prod
```

### Option 3: GitHub Pages

1. **Create a new GitHub repo** called `musiccoach-website`

2. **Push website files**:
   ```bash
   cd /workspace/musiccoach-repo/website
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOURNAME/musiccoach-website.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repo Settings → Pages
   - Source: Deploy from branch `main`
   - Your site: `https://YOURNAME.github.io/musiccoach-website`

### Option 4: Local Testing

```bash
cd /workspace/musiccoach-repo/website
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## 📝 Before Going Live

### 1. Add Real Screenshots
Replace placeholder images:
- `images/app-screenshot.png` - Main hero screenshot (1242x2688)
- `images/og-image.jpg` - Social preview (1200x630)

### 2. Get Official Store Badges
- **Apple**: https://developer.apple.com/app-store/marketing/guidelines/
- **Google**: https://play.google.com/intl/en_us/badges/

### 3. Update App Store Links
In `index.html`, replace:
```html
https://apps.apple.com/app/musiccoach
https://play.google.com/store/apps/details?id=com.musiccoach.app
```

### 4. Set Up Email Collection
Choose a service and update `js/script.js`:

**Mailchimp** (Free up to 500 subscribers):
```javascript
await fetch('https://YOUR-DOMAIN.us1.list-manage.com/subscribe/post-json?u=USER_ID&id=LIST_ID', {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams({ EMAIL: email })
});
```

**ConvertKit** (Free up to 1,000):
```javascript
await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, api_key: 'YOUR_PUBLIC_KEY' })
});
```

### 5. Add Analytics
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
```

### 6. Custom Domain (Optional)
Buy domain from Namecheap/GoDaddy ($10-15/year)

Point DNS to Netlify/Vercel:
```
A record: @ → [provided IP]
CNAME: www → [your-site].netlify.app
```

## ✅ Post-Launch Checklist

- [ ] Test on mobile devices
- [ ] Test all links work
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Fast load time (<3 seconds)
- [ ] SSL certificate active (https)
- [ ] Submit to Google Search Console
- [ ] Share on social media
- [ ] Post in music communities

## 🎯 Marketing Tips

1. **SEO**: Write blog posts about music practice
2. **Social Proof**: Add real testimonials and ratings
3. **Video**: Create a 30-second demo video for hero section
4. **A/B Test**: Try different headlines and CTAs
5. **Email**: Send launch announcement to your list
6. **Communities**: Post in /r/musiclessons, violinist.com, etc.

## 💰 Budget Estimate

- Domain: $12/year
- Hosting: FREE (Netlify/Vercel)
- Email service: FREE up to 500-1000 subscribers
- Analytics: FREE (Google Analytics)
- **Total: ~$12/year**

## 🆘 Troubleshooting

**Site not loading?**
- Clear browser cache
- Check if deployment succeeded
- Verify DNS settings (can take 24-48 hrs)

**Images broken?**
- Use relative paths: `images/file.png`
- Check file names match exactly (case-sensitive)

**Form not working?**
- Check email service API key
- Look at browser console for errors
- Test with valid email first

---

Need help? Contact: support@musiccoach.app

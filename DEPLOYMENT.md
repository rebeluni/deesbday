# 🚀 Deployment Guide

This guide explains how to deploy your gift box scrapbook online so Darp can access it from anywhere.

## 🌐 Option 1: Deploy to Netlify (Easiest)

Netlify is free and takes 2 minutes to set up.

### Step 1: Prepare Your Files

Make sure you have:
- `index.html`
- `styles.css`
- `script.js`
- `boxes.json` (with your gift boxes)
- `sample-data.json` (optional)

### Step 2: Create a Netlify Account

1. Go to [netlify.com](https://www.netlify.com)
2. Click "Sign up"
3. Choose "GitHub" or "Email" to sign up

### Step 3: Deploy

**Option A: Drag & Drop (Fastest)**
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop your entire `deesbday` folder
3. Done! Your site is live 🎉

**Option B: Connect GitHub**
1. Push your files to a GitHub repository
2. In Netlify, click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Click "Deploy"

### Step 4: Share the Link

Netlify will give you a URL like: `https://your-site-name.netlify.app`

Share this with Darp!

---

## 🌐 Option 2: Deploy to GitHub Pages (Free)

GitHub Pages is free and great for long-term hosting.

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `darp-birthday` (or any name)
4. Make it **Public**
5. Click "Create repository"

### Step 2: Upload Your Files

1. Click "Add file" → "Upload files"
2. Drag and drop your files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `boxes.json`
   - `sample-data.json`
3. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. Go to repository "Settings"
2. Scroll to "Pages"
3. Under "Source", select "main" branch
4. Click "Save"

### Step 4: Get Your URL

Your site will be at: `https://[your-username].github.io/darp-birthday`

---

## 🌐 Option 3: Deploy to Vercel (Advanced)

Vercel is similar to Netlify but with more features.

### Step 1: Sign Up

Go to [vercel.com](https://vercel.com) and sign up with GitHub

### Step 2: Import Project

1. Click "New Project"
2. Select your GitHub repository
3. Click "Import"

### Step 3: Deploy

Click "Deploy" and your site is live!

---

## 📱 Option 4: Self-Hosted (Advanced)

If you have your own web server or VPS:

### Step 1: Upload Files

Use FTP or SSH to upload all files to your server:
```
/public_html/darp-birthday/
├── index.html
├── styles.css
├── script.js
├── boxes.json
└── sample-data.json
```

### Step 2: Configure Server

Make sure your server:
- Serves `index.html` as the default file
- Allows CORS for image loading
- Has HTTPS enabled (recommended)

### Step 3: Access Your Site

Visit: `https://your-domain.com/darp-birthday/`

---

## 🔄 Updating Your Gift Boxes

After deployment, you can update `boxes.json` to add more gift boxes:

### On Netlify:
1. Edit `boxes.json` locally
2. Drag and drop the updated file to Netlify
3. Or use Netlify's file editor in the dashboard

### On GitHub Pages:
1. Edit `boxes.json` in your GitHub repository
2. Commit and push changes
3. GitHub Pages will auto-update (takes ~1 minute)

### On Vercel:
1. Edit `boxes.json` in your GitHub repository
2. Vercel will auto-deploy on every push

---

## 🔐 Security Considerations

### ✅ Safe to Share
- The website is view-only
- No forms or user input
- No backend database
- All data is in `boxes.json`

### ⚠️ Keep in Mind
- Anyone with the URL can view the gift boxes
- `boxes.json` is publicly readable (that's OK!)
- Only you should edit `boxes.json`

### 🔒 Optional: Password Protection

If you want to password-protect the site:

**Option 1: Netlify Password Protection**
1. In Netlify dashboard → Site settings
2. Go to "Access control"
3. Add password protection

**Option 2: Use a Private GitHub Repository**
1. Make your GitHub repo private
2. Deploy with GitHub Pages
3. Only people with access can view

---

## 📊 Monitoring & Analytics

### Netlify Analytics
- Go to your Netlify dashboard
- Click "Analytics"
- See visitor stats

### Google Analytics (Optional)
1. Sign up at [analytics.google.com](https://analytics.google.com)
2. Create a new property
3. Add this to `index.html` in the `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your actual ID.

---

## 🎯 Custom Domain (Optional)

Want to use your own domain like `darpbirthday.com`?

### On Netlify:
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions

### On GitHub Pages:
1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Update your domain's DNS settings

---

## 🚨 Troubleshooting Deployment

### "404 Not Found"
- Make sure all files are uploaded
- Check file names are correct (case-sensitive)
- Refresh the page (Ctrl+Shift+R)

### "Images not loading"
- Check image URLs are HTTPS
- Make sure URLs are publicly accessible
- Try a different image URL

### "JSON not loading"
- Make sure `boxes.json` is in the root directory
- Check file name spelling
- Validate JSON at [jsonlint.com](https://www.jsonlint.com/)

### "Styles look broken"
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure `styles.css` is uploaded
- Check for CORS issues in browser console

---

## 📝 Pre-Deployment Checklist

Before going live:

- [ ] All files are in the same folder
- [ ] `boxes.json` has at least one gift box
- [ ] All image URLs are valid
- [ ] All JSON is valid (use [jsonlint.com](https://www.jsonlint.com/))
- [ ] Tested locally in browser
- [ ] Tested on mobile device
- [ ] All links work
- [ ] No console errors (F12 → Console)

---

## 🎉 You're Live!

Your gift box scrapbook is now online! Share the link with Darp and watch them explore all the beautiful messages and memories you've created.

---

## 💡 Pro Tips

1. **Update regularly**: Add more boxes as you get messages from friends
2. **Test first**: Always test locally before deploying
3. **Backup**: Keep a local copy of `boxes.json`
4. **Share widely**: Encourage friends to add their own boxes
5. **Monitor**: Check analytics to see who's visiting

---

## 📞 Need Help?

- **Netlify Support**: [netlify.com/support](https://www.netlify.com/support/)
- **GitHub Help**: [docs.github.com](https://docs.github.com)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)

---

**Happy deploying! 🚀✨**

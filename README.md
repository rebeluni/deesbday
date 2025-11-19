# 🎁 Happy Birthday Darp — Virtual Gift Box Scrapbook

A beautiful, view-only aesthetic virtual gift box and digital scrapbook for Darp's birthday. Features a Gen-Z Pinterest-inspired design with soft pastel colors, polaroid frames, handwritten fonts, and smooth animations.

## 📂 Project Structure

```
deesbday/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
├── boxes.json          # YOUR GIFT BOXES DATA (create this)
├── sample-data.json    # Example data with 3 sample boxes
└── README.md           # This file
```

## 🚀 Quick Start

1. **Open the website**: Simply open `index.html` in your web browser
2. **View sample data**: The page will automatically load `sample-data.json` if `boxes.json` doesn't exist
3. **Add your own boxes**: Create a `boxes.json` file (see below)

## 📝 How to Add Gift Boxes

### Step 1: Create `boxes.json`

In the same folder as `index.html`, create a new file called `boxes.json` with the following structure:

```json
{
  "meta": {
    "title": "Happy Birthday, Darp",
    "subtitle": "A scrapbook of wishes"
  },
  "boxes": [
    {
      "id": "box_001",
      "displayOrder": 1,
      "sender": "Your Name",
      "relationship": "Your Relationship (optional)",
      "message": "Your heartfelt message here...",
      "poem": "Optional poem (can be omitted)",
      "photos": [
        "https://url-to-photo-1.jpg",
        "https://url-to-photo-2.jpg"
      ],
      "captions": [
        "Caption for photo 1",
        "Caption for photo 2"
      ],
      "theme": {
        "coverColor": "#FDEEF0",
        "sticker": "💙"
      },
      "date": "2025-11-17T20:00:00+05:30"
    }
  ]
}
```

### Step 2: Customize Each Field

#### Required Fields:
- **`sender`**: Name of the person sending the gift
- **`message`**: The main birthday message (can be multiple paragraphs)
- **`date`**: ISO format date (e.g., `2025-11-17T20:00:00+05:30`)

#### Optional Fields:
- **`relationship`**: How you know Darp (e.g., "Best Friend", "Family", "Colleague")
- **`poem`**: A short poem or verse
- **`photos`**: Array of image URLs (1-6 images recommended)
- **`captions`**: Array of captions for each photo
- **`theme.coverColor`**: Hex color for the box cover (default: random pastel)
- **`theme.sticker`**: Emoji or text for the box cover (default: 🎁)

#### Other Fields:
- **`id`**: Unique identifier (e.g., `box_001`, `box_002`)
- **`displayOrder`**: Order in which boxes appear (1, 2, 3, etc.)

## 🎨 Customization Guide

### Change Theme Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-pink: #F8EAF6;
    --soft-pink: #FDEEF0;
    --soft-blue: #DDEBF9;
    --cream: #F7F1EA;
    --lavender: #C9B6E8;
    /* ... other colors ... */
}
```

### Change Fonts

The site uses Google Fonts. To change fonts, edit the `<link>` in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Fredoka:wght@300;400;500;600&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
```

- **`Caveat`**: Handwritten font for headings
- **`Fredoka`**: Main body font
- **`Playfair Display`**: Serif font for messages and poems

### Add More Stickers/Emojis

In the `theme.sticker` field, use any emoji:
- Hearts: 💙, 💕, 💖
- Flowers: 🌸, 🌺, 🌼, 🌻
- Stars: ⭐, ✨, 🌟
- Misc: 🎁, 🎉, 🎊, 🎈, 💝

### Adjust Animation Speed

In `styles.css`, modify animation durations:

```css
@keyframes float {
    /* Change 6s to make floating faster/slower */
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}
```

## 📸 Image URLs

You can use images from:

1. **Unsplash** (free, high-quality):
   ```
   https://images.unsplash.com/photo-[ID]?w=300&h=300&fit=crop
   ```

2. **Pexels** (free):
   ```
   https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg
   ```

3. **Your own hosted images**:
   - Upload to a service like Imgur, Cloudinary, or your own server
   - Use the direct URL

4. **Data URLs** (for small images):
   ```
   data:image/jpeg;base64,[base64-encoded-image]
   ```

## 🔄 Reordering Boxes

Change the `displayOrder` field in each box. Lower numbers appear first:

```json
{
  "id": "box_001",
  "displayOrder": 1,  // Appears first
  ...
},
{
  "id": "box_002",
  "displayOrder": 2,  // Appears second
  ...
}
```

## 🖨️ Print/PDF Export

The site is print-friendly! To export as PDF:

1. Open the website in your browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Choose "Save as PDF"
4. The landing page and navigation will be hidden in the PDF

## ✨ Features

- **View-Only**: Only you can edit the JSON file; Darp just opens and explores
- **Responsive**: Works beautifully on desktop, tablet, and mobile
- **Animations**: Floating stickers, bouncing buttons, shake effects on hover
- **Confetti**: Confetti burst when opening each box for the first time
- **Accessibility**: Keyboard navigation, focus states, alt text for images
- **Print-Friendly**: Export the scrapbook as PDF
- **Data-Driven**: All content comes from `boxes.json`

## 🎯 Advanced: Auto-Reload During Development

If you want the page to automatically reload when you edit `boxes.json`, uncomment this line in `script.js`:

```javascript
// setInterval(reloadGiftBoxes, 5000);
```

This will check for updates every 5 seconds.

## 🔧 Troubleshooting

### Images not loading?
- Check that the image URL is correct and publicly accessible
- Try a different image URL
- Use HTTPS URLs (not HTTP)

### Boxes not appearing?
- Make sure `boxes.json` exists in the same folder as `index.html`
- Check the browser console (F12) for error messages
- Validate your JSON at [jsonlint.com](https://www.jsonlint.com/)

### Styling looks broken?
- Clear your browser cache (Ctrl+Shift+Delete)
- Make sure `styles.css` is in the same folder as `index.html`
- Check that all font URLs are loading (look in browser DevTools)

### Modal won't close?
- Press the `Esc` key
- Click the X button
- Click outside the modal (on the dark overlay)

## 📋 Example: Adding a New Box

Here's a complete example of adding a new gift box:

```json
{
  "id": "box_004",
  "displayOrder": 4,
  "sender": "Your Best Friend",
  "relationship": "Best Friend",
  "message": "Happy birthday! You mean the world to me. Here's to another year of adventures together!",
  "poem": "On your special day, I want to say,\nYou make the world a better place every day.",
  "photos": [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop"
  ],
  "captions": ["Our favorite memory"],
  "theme": {
    "coverColor": "#C9B6E8",
    "sticker": "💕"
  },
  "date": "2025-11-18T10:00:00+05:30"
}
```

## 🎨 Color Palette Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Pink | `#F8EAF6` | Background, accents |
| Soft Pink | `#FDEEF0` | Box covers, highlights |
| Soft Blue | `#DDEBF9` | Box covers, accents |
| Cream | `#F7F1EA` | Box covers, backgrounds |
| Lavender | `#C9B6E8` | Box covers, accents |
| Accent Pink | `#E8A8D8` | Headings, buttons |
| Accent Blue | `#A8D8E8` | Accents, tags |

## 📱 Mobile Optimization

The site is fully responsive and works great on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

All animations are optimized for performance on mobile devices.

## 🔐 Privacy & Security

- This is a **view-only** website for Darp
- No forms or public submission methods
- Only you can edit `boxes.json`
- No data is sent to external servers (except image URLs)
- All processing happens in the browser

## 📞 Support

If you encounter any issues:

1. Check the browser console (F12 → Console tab)
2. Validate your JSON at [jsonlint.com](https://www.jsonlint.com/)
3. Make sure all file names are correct
4. Try opening the page in a different browser

## 🎉 Have Fun!

This scrapbook is all about celebrating Darp and the people who care about them. Feel free to customize it further, add more boxes, and make it as personal and beautiful as you want!

---

**Made with 💙 for Darp's Birthday**

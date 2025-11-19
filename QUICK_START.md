# 🎁 Quick Start Guide — Add Your First Gift Box

## 1️⃣ Open `boxes.json`

The file is already created and ready for you to edit!

## 2️⃣ Copy & Paste This Template

Replace the empty `"boxes": []` with your gift boxes. Here's a template:

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
      "sender": "Your Name Here",
      "relationship": "Best Friend",
      "message": "Write your heartfelt message here. You can use multiple paragraphs.\n\nLike this!",
      "poem": "Optional poem\nYou can skip this if you don't want a poem",
      "photos": [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1516534775068-bb57a52f4fee?w=300&h=300&fit=crop"
      ],
      "captions": [
        "Photo 1 caption",
        "Photo 2 caption"
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

## 3️⃣ Customize Your Box

### Minimal Version (Text Only)
```json
{
  "id": "box_001",
  "displayOrder": 1,
  "sender": "Your Name",
  "message": "Happy birthday! You're amazing!",
  "date": "2025-11-17T20:00:00+05:30"
}
```

### Full Version (With Everything)
```json
{
  "id": "box_001",
  "displayOrder": 1,
  "sender": "Your Name",
  "relationship": "Best Friend",
  "message": "Your message here...",
  "poem": "Your poem here...",
  "photos": ["url1", "url2", "url3"],
  "captions": ["caption1", "caption2", "caption3"],
  "theme": {
    "coverColor": "#FDEEF0",
    "sticker": "💙"
  },
  "date": "2025-11-17T20:00:00+05:30"
}
```

## 4️⃣ Add More Boxes

Just add more objects to the `"boxes"` array:

```json
"boxes": [
  { /* box 1 */ },
  { /* box 2 */ },
  { /* box 3 */ }
]
```

Remember to use commas between boxes!

## 5️⃣ Save & Refresh

1. Save `boxes.json`
2. Refresh the browser (F5)
3. Your boxes will appear! 🎉

## 📸 Image URLs

Use free images from:
- **Unsplash**: `https://images.unsplash.com/photo-[ID]?w=300&h=300&fit=crop`
- **Pexels**: `https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg`
- **Your own**: Upload anywhere and use the link

## 🎨 Sticker Emojis

Popular choices:
- 💙 💕 💖 (hearts)
- 🌸 🌺 🌼 (flowers)
- ⭐ ✨ 🌟 (stars)
- 🎁 🎉 🎊 (celebration)
- 💝 🎈 (gifts)

## 🎨 Box Colors

Pastel colors that match the theme:
- `#FDEEF0` (soft pink)
- `#DDEBF9` (soft blue)
- `#F7F1EA` (cream)
- `#C9B6E8` (lavender)
- `#F8EAF6` (primary pink)

## ✅ Validation

Before saving, make sure:
- ✓ All commas are in the right places
- ✓ All quotes are matched
- ✓ All URLs are valid
- ✓ Dates are in ISO format: `YYYY-MM-DDTHH:MM:SS+05:30`

**Stuck?** Use [jsonlint.com](https://www.jsonlint.com/) to validate your JSON!

## 🚀 You're Ready!

That's it! Open `index.html` in your browser and watch your gift boxes appear. 🎁✨

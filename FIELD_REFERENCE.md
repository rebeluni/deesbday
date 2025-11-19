# 📋 Complete Field Reference Guide

This guide explains every field you can use in a gift box.

## 🎁 Required Fields

These fields **must** be included in every box:

### `id` (string)
Unique identifier for the box. Use format: `box_001`, `box_002`, etc.
```json
"id": "box_001"
```

### `displayOrder` (number)
Order in which boxes appear (1 = first, 2 = second, etc.)
```json
"displayOrder": 1
```

### `sender` (string)
Name of the person sending the gift
```json
"sender": "Ankita"
```

### `message` (string)
The main birthday message. Use `\n\n` for paragraph breaks.
```json
"message": "Happy Birthday!\n\nYou're amazing!\n\nLove, Ankita"
```

### `date` (string)
ISO format date. Include timezone offset.
```json
"date": "2025-11-17T20:00:00+05:30"
```

---

## ✨ Optional Fields

These fields can be omitted if not needed:

### `relationship` (string)
How you know Darp. Appears as a tag under the sender name.
```json
"relationship": "Best Friend"
```
Examples: "Best Friend", "Family", "Colleague", "Classmate", "Neighbor"

### `poem` (string)
A short poem or verse. Use `\n` for line breaks.
```json
"poem": "Another year older, another year wise,\nWith laughter that sparkles in your eyes.\nHappy birthday to someone so true!"
```

### `photos` (array of strings)
Array of image URLs. Can include 1-6 images.
```json
"photos": [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516534775068-bb57a52f4fee?w=300&h=300&fit=crop"
]
```

### `captions` (array of strings)
Captions for each photo. Must match the number of photos.
```json
"captions": [
  "Our first adventure",
  "Coffee dates"
]
```

### `theme` (object)
Customize the box appearance.

#### `theme.coverColor` (string)
Hex color for the box cover. Use pastel colors for best results.
```json
"theme": {
  "coverColor": "#FDEEF0"
}
```

Recommended colors:
- `#FDEEF0` (soft pink)
- `#DDEBF9` (soft blue)
- `#F7F1EA` (cream)
- `#C9B6E8` (lavender)
- `#F8EAF6` (primary pink)

#### `theme.sticker` (string)
Emoji or text for the box cover. Can be any emoji or short text.
```json
"theme": {
  "sticker": "💙"
}
```

Popular emojis:
- Hearts: 💙, 💕, 💖, 💗, 💘
- Flowers: 🌸, 🌺, 🌼, 🌻, 🌷
- Stars: ⭐, ✨, 🌟, 💫
- Celebration: 🎁, 🎉, 🎊, 🎈, 🎀
- Nature: 🦋, 🐝, 🌙, ☀️

---

## 📝 Complete Example

Here's a box using all available fields:

```json
{
  "id": "box_001",
  "displayOrder": 1,
  "sender": "Ankita",
  "relationship": "Best Friend",
  "message": "Happy Birthday Darp! 💙\n\nI can't believe another year has passed! You've been such an incredible friend to me. From our late-night talks to our spontaneous adventures, every moment with you is precious.\n\nThank you for being the kind of friend who listens without judgment and always knows how to brighten my day.\n\nWith all my love,\nAnkita 💕",
  "poem": "Another year older, another year wise,\nWith laughter that sparkles in your eyes.\nYou bring so much joy to all that you meet,\nYou make every moment feel complete.\n\nHappy birthday to someone so true,\nThe world is so much better with you.",
  "photos": [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1516534775068-bb57a52f4fee?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1522684072519-3c0f0b2e5d5d?w=300&h=300&fit=crop"
  ],
  "captions": [
    "Our first adventure",
    "Coffee dates",
    "Sunset memories"
  ],
  "theme": {
    "coverColor": "#FDEEF0",
    "sticker": "💙"
  },
  "date": "2025-11-17T20:00:00+05:30"
}
```

---

## 🎯 Minimal Example

Here's the bare minimum required:

```json
{
  "id": "box_001",
  "displayOrder": 1,
  "sender": "Your Name",
  "message": "Happy birthday!",
  "date": "2025-11-17T20:00:00+05:30"
}
```

---

## 📅 Date Format

Dates must be in ISO 8601 format with timezone:

```
YYYY-MM-DDTHH:MM:SS+05:30
```

Examples:
- `2025-11-17T20:00:00+05:30` (8 PM IST)
- `2025-11-17T10:30:00+05:30` (10:30 AM IST)
- `2025-11-17T00:00:00+05:30` (Midnight IST)

**Timezone offsets:**
- IST (India): `+05:30`
- UTC: `+00:00`
- EST: `-05:00`
- PST: `-08:00`
- CET: `+01:00`

---

## 🖼️ Image URLs

### Free Image Sources

**Unsplash** (highest quality):
```
https://images.unsplash.com/photo-[ID]?w=300&h=300&fit=crop
```
Find photos at [unsplash.com](https://unsplash.com)

**Pexels** (free stock photos):
```
https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg
```
Find photos at [pexels.com](https://www.pexels.com)

**Pixabay** (free stock photos):
```
https://pixabay.com/get/[ID]
```
Find photos at [pixabay.com](https://pixabay.com)

### Your Own Images

1. Upload to a free service like:
   - [Imgur](https://imgur.com) (simple, no account needed)
   - [Cloudinary](https://cloudinary.com) (free tier available)
   - [imgbb](https://imgbb.com) (simple, no account needed)

2. Copy the direct image URL
3. Paste into the `photos` array

### Important Notes

- ✅ Use HTTPS URLs (not HTTP)
- ✅ Make sure images are publicly accessible
- ✅ Test URLs in your browser first
- ✅ Recommended size: 300x300px or larger
- ✅ Supported formats: JPG, PNG, WebP, GIF

---

## ✅ Validation Checklist

Before saving your `boxes.json`, verify:

- [ ] All field names are spelled correctly
- [ ] All strings are wrapped in quotes: `"value"`
- [ ] All commas are in the right places
- [ ] All brackets and braces match: `{}`, `[]`
- [ ] All URLs are valid and accessible
- [ ] All dates are in ISO format
- [ ] No trailing commas after the last item

**Use [jsonlint.com](https://www.jsonlint.com/) to validate!**

---

## 🎨 Styling Tips

### Message Formatting

Use `\n` for line breaks and `\n\n` for paragraphs:

```json
"message": "Line 1\nLine 2\n\nNew paragraph"
```

### Poem Formatting

Use `\n` for each line:

```json
"poem": "Line 1\nLine 2\nLine 3\n\nStanza 2\nLine 1\nLine 2"
```

### Emojis in Text

You can add emojis anywhere:

```json
"message": "Happy Birthday! 🎉\n\nYou're amazing! 💙"
```

---

## 🚀 Quick Copy-Paste

Use `BOX_TEMPLATE.json` as a starting point. Copy the template, fill in your details, and paste into `boxes.json`.

---

## 📞 Common Issues

**"Invalid JSON" error?**
- Check [jsonlint.com](https://www.jsonlint.com/)
- Make sure all quotes are matched
- Make sure all commas are in the right places

**Images not showing?**
- Check the URL is correct
- Make sure it's HTTPS (not HTTP)
- Try a different image URL

**Box not appearing?**
- Check `displayOrder` is a number (not a string)
- Make sure `id` is unique
- Refresh the browser (Ctrl+F5)

---

That's it! You now know everything about the gift box fields. Happy creating! 🎁✨

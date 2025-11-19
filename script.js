// ===========================
// GIFT BOX SCRAPBOOK APP
// ===========================

let giftBoxesData = [];
let currentOpenBox = null;

// Initialize app on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadGiftBoxes();
    renderGiftBoxes();
});

// ===========================
// DATA LOADING
// ===========================

/**
 * Load gift boxes from JSON file
 * The JSON file should be at /boxes.json in the root directory
 * If not found, falls back to sample-data.json
 */
async function loadGiftBoxes() {
    try {
        // Try to load boxes.json first (production data)
        let response = await fetch('./boxes.json');
        
        // If boxes.json doesn't exist, try sample-data.json
        if (!response.ok) {
            response = await fetch('./sample-data.json');
        }
        
        if (!response.ok) {
            throw new Error('Could not load gift boxes data');
        }
        
        const data = await response.json();
        giftBoxesData = data.boxes || [];
        
        // Sort by displayOrder
        giftBoxesData.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        
        console.log(`Loaded ${giftBoxesData.length} gift boxes`);
    } catch (error) {
        console.error('Error loading gift boxes:', error);
        // Use empty array if loading fails
        giftBoxesData = [];
    }
}

// ===========================
// RENDERING
// ===========================

/**
 * Render all gift boxes to the grid
 */
function renderGiftBoxes() {
    const giftsGrid = document.getElementById('giftsGrid');
    giftsGrid.innerHTML = '';
    
    if (giftBoxesData.length === 0) {
        giftsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; opacity: 0.6;">No gift boxes yet. Check back soon! 💙</p>';
        return;
    }
    
    giftBoxesData.forEach((box, index) => {
        const boxElement = createGiftBoxElement(box, index);
        giftsGrid.appendChild(boxElement);
    });
}

/**
 * Create a single gift box element
 */
function createGiftBoxElement(box, index) {
    const boxDiv = document.createElement('div');
    boxDiv.className = 'gift-box';
    boxDiv.style.animationDelay = `${index * 0.1}s`;
    
    // Get theme colors
    const themeColor = box.theme?.coverColor || getRandomPastelColor();
    const sticker = box.theme?.sticker || getRandomSticker();
    
    // Create preview text
    const previewText = box.message?.substring(0, 80) + '...' || 'A special message';
    
    // Format date
    const dateStr = formatDate(box.date);
    
    boxDiv.innerHTML = `
        <div class="gift-box-cover" style="background: linear-gradient(135deg, ${themeColor} 0%, ${lightenColor(themeColor)} 100%);">
            <span style="display: inline-block; animation: bounce 0.8s ease-in-out infinite; animation-delay: ${index * 0.1}s;">
                ${sticker}
            </span>
        </div>
        <div class="gift-box-info">
            <div class="gift-box-sender">${box.sender || 'Someone Special'}</div>
            ${box.relationship ? `<div class="gift-box-relationship">${box.relationship}</div>` : ''}
            <div class="gift-box-preview">${previewText}</div>
            <div class="gift-box-date">${dateStr}</div>
        </div>
    `;
    
    boxDiv.addEventListener('click', () => openGiftModal(box));
    
    // Add hover sound effect (optional visual feedback)
    boxDiv.addEventListener('mouseenter', () => {
        boxDiv.style.animation = 'shake 0.5s ease-in-out';
    });
    
    return boxDiv;
}

/**
 * Open gift modal with full details
 */
function openGiftModal(box) {
    currentOpenBox = box;
    
    // Populate modal content
    document.getElementById('modalSender').textContent = box.sender || 'Someone Special';
    
    const relationshipEl = document.getElementById('modalRelationship');
    if (box.relationship) {
        relationshipEl.textContent = box.relationship;
        relationshipEl.style.display = 'inline-block';
    } else {
        relationshipEl.style.display = 'none';
    }
    
    document.getElementById('modalMessage').textContent = box.message || '';
    
    // Handle poem section
    const poemSection = document.getElementById('poemSection');
    if (box.poem) {
        document.getElementById('modalPoem').textContent = box.poem;
        poemSection.style.display = 'block';
    } else {
        poemSection.style.display = 'none';
    }
    
    // Handle photos section
    const photosSection = document.getElementById('photosSection');
    if (box.photos && box.photos.length > 0) {
        renderPhotos(box.photos, box.captions);
        photosSection.style.display = 'block';
    } else {
        photosSection.style.display = 'none';
    }
    
    // Format and display date
    document.getElementById('modalDate').textContent = `Shared on ${formatDate(box.date)}`;
    
    // Show modal with animation
    const modal = document.getElementById('giftModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Trigger confetti on first open
    if (!box._opened) {
        triggerConfetti();
        box._opened = true;
    }
}

/**
 * Render photos in polaroid style
 */
function renderPhotos(photos, captions) {
    const photosGrid = document.getElementById('photosGrid');
    photosGrid.innerHTML = '';
    
    photos.forEach((photoUrl, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'photo-polaroid';
        
        // Random rotation between -5 and 5 degrees
        const rotation = (Math.random() * 10 - 5);
        polaroid.style.setProperty('--rotation', `${rotation}deg`);
        
        const caption = captions && captions[index] ? captions[index] : '';
        
        polaroid.innerHTML = `
            <img src="${photoUrl}" alt="${caption || 'Gift photo'}" loading="lazy">
            ${caption ? `<div class="photo-caption">${caption}</div>` : ''}
        `;
        
        photosGrid.appendChild(polaroid);
    });
}

// ===========================
// MODAL CONTROLS
// ===========================

/**
 * Close the gift modal
 */
function closeModal() {
    const modal = document.getElementById('giftModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentOpenBox = null;
}

/**
 * Navigate to gifts section from landing page
 */
function goToGifts() {
    const giftsSection = document.getElementById('gifts');
    giftsSection.scrollIntoView({ behavior: 'smooth' });
}

// ===========================
// CONFETTI EFFECT
// ===========================

/**
 * Trigger confetti animation when a box is opened
 */
function triggerConfetti() {
    const container = document.getElementById('confetti');
    const confettiCount = 120;
    const stickers = ['🎉', '✨', '💙', '⭐', '🌸', '💕', '🎁', '🌟', '💖', '🎊', '🦋', '🌺', '💐', '🎀', '🌈', '💝', '🎈', '🌷', '🌹'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '100';
        
        // Mix of emoji stickers and colored shapes
        if (Math.random() > 0.4) {
            confetti.textContent = stickers[Math.floor(Math.random() * stickers.length)];
            confetti.style.fontSize = (25 + Math.random() * 30) + 'px';
            const vibrantColor = getRandomVibrantColor();
            confetti.style.filter = `drop-shadow(0 0 10px ${vibrantColor}) drop-shadow(0 0 20px ${vibrantColor})`;
            confetti.style.textShadow = `0 0 15px ${vibrantColor}`;
        } else {
            confetti.style.width = (8 + Math.random() * 20) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = getRandomVibrantColor();
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.boxShadow = `0 0 15px ${confetti.style.backgroundColor}`;
        }
        
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 0.4;
        const rotation = Math.random() * 360;
        
        confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s forwards`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        
        container.appendChild(confetti);
        
        // Remove element after animation
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Get a random cute sticker
 */
function getRandomSticker() {
    const stickers = [
        '🎁', '💙', '✨', '🌸', '⭐', '💕', '🎉', '🌟', '💖', '🎊',
        '🦋', '🌺', '💐', '🎀', '✨', '🌈', '💝', '🎈', '🌷', '🌹'
    ];
    return stickers[Math.floor(Math.random() * stickers.length)];
}

/**
 * Get a random vibrant color from the new palette
 */
function getRandomVibrantColor() {
    const colors = [
        '#FF006E', // deep pink
        '#B537F2', // neon purple
        '#00B4D8', // neon cyan
        '#FFB703', // vibrant gold
        '#FF4B9E', // hot pink
        '#06FFA5', // vibrant green
        '#FB5607', // vibrant orange
        '#FF006E', // deep pink
        '#B537F2', // neon purple
        '#00B4D8'  // neon cyan
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Get a random pastel color from the theme palette
 */
function getRandomPastelColor() {
    const colors = [
        '#FF006E', // deep pink
        '#FF4B9E', // hot pink
        '#00B4D8', // neon cyan
        '#FFF5E6', // cream
        '#B537F2'  // neon purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Lighten a hex color by a certain amount
 */
function lightenColor(color) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = 30;
    const usePound = true;
    
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    
    return (usePound ? '#' : '') + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    if (!dateString) return 'Date unknown';
    
    try {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } catch (error) {
        return 'Date unknown';
    }
}

// ===========================
// KEYBOARD NAVIGATION
// ===========================

/**
 * Close modal on Escape key
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('giftModal');
        if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ===========================
// ACCESSIBILITY
// ===========================

/**
 * Add focus states for keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===========================
// RELOAD DATA (for development)
// ===========================

/**
 * Reload gift boxes from JSON (useful for live editing)
 * Call this function in console to refresh data
 */
async function reloadGiftBoxes() {
    await loadGiftBoxes();
    renderGiftBoxes();
    console.log('Gift boxes reloaded!');
}

// Optional: Auto-reload every 5 seconds during development
// Uncomment the line below to enable auto-reload
// setInterval(reloadGiftBoxes, 5000);

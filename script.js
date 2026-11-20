// ===========================
// FOR DARP — App Logic
// Golden Hours Edition
// ===========================

let lettersData   = [];
let lyricsData    = [];
let thingsData    = [];
let ifyouwereData = [];
let receiptsData  = [];

// ===========================
// INIT
// ===========================

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.allSettled([
        loadLetters(),
        loadLyrics(),
        loadThings(),
        loadIfYouWere(),
        loadReceipts()
    ]);
    renderLetters();
    renderLyrics();
    renderThings();
    renderIfYouWere();
    renderReceipts();
});

// ===========================
// DATA LOADING
// ===========================

async function loadLetters() {
    try {
        let r = await fetch('./boxes.json');
        if (!r.ok) r = await fetch('./sample-data.json');
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        lettersData = data.boxes || [];
        lettersData.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    } catch (e) {
        lettersData = [];
    }
}

async function loadLyrics() {
    try {
        const r = await fetch('./lyrics.json');
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        lyricsData = data.lyrics || [];
    } catch (e) {
        lyricsData = [];
    }
}

async function loadThings() {
    try {
        const r = await fetch('./things.json');
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        thingsData = data.contributors || [];
    } catch (e) {
        thingsData = [];
    }
}

async function loadIfYouWere() {
    try {
        const r = await fetch('./ifyouwereas.json');
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        ifyouwereData = data.entries || [];
    } catch (e) {
        ifyouwereData = [];
    }
}

async function loadReceipts() {
    try {
        const r = await fetch('./receipts.json');
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        receiptsData = data.receipts || [];
    } catch (e) {
        receiptsData = [];
    }
}

// ===========================
// NAVIGATION
// ===========================

function enterSite() {
    document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
    triggerConfetti();
}

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const targetTabBtn = document.querySelector(`[data-tab="${tab}"]`);
    if (targetTabBtn) targetTabBtn.classList.add('active');
    
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    const targetSection = document.getElementById(tab);
    if (targetSection) targetSection.classList.add('active');
    
    const nav = document.getElementById('tabNav');
    if (nav) {
        window.scrollTo({ top: nav.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
    }
}

// ===========================
// RENDER: LETTERS
// ===========================

function renderLetters() {
    const grid = document.getElementById('lettersGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!lettersData.length) {
        grid.innerHTML = emptyState('💌', 'Letters are on their way…', 'Check back soon.');
        return;
    }
    lettersData.forEach((letter, i) => {
        const card = document.createElement('div');
        card.className = 'letter-card';
        card.style.animationDelay = `${i * 0.07}s`;
        const color   = letter.theme?.coverColor || '#F3E9D8';
        const sticker = letter.theme?.sticker     || '💌';
        const preview = (letter.message || '').substring(0, 95);

        // Thumbnail priority: letter.thumbnail -> first photo in letter.photos -> fallback sticker
        const thumbUrl = letter.thumbnail || (letter.photos && letter.photos.length > 0 ? letter.photos[0] : null);

        const thumbPosition = letter.thumbnailPosition || 'center 20%';
        const coverHtml = thumbUrl
            ? `<div class="letter-card-cover has-image">
                <img src="${encodeURI(thumbUrl)}" alt="${esc(letter.sender)}" style="object-position: ${thumbPosition};" loading="lazy">
                <div class="letter-cover-badge">${sticker}</div>
               </div>`
            : `<div class="letter-card-cover"
                 style="background: linear-gradient(135deg, ${color} 0%, ${lightenHex(color, 18)} 100%);">
                ${sticker}
               </div>`;

        card.innerHTML = `
            ${coverHtml}
            <div class="letter-card-body">
                <div class="letter-sender">${esc(letter.sender || 'Someone Special')}</div>
                ${letter.relationship ? `<div class="letter-relationship">${esc(letter.relationship)}</div>` : ''}
                <div class="letter-preview">${esc(preview)}…</div>
                <div class="letter-date">${formatDate(letter.date)}</div>
            </div>`;
        card.addEventListener('click', () => openLetterModal(letter));
        grid.appendChild(card);
    });
}

// ===========================
// RENDER: LYRICS
// ===========================

function renderLyrics() {
    const grid = document.getElementById('lyricsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!lyricsData.length) {
        grid.innerHTML = emptyState('🎵', 'The playlist is coming together…', 'Check back soon.');
        return;
    }
    lyricsData.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'spotify-lyric-card';
        card.style.animationDelay = `${i * 0.08}s`;
        
        const bg = item.bgColor || '#C9A882';
        const fg = item.textColor || '#FFFFFF';
        const isLight = fg.toLowerCase() !== '#ffffff';
        const spotifyLogoFill = isLight ? '#191414' : '#FFFFFF';
        const doodles = item.doodles ? item.doodles.map(d => `<span class="lyric-doodle">${d}</span>`).join('') : '';

        card.style.setProperty('--card-bg', bg);
        card.style.setProperty('--card-fg', fg);

        card.innerHTML = `
            <div class="spotify-card-inner" style="background-color: ${bg}; color: ${fg};">
                <div class="doodle-layer">${doodles}</div>
                <div class="spotify-card-header">
                    <img class="spotify-album-art" src="${esc(item.albumArt || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop')}" alt="${esc(item.song)}">
                    <div class="spotify-track-meta">
                        <div class="spotify-track-title">${esc(item.song)}</div>
                        <div class="spotify-track-artist">${esc(item.artist)}</div>
                    </div>
                </div>
                <div class="spotify-lyric-body">
                    <p class="spotify-lyric-quote">${esc(item.lyrics)}</p>
                    ${item.subtitle ? `<p class="spotify-lyric-subnote">${esc(item.subtitle)}</p>` : ''}
                </div>
                <div class="spotify-card-footer">
                    <div class="spotify-badge">
                        <svg class="spotify-icon" viewBox="0 0 24 24" width="20" height="20" fill="${spotifyLogoFill}">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.303c-.215.352-.676.465-1.028.249-2.817-1.722-6.362-2.111-10.539-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.597 11.652 1.338.352.216.464.677.248 1.028zm1.468-3.262c-.27.439-.848.579-1.287.31-3.225-1.982-8.14-2.557-11.954-1.399-.499.151-1.03-.133-1.181-.632-.151-.499.133-1.03.632-1.181 4.363-1.325 9.782-.686 13.479 1.583.439.269.58.847.311 1.289zm.126-3.41c-3.864-2.294-10.245-2.506-13.934-1.386-.59.18-1.221-.157-1.4-.747-.18-.59.156-1.221.746-1.4 4.242-1.288 11.285-1.043 15.742 1.604.532.316.706 1.008.39 1.54-.316.533-1.007.708-1.544.389z"/>
                        </svg>
                        <span class="spotify-label">Spotify</span>
                    </div>
                    ${item.tag ? `<span class="spotify-tag-badge">${esc(item.tag)}</span>` : ''}
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

// ===========================
// RENDER: LITTLE THINGS
// ===========================

function renderThings() {
    const grid = document.getElementById('thingsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!thingsData.length) {
        grid.innerHTML = emptyState('🌿', 'Little things, incoming…', 'Check back soon.');
        return;
    }
    thingsData.forEach((contributor, i) => {
        const card = document.createElement('div');
        card.className = 'things-card';
        card.style.animationDelay = `${i * 0.07}s`;
        const itemsHtml = (contributor.items || []).map(item => `
            <div class="thing-item">
                <span class="thing-emoji">${item.emoji || '✦'}</span>
                <div>
                    <div class="thing-name">${esc(item.name)}</div>
                    ${item.reason ? `<div class="thing-reason">${esc(item.reason)}</div>` : ''}
                </div>
            </div>`).join('');
        card.innerHTML = `${itemsHtml}`;
        grid.appendChild(card);
    });
}

// ===========================
// RENDER: IF YOU WERE A...
// ===========================

function renderIfYouWere() {
    const grid = document.getElementById('ifyouwereGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!ifyouwereData.length) {
        grid.innerHTML = emptyState('✨', 'Coming soon…', 'Check back soon.');
        return;
    }
    
    // Gather all assignments from entries
    const allAssignments = [];
    ifyouwereData.forEach(entry => {
        if (entry.assignments) allAssignments.push(...entry.assignments);
    });

    allAssignments.forEach((a, i) => {
        const card = document.createElement('div');
        card.className = 'ifyouwere-card';
        card.style.animationDelay = `${i * 0.06}s`;

        const imgBoxHtml = a.image
            ? `<div class="ifyouwere-img-box" onclick="openLightbox('${encodeURI(a.image)}', 'If you were ${esc(a.category)} → ${esc(a.answer)}')">
                <img src="${encodeURI(a.image)}" alt="${esc(a.answer)}" loading="lazy">
                <div class="ifyouwere-tag">if you were ${esc(a.category)}</div>
               </div>`
            : `<div class="ifyouwere-tag-plain">if you were ${esc(a.category)}</div>`;

        card.innerHTML = `
            ${imgBoxHtml}
            <div class="ifyouwere-card-body">
                <div class="ifyouwere-answer">${esc(a.answer)}</div>
                ${a.reason ? `<div class="ifyouwere-reason">“${esc(a.reason)}”</div>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===========================
// RENDER: RECEIPTS
// ===========================

function renderReceipts() {
    const grid = document.getElementById('receiptsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!receiptsData.length) {
        grid.innerHTML = emptyState('🧾', 'Gathering evidence…', 'Check back soon.');
        return;
    }
    receiptsData.forEach((receipt, i) => {
        const card = document.createElement('div');
        card.className = 'receipt-card';
        card.style.animationDelay = `${i * 0.07}s`;
        card.innerHTML = `
            <div class="receipt-label">${esc(receipt.label || 'Exhibit')}</div>
            <div class="receipt-title">${esc(receipt.title)}</div>
            <div class="receipt-subtitle">${esc(receipt.subtitle)}</div>
            <div class="receipt-story">${esc(receipt.story)}</div>
            <div class="receipt-verdict">${esc(receipt.verdict)}</div>`;
        grid.appendChild(card);
    });
}

// ===========================
// MODALS
// ===========================

function openLetterModal(letter) {
    // Only show the photos gallery inside the modal if the contributor has MULTIPLE photos!
    const hasMultiplePhotos = letter.photos && letter.photos.length > 1;
    const photosHtml = hasMultiplePhotos
        ? `<div class="modal-photos-header">
                <span class="modal-photos-tag">📷 Photo Gallery (${letter.photos.length}) · tap photo to expand</span>
           </div>
           <div class="modal-photos">
            ${letter.photos.map((url, i) => {
                const cap = esc(letter.captions?.[i] || '');
                return `
                <div class="modal-photo" onclick="openLightbox('${encodeURI(url)}', '${cap}')">
                    <img src="${encodeURI(url)}" alt="${cap || 'photo'}" onload="if(this.naturalWidth > this.naturalHeight * 1.15) this.parentElement.classList.add('is-landscape');" loading="lazy">
                    ${cap ? `<div class="modal-photo-caption">${cap}</div>` : ''}
                </div>`;
            }).join('')}
           </div>` : '';

    const poemHtml = letter.poem
        ? `<div class="modal-poem">${esc(letter.poem)}</div>` : '';

    document.getElementById('modalBody').innerHTML = `
        <div class="modal-sender">${esc(letter.sender || 'Someone Special')}</div>
        ${letter.relationship ? `<div class="modal-relationship">${esc(letter.relationship)}</div>` : ''}
        <p class="modal-message">${esc(letter.message || '')}</p>
        ${poemHtml}
        ${photosHtml}
        <div class="modal-date">${formatDate(letter.date)}</div>`;

    openModal();
    if (!letter._opened) { triggerConfetti(); letter._opened = true; }
}

function openModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Lightbox controls
function openLightbox(url, caption) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (!lb || !img) return;
    img.src = url;
    if (cap) {
        cap.textContent = caption || '';
        cap.style.display = caption ? 'inline-block' : 'none';
    }
    lb.classList.add('active');
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
}

document.addEventListener('keydown', e => { 
    if (e.key === 'Escape') {
        closeLightbox();
        closeModal();
    }
});

// ===========================
// CONFETTI
// ===========================

function triggerConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    const emojis = ['🤎', '✨', '🌸', '⭐', '💫', '🌿', '🎀', '🌙', '🍂', '✦', '☕', '🌼'];
    const colors = ['#C9A86C','#A07850','#E8D8C0','#D4BFA0','#8B6540','#5C3D2E'];
    for (let i = 0; i < 90; i++) {
        const el = document.createElement('div');
        el.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;';
        if (Math.random() > .38) {
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.fontSize = (18 + Math.random() * 22) + 'px';
        } else {
            const size = (5 + Math.random() * 10) + 'px';
            el.style.width = size; el.style.height = size;
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
        }
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top  = '-70px';
        const dur = 3 + Math.random() * 2.2;
        const delay = Math.random() * .6;
        el.style.animation = `confetti-fall ${dur}s linear ${delay}s forwards`;
        container.appendChild(el);
        setTimeout(() => el.remove(), (dur + delay) * 1000 + 200);
    }
}

// ===========================
// UTILITIES
// ===========================

function emptyState(icon, title, sub) {
    return `<div class="empty-state">
        <span class="empty-state-icon">${icon}</span>
        <p class="empty-state-title">${title}</p>
        <p class="empty-state-sub">${sub}</p>
    </div>`;
}
function formatDate(str) {
    if (!str) return '';
    try {
        return new Date(str).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
    } catch { return ''; }
}
function lightenHex(hex, amt) {
    const n = parseInt(hex.replace('#',''), 16);
    const R = Math.min(255, (n >> 16)         + amt);
    const G = Math.min(255, ((n >> 8) & 0xFF) + amt);
    const B = Math.min(255, (n & 0xFF)         + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
function esc(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

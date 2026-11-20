// ===========================
// FOR DARP — App Logic
// Golden Hours Edition
// ===========================

let lettersData   = [];
let lyricsData    = [];
let thingsData    = [];
let ifyouwereData = [];
let receiptsData  = [];
let isSafeMode    = localStorage.getItem('darp_safe_mode') === 'true';

// ===========================
// INIT
// ===========================

document.addEventListener('DOMContentLoaded', async () => {
    updateSafeModeUI();
    initBgMusic();
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

const defaultIfYouWereAssignments = [
    {
        "category": "a time of day",
        "answer": "golden hour",
        "reason": "warm, fleeting, and somehow makes everything look better than it was before",
        "image": "pics/if you were/time of day/golden-hour.jpg"
    },
    {
        "category": "a season",
        "answer": "spring",
        "reason": "fresh, bright, and effortlessly bringing everything around you to life",
        "image": "pics/if you were/season-spring/download (5).jpg"
    },
    {
        "category": "a city",
        "answer": "Santorini",
        "reason": "sun-drenched, iconic, calm on the surface, and an absolute visual masterpiece",
        "image": "pics/if you were/city-santorini/download (6).jpg"
    },
    {
        "category": "a challenge",
        "answer": "the kind you've already won before it starts",
        "reason": "see: 'I'll sit here every day'",
        "image": "pics/if you were/challenge/WhatsApp Image 2026-11-20 at 8.01.43 PM (2).jpeg"
    },
    {
        "category": "a road",
        "answer": "an unmarked one you'd take anyway",
        "reason": "not because you know where it goes — but because the going is the point",
        "image": "pics/if you were/road/daily-favorites-road.jpg"
    },
    {
        "category": "a number",
        "answer": "3",
        "reason": "mulank solidarity 🤎",
        "image": "pics/if you were/mulank/download (8).jpg"
    },
    {
        "category": "a dream",
        "answer": "a seaside villa with an NGO downstairs and an Airbnb upstairs",
        "reason": "and i can already see it happening",
        "image": "pics/if you were/dream/beach-sunset-dream.jpg"
    },
    {
        "category": "a conversation",
        "answer": "the 3-hour one where you forget to eat",
        "reason": "deep, passionate, and somehow always about feminism, mythology, or capitalism",
        "image": "pics/if you were/conversation/WhatsApp Image 2026-11-20 at 6.48.04 PM.jpeg"
    }
];

async function loadLetters() {
    try {
        let r = await fetch('./boxes.json?v=' + Date.now());
        if (!r.ok) r = await fetch('./sample-data.json?v=' + Date.now());
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        lettersData = data.boxes || [];
    } catch (e) {
        lettersData = [];
    }
}

async function loadLyrics() {
    try {
        const r = await fetch('./lyrics.json?v=' + Date.now());
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        lyricsData = data.lyrics || [];
    } catch (e) {
        lyricsData = [];
    }
}

async function loadThings() {
    try {
        const r = await fetch('./things.json?v=' + Date.now());
        if (!r.ok) throw new Error('none');
        const data = await r.json();
        thingsData = data.contributors || [];
    } catch (e) {
        thingsData = [];
    }
}

async function loadIfYouWere() {
    try {
        const r = await fetch('./ifyouwereas.json?v=' + Date.now());
        if (r.ok) {
            const data = await r.json();
            if (data.entries && data.entries.length && data.entries[0].assignments && data.entries[0].assignments.length) {
                ifyouwereData = data.entries;
                return;
            }
        }
    } catch (e) {
        console.warn('Fallback to default ifyouwere list', e);
    }
    ifyouwereData = [{ assignments: defaultIfYouWereAssignments }];
}

async function loadReceipts() {
    try {
        const r = await fetch('./receipts.json?v=' + Date.now());
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
    playBgMusicIfAllowed();
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
    
    // Strict queue: Row 1 = Mom, Naina, Ankita | Row 2 = Rudra, Rishi, Atharva
    // Papa's letter is completely removed from this normal queue and featured in the special tribute!
    const targetOrder = ['Mummy', 'Naina', 'Ankita', 'Rudra', 'Rishi', 'Atharva'];
    const idMap = { 'Mummy': 'box_002', 'Naina': 'box_003', 'Ankita': 'box_004', 'Rudra': 'box_005', 'Rishi': 'box_006', 'Atharva': 'box_007' };
    const displayLetters = [];
    
    targetOrder.forEach(name => {
        const found = lettersData.find(l => l.sender === name || l.id === idMap[name] || (name === 'Mummy' && (l.sender === 'Mom' || l.sender === 'Your Mom')));
        if (found) displayLetters.push(found);
    });

    if (!displayLetters.length) {
        const fallback = lettersData.filter(l => l.sender !== 'Papa' && l.id !== 'box_001');
        if (fallback.length) {
            displayLetters.push(...fallback);
        } else {
            grid.innerHTML = emptyState('💌', 'Letters are on their way…', 'Check back soon.');
            return;
        }
    }

    displayLetters.forEach((letter, i) => {
        const card = document.createElement('div');
        card.className = 'letter-card';
        card.style.animationDelay = `${i * 0.07}s`;
        const color   = letter.theme?.coverColor || '#F3E9D8';
        const sticker = letter.theme?.sticker     || '💌';
        const isRudraSafe = (letter.sender === 'Rudra' || letter.id === 'box_005') && isSafeMode;
        let preview = (letter.message || '').substring(0, 95);
        let relationship = letter.relationship;

        // Safe mode override for Rudra
        if (isRudraSafe) {
            preview = 'happy birthday darpita hope you achieve everything that you want!!';
            relationship = '';
        }

        // Thumbnail priority: letter.thumbnail -> first photo in letter.photos -> fallback sticker
        let thumbUrl = letter.thumbnail || (letter.photos && letter.photos.length > 0 ? letter.photos[0] : null);

        // Safe mode override for Rudra
        if (isRudraSafe) {
            thumbUrl = 'pics/rudra/WhatsApp Image 2026-11-20 at 8.17.48 PM.jpeg';
        }

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
                ${relationship ? `<div class="letter-relationship">${esc(relationship)}</div>` : ''}
                <div class="letter-preview">${esc(preview)}…</div>
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
    // Flatten all items across contributors into individual cards
    const allItems = [];
    thingsData.forEach(contributor => {
        (contributor.items || []).forEach(item => allItems.push(item));
    });
    allItems.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'things-card';
        card.style.animationDelay = `${i * 0.08}s`;
        card.innerHTML = `
            <span class="thing-emoji">${item.emoji || '✦'}</span>
            <div class="thing-name">${esc(item.name)}</div>
            ${item.reason ? `<div class="thing-reason">${esc(item.reason)}</div>` : ''}
        `;
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
    
    // Gather all assignments from entries, with guaranteed fallback
    let allAssignments = [];
    if (ifyouwereData && ifyouwereData.length) {
        ifyouwereData.forEach(entry => {
            if (entry.assignments) allAssignments.push(...entry.assignments);
        });
    }
    if (!allAssignments.length) {
        allAssignments = defaultIfYouWereAssignments;
    }

    allAssignments.forEach((a, i) => {
        const card = document.createElement('div');
        card.className = 'ifyouwere-card';
        card.style.animationDelay = `${i * 0.06}s`;

        const imgPath = a.image || '';
        const safeImgUrl = imgPath.includes('%20') ? imgPath : encodeURI(imgPath);
        const imgBoxHtml = imgPath
            ? `<div class="ifyouwere-img-box" onclick="openLightbox('${safeImgUrl}', 'If you were ${esc(a.category)} → ${esc(a.answer)}')">
                <img src="${safeImgUrl}" alt="${esc(a.answer)}" loading="lazy">
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

function openLetterModalById(id) {
    const letter = lettersData.find(l => l.id === id);
    if (letter) openLetterModal(letter);
}

function openLetterModal(letter) {
    const isPapa = (letter.sender === 'Papa' || letter.id === 'box_001');
    const modalBox = document.querySelector('.modal-box');
    if (modalBox) {
        if (isPapa) {
            modalBox.classList.add('is-papa-modal');
        } else {
            modalBox.classList.remove('is-papa-modal');
        }
    }

    // Only show the photos gallery inside the modal if the contributor has MULTIPLE photos!
    let hasMultiplePhotos = letter.photos && letter.photos.length > 1;

    // Safe mode override for Rudra: all media should disappear when clicked!
    if ((letter.sender === 'Rudra' || letter.id === 'box_005') && isSafeMode) {
        hasMultiplePhotos = false;
        photosHtml = '';
    }

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

    let contentHtml = '';

    if (isPapa) {
        const poemHtml = letter.poem
            ? `<div class="papa-poem-container">
                   <div class="papa-poem-banner">✦ A Father's Eternal Blessing ✦</div>
                   <div class="papa-poem-text">${esc(letter.poem)}</div>
               </div>`
            : '';

        contentHtml = `
            <div class="papa-modal-header">
                <div class="papa-celestial-badge">
                    <span class="badge-icon">🕊️</span>
                    <span>WRITTEN FROM THE STARS · FOREVER WITH YOU</span>
                </div>
                <div class="modal-sender papa-title">Papa 💙</div>
                <div class="modal-relationship papa-subtitle">Always in your heart, every single step</div>
            </div>

            <div class="papa-letter-body">
                <p class="papa-opening">Nannu beta,<br><strong>Janmadin bohot bohot mubarak ho meri bachi. ❤️</strong></p>
                
                <div class="papa-quote-callout">
                    <span class="papa-star-glyph">✦</span>
                    <p class="papa-quote-line">“Main dekh raha hoon tujhe. Har ek pal, har ek kadam pe main bilkul tere saath hoon. Kabhi yeh mat sochna ki Papa door hain—main tere aas-paas hi hoon, teri har muskaan mein, teri har himmat mein, aur tere aage aane wali har ek rukawat aur mushkil ko hatane ke liye.”</p>
                </div>

                <p class="papa-main-paragraph">Mujhe tujhpar bohot, bohot zyada garv hai meri gudiya. Tu kitni samajhdar, kitni bahadur aur kitni shaandar beti ban rahi hai. Zindagi mein jo bhi tu karna chahti hai, bina dare aage badhna. Mujhe tujhpar poora vishwas hai, aur main chahta hoon ki tu bhi khudpar utna hi vishwas rakhe. Tu har cheez sambhal legi, aur bohot aage jayegi.</p>

                <div class="papa-rules-box">
                    <div class="rules-header">✨ Papa's Essential Instructions:</div>
                    <ul class="rules-list">
                        <li><strong>Mummy ko zyada satana mat!</strong> Unka dhyaan rakhna, unko hamesha khush rakhna.</li>
                        <li><strong>Naina ka dhyaan rakhna</strong>, uski taakat banke rehna.</li>
                        <li><strong>Aur in sabse bhi zaroori—apna khudka dhyaan rakhna.</strong> Khana time pe khana, khush rehna, aur hamesha aise hi chamakna.</li>
                    </ul>
                </div>

                <p class="papa-closing-paragraph">Mera aashirwad aur mera dher saara pyaar hamesha, har pal tere saath hai. Tu meri sabse badi khushi hai.</p>

                <div class="papa-signoff-row">
                    <span class="papa-signoff-lead">Hamesha tera,</span>
                    <span class="papa-signoff-name">Papa 💙</span>
                </div>

                ${poemHtml}
                ${photosHtml}

                <div class="papa-bottom-disclaimer">
                    <span class="disclaimer-heart">🕊️</span>
                    <span>Told you you weren't ready. Now go give Mummy & Naina a huge hug.</span>
                </div>
            </div>
        `;
    } else {
        const isRudraSafe = (letter.sender === 'Rudra' || letter.id === 'box_005') && isSafeMode;
        const poem = isRudraSafe ? '' : letter.poem;
        const relationship = isRudraSafe ? '' : letter.relationship;
        const poemHtml = poem
            ? `<div class="modal-poem">${esc(poem)}</div>` : '';
        contentHtml = `
            <div class="modal-sender">${esc(letter.sender || 'Someone Special')}</div>
            ${relationship ? `<div class="modal-relationship">${esc(relationship)}</div>` : ''}
            <p class="modal-message">${esc(isRudraSafe ? 'happy birthday darpita hope you achieve everything that you want!!' : letter.message || '')}</p>
            ${poemHtml}
            ${photosHtml}
        `;
    }

    document.getElementById('modalBody').innerHTML = contentHtml;
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

// ===========================
// SAFE MODE (SAFE WORD: VANILLA)
// ===========================

function toggleSafeMode() {
    isSafeMode = !isSafeMode;
    localStorage.setItem('darp_safe_mode', isSafeMode);
    updateSafeModeUI();
    renderLetters();
    showToast(isSafeMode ? 'vanilla · safe mode on 🛡️' : 'vanilla · safe mode off 🔓');
}

function updateSafeModeUI() {
    const widget = document.getElementById('safeModeWidget');
    const label = document.getElementById('safeLabel');
    if (!widget || !label) return;
    
    label.textContent = 'vanilla';
    if (isSafeMode) {
        widget.classList.add('is-active');
    } else {
        widget.classList.remove('is-active');
    }
}

function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

// ===========================
// BACKGROUND MUSIC
// ===========================

let bgAudio = null;
let isAudioPlaying = false;

function initBgMusic() {
    bgAudio = document.getElementById('bgAudio');
    if (!bgAudio) return;
    bgAudio.volume = 0.45;

    bgAudio.addEventListener('play', () => {
        isAudioPlaying = true;
        updateMusicUI();
    });
    bgAudio.addEventListener('pause', () => {
        isAudioPlaying = false;
        updateMusicUI();
    });

    const userMuted = localStorage.getItem('darp_music_muted') === 'true';

    if (!userMuted) {
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isAudioPlaying = true;
                updateMusicUI();
            }).catch(() => {
                updateMusicUI();
            });
        }
    }

    const startAudioOnFirstGesture = () => {
        playBgMusicIfAllowed();
        document.removeEventListener('click', startAudioOnFirstGesture);
        document.removeEventListener('keydown', startAudioOnFirstGesture);
        document.removeEventListener('touchstart', startAudioOnFirstGesture);
    };

    document.addEventListener('click', startAudioOnFirstGesture, { once: true });
    document.addEventListener('keydown', startAudioOnFirstGesture, { once: true });
    document.addEventListener('touchstart', startAudioOnFirstGesture, { once: true });

    updateMusicUI();
}

function playBgMusicIfAllowed() {
    if (!bgAudio) bgAudio = document.getElementById('bgAudio');
    if (!bgAudio) return;
    if (localStorage.getItem('darp_music_muted') === 'true') return;

    if (bgAudio.paused) {
        bgAudio.play().then(() => {
            isAudioPlaying = true;
            updateMusicUI();
        }).catch(() => {});
    }
}

function toggleMusic() {
    if (!bgAudio) bgAudio = document.getElementById('bgAudio');
    if (!bgAudio) return;

    if (bgAudio.paused) {
        bgAudio.play().then(() => {
            isAudioPlaying = true;
            localStorage.setItem('darp_music_muted', 'false');
            updateMusicUI();
            showToast('Music playing 🎵');
        }).catch(err => {
            console.error('Playback error:', err);
        });
    } else {
        bgAudio.pause();
        isAudioPlaying = false;
        localStorage.setItem('darp_music_muted', 'true');
        updateMusicUI();
        showToast('Music muted 🔇');
    }
}

function updateMusicUI() {
    const btn = document.getElementById('musicToggleBtn');
    const icon = document.getElementById('musicIcon');
    const label = document.getElementById('musicLabel');
    if (!btn || !icon || !label) return;

    if (bgAudio && !bgAudio.paused) {
        btn.classList.add('is-playing');
        icon.textContent = '🔊';
        label.textContent = 'music on';
    } else {
        btn.classList.remove('is-playing');
        icon.textContent = '🔇';
        label.textContent = 'music off';
    }
}

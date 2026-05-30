/* ==========================================================================
   VELOCE E-COMMERCE APPLICATION ENGINE
   State Management, UI Renderers, Cart Logic, and Interactive Flows
   ========================================================================== */

// --- Product Catalog Database ---
const PRODUCTS = [
    {
        id: 1,
        name: "Veloce Chrono Smartwatch",
        description: "Experience modern elegance on your wrist. Features a high-definition, ambient OLED watchface, comprehensive 24/7 biometric health tracking, stress metrics, and an incredible 14-day battery life. Water-resistant up to 50 meters.",
        category: "Electronics",
        price: 299,
        originalPrice: 349,
        rating: 4.8,
        reviewsCount: 124,
        colors: ["#0f172a", "#3b82f6", "#ef4444"], // Dark Slate, Bright Blue, Crimson
        sizes: ["40mm", "44mm"],
        stock: 12,
        imageUrl: "assets/smartwatch.png",
        isHot: true
    },
    {
        id: 2,
        name: "Veloce Studio Sound ANC Headphones",
        description: "Immerse yourself in pure high-fidelity sound. Industry-leading hybrid active noise cancellation (ANC) blocks out ambient noise, while custom 40mm dynamic drivers deliver punchy bass and crystalline trebles. 45 hours of playtime.",
        category: "Electronics",
        price: 199,
        originalPrice: 249,
        rating: 4.9,
        reviewsCount: 88,
        colors: ["#0f172a", "#d97706"], // Matte Black, Brushed Gold
        sizes: ["Standard"],
        stock: 8,
        imageUrl: "assets/headphones.png",
        isSale: true
    },
    {
        id: 3,
        name: "Veloce Urban Waterproof Backpack",
        description: "The ultimate daily commuter companion. Meticulously handcrafted from premium waterproof full-grain leather. Built with dedicated shockproof compartments for a 16\" laptop, built-in USB charging pass-through, and hidden passport security pocket.",
        category: "Accessories",
        price: 120,
        originalPrice: null,
        rating: 4.7,
        reviewsCount: 54,
        colors: ["#4b5563", "#1e293b"], // Charcoal Gray, Deep Navy
        sizes: ["Standard"],
        stock: 18,
        imageUrl: "assets/backpack.png",
        isHot: false
    },
    {
        id: 4,
        name: "Veloce Cyber Mechanical Keyboard",
        description: "Elevate your typing and gaming setup. Features responsive, hot-swappable linear yellow switches, sound-dampening foam layers, customized double-shot PBT keycaps, and brilliant custom per-key cyan RGB backlit animations.",
        category: "Electronics",
        price: 150,
        originalPrice: 180,
        rating: 4.9,
        reviewsCount: 42,
        colors: ["#4b5563", "#a855f7"], // Dark Base, Cyber Purple
        sizes: ["TKL Layout", "Full-Size"],
        stock: 5,
        imageUrl: "assets/keyboard.png",
        isHot: true
    },
    {
        id: 5,
        name: "Veloce Aero-Fit Athletic Sneakers",
        description: "Run on clouds. Engineered with breathable woven mesh upper, responsive energy-returning foam midsole, and durable high-grip carbon rubber soles. Tailored ergonomic design supports arches during long distances.",
        category: "Footwear",
        price: 85,
        originalPrice: 110,
        rating: 4.6,
        reviewsCount: 206,
        colors: ["#ffffff", "#ef4444", "#10b981"], // Vapor White, Flame Red, Emerald
        sizes: ["8", "9", "10", "11"],
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        isSale: true
    },
    {
        id: 6,
        name: "Veloce Minimalist Glass Infuser Tumbler",
        description: "Stay hydrated in ultimate aesthetic fashion. Hand-blown borosilicate double-wall insulated glass. Keeps beverage hot or cold for up to 6 hours. Includes a removable food-grade stainless steel tea and fruit infuser basket.",
        category: "Home & Living",
        price: 35,
        originalPrice: null,
        rating: 4.5,
        reviewsCount: 31,
        colors: ["#38bdf8", "#fb7185"], // Sky Blue, Coral Pink
        sizes: ["16oz", "24oz"],
        stock: 25,
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
        isHot: false
    }
];

// --- App State ---
let state = {
    cart: JSON.parse(localStorage.getItem('veloce_cart')) || [],
    promoApplied: JSON.parse(localStorage.getItem('veloce_promo')) || null,
    theme: localStorage.getItem('veloce_theme') || 'light',
    
    // Filters & Sorting state
    filters: {
        category: 'All',
        search: '',
        maxPrice: 350,
        sort: 'popularity'
    },
    
    // UI state
    activeProductDetailId: null,
    modalSelectedColor: null,
    modalSelectedSize: null,
    modalQuantity: 1,
    checkoutStep: 1
};

// --- Promo Codes ---
const PROMO_CODES = {
    "VELOCE20": 0.20, // 20% discount
    "SUMMER10": 0.10  // 10% discount
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initFilterControls();
    initCartDrawer();
    initProductDetailModal();
    initCheckoutFlow();
    initNavigationScroll();
    
    // Initial Render
    renderProducts();
    updateCartUI();
});

// ==========================================================================
// 1. THEME ENGINE (LIGHT / DARK SYSTEM)
// ==========================================================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Sync current state
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
    
    themeToggle.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('veloce_theme', state.theme);
        updateThemeIcon();
        showToast("Theme switched successfully!", "info");
    });
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Set matching icon inside theme-toggle SVG
    if (state.theme === 'dark') {
        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
        `;
    } else {
        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        `;
    }
}

// ==========================================================================
// 2. PRODUCTS GRID & FILTERS ENGINE
// ==========================================================================
function initFilterControls() {
    // Category Chips
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.filters.category = chip.dataset.category;
            renderProducts();
        });
    });
    
    // Live Search Bar
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.filters.search = e.target.value.trim().toLowerCase();
            renderProducts();
        });
    }
    
    // Price range slider
    const priceSlider = document.getElementById('price-slider');
    const priceVal = document.getElementById('price-val');
    if (priceSlider && priceVal) {
        priceSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            state.filters.maxPrice = val;
            priceVal.textContent = `$${val}`;
            renderProducts();
        });
    }
    
    // Sort Dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.filters.sort = e.target.value;
            renderProducts();
        });
    }
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    // Filter Products
    let filtered = PRODUCTS.filter(prod => {
        // Category check
        if (state.filters.category !== 'All' && prod.category !== state.filters.category) return false;
        
        // Search query check
        if (state.filters.search && !prod.name.toLowerCase().includes(state.filters.search) && !prod.description.toLowerCase().includes(state.filters.search)) return false;
        
        // Price limit check
        if (prod.price > state.filters.maxPrice) return false;
        
        return true;
    });
    
    // Sort Products
    filtered.sort((a, b) => {
        if (state.filters.sort === 'price-asc') {
            return a.price - b.price;
        } else if (state.filters.sort === 'price-desc') {
            return b.price - a.price;
        } else if (state.filters.sort === 'rating') {
            return b.rating - a.rating;
        } else {
            // Default: Popularity (amount of review count)
            return b.reviewsCount - a.reviewsCount;
        }
    });
    
    // Check if empty
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-products-found">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" stroke-linecap="round" stroke-linejoin="round" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h3>No Matching Products</h3>
                <p>Try refining your categories, query keywords, or expanding the price range slider.</p>
            </div>
        `;
        return;
    }
    
    // Render Products HTML
    grid.innerHTML = filtered.map(prod => {
        // Star review calculations
        const starsHTML = getStarsHTML(prod.rating);
        
        // Badges HTML
        let badgesHTML = '';
        if (prod.stock === 0) {
            badgesHTML = `<span class="product-badge badge-out">Sold Out</span>`;
        } else if (prod.isHot) {
            badgesHTML = `<span class="product-badge badge-hot">Hot</span>`;
        } else if (prod.isSale) {
            badgesHTML = `<span class="product-badge badge-sale">Sale</span>`;
        }
        
        // Price layout
        const hasDiscount = prod.originalPrice !== null;
        const priceBoxHTML = hasDiscount 
            ? `<span class="price-original">$${prod.originalPrice}</span>
               <span class="price-current price-discounted">$${prod.price}</span>`
            : `<span class="price-current">$${prod.price}</span>`;
            
        // Quick add buttons
        const actionBtnHTML = prod.stock > 0
            ? `<button class="btn-card-add" onclick="handleQuickAdd(${prod.id}, event)" aria-label="Add to cart">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                 </svg>
                 Add
               </button>`
            : `<button class="btn-card-add" disabled style="opacity: 0.6; cursor: not-allowed;">Out</button>`;

        return `
            <div class="product-card" data-id="${prod.id}">
                <div class="product-image-container" onclick="openProductDetailModal(${prod.id})">
                    <div class="product-badges">${badgesHTML}</div>
                    <img src="${prod.imageUrl}" alt="${prod.name}" loading="lazy">
                    <div class="quick-actions">
                        <button class="quick-btn" onclick="openProductDetailModal(${prod.id}); event.stopPropagation();" title="Quick View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-cat">${prod.category}</span>
                    <h3 class="product-title" onclick="openProductDetailModal(${prod.id})">${prod.name}</h3>
                    <div class="product-rating">
                        <div class="stars">${starsHTML}</div>
                        <span class="review-count">(${prod.reviewsCount})</span>
                    </div>
                    <div class="product-footer">
                        <div class="price-box">${priceBoxHTML}</div>
                        ${actionBtnHTML}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Helpers for rating stars SVG
function getStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += `
                <svg viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            `;
        } else if (i === fullStars + 1 && hasHalf) {
            // Half Star approximation using standard SVG fill
            stars += `
                <svg viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#halfStarGrad)"/>
                </svg>
            `;
        } else {
            stars += `
                <svg viewBox="0 0 24 24" style="color: hsl(0, 0%, 80%)">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            `;
        }
    }
    return stars;
}

// ==========================================================================
// 3. CART SYSTEM & LOCALSTORAGE STATE ENGINE
// ==========================================================================
function initCartDrawer() {
    const cartBtn = document.getElementById('cart-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerClose = document.getElementById('drawer-close');
    
    if (cartBtn && drawerBackdrop) {
        cartBtn.addEventListener('click', () => {
            drawerBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scrolling
        });
    }
    
    if (drawerClose && drawerBackdrop) {
        drawerClose.addEventListener('click', () => {
            drawerBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (drawerBackdrop) {
        drawerBackdrop.addEventListener('click', (e) => {
            if (e.target === drawerBackdrop) {
                drawerBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Coupon Code submission
    const applyPromoBtn = document.getElementById('btn-promo');
    const promoInput = document.getElementById('promo-input');
    if (applyPromoBtn && promoInput) {
        applyPromoBtn.addEventListener('click', () => {
            const code = promoInput.value.trim().toUpperCase();
            if (PROMO_CODES[code]) {
                state.promoApplied = { code, discount: PROMO_CODES[code] };
                localStorage.setItem('veloce_promo', JSON.stringify(state.promoApplied));
                updateCartUI();
                showToast(`Promo ${code} applied successfully!`, "success");
                promoInput.value = '';
            } else {
                showToast("Invalid promotional code.", "warning");
            }
        });
    }
}

// Quick Add Handler from Product Grid (uses default colors and sizes)
function handleQuickAdd(productId, event) {
    if (event) event.stopPropagation();
    
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    
    const defaultColor = prod.colors[0];
    const defaultSize = prod.sizes[0];
    
    addToCart(productId, 1, defaultColor, defaultSize);
    
    // Add dynamic animation to cart badge on addition
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2) translateY(-2px)';
        setTimeout(() => {
            cartBtn.style.transform = '';
        }, 300);
    }
}

// Deep Add Logic
function addToCart(productId, quantity, color, size) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    
    // Check total stock of this specific product already in the cart
    const existingTotalInCart = state.cart
        .filter(item => item.id === productId)
        .reduce((sum, item) => sum + item.quantity, 0);
        
    if (existingTotalInCart + quantity > prod.stock) {
        showToast(`Cannot add. Only ${prod.stock} items left in stock.`, "warning");
        return;
    }
    
    // Check if identical item (id, color, size) already exists
    const matchIndex = state.cart.findIndex(item => 
        item.id === productId && item.color === color && item.size === size
    );
    
    if (matchIndex > -1) {
        state.cart[matchIndex].quantity += quantity;
    } else {
        state.cart.push({
            id: productId,
            name: prod.name,
            price: prod.price,
            originalPrice: prod.originalPrice,
            imageUrl: prod.imageUrl,
            color: color,
            size: size,
            quantity: quantity,
            maxStock: prod.stock
        });
    }
    
    localStorage.setItem('veloce_cart', JSON.stringify(state.cart));
    updateCartUI();
    showToast(`Added ${quantity} x ${prod.name} to cart.`, "success");
}

function updateCartQuantity(index, delta) {
    const item = state.cart[index];
    if (!item) return;
    
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
        removeFromCart(index);
        return;
    }
    
    // Check matching product database stock
    const prod = PRODUCTS.find(p => p.id === item.id);
    const otherIdenticalInCart = state.cart
        .filter((cItem, cIdx) => cItem.id === item.id && cIdx !== index)
        .reduce((sum, cItem) => sum + cItem.quantity, 0);
        
    if (prod && (otherIdenticalInCart + newQty > prod.stock)) {
        showToast(`Sorry, only ${prod.stock} items in stock.`, "warning");
        return;
    }
    
    item.quantity = newQty;
    localStorage.setItem('veloce_cart', JSON.stringify(state.cart));
    updateCartUI();
}

function removeFromCart(index) {
    const item = state.cart[index];
    state.cart.splice(index, 1);
    localStorage.setItem('veloce_cart', JSON.stringify(state.cart));
    updateCartUI();
    if (item) showToast(`Removed ${item.name} from cart.`, "info");
}

function updateCartUI() {
    const cartBadge = document.getElementById('cart-badge');
    const drawerContent = document.getElementById('drawer-content');
    
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Header Badge Count
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
    
    // Check if cart is empty
    if (state.cart.length === 0) {
        drawerContent.innerHTML = `
            <div class="cart-empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <h3>Your Cart is Empty</h3>
                <p>Explore our premium items to fill your cart with stunning technology and custom items.</p>
            </div>
        `;
        
        // Hide/Show dynamic totals block in drawer
        document.getElementById('drawer-footer').style.display = 'none';
        return;
    }
    
    document.getElementById('drawer-footer').style.display = 'flex';
    
    // Render Items
    drawerContent.innerHTML = state.cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.imageUrl}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-meta">
                        Color: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${item.color}; margin-right:6px;"></span>
                        Size: ${item.size}
                    </span>
                    <span class="cart-item-price">$${item.price}</span>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-remove-btn" onclick="removeFromCart(${index})" title="Remove item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    <div class="qty-selector">
                        <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)" aria-label="Decrease quantity">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)" aria-label="Increase quantity">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Mathematical Computations
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;
    if (state.promoApplied) {
        discount = subtotal * state.promoApplied.discount;
        document.getElementById('discount-row').style.display = 'flex';
        document.getElementById('discount-label').textContent = `Discount (${state.promoApplied.code})`;
        document.getElementById('discount-val').textContent = `-$${discount.toFixed(2)}`;
    } else {
        document.getElementById('discount-row').style.display = 'none';
    }
    
    // Shipping: Free shipping over $150, else flat-rate $15
    const shipping = subtotal >= 150 ? 0 : 15;
    document.getElementById('shipping-val').textContent = shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`;
    
    // Tax estimation: 8%
    const tax = (subtotal - discount) * 0.08;
    document.getElementById('tax-val').textContent = `$${tax.toFixed(2)}`;
    
    const finalTotal = subtotal - discount + shipping + tax;
    document.getElementById('total-val').textContent = `$${finalTotal.toFixed(2)}`;
    document.getElementById('subtotal-val').textContent = `$${subtotal.toFixed(2)}`;
}

// ==========================================================================
// 4. PRODUCT DETAILS VIEW MODAL
// ==========================================================================
function initProductDetailModal() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    
    if (modalClose && modalBackdrop) {
        modalClose.addEventListener('click', () => {
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

function openProductDetailModal(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    
    state.activeProductDetailId = productId;
    state.modalSelectedColor = prod.colors[0];
    state.modalSelectedSize = prod.sizes[0];
    state.modalQuantity = 1;
    
    // Open Backdrop
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCard = document.getElementById('modal-card');
    
    // Setup modal card inner structure
    const starsHTML = getStarsHTML(prod.rating);
    const hasDiscount = prod.originalPrice !== null;
    const priceBoxHTML = hasDiscount 
        ? `<span class="price-original">$${prod.originalPrice}</span>
           <span class="price-current price-discounted">$${prod.price}</span>`
        : `<span class="price-current">$${prod.price}</span>`;
        
    // Color dots selector HTML
    const colorSelectHTML = prod.colors.map(col => `
        <span class="color-option ${col === state.modalSelectedColor ? 'active' : ''}" 
              style="background-color:${col}" 
              onclick="selectModalColor('${col}', this)">
        </span>
    `).join('');
    
    // Size box selector HTML
    const sizeSelectHTML = prod.sizes.map(sz => `
        <span class="size-option ${sz === state.modalSelectedSize ? 'active' : ''}" 
              onclick="selectModalSize('${sz}', this)">
            ${sz}
        </span>
    `).join('');
    
    modalCard.innerHTML = `
        <button class="modal-close" id="modal-close-dynamic" onclick="closeProductDetailModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <div class="product-detail-grid">
            <div class="modal-img-column">
                <img src="${prod.imageUrl}" alt="${prod.name}">
            </div>
            <div class="modal-info-column">
                <span class="modal-cat">${prod.category}</span>
                <h2 class="modal-title">${prod.name}</h2>
                <div class="modal-rating-line">
                    <div class="stars">${starsHTML}</div>
                    <span class="review-count">(${prod.reviewsCount} verified reviews)</span>
                </div>
                <p class="modal-desc">${prod.description}</p>
                
                <div class="selector-group">
                    <span class="selector-title">Select Color</span>
                    <div class="color-options">${colorSelectHTML}</div>
                </div>
                
                <div class="selector-group">
                    <span class="selector-title">Select Size / Specifications</span>
                    <div class="size-options">${sizeSelectHTML}</div>
                </div>
                
                <div class="modal-footer">
                    <div class="modal-price-box">
                        <span class="selector-title">Total Price</span>
                        <div class="price-box">${priceBoxHTML}</div>
                    </div>
                    <div class="modal-actions">
                        <div class="qty-selector">
                            <button class="qty-btn" onclick="updateModalQuantity(-1)" aria-label="Decrease quantity">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </button>
                            <span class="qty-val" id="modal-qty-val">1</span>
                            <button class="qty-btn" onclick="updateModalQuantity(1)" aria-label="Increase quantity">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                        <button class="btn-modal-add" onclick="handleAddFromModal()">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductDetailModal() {
    const modalBackdrop = document.getElementById('modal-backdrop');
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

function selectModalColor(col, element) {
    state.modalSelectedColor = col;
    const parent = element.parentElement;
    parent.querySelectorAll('.color-option').forEach(dot => dot.classList.remove('active'));
    element.classList.add('active');
}

function selectModalSize(sz, element) {
    state.modalSelectedSize = sz;
    const parent = element.parentElement;
    parent.querySelectorAll('.size-option').forEach(szBox => szBox.classList.remove('active'));
    element.classList.add('active');
}

function updateModalQuantity(delta) {
    const activeProd = PRODUCTS.find(p => p.id === state.activeProductDetailId);
    if (!activeProd) return;
    
    const nextQty = state.modalQuantity + delta;
    if (nextQty <= 0) return;
    
    if (nextQty > activeProd.stock) {
        showToast(`Only ${activeProd.stock} items currently in stock.`, "warning");
        return;
    }
    
    state.modalQuantity = nextQty;
    document.getElementById('modal-qty-val').textContent = nextQty;
}

function handleAddFromModal() {
    if (!state.activeProductDetailId) return;
    addToCart(state.activeProductDetailId, state.modalQuantity, state.modalSelectedColor, state.modalSelectedSize);
    closeProductDetailModal();
}

// ==========================================================================
// 5. SIMULATED CHECKOUT FLOW
// ==========================================================================
function initCheckoutFlow() {
    const checkoutBtn = document.getElementById('btn-checkout');
    const checkoutBackdrop = document.getElementById('checkout-backdrop');
    const checkoutClose = document.getElementById('checkout-close');
    
    if (checkoutBtn && checkoutBackdrop) {
        checkoutBtn.addEventListener('click', () => {
            // Close Cart drawer first
            document.getElementById('drawer-backdrop').classList.remove('active');
            
            // Initialize Checkout steps
            state.checkoutStep = 1;
            updateCheckoutStepUI();
            
            checkoutBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (checkoutClose && checkoutBackdrop) {
        checkoutClose.addEventListener('click', () => {
            checkoutBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

function updateCheckoutStepUI() {
    // Enable/Disable Form blocks
    document.querySelectorAll('.form-section').forEach((sect, idx) => {
        if (idx + 1 === state.checkoutStep) {
            sect.classList.add('active');
        } else {
            sect.classList.remove('active');
        }
    });
    
    // Updates Steps bar
    document.querySelectorAll('.checkout-step').forEach((step, idx) => {
        const stepNum = idx + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum === state.checkoutStep) {
            step.classList.add('active');
        } else if (stepNum < state.checkoutStep) {
            step.classList.add('completed');
        }
    });
    
    // Footer button display configurations
    const prevBtn = document.getElementById('btn-checkout-prev');
    const nextBtn = document.getElementById('btn-checkout-next');
    
    if (state.checkoutStep === 3) {
        // Success state hides standard buttons
        document.getElementById('checkout-footer').style.display = 'none';
        document.getElementById('checkout-close').style.display = 'none'; // Lock success
    } else {
        document.getElementById('checkout-footer').style.display = 'flex';
        document.getElementById('checkout-close').style.display = 'flex';
        
        prevBtn.style.display = state.checkoutStep === 1 ? 'none' : 'block';
        nextBtn.textContent = state.checkoutStep === 2 ? 'Place Order' : 'Next Step';
    }
}

function handleCheckoutPrev() {
    if (state.checkoutStep > 1) {
        state.checkoutStep--;
        updateCheckoutStepUI();
    }
}

function handleCheckoutNext() {
    // Validate Current Step Form inputs before proceeding
    if (state.checkoutStep === 1) {
        const name = document.getElementById('chk-name').value.trim();
        const email = document.getElementById('chk-email').value.trim();
        const address = document.getElementById('chk-address').value.trim();
        const zip = document.getElementById('chk-zip').value.trim();
        
        if (!name || !email || !address || !zip) {
            showToast("Please fill all shipping fields.", "warning");
            return;
        }
        
        if (!validateEmail(email)) {
            showToast("Please enter a valid email address.", "warning");
            return;
        }
        
        state.checkoutStep++;
        updateCheckoutStepUI();
    } else if (state.checkoutStep === 2) {
        const card = document.getElementById('chk-card').value.trim();
        const expiry = document.getElementById('chk-expiry').value.trim();
        const cvv = document.getElementById('chk-cvv').value.trim();
        
        if (!card || !expiry || !cvv) {
            showToast("Please fill out all payment details.", "warning");
            return;
        }
        
        // Simulating loading state for checkout
        const nextBtn = document.getElementById('btn-checkout-next');
        nextBtn.disabled = true;
        nextBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 1s infinite linear; width:18px; height:18px; stroke-width:3;">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg> Processing...
        `;
        
        // Add animated CSS spin
        if (!document.getElementById('spin-anim-style')) {
            const style = document.createElement('style');
            style.id = 'spin-anim-style';
            style.textContent = `
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            // Drains Cart state and resets coupon
            state.cart = [];
            state.promoApplied = null;
            localStorage.removeItem('veloce_cart');
            localStorage.removeItem('veloce_promo');
            
            // Advance to Success screen
            state.checkoutStep++;
            updateCheckoutStepUI();
            updateCartUI();
            
            // Reset input values
            document.querySelectorAll('.form-input').forEach(input => input.value = '');
            nextBtn.disabled = false;
        }, 1800);
    }
}

function closeCheckoutSuccess() {
    const checkoutBackdrop = document.getElementById('checkout-backdrop');
    checkoutBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================================================
// 6. FLOATING TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Choose icon based on type
    let iconSVG = '';
    if (type === 'success') {
        iconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    } else if (type === 'warning') {
        iconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>`;
    } else {
        iconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`;
    }
    
    toast.innerHTML = `
        <span class="toast-icon">${iconSVG}</span>
        <span class="toast-msg">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}

// ==========================================================================
// 7. RESPONSIVE NAVIGATION SCROLL SENSORS
// ==========================================================================
function initNavigationScroll() {
    let lastScroll = 0;
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 76) {
            header.className = 'header';
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll down
            header.className = 'header scroll-down';
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll up
            header.className = 'header scroll-up';
        }
        
        lastScroll = currentScroll;
    });
}

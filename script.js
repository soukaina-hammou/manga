/* ===========================
   PRODUCT DATA
   =========================== */
const products = [
  {
    id: 1,
    name: "Furisode Silk Kimono",
    category: "kimono",
    price: 389.99,
    oldPrice: 499.99,
    badge: "Sale",
    rating: 4.9,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
  },
  {
    id: 2,
    name: "Summer Cotton Yukata",
    category: "yukata",
    price: 89.99,
    oldPrice: null,
    badge: "New",
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1505842465776-3b4953ca4f44?w=400&q=80",
  },
  {
    id: 3,
    name: "Striped Hakama Set",
    category: "hakama",
    price: 259.99,
    oldPrice: 329.99,
    badge: "Sale",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1613489245102-8b53b8ac3092?w=400&q=80",
  },
  {
    id: 4,
    name: "Wooden Geta Sandals",
    category: "accessories",
    price: 64.99,
    oldPrice: null,
    badge: "Popular",
    rating: 4.6,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=400&q=80",
  },
  {
    id: 5,
    name: "Formal Tomesode Kimono",
    category: "kimono",
    price: 549.99,
    oldPrice: 699.99,
    badge: "Sale",
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&q=80",
  },
  {
    id: 6,
    name: "Floral Obi Belt",
    category: "accessories",
    price: 79.99,
    oldPrice: null,
    badge: "New",
    rating: 4.5,
    reviews: 213,
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&q=80",
  },
  {
    id: 7,
    name: "Indigo Yukata — Men's",
    category: "yukata",
    price: 94.99,
    oldPrice: 119.99,
    badge: "Sale",
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=400&q=80",
  },
  {
    id: 8,
    name: "Ceremonial Hakama",
    category: "hakama",
    price: 319.99,
    oldPrice: null,
    badge: "Premium",
    rating: 4.8,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1590253230532-a67f6bc61c9e?w=400&q=80",
  },
];

/* ===========================
   CART STATE
   =========================== */
let cart = [];

/* ===========================
   DOM ELEMENTS
   =========================== */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const productsGrid = document.getElementById("productsGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartFooter = document.getElementById("cartFooter");
const backToTop = document.getElementById("backToTop");
const toastContainer = document.getElementById("toastContainer");
const newsletterForm = document.getElementById("newsletterForm");
const testimonialTrack = document.getElementById("testimonialTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderDots = document.getElementById("sliderDots");

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

/* ===========================
   ACTIVE NAV LINK ON SCROLL
   =========================== */
const sections = document.querySelectorAll("section[id], header[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

/* ===========================
   MOBILE MENU
   =========================== */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

/* ===========================
   RENDER PRODUCTS
   =========================== */
function renderProducts(filter = "all") {
  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  productsGrid.innerHTML = filtered
    .map(
      (product, i) => `
    <div class="product-card" style="animation-delay: ${i * 0.1}s">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }
        <button class="product-wishlist" data-id="${product.id}" aria-label="Add to wishlist">♡</button>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars-small">${"★".repeat(Math.floor(product.rating))}${"☆".repeat(5 - Math.floor(product.rating))}</span>
          <span>(${product.reviews})</span>
        </div>
        <div class="product-bottom">
          <div class="product-price">
            $${product.price.toFixed(2)}
            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ""}
          </div>
          <button class="add-to-cart" data-id="${product.id}" aria-label="Add to cart">+</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // Re-bind add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });

  // Re-bind wishlist buttons
  document.querySelectorAll(".product-wishlist").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("liked");
      btn.textContent = btn.classList.contains("liked") ? "♥" : "♡";
      showToast(
        btn.classList.contains("liked")
          ? "❤️ Added to wishlist"
          : "💔 Removed from wishlist"
      );
    });
  });
}

/* ===========================
   PRODUCT FILTERS
   =========================== */
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

/* ===========================
   CART FUNCTIONS
   =========================== */
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  showToast(`✅ ${product.name} added to cart`);

  // Bump animation
  cartCount.classList.add("bump");
  setTimeout(() => cartCount.classList.remove("bump"), 300);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function updateQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  updateCart();
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <span>🛒</span>
        <p>Your cart is empty</p>
      </div>`;
    cartFooter.style.display = "none";
  } else {
    cartFooter.style.display = "block";
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
}

/* ===========================
   CART SIDEBAR TOGGLE
   =========================== */
function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartSidebar() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartSidebar);
cartOverlay.addEventListener("click", closeCartSidebar);

/* ===========================
   TESTIMONIALS SLIDER
   =========================== */
let currentSlide = 0;
let slidesPerView = 3;

function updateSlidesPerView() {
  if (window.innerWidth <= 768) slidesPerView = 1;
  else if (window.innerWidth <= 1024) slidesPerView = 2;
  else slidesPerView = 3;
}

function getTotalSlides() {
  return testimonialTrack.children.length;
}

function getMaxSlide() {
  return Math.max(0, getTotalSlides() - slidesPerView);
}

function updateSlider() {
  const slideWidth = 100 / slidesPerView;
  testimonialTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
  updateDots();
}

function createDots() {
  const total = getMaxSlide() + 1;
  sliderDots.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = `slider-dot ${i === currentSlide ? "active" : ""}`;
    dot.addEventListener("click", () => {
      currentSlide = i;
      updateSlider();
    });
    sliderDots.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll(".slider-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

prevBtn.addEventListener("click", () => {
  currentSlide = Math.max(0, currentSlide - 1);
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  currentSlide = Math.min(getMaxSlide(), currentSlide + 1);
  updateSlider();
});

window.addEventListener("resize", () => {
  updateSlidesPerView();
  currentSlide = Math.min(currentSlide, getMaxSlide());
  createDots();
  updateSlider();
});

/* ===========================
   COUNTDOWN TIMER
   =========================== */
function startCountdown() {
  // Set sale end date to 7 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  endDate.setHours(23, 59, 59, 0);

  function update() {
    const now = new Date();
    const diff = endDate - now;

    if (diff <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ===========================
   NEWSLETTER FORM
   =========================== */
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  if (email) {
    showToast("🎉 Arigatou! Check your inbox for 10% off your first order.");
    newsletterForm.reset();
  }
});

/* ===========================
   BACK TO TOP
   =========================== */
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===========================
   TOAST NOTIFICATIONS
   =========================== */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* ===========================
   SCROLL ANIMATIONS (Intersection Observer)
   =========================== */
function initAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

/* ===========================
   INIT
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  startCountdown();
  updateSlidesPerView();
  createDots();
  updateSlider();
  initAnimations();
});

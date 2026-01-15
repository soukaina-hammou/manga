// Dark Mode Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.documentElement;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
}

// Simple Cart Interaction
let cartCount = 0;
const cartBadge = document.querySelector('.cart-count');
const addButtons = document.querySelectorAll('.add-to-cart');

addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        cartBadge.innerText = cartCount;
        
        // Visual Feedback
        btn.innerText = "Added!";
        btn.style.backgroundColor = "#10b981";
        setTimeout(() => {
            btn.innerText = "Add to Cart";
            btn.style.backgroundColor = "";
        }, 1500);
    });
});

// Newsletter Form Simulation
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you! You've been subscribed for personalized offers.");
    e.target.reset();
});

// Sticky Header Transparency Logic
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    } else {
        navbar.style.boxShadow = "none";
    }
});
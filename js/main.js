// ========================================
// TechZol - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCustomCursor();
    initNavbar();
    initCarousel();
    initProductFilters();
    initContactForm();
    initAnimations();
});

// ========================================
// Custom Cursor
// ========================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    const cursorWave = document.createElement('div');
    cursorWave.className = 'cursor-wave';
    document.body.appendChild(cursorWave);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor wave position
        cursorWave.style.left = mouseX + 'px';
        cursorWave.style.top = mouseY + 'px';
    });
    
    // Smooth cursor movement
    function animate() {
        // Cursor follows mouse with delay
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Dot follows immediately
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursor.style.transform = 'translate(-50%, -50%)';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorDot.style.transform = 'translate(-50%, -50%)';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .product-card, .service-card, .location-card, .filter-btn, input, textarea');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        cursorWave.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';
        cursorWave.style.display = 'block';
    });
}

// ========================================
// Navigation
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// Carousel
// ========================================
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    
    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // Arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Start autoplay
    startAutoplay();
}

// ========================================
// Product Filters (Catalogo Page)
// ========================================
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-box input');
    const products = document.querySelectorAll('.product-card');
    
    if (filterBtns.length === 0) return;
    
    let currentCategory = 'all';
    let searchTerm = '';
    
    function filterProducts() {
        products.forEach(product => {
            const category = product.dataset.category;
            const name = product.querySelector('.product-name').textContent.toLowerCase();
            
            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            const matchesSearch = name.includes(searchTerm);
            
            if (matchesCategory && matchesSearch) {
                product.style.display = 'block';
                product.style.animation = 'fadeIn 0.5s ease';
            } else {
                product.style.display = 'none';
            }
        });
        
        // Show/hide no products message
        const visibleProducts = Array.from(products).filter(p => p.style.display !== 'none');
        const noProductsMsg = document.querySelector('.no-products');
        
        if (noProductsMsg) {
            noProductsMsg.style.display = visibleProducts.length === 0 ? 'block' : 'none';
        }
    }
    
    // Category filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterProducts();
        });
    });
    
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase();
            filterProducts();
        });
    }
}

// ========================================
// Contact Form
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('.btn-submit');
    const formMessage = form.querySelector('.form-message');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        // Validate
        if (!name || !email || !message) {
            showMessage('Por favor, complete todos los campos requeridos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, ingrese un correo electrónico válido.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Simulate form submission (in production, use EmailJS or backend)
        try {
            await simulateEmailSend({ name, email, phone, message });
            showMessage('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.', 'success');
            form.reset();
        } catch (error) {
            showMessage('Hubo un error al enviar el mensaje. Por favor, intente de nuevo.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensaje';
        }
    });
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    async function simulateEmailSend(data) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Email data:', data);
                // In production, integrate with EmailJS:
                // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                resolve({ success: true });
            }, 1500);
        });
    }
}

// ========================================
// Animations
// ========================================
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation class
    document.querySelectorAll('.service-card, .location-card, .product-card, .quality-section').forEach(el => {
        observer.observe(el);
    });
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


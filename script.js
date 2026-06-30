/**
 * AboutWay Portfolio Interactive Script
 * Handles scrolling header styles, language toggling, category filtering,
 * lightbox gallery previews, scroll-reveal anims, and responsive navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initializations
    setupNavbarScroll();
    setupLanguageToggle();
    setupHeroSlider();
    setupScrollReveal();
    setupLightbox();
    setupScrollToTop();
    
    // Bind functions to window context for inline HTML onclick handlers
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
    window.goToTop = goToTop;
    window.filterProjects = filterProjects;
    window.setLanguage = setLanguage;
});

// --- Scroll Styling for Navbar ---
function setupNavbarScroll() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// --- Navigation Toggle Mobile Menu ---
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    if (navLinks && toggleBtn) {
        navLinks.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    }
}

function closeMenu() {
    const navLinks = document.querySelector('.nav-links');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    if (navLinks && toggleBtn) {
        navLinks.classList.remove('active');
        toggleBtn.classList.remove('active');
    }
}

// --- Dual Language Support Control ---
function setupLanguageToggle() {
    // Default language is Indonesian (id) or from local storage preference
    const savedLang = localStorage.getItem('aboutway-lang') || 'id';
    setLanguage(savedLang);
}

function setLanguage(lang) {
    document.body.classList.remove('lang-en-active', 'lang-id-active');
    document.body.classList.add(`lang-${lang}-active`);
    
    // Update active state in toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    localStorage.setItem('aboutway-lang', lang);
}

// --- Automatic Hero Slider Transition ---
function setupHeroSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-image-slider .slide');
    const slideInterval = 4000; // 4 seconds interval

    function nextSlide() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }
}

// --- Project Categories Filtering Engine ---
function filterProjects(category) {
    // Highlight selected button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Check project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        // If "all" is selected or card fits the category string
        if (category === 'all' || cardCategory.split(' ').includes(category)) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });

    // Toggle company card header blocks (hide when they don't have active cards)
    const companyCards = document.querySelectorAll('.company-card');
    companyCards.forEach(company => {
        const visibleCards = company.querySelectorAll('.project-card:not(.hide)');
        if (visibleCards.length === 0) {
            company.style.display = 'none';
        } else {
            company.style.display = 'block';
        }
    });
}

// --- Image Lightbox Modal Overlay ---
function setupLightbox() {
    const galleryImages = document.querySelectorAll('.decode-gallery img, .project-image-wrapper img');
    
    // Create element structure
    let lightbox = document.querySelector('.lightbox-modal');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
            <img class="lightbox-content" src="" alt="High resolution preview">
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);
    }
    
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const src = img.getAttribute('src');
            const caption = img.getAttribute('title') || img.getAttribute('alt') || '';
            
            if (src) {
                lightboxImg.setAttribute('src', src);
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
            }
        });
    });
    
    // Dismiss lightbox on clicks
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose) {
            lightbox.classList.remove('active');
        }
    });
    
    // Escape key check
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
}

// --- Intersection Observer for Scroll reveals ---
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Trigger animation only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// --- Scroll to Top Button Control ---
function setupScrollToTop() {
    const topBtn = document.getElementById("scrollToTop");
    if (!topBtn) return;

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });
}

function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

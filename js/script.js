/**
 * GHSS Mittur - School Website JavaScript
 * Created by Thirunavukkarasu Thangaraj | 8144002155
 * Enhanced with smooth animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {

    // ===== LANGUAGE TOGGLE =====
    const savedLang = localStorage.getItem('ghss-lang') || 'tamil';
    setLanguage(savedLang);

    function setLanguage(lang) {
        document.body.classList.remove('lang-tamil', 'lang-english');
        document.body.classList.add('lang-' + lang);
        localStorage.setItem('ghss-lang', lang);
        updateLangButtons(lang);
    }

    function updateLangButtons(lang) {
        document.querySelectorAll('.lang-btn-ta').forEach(btn => {
            btn.classList.toggle('active', lang === 'tamil');
        });
        document.querySelectorAll('.lang-btn-en').forEach(btn => {
            btn.classList.toggle('active', lang === 'english');
        });
    }

    // Tamil button click
    document.querySelectorAll('.lang-btn-ta').forEach(btn => {
        btn.addEventListener('click', () => setLanguage('tamil'));
    });

    // English button click
    document.querySelectorAll('.lang-btn-en').forEach(btn => {
        btn.addEventListener('click', () => setLanguage('english'));
    });

    // ===== MOBILE MENU =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.modern-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (header) {
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Show/hide scroll to top button
        const scrollBtn = document.querySelector('.scroll-top');
        if (scrollBtn) {
            scrollBtn.classList.toggle('visible', currentScroll > 300);
        }

        lastScroll = currentScroll;
    });

    // ===== SCROLL TO TOP BUTTON =====
    if (!document.querySelector('.scroll-top')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== FADE IN ANIMATION (CSS-based, no JS hiding) =====
    // Content is visible by default - animations handled via CSS only

    // ===== SMOOTH ANCHOR SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ===== HERO SLIDER (for index page) =====
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    function startSlider() { slideInterval = setInterval(nextSlide, 4000); }
    function stopSlider() { clearInterval(slideInterval); }

    if (slides.length > 0) {
        if (nextBtn) {
            nextBtn.addEventListener('click', () => { stopSlider(); nextSlide(); startSlider(); });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { stopSlider(); prevSlide(); startSlider(); });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { stopSlider(); showSlide(i); startSlider(); });
        });

        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlider);
            slider.addEventListener('mouseleave', startSlider);

            // Touch support
            let touchStartX = 0;
            slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
            slider.addEventListener('touchend', e => {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                    stopSlider();
                    diff > 0 ? nextSlide() : prevSlide();
                    startSlider();
                }
            }, { passive: true });
        }

        startSlider();
    }

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        if (slides.length > 0) {
            if (e.key === 'ArrowLeft') { stopSlider(); prevSlide(); startSlider(); }
            if (e.key === 'ArrowRight') { stopSlider(); nextSlide(); startSlider(); }
        }
    });

    // ===== WINDOW RESIZE =====
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navMenu) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.innerHTML = '☰';
        }
    });

    // ===== ADD LOADED CLASS =====
    document.body.classList.add('loaded');

    // ===== CONSOLE MESSAGE =====
    console.log('%c GHSS Mittur ', 'background: linear-gradient(135deg, #1a5f7a, #57c5b6); color: white; padding: 12px 24px; font-size: 18px; font-weight: bold; border-radius: 8px;');
    console.log('%c Website by Thirunavukkarasu Thangaraj | 8144002155 ', 'color: #1a5f7a; font-size: 14px; font-weight: bold;');
    console.log('%c https://mitturschool.in ', 'color: #57c5b6; font-size: 12px;');
});

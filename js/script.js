/**
 * GHSS Mittur - School Website JavaScript
 * Simple, clean functionality for community information website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle Functionality
    const langToggle = document.querySelector('.lang-toggle');
    const tamilBtn = document.querySelector('.lang-btn-ta');
    const englishBtn = document.querySelector('.lang-btn-en');

    // Get saved language preference or default to Tamil
    const savedLang = localStorage.getItem('preferredLanguage') || 'tamil';
    setLanguage(savedLang);

    function setLanguage(lang) {
        if (lang === 'tamil') {
            document.body.classList.remove('lang-english');
            document.body.classList.add('lang-tamil');
            if (tamilBtn) tamilBtn.classList.add('active');
            if (englishBtn) englishBtn.classList.remove('active');
        } else {
            document.body.classList.remove('lang-tamil');
            document.body.classList.add('lang-english');
            if (englishBtn) englishBtn.classList.add('active');
            if (tamilBtn) tamilBtn.classList.remove('active');
        }
        localStorage.setItem('preferredLanguage', lang);
    }

    if (tamilBtn) {
        tamilBtn.addEventListener('click', function() {
            setLanguage('tamil');
        });
    }

    if (englishBtn) {
        englishBtn.addEventListener('click', function() {
            setLanguage('english');
        });
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Update aria-expanded for accessibility
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Change hamburger icon to X when menu is open
            if (isExpanded) {
                menuToggle.innerHTML = '&#10005;'; // X symbol
            } else {
                menuToggle.innerHTML = '&#9776;'; // Hamburger symbol
            }
        });

        // Close menu when clicking on a link (mobile)
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    menuToggle.innerHTML = '&#9776;';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && menuToggle) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            const isClickOnLangToggle = langToggle && langToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && !isClickOnLangToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '&#9776;';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (header) {
            // Add shadow on scroll
            if (currentScroll > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }

        lastScroll = currentScroll;
    });

    // Add animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.card, .info-box, .event-item, .contact-card');
    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav) {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '&#9776;';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Print functionality (if needed)
    window.printPage = function() {
        window.print();
    };

    // Console message for developers
    console.log('GHSS Mittur - Community Information Website');
    console.log('This website is created by volunteers for the village community.');

    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds

    function showSlide(index) {
        // Handle wrap around
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Update slides
        slides.forEach(function(slide, i) {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update dots
        dots.forEach(function(dot, i) {
            dot.classList.remove('active');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Only initialize slider if elements exist
    if (slides.length > 0) {
        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopSlider();
                nextSlide();
                startSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopSlider();
                prevSlide();
                startSlider();
            });
        }

        // Event listeners for dots
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                stopSlider();
                showSlide(index);
                startSlider();
            });
        });

        // Pause slider on hover
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }

        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            sliderContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                stopSlider();
                if (diff > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
                startSlider();
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                stopSlider();
                prevSlide();
                startSlider();
            } else if (e.key === 'ArrowRight') {
                stopSlider();
                nextSlide();
                startSlider();
            }
        });

        // Start automatic sliding
        startSlider();
    }
});

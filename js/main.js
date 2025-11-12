// ===========================
// Mobile Navigation Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // ===========================
    // Enhanced Navbar on Scroll
    // ===========================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===========================
    // Carousel Functionality - Enhanced
    // ===========================
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (carouselSlides.length > 0) {
        let currentSlide = 0;
        let autoplayInterval;
        let isTransitioning = false;
        
        // Create dots with animation
        carouselSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (!isTransitioning) {
                    goToSlide(index);
                }
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        // Show specific slide with smooth transition
        function goToSlide(n) {
            if (isTransitioning) return;
            isTransitioning = true;
            
            carouselSlides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (n + carouselSlides.length) % carouselSlides.length;
            
            carouselSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            setTimeout(() => {
                isTransitioning = false;
            }, 1500);
            
            resetAutoplay();
        }
        
        // Next slide
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        // Previous slide
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Autoplay with smoother timing
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 6000); // 6 seconds for more elegant pacing
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Enhanced Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        const carouselContainer = document.querySelector('.carousel-container');
        
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });
            
            carouselContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                touchEndY = e.changedTouches[0].screenY;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const horizontalDiff = touchEndX - touchStartX;
                const verticalDiff = Math.abs(touchEndY - touchStartY);
                
                // Only trigger if horizontal swipe is more significant than vertical
                if (verticalDiff < 100) {
                    if (horizontalDiff < -swipeThreshold) {
                        nextSlide();
                    }
                    
                    if (horizontalDiff > swipeThreshold) {
                        prevSlide();
                    }
                }
            }
            
            // Pause autoplay on hover (desktop only)
            if (window.matchMedia('(min-width: 768px)').matches) {
                carouselContainer.addEventListener('mouseenter', stopAutoplay);
                carouselContainer.addEventListener('mouseleave', startAutoplay);
            }
        }
        
        // Start autoplay
        startAutoplay();
    }
    
    // ===========================
    // Smooth Scroll Enhancement
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===========================
    // Advanced Scroll Reveal Animations
    // ===========================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Add staggered animation to cards
    const animatedElements = document.querySelectorAll(
        '.schedule-card, .location-card, .hotel-card, .accommodation-card, .info-card, .direction-card, .location-detail-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // ===========================
    // Parallax Effect for Decorative Elements
    // ===========================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.page-header::before, .page-header::after');
        
        // Subtle parallax effect
        document.querySelectorAll('.page-header').forEach(element => {
            const speed = 0.5;
            element.style.backgroundPosition = `center ${scrolled * speed}px`;
        });
    });
    
    // ===========================
    // Button Hover Effects Enhancement
    // ===========================
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentElement) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // ===========================
    // RSVP & Booking Button Alerts
    // ===========================
    const rsvpBtn = document.getElementById('rsvpBtn');
    const bookingBtn = document.getElementById('bookingBtn');
    
    function showCustomAlert(message) {
        // Create custom alert overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            background: linear-gradient(135deg, #fff, #FFF8F0);
            padding: 2.5rem;
            border-radius: 25px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            text-align: center;
            animation: slideUp 0.3s ease;
            border: 2px solid #F4C2C2;
        `;
        
        alertBox.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">✦</div>
            <p style="font-family: 'Montserrat', sans-serif; color: #4A4E69; font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">${message}</p>
            <button style="
                background: linear-gradient(135deg, #F4C2C2, #C9A66B);
                color: white;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 50px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                D'accord
            </button>
        `;
        
        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Close on button click or overlay click
        const closeAlert = () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                overlay.remove();
                style.remove();
            }, 300);
        };
        
        alertBox.querySelector('button').addEventListener('click', closeAlert);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeAlert();
        });
        
        // Add fadeOut animation
        style.textContent += `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
    }
    
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
                e.preventDefault();
                showCustomAlert('Le lien vers le formulaire RSVP sera disponible prochainement. ✦');
            }
        });
    }
    
    if (bookingBtn) {
        bookingBtn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
                e.preventDefault();
                showCustomAlert('Le lien vers le formulaire de réservation sera disponible prochainement. ✦');
            }
        });
    }
    
    // ===========================
    // Add Loading Animation
    // ===========================
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===========================
    // Elegant Page Title Animation
    // ===========================
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.opacity = '1';
        
        // Split into characters and animate
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.05}s`;
            mainTitle.appendChild(span);
        });
        
        // Add character animation
        const charStyle = document.createElement('style');
        charStyle.textContent = `
            @keyframes fadeInChar {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(charStyle);
    }
});

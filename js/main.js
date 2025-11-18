document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    
    // ---------------------------
    // Navigation interactions
    // ---------------------------
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        
        document.addEventListener('click', (event) => {
            const isInsideNav = navMenu.contains(event.target);
            const isToggle = navToggle.contains(event.target);

            if (!isInsideNav && !isToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    const handleNavbarState = () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    handleNavbarState();
    window.addEventListener('scroll', handleNavbarState);

    // ---------------------------
    // Smooth anchor navigation
    // ---------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

                const target = document.querySelector(href);
                if (target) {
                event.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 96;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
            }
        });
    });
    
    // ---------------------------
    // Countdown timer
    // ---------------------------
    const countdown = document.getElementById('countdown');
    const daysUntilSpan = document.getElementById('days-until');
    if (countdown) {
        const targetDate = new Date('2026-07-04T14:00:00'); // 4 juillet 2026, 14h00
        const unitNodes = {
            days: countdown.querySelector('[data-unit="days"]'),
            hours: countdown.querySelector('[data-unit="hours"]'),
            minutes: countdown.querySelector('[data-unit="minutes"]'),
            seconds: countdown.querySelector('[data-unit="seconds"]')
        };

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                if (unitNodes.days) unitNodes.days.textContent = '00';
                if (unitNodes.hours) unitNodes.hours.textContent = '00';
                if (unitNodes.minutes) unitNodes.minutes.textContent = '00';
                if (unitNodes.seconds) unitNodes.seconds.textContent = '00';
                if (daysUntilSpan) daysUntilSpan.textContent = '0';
                clearInterval(intervalId);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (unitNodes.days) unitNodes.days.textContent = String(days).padStart(2, '0');
            if (unitNodes.hours) unitNodes.hours.textContent = String(hours).padStart(2, '0');
            if (unitNodes.minutes) unitNodes.minutes.textContent = String(minutes).padStart(2, '0');
            if (unitNodes.seconds) unitNodes.seconds.textContent = String(seconds).padStart(2, '0');
            if (daysUntilSpan) daysUntilSpan.textContent = days;
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
    }

    // ---------------------------
    // Reveal animations
    // ---------------------------
    const animatedElements = document.querySelectorAll('.info-card, .location-card, .highlight-card, .experience-card, .programme-step');
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px 20px 0px'
            }
        );

        animatedElements.forEach((element, index) => {
            element.classList.add('animate-hidden');
            element.style.setProperty('--reveal-delay', `${index * 40}ms`);
            observer.observe(element);
        });
    }

    // ---------------------------
    // Placeholder alerts
    // ---------------------------
    const rsvpBtn = document.getElementById('rsvpBtn');
    const bookingBtn = document.getElementById('bookingBtn');
    
    const showDialog = (message) => {
        const overlay = document.createElement('div');
        overlay.className = 'dialog-overlay';
        overlay.innerHTML = `
            <div class="dialog-card">
                <p>${message}</p>
                <button type="button" class="dialog-close">D'accord</button>
            </div>
        `;

        document.body.appendChild(overlay);
        
        const close = () => {
            overlay.classList.add('closing');
            setTimeout(() => overlay.remove(), 250);
        };

        overlay.querySelector('.dialog-close').addEventListener('click', close);
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                close();
            }
        });
    };

    const placeholderHandler = (event, message) => {
        const href = event.currentTarget.getAttribute('href');
        if (!href || href === '#') {
            event.preventDefault();
            showDialog(message);
        }
    };
    
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', (event) => {
            placeholderHandler(event, 'Le formulaire RSVP arrive très bientôt. Laissez-nous un petit mot si vous avez des questions. ✦');
        });
    }
    
    if (bookingBtn) {
        bookingBtn.addEventListener('click', (event) => {
            placeholderHandler(event, 'Les réservations d\'hébergement ouvriront prochainement. Nous vous tiendrons informés par e-mail. ✦');
        });
    }

    // ---------------------------
    // Carousel functionality
    // ---------------------------
    const carousel = document.getElementById('carouselSlides');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;

        const showSlide = (index) => {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));

            // Add active class to current slide
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        const goToSlide = (index) => {
            currentSlide = index;
            showSlide(currentSlide);
        };

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (carousel.closest('section') && isElementInViewport(carousel)) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            }
        });

        // Auto-play (optional - commented out by default)
        // const autoPlayInterval = setInterval(nextSlide, 5000);
        // carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    }

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});

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
    if (countdown) {
        const targetDate = new Date('2026-07-04T11:00:00'); // 4 juillet 2026, 11h00
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
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);
    }

    // ---------------------------
    // Reveal animations
    // ---------------------------
    const animatedElements = document.querySelectorAll('.info-card, .location-card, .highlight-card, .hero-card, .experience-card, .programme-step');
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
    // Hero card interactions
    // ---------------------------
    const heroCards = document.querySelectorAll('.hero-card');
    if (heroCards.length > 0) {
        heroCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove active class from all cards
                heroCards.forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                card.classList.add('active');
            });
        });

        // Click outside to reset
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.hero-card')) {
                heroCards.forEach(c => c.classList.remove('active'));
            }
        });
    }
});

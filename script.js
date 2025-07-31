// Navigation fluide
document.addEventListener('DOMContentLoaded', function() {
    // Navigation fluide vers les sections
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mettre à jour l'état actif
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');
            
            // Fermer le menu mobile si ouvert
            const nav = document.querySelector('.nav');
            if (nav && nav.classList.contains('mobile-nav-open')) {
                nav.classList.remove('mobile-nav-open');
                console.log('Mobile menu closed after navigation');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 70;
                const extraOffset = 0;
                
                // Modern native scroll with proper offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - extraOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.classList.add('scroll-visible');
                entry.target.classList.remove('scroll-hidden');
            }
        });
    }, observerOptions);
    
    // Éléments à animer - pricing-card retiré pour de meilleures performances
    const animatedElements = document.querySelectorAll('.avantage-card, .temoignage-card, .coach-info');
    animatedElements.forEach(el => {
        el.classList.add('scroll-hidden');
        observer.observe(el);
    });
    
    // Détection automatique de la section active
    const sections = document.querySelectorAll('section[id]');
    const navLinksForActive = document.querySelectorAll('.nav-link[href^="#"]');
    
    const activeObserverOptions = {
        threshold: 0.5,
        rootMargin: '-80px 0px -60% 0px'
    };
    
    const activeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Mettre à jour l'état actif
                navLinksForActive.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, activeObserverOptions);
    
    // Observer toutes les sections
    sections.forEach(section => {
        activeObserver.observe(section);
    });
    
    // Définir l'état actif initial (première section visible)
    if (navLinksForActive.length > 0) {
        navLinksForActive[0].classList.add('active');
    }
    
    // Effet sur le bouton d'achat - Animation pulse désactivée pour de meilleures performances
    const buyButton = document.getElementById('buy-button');
    if (buyButton) {
        // Pulse animation removed for better performance
        
        // Analytics et tracking (simulé)
        buyButton.addEventListener('click', function(e) {
            // Ici vous pourriez ajouter du tracking analytics
            console.log('Bouton d\'achat cliqué');
            
            // Optionnel : confirmation avant redirection
            const confirmPurchase = confirm('Vous allez être redirigé vers la page de paiement sécurisée. Continuer ?');
            if (!confirmPurchase) {
                e.preventDefault();
                return false;
            }
            
            // Le lien href se charge naturellement de la redirection
        });
    }
    
    // Effet parallaxe optimisé avec requestAnimationFrame
    let parallaxTicking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        parallaxTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            requestAnimationFrame(updateParallax);
            parallaxTicking = true;
        }
    }, { passive: true });
    
    // Gestion du menu mobile (responsive)
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        const headerContent = header.querySelector('.header-content');
        
        // Créer le bouton hamburger si écran mobile
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-label', 'Menu mobile');
            
            // Ajuster le header-content pour le positionnement
            headerContent.style.position = 'relative';
            headerContent.appendChild(mobileMenuBtn);
            
            mobileMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                nav.classList.toggle('mobile-nav-open');
                console.log('Menu button clicked, nav open:', nav.classList.contains('mobile-nav-open'));
            });
            
            // Styles pour le menu mobile
            if (!document.querySelector('#mobile-nav-styles')) {
                const mobileStyles = document.createElement('style');
                mobileStyles.id = 'mobile-nav-styles';
                mobileStyles.textContent = `
                    @media (max-width: 768px) {
                        .header-content {
                            flex-direction: row !important;
                            justify-content: space-between !important;
                            align-items: center !important;
                        }
                        .nav {
                            position: absolute;
                            top: 100%;
                            left: 0;
                            right: 0;
                            background-color: white;
                            flex-direction: column;
                            box-shadow: var(--shadow);
                            display: none !important;
                            padding: 20px;
                            border-radius: 0 0 12px 12px;
                            z-index: 20;
                            opacity: 0;
                            transform: translateY(-10px);
                            transition: opacity 0.2s ease, transform 0.2s ease;
                        }
                        .nav.mobile-nav-open {
                            display: flex !important;
                            opacity: 1;
                            transform: translateY(0);
                        }
                        .mobile-menu-btn {
                            display: block !important;
                            background: none;
                            border: none;
                            font-size: 24px;
                            color: var(--dark-color);
                            cursor: pointer;
                            padding: 8px;
                            position: absolute;
                            top: 50%;
                            right: 0;
                            transform: translateY(-50%);
                            z-index: 10;
                        }
                    }
                `;
                document.head.appendChild(mobileStyles);
            }
            
            // Fermer le menu en cliquant en dehors
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    nav.classList.remove('mobile-nav-open');
                }
            });
        }
    }
    
    // Initialiser le menu mobile
    createMobileMenu();
    
    // Clean, modern scroll behavior using native browser APIs
    
    // Statistiques en temps réel (simulation)
    function updateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            const number = parseInt(originalText);
            
            if (!isNaN(number)) {
                // Animation du compteur optimisée
                let startTime = null;
                const duration = 800; // Durée de l'animation en ms
                
                function animateCount(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    
                    // Easing function pour une animation plus naturelle
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentNumber = Math.floor(number * easeOutQuart);
                    
                    stat.textContent = currentNumber + originalText.replace(number.toString(), '');
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateCount);
                    } else {
                        stat.textContent = originalText;
                    }
                }
                
                requestAnimationFrame(animateCount);
            }
        });
    }
    
    // Déclencher l'animation des stats quand la section hero est visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStats();
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        
        heroObserver.observe(heroSection);
    }
    
    // Gestion des formulaires de contact (si ajoutés plus tard)
    const contactForms = document.querySelectorAll('form[data-contact]');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simulation d'envoi
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message envoyé !';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1000);
            }
        });
    });
    
    // Optimisation des performances - Debounce pour certains événements
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimiser le redimensionnement
    const optimizedResize = debounce(() => {
        if (window.innerWidth > 768) {
            const nav = document.querySelector('.nav');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            const headerContent = document.querySelector('.header-content');
            
            if (nav) {
                nav.classList.remove('mobile-nav-open');
                nav.style.display = ''; // Reset display
            }
            if (mobileBtn) mobileBtn.remove();
            if (headerContent) headerContent.style.position = ''; // Reset position
        } else {
            createMobileMenu();
        }
    }, 150);
    
    window.addEventListener('resize', optimizedResize);
    
    // Préchargement des images importantes
    function preloadImages() {
        const importantImages = [
            // Ajoutez ici les URLs des vraies images quand elles seront disponibles
        ];
        
        importantImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Gestion des erreurs JavaScript
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
        // Ici vous pourriez envoyer l'erreur à un service de monitoring
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Temps de chargement:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
    
    // Accessibilité: gestion du focus au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    console.log('Script de la landing page Ludovic Teles chargé avec succès!');
});

// Fonction utilitaire pour le lazy loading (si nécessaire plus tard)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}


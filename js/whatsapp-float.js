/**
 * WhatsApp Floating Button
 * Optimized for mobile browsers with smooth scrolling
 */

(function() {
    'use strict';
    
    const WHATSAPP_LINK = 'https://chat.whatsapp.com/BU8nOM06jjnKmDOM2Uktty';
    const BUTTON_TEXT = 'Rejoignez-nous sur WhatsApp';
    
    // Create the button element
    function createButton() {
        const container = document.getElementById('whatsapp-container');
        if (!container) return;
        
        const button = document.createElement('a');
        button.href = WHATSAPP_LINK;
        button.className = 'whatsapp-float';
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.setAttribute('aria-label', 'Rejoindre le groupe WhatsApp');
        
        button.innerHTML = `
            <span class="whatsapp-icon">💬</span>
            <span class="whatsapp-text">${BUTTON_TEXT}</span>
        `;
        
        container.appendChild(button);
        
        // Apply mobile-specific fixes
        applyMobileFixes(button);
    }
    
    // Apply fixes for mobile browsers
    function applyMobileFixes(button) {
        // For iOS Safari and other mobile browsers
        let ticking = false;
        let lastScrollY = window.scrollY;
        
        // Use requestAnimationFrame for smooth updates
        function updatePosition() {
            if (ticking) {
                const currentScrollY = window.scrollY;
                
                // Only update if scroll changed significantly
                if (Math.abs(currentScrollY - lastScrollY) > 1) {
                    button.style.transform = 'translateZ(0)';
                    lastScrollY = currentScrollY;
                }
                
                ticking = false;
            }
        }
        
        // Optimize scroll event handling
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updatePosition);
                ticking = true;
            }
            
            // Add 'scrolling' class during scroll
            button.classList.add('scrolling');
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                button.classList.remove('scrolling');
            }, 150);
        }, { passive: true });
        
        // Handle orientation change
        window.addEventListener('orientationchange', function() {
            button.style.transform = 'translateZ(0)';
        });
        
        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                button.style.transform = 'translateZ(0)';
            }, 100);
        }, { passive: true });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createButton);
    } else {
        createButton();
    }
})();


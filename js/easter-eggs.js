// Easter Eggs for Wedding Website
// 1. Heart Click Counter - Click hero title 7 times
// 2. Party Mode - Type "PARTY" anywhere on the page

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Easter Egg 1: Heart Click Counter
    // ============================================
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        // Add pointer cursor to indicate clickability
        heroTitle.style.cursor = 'pointer';
        heroTitle.style.userSelect = 'none';
        
        heroTitle.addEventListener('click', (e) => {
            // Visual feedback: bounce animation
            heroTitle.style.transform = 'scale(1.05)';
            setTimeout(() => {
                heroTitle.style.transform = 'scale(1)';
            }, 150);
            
            // Trigger hearts on every click
            triggerHeartExplosion(e.clientX, e.clientY);
        });
    }

    function triggerHeartExplosion(x, y) {
        const heartCount = 45; // 3x more hearts!
        
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                createFloatingHeart(x, y);
            }, i * 15);
        }
    }

    function createFloatingHeart(startX, startY) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // Random variety of hearts
        const hearts = ['❤️', '💖', '💗', '💓', '💞', '💕', '💘', '💝', '💟', '💌'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Initial position (slight spread from click)
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        
        heart.style.left = (startX + offsetX) + 'px';
        heart.style.top = (startY + offsetY) + 'px';
        
        // Visual variation
        const size = 1 + Math.random() * 2; // 1rem to 3rem
        heart.style.fontSize = size + 'rem';
        
        // Physics variables for CSS animation
        const driftX = (Math.random() - 0.5) * 300 + 'px'; // Drift left or right
        const rotate = (Math.random() - 0.5) * 360 + 'deg'; // Random rotation
        
        // Pop direction (upwards burst)
        // Angle between 220 and 320 degrees (upwards cone)
        const angle = (Math.random() * 100 + 220) * (Math.PI / 180);
        const velocity = 80 + Math.random() * 150; 
        const popX = Math.cos(angle) * (velocity * 0.8) + 'px';
        const popY = Math.sin(angle) * velocity + 'px'; // Negative Y is up
        
        heart.style.setProperty('--x', driftX);
        heart.style.setProperty('--r', rotate);
        heart.style.setProperty('--x-pop', popX);
        heart.style.setProperty('--y-pop', popY);
        
        heart.style.animationDelay = '0s'; // Instant start
        heart.style.animationDuration = (1.5 + Math.random() * 1) + 's'; // Quicker fade out
        
        document.body.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // ============================================
    // Easter Egg 2: Party Mode
    // ============================================
    let typedKeys = [];
    const secretCode = 'PARTY';
    let partyMode = false;
    let partyAudio = null;
    let partyInterval = null;
    let animalInterval = null;

    // Party Parrot emojis - now stored locally!
    const dancingGifs = [
        'images/parrots/parrot.gif', // classic party parrot
        'images/parrots/fastparrot.gif', // fast parrot
        'images/parrots/congaparrot.gif', // conga parrot
        'images/parrots/shuffleparrot.gif', // shuffle parrot
        'images/parrots/dealwithitparrot.gif', // sunglasses parrot
        'images/parrots/reversecongaparrot.gif', // reverse conga
        'images/parrots/hypnoparrot.gif', // hypno parrot
        'images/parrots/middleparrot.gif', // middle parrot
        'images/parrots/moonwalkingparrot.gif', // moonwalking parrot
        'images/parrots/slowparrot.gif', // slow parrot
        'images/parrots/mustacheparrot.gif', // mustache parrot
        'images/parrots/margaritaparrot.gif', // margarita parrot
        'images/parrots/aussiereversecongaparrot.gif', // aussie reverse conga
        'images/parrots/beretparrot.gif', // beret parrot
        'images/parrots/mardigrasparrot.gif', // mardi gras parrot
        'images/parrots/spinningparrot.gif', // spinning parrot
        'images/parrots/michaeljacksonparrot.gif', // michael jackson parrot
        'images/parrots/rythmicalparrot.gif', // rhythmical parrot
    ];

    document.addEventListener('keypress', (e) => {
        typedKeys.push(e.key.toUpperCase());
        
        // Keep only last 5 keys
        if (typedKeys.length > 5) {
            typedKeys.shift();
        }
        
        // Check if PARTY was typed
        if (typedKeys.join('').includes(secretCode)) {
            togglePartyMode();
            typedKeys = []; // Reset
        }
    });

    function togglePartyMode() {
        partyMode = !partyMode;
        
        if (partyMode) {
            activatePartyMode();
        } else {
            deactivatePartyMode();
        }
    }

    // Cursor trail effect
    let cursorInterval = null;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function startCursorTrail() {
        cursorInterval = setInterval(() => {
            createCursorSparkle();
        }, 50);
    }

    function createCursorSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.style.left = mouseX + 'px';
        sparkle.style.top = mouseY + 'px';
        
        // Random color
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'];
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 + 10}px) scale(0)`;
            sparkle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => sparkle.remove(), 500);
    }

    function activatePartyMode() {
        document.body.classList.add('party-mode');
        
        // Add disco ball
        createDiscoBall();
        
        // Start sparkles
        startSparkles();
        
        // Start cursor trail
        startCursorTrail();
        
        // Add dancing animals
        createDancingAnimals();
        
        // Play music
        playPartyMusic();
        
        // Show notification
        showPartyNotification('🎉 PARTY MODE ACTIVATED! 🎉');
    }

    function deactivatePartyMode() {
        document.body.classList.remove('party-mode');
        
        // Remove disco ball
        const discoBall = document.getElementById('disco-ball');
        if (discoBall) discoBall.remove();
        
        // Stop sparkles
        clearInterval(partyInterval);
        partyInterval = null;
        document.querySelectorAll('.party-sparkle').forEach(el => el.remove());
        
        // Stop cursor trail
        clearInterval(cursorInterval);
        cursorInterval = null;
        document.querySelectorAll('.cursor-sparkle').forEach(el => el.remove());
        
        // Stop animal creation and remove all animals
        clearInterval(animalInterval);
        animalInterval = null;
        document.querySelectorAll('.dancing-animal').forEach(el => el.remove());
        
        // Fade out music
        if (partyAudio) {
            const fadeAudio = setInterval(() => {
                if (partyAudio.volume > 0.05) {
                    partyAudio.volume -= 0.05;
                } else {
                    clearInterval(fadeAudio);
                    partyAudio.pause();
                    partyAudio.remove();
                    partyAudio = null;
                }
            }, 100);
        }
        
        showPartyNotification('Party mode désactivé 😊');
    }

    function createDiscoBall() {
        const discoBall = document.createElement('div');
        discoBall.id = 'disco-ball';
        discoBall.innerHTML = `
            <div class="disco-ball-sphere">
                <div class="disco-shine"></div>
                <div class="disco-shine disco-shine-2"></div>
            </div>
            <div class="disco-ray disco-ray-1"></div>
            <div class="disco-ray disco-ray-2"></div>
            <div class="disco-ray disco-ray-3"></div>
            <div class="disco-ray disco-ray-4"></div>
            <div class="disco-ray disco-ray-5"></div>
            <div class="disco-ray disco-ray-6"></div>
            <div class="disco-reflection disco-reflection-1"></div>
            <div class="disco-reflection disco-reflection-2"></div>
            <div class="disco-reflection disco-reflection-3"></div>
        `;
        document.body.appendChild(discoBall);
    }

    function startSparkles() {
        // Create initial batch - 3x more sparkles!
        for (let i = 0; i < 90; i++) {
            setTimeout(() => createSparkle(), i * 20);
        }
        
        // Continue creating sparkles - 3x faster
        partyInterval = setInterval(() => {
            createSparkle();
        }, 100);
    }

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'party-sparkle';
        sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
        
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() + 's';
        sparkle.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }

    function createDancingAnimals() {
        // Create initial batch - 3x more parrots!
        for (let i = 0; i < 9; i++) {
            setTimeout(() => createSingleAnimal(), i * 300);
        }
        
        // Create new animals periodically (3x faster rate)
        animalInterval = setInterval(() => {
            if (partyMode) {
                // Create 3 parrots at once
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => createSingleAnimal(), i * 200);
                }
            }
        }, 2500); // Create three animals every 2.5 seconds
    }
    
    function createSingleAnimal() {
        const animal = document.createElement('div');
        animal.className = 'dancing-animal';
        
        const img = document.createElement('img');
        img.src = dancingGifs[Math.floor(Math.random() * dancingGifs.length)];
        img.alt = 'Party parrot';
        
        // Random flip
        if (Math.random() > 0.5) {
            img.style.transform = 'scaleX(-1)';
        }
        
        animal.appendChild(img);
        
        // Random starting position and animation
        const startSide = Math.random() > 0.5 ? 'left' : 'right';
        
        // Improved vertical positioning:
        // Use viewport height to ensure they spawn in view
        // Add some padding (10%) to avoid extreme top/bottom
        const viewportHeight = window.innerHeight;
        const randomY = Math.random() * 80 + 10; // 10% to 90% of viewport height
        
        // Get scroll position to spawn relative to current view
        const scrollY = window.scrollY;
        const absoluteY = scrollY + (viewportHeight * (randomY / 100));
        
        const duration = 8 + Math.random() * 6; // 8-14 seconds
        const size = 40 + Math.random() * 80; // 40-120px (more variance)
        const rotation = Math.random() * 360; // Random rotation
        
        if (startSide === 'left') {
            animal.style.left = '-150px';
            animal.style.animationName = 'danceFloatRight';
        } else {
            animal.style.right = '-150px';
            animal.style.animationName = 'danceFloatLeft';
        }
        
        // Position absolutely based on scroll
        animal.style.position = 'absolute';
        animal.style.top = absoluteY + 'px';
        animal.style.animationDuration = duration + 's';
        
        // Apply random rotation to container, random flip to image
        animal.style.transform = `rotate(${rotation}deg)`;
        
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        
        document.body.appendChild(animal);
        
        // Auto-remove after animation completes
        setTimeout(() => {
            animal.remove();
        }, duration * 1000);
    }

    function playPartyMusic() {
        // Using your custom party music!
        // Audio is created only when party mode is activated (lazy loading)
        partyAudio = document.createElement('audio');
        partyAudio.preload = 'none'; // Don't preload - only load when play() is called
        partyAudio.loop = true;
        partyAudio.volume = 0.35;
        
        // Add error handling before setting src
        partyAudio.addEventListener('error', (e) => {
            console.log('Audio failed to load:', e);
        });
        
        partyAudio.addEventListener('ended', () => {
            if (partyMode && partyAudio) {
                partyAudio.play(); // Ensure it loops
            }
        });
        
        // Set src and load the audio only now (when party mode is activated)
        partyAudio.src = 'audio/party-music.mp3';
        partyAudio.load(); // Explicitly load the audio file
        
        // Play the music
        partyAudio.play().catch(err => {
            console.log('Audio autoplay prevented. Click anywhere to start music!');
            // Fallback: play on next user interaction
            const playOnClick = () => {
                if (partyMode && partyAudio) {
                    partyAudio.play();
                }
                document.removeEventListener('click', playOnClick);
            };
            document.addEventListener('click', playOnClick);
        });
    }

    function showPartyNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'party-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
});


/* ==========================================================================
   EDIT THESE DETAILS CONFIGURATION
   Change any text below to customize the website instantly!
   ========================================================================== */
const CONFIG = {
    FRIEND_NAME: "Sarah",              // Best friend's name
    YOUR_NAME: "Emma",                 // Your name
    DEGREE: "Bachelor of Science in Computer Science", // Degree/Program
    UNIVERSITY: "Stanford University", // University/College
    GRADUATION_DATE: "June 15, 2026",   // Graduation Date
    
    // Custom Messages
    YOU_DID_IT_MESSAGE: "After all the hard work, stressful days, difficult moments and countless efforts, you finally made it. Today is a reminder that every step was worth it. I am genuinely so proud of you.",
    
    FRIENDSHIP_MESSAGE: "You've always been an inspiration to everyone around you. Thank you for being such an incredible friend through thick and thin! Watching you smash every goal has been pure joy.",
    
    // Friendship Memory Cards
    MEM_UNDERSTAND: "All our silent looks during long lectures, random code words, and those hilarious unspoken signals that only we get.",
    MEM_FUNNIEST: "Laughing so hard until our stomachs hurt during late night study sessions in the library over complete nonsense.",
    MEM_JOKES: "That one hilarious coffee spill incident before our big presentation that we still can't bring up without cracking up.",
    MEM_REMEMBER: "How we supported each other through every exam stress, held each other up, and celebrated every tiny victory along the way.",
    MEM_PERSON: "No matter how far life takes us or how busy our careers get, you will always be my absolute go-to person.",

    // Envelope Letter Message
    LETTER_MESSAGE: `Congratulations on this beautiful achievement. I know how much effort went into reaching this moment, and I hope you take a moment to realize just how amazing this achievement is.<br><br>
    I'm genuinely proud of you and incredibly happy that I got to be your friend through this journey.<br><br>
    This graduation is not the end of your story. It's the beginning of a new chapter, and I can't wait to see where life takes you.<br><br>
    Keep believing in yourself, keep dreaming big and never forget how far you've already come.<br><br>
    Congratulations once again, Graduate!`,

    // Audio file path (Replace with your own mp3 path if desired)
    MUSIC_FILE: "assets/music/celebration.mp3"
};

/* ==========================================================================
   INITIALIZATION & DATA BINDING
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    injectConfigData();
    initLoader();
    initNavigation();
    initScrollAnimations();
    initParticleCanvas();
    initEnvelope();
    initMusicPlayer();
    initConfetti();
});

// Inject variables into HTML elements
function injectConfigData() {
    const vars = document.querySelectorAll(".editable-var");
    vars.forEach(el => {
        const key = el.getAttribute("data-var");
        if (CONFIG[key]) {
            el.innerHTML = CONFIG[key];
        }
    });
}

/* ==========================================================================
   LOADING SCREEN
   ========================================================================== */
function initLoader() {
    const loader = document.getElementById("loader");
    const loaderFill = document.getElementById("loaderFill");
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 15;
        if (loaderFill) loaderFill.style.width = progress + "%";
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (loader) loader.classList.add("hidden");
                triggerInitialConfetti();
            }, 400);
        }
    }, 120);
}

/* ==========================================================================
   NAVIGATION & SCROLL PROGRESS
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById("navbar");
    const progressBar = document.getElementById("progressBar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    // Scroll Events
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) progressBar.style.width = scrollPercent + "%";

        // Navbar background shift
        if (scrollTop > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Back to top visibility
        if (scrollTop > 400) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }

        // Active link update
        const sections = document.querySelectorAll(".section");
        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute("id");

            if (scrollTop >= top && scrollTop < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // Mobile Hamburger Toggle
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // Scroll to Top action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".animate-on-scroll").forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================================================
   PARTICLE CANVAS (FLOATING SPARKLES)
   ========================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            color: ["#D4AF37", "#9D88C4", "#E8A5A5"][Math.floor(Math.random() * 3)],
            alpha: Math.random() * 0.5 + 0.2,
            speedY: Math.random() * 0.6 + 0.2,
            speedX: (Math.random() - 0.5) * 0.4
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();

            p.y -= p.speedY;
            p.x += p.speedX;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
        });

        requestAnimationFrame(render);
    }

    render();
}

/* ==========================================================================
   INTERACTIVE ENVELOPE
   ========================================================================== */
function initEnvelope() {
    const openBtn = document.getElementById("openLetterBtn");
    const envelope = document.getElementById("envelope");

    if (openBtn && envelope) {
        openBtn.addEventListener("click", () => {
            envelope.classList.toggle("open");
            if (envelope.classList.contains("open")) {
                openBtn.textContent = "Close Letter ✉️";
                triggerInitialConfetti();
            } else {
                openBtn.textContent = "Open My Letter 💌";
            }
        });
    }
}

/* ==========================================================================
   MUSIC PLAYER TOGGLE
   ========================================================================== */
function initMusicPlayer() {
    const musicBtn = document.getElementById("musicBtn");
    const musicText = document.getElementById("musicText");
    const bgMusic = document.getElementById("bgMusic");

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicText.textContent = "Music: ON 🎵";
                    musicBtn.style.borderColor = "var(--accent-gold)";
                }).catch(() => {
                    alert("Audio playback allowed after user interaction.");
                });
            } else {
                bgMusic.pause();
                musicText.textContent = "Music: OFF 🎵";
                musicBtn.style.borderColor = "var(--border-light)";
            }
        });
    }
}

/* ==========================================================================
   CELEBRATION CONFETTI EFFECT
   ========================================================================== */
function initConfetti() {
    const triggerBtn = document.getElementById("triggerConfettiBtn");
    if (triggerBtn) {
        triggerBtn.addEventListener("click", () => {
            triggerInitialConfetti();
        });
    }
}

function triggerInitialConfetti() {
    // Custom Lightweight Confetti Generator
    const colors = ["#D4AF37", "#9D88C4", "#E8A5A5", "#FAF7F2"];
    const count = 60;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = Math.random() * 8 + 6 + "px";
        confetti.style.height = Math.random() * 10 + 8 + "px";
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.zIndex = "9998";
        confetti.style.borderRadius = "2px";
        confetti.style.pointerEvents = "none";
        confetti.style.opacity = Math.random() + 0.5;

        document.body.appendChild(confetti);

        const duration = Math.random() * 3 + 2;
        const rotate = Math.random() * 360;

        confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(105vh) rotate(${rotate}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            fill: "forwards"
        });

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}
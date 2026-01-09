// 2025 Enhanced Website Script - Mobile Responsive Fix
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);

    // ===== CURSOR TRAIL EFFECT =====
    const cursorTrail = document.querySelector('.cursor-trail');
    if (cursorTrail) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        let trailSpeed = 0.1;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            trailX += (mouseX - trailX) * trailSpeed;
            trailY += (mouseY - trailY) * trailSpeed;
            
            cursorTrail.style.left = `${trailX}px`;
            cursorTrail.style.top = `${trailY}px`;
            
            requestAnimationFrame(animateTrail);
        }

        animateTrail();
    }

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add theme transition animation
            document.body.style.transition = 'background 0.5s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header-2025');
    const headerProgress = document.getElementById('headerProgress');

    window.addEventListener('scroll', () => {
        // Header background on scroll
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Progress bar
        if (headerProgress) {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            headerProgress.style.width = `${scrolled}%`;
        }

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // ===== ENHANCED MOBILE MENU =====
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;

    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = 'auto';
    }

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', openMobileMenu);
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-counter');
    const heroStats = document.querySelector('.hero-stats');

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
                
                // Animate progress bars
                const progressBar = counter.closest('.stat-card')?.querySelector('.stat-progress');
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    }

    function animateHeroCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    }

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === statsSection) {
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }
                if (entry.target === heroStats) {
                    const heroCounters = heroStats.querySelectorAll('.stat-number[data-count]');
                    heroCounters.forEach(counter => {
                        animateHeroCounter(counter);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection && counters.length > 0) {
        observer.observe(statsSection);
    }

    if (heroStats) {
        observer.observe(heroStats);
    }

    // ===== VIDEO PLAYER =====
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const videoPlayer = document.getElementById('videoPlayer');
    const playButton = document.getElementById('playButton');
    const closeVideo = document.getElementById('closeVideo');

    if (playButton && videoPlaceholder && videoPlayer) {
        playButton.addEventListener('click', () => {
            videoPlaceholder.style.display = 'none';
            videoPlayer.style.display = 'block';
            const iframe = videoPlayer.querySelector('iframe');
            if (iframe) {
                // Add autoplay parameter
                const currentSrc = iframe.src;
                if (!currentSrc.includes('autoplay=1')) {
                    iframe.src = currentSrc.includes('?') ? 
                        currentSrc + '&autoplay=1' : 
                        currentSrc + '?autoplay=1';
                }
            }
        });
    }

    if (closeVideo) {
        closeVideo.addEventListener('click', () => {
            if (videoPlayer) videoPlayer.style.display = 'none';
            if (videoPlaceholder) videoPlaceholder.style.display = 'block';
            const iframe = videoPlayer.querySelector('iframe');
            if (iframe) {
                // Remove autoplay parameter
                iframe.src = iframe.src.replace(/[?&]autoplay=1/, '');
            }
        });
    }

    // ===== LOGO MARQUEE =====
    function initLogoMarquee() {
        const marqueeTrack = document.querySelector('.marquee-track');
        if (!marqueeTrack) return;
        
        // Clone logos for seamless loop
        const inner = marqueeTrack.querySelector('.marquee-inner');
        const clone = inner.cloneNode(true);
        marqueeTrack.appendChild(clone);
        
        // Calculate animation duration based on number of logos
        const logos = inner.querySelectorAll('.logo-item');
        const duration = logos.length * 2; // 2 seconds per logo
        
        // Set animation
        marqueeTrack.style.animationDuration = `${duration}s`;
    }

    // Initialize logo marquee
    initLogoMarquee();

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm2025');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // Show success message (in production, this would send to a server)
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                submitBtn.style.background = 'var(--success)';
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                // Show notification
                showNotification(`Thank you, ${name}! We'll get back to you soon.`);
            }, 1500);
        });
    }

    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 15px 25px;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== SERVICE CARD HOVER EFFECTS =====
    const serviceCards = document.querySelectorAll('.service-card-2025');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
    });

    // ===== HERO LOGO SLIDE ANIMATION =====
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        // Create additional slide effect
        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 800);
    }

    // ===== TOUCH EVENT SUPPORT FOR MOBILE =====
    function addTouchSupport() {
        // Add touch support for service cards
        serviceCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = 'var(--shadow-xl)';
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'var(--shadow-lg)';
                }, 150);
            });
        });

        // Prevent zoom on double tap for mobile
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Initialize touch support
    addTouchSupport();

    // ===== WINDOW RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250);
    });

    // ===== INITIAL SCROLL POSITION =====
    // Trigger scroll event on load to set initial header state
    window.dispatchEvent(new Event('scroll'));

    console.log('Zure Addis 2025 Website initialized successfully!');
});
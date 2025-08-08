// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNav();
    initScrollAnimations();
    initSmoothScrolling();
    initNavbarScroll();
    initFormHandling();
    initTypingEffect();
    initInteractiveGrid();
    initHomeGrid();
    initLoadingScreen();
    initServiceCardAnimations();
    initPortfolioAnimations();
});

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Form Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Add cursor blink effect after typing
            addCursorBlink();
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 10);
}

// Add cursor blink effect
function addCursorBlink() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    let cursorVisible = true;
    setInterval(() => {
        if (cursorVisible) {
            heroTitle.innerHTML += '<span class="cursor">|</span>';
        } else {
            heroTitle.innerHTML = heroTitle.innerHTML.replace('<span class="cursor">|</span>', '');
        }
        cursorVisible = !cursorVisible;
    }, 500);
}

// Interactive Hero Grid Animation
function initInteractiveGrid() {
    const grid = document.getElementById('heroGrid');
    if (!grid) return;
    
    // Create grid cells (12x12 = 144 cells)
    for (let i = 0; i < 144; i++) {
        const cell = document.createElement('div');
        cell.className = 'hero-grid-cell';
        grid.appendChild(cell);
    }
    
    const cells = document.querySelectorAll('.hero-grid-cell');
    
    // Random cell activation
    function activateRandomCell() {
        const randomCell = cells[Math.floor(Math.random() * cells.length)];
        randomCell.classList.add('active');
        
        setTimeout(() => {
            randomCell.classList.remove('active');
        }, 800);
    }
    
    // Pulse effect for cells
    function pulseRandomCells() {
        const numCells = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < numCells; i++) {
            const randomCell = cells[Math.floor(Math.random() * cells.length)];
            randomCell.classList.add('pulse');
            
            setTimeout(() => {
                randomCell.classList.remove('pulse');
            }, 1500);
        }
    }
    
    // Mouse interaction
    grid.addEventListener('mousemove', (e) => {
        const rect = grid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        cells.forEach((cell, index) => {
            const cellRect = cell.getBoundingClientRect();
            const cellX = cellRect.left - rect.left + cellRect.width / 2;
            const cellY = cellRect.top - rect.top + cellRect.height / 2;
            
            const distance = Math.sqrt((x - cellX) ** 2 + (y - cellY) ** 2);
            
            if (distance < 80) {
                const intensity = (80 - distance) / 80;
                cell.style.background = `rgba(255, 255, 255, ${0.02 + intensity * 0.15})`;
                cell.style.transform = `scale(${1 + intensity * 0.08})`;
            } else {
                cell.style.background = 'rgba(255, 255, 255, 0.02)';
                cell.style.transform = 'scale(1)';
            }
        });
    });
    
    // Start animations
    setInterval(activateRandomCell, 600);
    setInterval(pulseRandomCells, 2500);
    
    // Central AI interaction
    const centralAI = document.querySelector('.central-ai');
    if (centralAI) {
        centralAI.addEventListener('mouseenter', () => {
            cells.forEach((cell, index) => {
                setTimeout(() => {
                    cell.classList.add('active');
                    setTimeout(() => cell.classList.remove('active'), 400);
                }, index * 30);
            });
        });
    }
}

// Home Grid Background Animation
function initHomeGrid() {
    const homeGrid = document.getElementById('homeGrid');
    if (!homeGrid) return;
    
    // Create home grid cells (20x20 = 400 cells)
    for (let i = 0; i < 400; i++) {
        const cell = document.createElement('div');
        cell.className = 'home-grid-cell';
        homeGrid.appendChild(cell);
    }
    
    const homeCells = document.querySelectorAll('.home-grid-cell');
    
    // Random cell activation for home grid
    function activateRandomHomeCell() {
        const randomCell = homeCells[Math.floor(Math.random() * homeCells.length)];
        randomCell.classList.add('active');
        
        setTimeout(() => {
            randomCell.classList.remove('active');
        }, 1200);
    }
    
    // Pulse effect for home grid cells
    function pulseRandomHomeCells() {
        const numCells = Math.floor(Math.random() * 6) + 3;
        for (let i = 0; i < numCells; i++) {
            const randomCell = homeCells[Math.floor(Math.random() * homeCells.length)];
            randomCell.classList.add('pulse');
            
            setTimeout(() => {
                randomCell.classList.remove('pulse');
            }, 2000);
        }
    }
    
    // Mouse interaction for home grid
    document.addEventListener('mousemove', (e) => {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        homeCells.forEach((cell, index) => {
            const cellRect = cell.getBoundingClientRect();
            const cellX = cellRect.left - rect.left + cellRect.width / 2;
            const cellY = cellRect.top - rect.top + cellRect.height / 2;
            
            const distance = Math.sqrt((x - cellX) ** 2 + (y - cellY) ** 2);
            
            if (distance < 120) {
                const intensity = (120 - distance) / 120;
                cell.style.background = `rgba(255, 255, 255, ${0.01 + intensity * 0.1})`;
                cell.style.transform = `scale(${1 + intensity * 0.03})`;
            } else {
                cell.style.background = 'rgba(255, 255, 255, 0.01)';
                cell.style.transform = 'scale(1)';
            }
        });
    });
    
    // Start home grid animations
    setInterval(activateRandomHomeCell, 800);
    setInterval(pulseRandomHomeCells, 3500);
    
    // Wave effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.1;
        
        homeCells.forEach((cell, index) => {
            const delay = index * 0.01;
            cell.style.transform = `translateY(${rate * delay}px)`;
        });
    });
}

// Loading Screen
function initLoadingScreen() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Enhanced Service Cards Animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03) rotateY(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            
            // Animate icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.animation = 'iconSpin 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            
            // Reset icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.animation = 'iconPulse 2s ease-in-out infinite';
            }
        });
    });
}

// Add icon spin animation
const iconSpinStyle = document.createElement('style');
iconSpinStyle.textContent = `
    @keyframes iconSpin {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1.2) rotate(360deg); }
    }
`;
document.head.appendChild(iconSpinStyle);

// Enhanced Portfolio Animations
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        // Add staggered entrance animation
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8) translateY(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1) translateY(0)';
        }, index * 300);
        
        // Enhanced hover and click effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Animate image
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            
            // Reset image
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
        
        item.addEventListener('click', function() {
            // Add click animation with ripple effect
            this.style.transform = 'scale(0.95)';
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(99, 102, 241, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 10;
            `;
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                ripple.remove();
            }, 150);
        });
    });
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Counter Animation for Statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', initScrollProgress);

// Enhanced Hero Grid Interactions
function enhanceGridInteractions() {
    const grid = document.getElementById('heroGrid');
    if (!grid) return;
    
    // Add keyboard interaction
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            const cells = document.querySelectorAll('.hero-grid-cell');
            cells.forEach((cell, index) => {
                setTimeout(() => {
                    cell.classList.add('active');
                    setTimeout(() => cell.classList.remove('active'), 250);
                }, index * 15);
            });
        }
    });
    
    // Add touch interaction for mobile
    grid.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const rect = grid.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const cells = document.querySelectorAll('.hero-grid-cell');
        cells.forEach(cell => {
            const cellRect = cell.getBoundingClientRect();
            const cellX = cellRect.left - rect.left + cellRect.width / 2;
            const cellY = cellRect.top - rect.top + cellRect.height / 2;
            
            const distance = Math.sqrt((x - cellX) ** 2 + (y - cellY) ** 2);
            
            if (distance < 60) {
                cell.classList.add('active');
                setTimeout(() => cell.classList.remove('active'), 400);
            }
        });
    });
}

// Initialize enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    enhanceGridInteractions();
}); 
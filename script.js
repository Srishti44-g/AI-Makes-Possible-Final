document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress-bar')) {
                    animateProgress(entry.target);
                }
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll('.animated, .progress-bar').forEach(el => {
        animationObserver.observe(el);
    });

    // Initialize core functionality
    try {
        initializeCore();
    } catch (error) {
        console.warn('Core initialization error:', error);
    }

    // Initialize enhanced features
    try {
        initializeEnhanced();
    } catch (error) {
        console.warn('Enhanced features initialization error:', error);
    }
});

function initializeCore() {
    // Progress bars animation
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });

    // Single smooth scroll handler
    const handleSmoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Handle mobile menu if needed
            const navGroup = document.querySelector('.nav-group');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            navGroup?.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
        }
    };

    // Apply smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Research section tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const researchGrids = document.querySelectorAll('.research-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding content
            researchGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.id === tab) {
                    grid.classList.add('active');
                }
            });
        });
    });

    // Animate progress circles
    document.querySelectorAll('.progress-circle-path').forEach(circle => {
        const progress = circle.dataset.progress;
        const circumference = 220; // 2 * π * r (35)
        const offset = circumference - (progress / 100 * circumference);
        circle.style.strokeDashoffset = offset;
    });

    // AI Agents Interactions
    const agentCards = document.querySelectorAll('.agent-card');

    agentCards.forEach(card => {
        // Particle system generation
        const particleSystem = card.querySelector('.agent-particle-system');
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--delay', `${i * 0.5}s`);
            particleSystem.appendChild(particle);
        }

        // Stats animation on hover
        card.addEventListener('mouseenter', () => {
            const capabilities = card.querySelectorAll('.capability-progress');
            capabilities.forEach(cap => {
                const width = cap.style.width;
                cap.style.width = '0%';
                setTimeout(() => {
                    cap.style.width = width;
                }, 100);
            });
        });

        // Interactive buttons
        const actionBtns = card.querySelectorAll('.agent-action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.add('clicked');
                setTimeout(() => btn.classList.remove('clicked'), 200);
            });
        });
    });

    // Single progress animation function
    const animateProgress = (element) => {
        const target = element.getAttribute('data-progress') || 100;
        let width = 0;
        const interval = setInterval(() => {
            if (width >= target) {
                clearInterval(interval);
            } else {
                width++;
                element.style.width = width + '%';
            }
        }, 20);
    };

    // Initialize features
    initRoboticsAnimation();
    initInvestmentStats();
    initLearningTracks();
    initNavigation();
    initSectionBackgrounds();
}

function initializeEnhanced() {
    // Initialize libraries if available
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    if (typeof Swiper !== 'undefined') {
        new Swiper('.learning-paths-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 3D effect with performance optimization
    const applyCardEffect = (e) => {
        requestAnimationFrame(() => {
            document.querySelectorAll('.card').forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.transform = `perspective(1000px) rotateX(${y / 50}deg) rotateY(${x / 50}deg)`;
            });
        });
    };

    document.addEventListener('mousemove', applyCardEffect, { passive: true });
}

// Robotics Animation
function initRoboticsAnimation() {
    const robotModel = document.querySelector('.robot-model');
    if (robotModel) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    robotModel.classList.add('animate');
                }
            });
        });
        observer.observe(robotModel);
    }
}

// Investment Stats Animation
function initInvestmentStats() {
    const circles = document.querySelectorAll('.stat-circle-progress');
    circles.forEach(circle => {
        const value = circle.getAttribute('data-value');
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (value / 100 * circumference);
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });
}

// Learning Hub Track Navigation
function initLearningTracks() {
    const trackBtns = document.querySelectorAll('.track-btn');
    const trackContents = document.querySelectorAll('.track-content');

    trackBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const track = btn.dataset.track;
            
            trackBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            trackContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === track) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Navigation Functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;

    // Scroll handling
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header transformation
        if (currentScroll > 50) {
            header.style.padding = '0.5rem 0';
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }

        // Active section highlighting
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            if (
                section.offsetTop <= scrollPosition &&
                section.offsetTop + section.offsetHeight > scrollPosition
            ) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scroll with highlight effect
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Section Backgrounds Initialization
function initSectionBackgrounds() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('light-section');
            section.style.background = '#ffffff';
            section.style.color = '#1a1a1a';
        } else {
            section.classList.add('dark-section');
            section.style.background = '#1a1a1a';
            section.style.color = '#ffffff';
        }

        // Special styling for Vision section
        if (section.id === 'vision') {
            section.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
            section.style.color = '#ffffff';
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            
            // Add subtle pattern overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                background-size: 20px 20px;
                pointer-events: none;
                opacity: 0.5;
            `;
            section.insertBefore(overlay, section.firstChild);
        }

        // Special styling for About section
        if (section.id === 'about') {
            section.style.background = 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)';
            section.style.color = '#ffffff';
            section.style.position = 'relative';
            
            // Add subtle pattern overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: repeating-linear-gradient(
                    45deg,
                    rgba(255, 255, 255, 0.05) 0px,
                    rgba(255, 255, 255, 0.05) 1px,
                    transparent 1px,
                    transparent 10px
                );
                pointer-events: none;
            `;
            section.insertBefore(overlay, section.firstChild);
        }

        // Adjust content containers in dark sections
        if (section.classList.contains('dark-section')) {
            const containers = section.querySelectorAll('.container, .card, .feature-box');
            containers.forEach(container => {
                container.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                container.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            });
        }
    });
}

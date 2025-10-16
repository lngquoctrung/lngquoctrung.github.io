// AI Portfolio JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initParticles();
    initNavigation();
    initTypingAnimation();
    initThemeToggle();
    initSkillBars();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initScrollAnimations();

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
});

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00D4FF', '#00FF88', '#ffffff']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00D4FF',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Close mobile menu
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Also handle scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Update active navigation link on scroll
    window.addEventListener('scroll', throttle(function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });

        // Update navbar background on scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
            } else {
                navbar.style.background = 'rgba(31, 33, 33, 0.95)';
            }
        }
    }, 100));
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const titles = [
        'AI Engineer & Data Engineer',
        'Computer Vision Specialist',
        'Machine Learning Developer',
        'Deep Learning Expert',
        'Data Engineering Expert'
    ];

    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeTitle() {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && currentCharIndex === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before next title
        }

        setTimeout(typeTitle, typeSpeed);
    }

    typeTitle();
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle?.querySelector('i');

    if (!themeToggle || !icon) return;

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-color-scheme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const percent = skillBar.getAttribute('data-percent');
                if (percent) {
                    setTimeout(() => {
                        skillBar.style.width = percent + '%';
                    }, 200);
                }
                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    
                    card.style.opacity = '0';
                    card.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.transition = 'opacity 0.3s ease';
                    card.style.opacity = '0';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }, 300);
                }
            });
            
            setTimeout(() => {
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 350);
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    function validateForm({ name, email, subject, message }) {
        const errors = [];
        
        if (!name) errors.push('Please enter your full name');
        if (!email) errors.push('Please enter your email');
        else if (!isValidEmail(email)) errors.push('Invalid email address');
        if (!subject) errors.push('Please enter a subject');
        if (!message) errors.push('Please enter a message');
        if (message.length < 10) errors.push('Message is too short (minimum 10 characters)');
        
        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    emailjs.init({
        publicKey: "QJd1h88cFT2d3CWya"
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim() || '';
        const email = formData.get('email')?.trim() || '';
        const subject = formData.get('subject')?.trim() || '';
        const message = formData.get('message')?.trim() || '';

        const errors = validateForm({ name, email, subject, message });
        if (errors.length > 0) {
            showNotification(errors.join(', '), 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        emailjs.sendForm('email-service', 'contact-mail', contactForm)
            .then(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
    });
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
        line-height: 1.5;
    `;

    // Set background color based on type
    const colors = {
        success: '#00FF88',
        error: '#FF5459',
        info: '#00D4FF',
        warning: '#E6815F'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    // Allow manual close
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100));

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const text = statElement.textContent;
                    const finalNumber = parseInt(text.replace(/\D/g, '')) || 0;
                    if (finalNumber > 0) {
                        animateCounter(statElement, finalNumber, text.includes('+'));
                        statsObserver.unobserve(statElement);
                    }
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    function animateCounter(element, target, hasPlus) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, 40);
    }
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle page load
window.addEventListener('load', function() {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 300);
    }

    // Trigger skill bars animation if in viewport
    const skillsSection = document.getElementById('skills');
    if (skillsSection && isInViewport(skillsSection)) {
        const skillBars = skillsSection.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            if (percent) {
                setTimeout(() => {
                    bar.style.width = percent + '%';
                }, 500);
            }
        });
    }
});

// Handle resize events
window.addEventListener('resize', throttle(function() {
    // Update particles if needed
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}, 250));

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    .notification {
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
    }

    .notification:hover {
        transform: translateX(-5px);
    }
`;
document.head.appendChild(style);

function initProjectLoadMore() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    const allProjects = Array.from(document.querySelectorAll('.project-card'));
    const projectsPerLoad = 6; // Number of projects to show initially and per load
    let currentFilter = 'all';
    let visibleCount = projectsPerLoad;

    // Create load more button
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'btn-load-more';
    loadMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Load More Projects';
    loadMoreBtn.style.cssText = `
        display: none;
        margin: 40px auto 0;
        padding: 14px 32px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
    `;

    // Insert load more button after projects grid
    projectsGrid.parentNode.insertBefore(loadMoreBtn, projectsGrid.nextSibling);

    // Function to show/hide projects based on current filter and count
    function updateProjectDisplay() {
        let filteredProjects = allProjects;

        // Filter by category
        if (currentFilter !== 'all') {
            filteredProjects = allProjects.filter(card => {
                const category = card.getAttribute('data-category');
                return category && category.includes(currentFilter);
            });
        }

        // Hide all projects first
        allProjects.forEach(card => {
            card.style.display = 'none';
            card.classList.add('hidden');
        });

        // Show visible projects with animation
        filteredProjects.forEach((card, index) => {
            if (index < visibleCount) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50 * index);
            }
        });

        // Show/hide load more button
        if (filteredProjects.length > visibleCount) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.textContent = `Load More Projects (${filteredProjects.length - visibleCount} remaining)`;
        } else {
            loadMoreBtn.style.display = 'none';
        }

        // Refresh AOS if available
        setTimeout(() => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 100);
    }

    // Load more button click handler
    loadMoreBtn.addEventListener('click', function() {
        visibleCount += projectsPerLoad;
        updateProjectDisplay();

        // Smooth scroll to first newly visible project
        const firstNewProject = document.querySelectorAll('.project-card:not(.hidden)')[visibleCount - projectsPerLoad];
        if (firstNewProject) {
            setTimeout(() => {
                firstNewProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    });

    // Update filter buttons to work with load more
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            currentFilter = this.getAttribute('data-filter');
            visibleCount = projectsPerLoad; // Reset visible count when filter changes

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            updateProjectDisplay();
        });
    });

    // Initial display
    updateProjectDisplay();

    // Add hover effect to load more button
    loadMoreBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.4)';
    });

    loadMoreBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Fix hover on mobile - toggle overlay on tap
function initMobileProjectInteraction() {
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) return;
    
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(image => {
        const overlay = image.querySelector('.project-overlay');
        if (!overlay) return;
        
        let isOverlayVisible = false;
        
        image.addEventListener('click', function(e) {
            const clickedLink = e.target.closest('.project-link');
            
            // If clicking on a link, let it work
            if (clickedLink) {
                return;
            }
            
            // Otherwise, toggle overlay
            e.preventDefault();
            isOverlayVisible = !isOverlayVisible;
            
            if (isOverlayVisible) {
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
            } else {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
            }
        });
        
        // Close overlay when clicking outside
        document.addEventListener('click', function(e) {
            if (!image.contains(e.target) && isOverlayVisible) {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                isOverlayVisible = false;
            }
        });
    });
}

// Export functions for potential external use
window.PortfolioAPI = {
    initParticles,
    initNavigation,
    initTypingAnimation,
    initThemeToggle,
    initSkillBars,
    initProjectFilters,
    initContactForm,
    initBackToTop,
    initScrollAnimations,
    showNotification
};

// Auto open external links in new tab
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        // Check if link is external (not same domain)
        if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    initProjectLoadMore();
    initMobileProjectInteraction();
});
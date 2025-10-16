// Coming Soon Page JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initThemeToggle();
    initNotifyForm();
    initProgressAnimation();
});

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00D4FF', '#00FF88', '#ffffff']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
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
                    speed: 4,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
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
                    repulse: {
                        distance: 150,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Theme Toggle
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

// Progress Bar Animation
function initProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    // Animate progress bar on load
    const targetWidth = progressFill.style.width;
    progressFill.style.width = '0%';
    
    setTimeout(() => {
        progressFill.style.width = targetWidth;
    }, 500);
}

// Notify Form
function initNotifyForm() {
    const notifyForm = document.getElementById('notify-form');
    if (!notifyForm) return;
    
    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = notifyForm.querySelector('input[name="email"]');
        const submitButton = notifyForm.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        
        if (!email || !isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        // Simulate API call (replace with your actual API endpoint)
        setTimeout(() => {
            // Success
            showMessage('Thank you! You will be notified when it\'s ready.', 'success');
            notifyForm.reset();
            
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            
            // You can replace this with actual API call:
            /*
            fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                showMessage('Thank you! You will be notified when it\'s ready.', 'success');
                notifyForm.reset();
            })
            .catch(error => {
                showMessage('Something went wrong. Please try again.', 'error');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
            });
            */
        }, 1500);
    });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Message
function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // Remove after 5 seconds
    setTimeout(() => {
        message.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => message.remove(), 300);
    }, 5000);
    
    // Allow manual close
    message.addEventListener('click', () => {
        message.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => message.remove(), 300);
    });
}

// Status Cards Animation on Scroll
function initStatusCardsAnimation() {
    const statusCards = document.querySelectorAll('.status-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    statusCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize animations after load
window.addEventListener('load', function() {
    initStatusCardsAnimation();
});

// Handle resize events
window.addEventListener('resize', throttle(function() {
    // Update particles if needed
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}, 250));

// Utility: Throttle function
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

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

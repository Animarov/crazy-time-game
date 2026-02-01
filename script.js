// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animate statistics counters
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.round(currentValue);
        }, 30);
    });
    
    // Add wheel interactivity
    addWheelInteractivity();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add tooltips for probability breakdown
    const breakdownItems = document.querySelectorAll('.breakdown-item');
    
    breakdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add animation to coins
    const coins = document.querySelectorAll('.coin');
    
    setInterval(() => {
        coins.forEach(coin => {
            coin.style.transform = `rotateY(${Math.random() * 10}deg) rotateX(${Math.random() * 10}deg)`;
        });
    }, 2000);
    
    // Add glow effect to CTA button
    const ctaButton = document.querySelector('.btn-telegram');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.style.boxShadow = '0 5px 20px rgba(0, 136, 204, 0.5)';
            setTimeout(() => {
                ctaButton.style.boxShadow = '0 5px 15px rgba(0, 136, 204, 0.3)';
            }, 1000);
        }, 3000);
    }
});

// Add wheel interactivity
function addWheelInteractivity() {
    const wheel = document.querySelector('.wheel');
    const wheelImage = document.querySelector('.wheel-image');
    
    if (!wheel || !wheelImage) return;
    
    // Add click to spin effect
    wheel.addEventListener('click', function() {
        wheelImage.style.animation = 'rotateFast 0.5s ease-out';
        
        setTimeout(() => {
            wheelImage.style.animation = 'rotateSlow 30s linear infinite';
        }, 500);
    });
    
    // Add CSS for fast spin
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotateFast {
            from { transform: rotate(0deg); }
            to { transform: rotate(720deg); }
        }
        
        .wheel:hover .wheel-image {
            box-shadow: 
                0 0 60px rgba(108, 92, 231, 0.5),
                0 0 120px rgba(0, 206, 201, 0.3),
                inset 0 0 60px rgba(0, 0, 0, 0.7);
        }
    `;
    document.head.appendChild(style);
    
    // Highlight sectors on legend hover
    const legendItems = document.querySelectorAll('.legend-item');
    
    legendItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const colorClass = Array.from(this.querySelector('.color-dot').classList)
                .find(cls => cls !== 'color-dot');
            
            if (colorClass) {
                wheel.style.boxShadow = `0 0 30px ${getColorByClass(colorClass)}`;
            }
        });
        
        item.addEventListener('mouseleave', function() {
            wheel.style.boxShadow = '';
        });
    });
}

function getColorByClass(className) {
    const colors = {
        'x1': '#3498db',
        'x2': '#2ecc71', 
        'x5': '#f39c12',
        'x10': '#e74c3c',
        'cf': '#9b59b6',
        'p': '#1abc9c',
        'ch': '#e67e22',
        'ct': '#e74c3c'
    };
    
    return colors[className] || '#6c5ce7';
}

// Add hover effects to probability cards
document.addEventListener('DOMContentLoaded', function() {
    const probabilityCards = document.querySelectorAll('.probability-card');
    
    probabilityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const percentElement = this.querySelector('.probability-percent');
            if (percentElement) {
                const originalText = percentElement.textContent;
                percentElement.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    percentElement.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
});

// Add animation to step cards
document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        // Delay animation for each step
        setTimeout(() => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.5s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// Add parallax effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.backgroundPosition = `center ${rate}px`;
        });
    }
});

// Add scroll animation for sections
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});
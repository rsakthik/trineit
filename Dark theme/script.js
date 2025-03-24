// DOM Elements
const header = document.querySelector('header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');
const cards = document.querySelectorAll('.service-card, .delivery-card, .product-card, .team-card, .blog-card');

// Mobile Navigation Toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Shrink header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Animation for Cards
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add loading animation at the beginning
document.addEventListener('DOMContentLoaded', () => {
    // Create loading animation
    createLoadingAnimation();
    
    // Reset animations
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.animation = 'none';
        observer.observe(card);
    });
    
    // Add wave effect to hero section
    const hero = document.querySelector('.hero');
    createWaveEffect(hero);
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Manually trigger the load event after a timeout in case it doesn't fire naturally
    setTimeout(() => {
        window.dispatchEvent(new Event('load'));
    }, 1500);
});

// Create loading animation
function createLoadingAnimation() {
    // Check if loading overlay already exists in HTML
    const existingLoader = document.querySelector('.loading');
    
    if (existingLoader) {
        // If it exists in HTML, just add the fade out event
        window.addEventListener('load', () => {
            setTimeout(() => {
                existingLoader.classList.add('fade-out');
                setTimeout(() => {
                    existingLoader.remove();
                }, 500);
            }, 800);
        });
        return;
    }
    
    // If not in HTML, create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.classList.add('loading');
    
    // Create loading spinner
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('loading-spinner');
    
    // Append elements
    loadingOverlay.appendChild(loadingSpinner);
    document.body.appendChild(loadingOverlay);
    
    // Hide loading animation after page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 800);
    });
}

// Create animated wave effect in hero background
function createWaveEffect(element) {
    const wavesContainer = document.createElement('div');
    wavesContainer.classList.add('waves-container');
    
    // Create multiple wave layers
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.classList.add('wave');
        wave.style.animationDelay = `${i * 0.5}s`;
        wave.style.opacity = `${0.2 - (i * 0.05)}`;
        wavesContainer.appendChild(wave);
    }
    
    element.appendChild(wavesContainer);
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = [
        {
            text: "Working at TrineIT has been a transformative experience for my career growth.",
            name: "Sarah Johnson",
            position: "Software Developer"
        },
        {
            text: "The collaborative environment and challenging projects have helped me grow both professionally and personally.",
            name: "Michael Chen",
            position: "UX Designer"
        },
        {
            text: "TrineIT's commitment to innovation and employee development makes it a truly unique place to work.",
            name: "Jessica Martinez",
            position: "Project Manager"
        }
    ];
    
    const sliderContainer = document.querySelector('.testimonial-slider');
    let currentIndex = 0;
    
    function updateTestimonial() {
        const testimonial = testimonials[currentIndex];
        
        // Create testimonial HTML
        const testimonialHTML = `
            <div class="testimonial" style="opacity: 0;">
                <p>"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-img"></div>
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add new testimonial with fade-in animation
        sliderContainer.innerHTML = testimonialHTML;
        setTimeout(() => {
            document.querySelector('.testimonial').style.opacity = '1';
            document.querySelector('.testimonial').style.transition = 'opacity 0.5s ease';
        }, 100);
        
        // Update counter
        currentIndex = (currentIndex + 1) % testimonials.length;
    }
    
    // Initialize first testimonial
    updateTestimonial();
    
    // Set interval for testimonial rotation
    setInterval(updateTestimonial, 5000);
}

// Add micro-interactions to buttons
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseover', createRippleEffect);
});

// Ripple effect for buttons
function createRippleEffect(e) {
    const button = e.currentTarget;
    
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}); 
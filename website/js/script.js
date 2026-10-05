// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Email signup form
const emailForm = document.getElementById('email-form');
const formMessage = document.getElementById('form-message');

if (emailForm) {
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Show loading state
        formMessage.textContent = 'Subscribing...';
        formMessage.style.color = 'white';
        
        // Simulate API call (replace with your actual endpoint)
        try {
            // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
            
            // For demo purposes, simulate success after 1 second
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            formMessage.textContent = '✓ Thanks! We\'ll notify you when we launch.';
            formMessage.style.color = '#10b981';
            emailInput.value = '';
            
            // Track conversion (if using analytics)
            if (typeof mixpanel !== 'undefined') {
                mixpanel.track('Email Signup', { email });
            }
            
        } catch (error) {
            formMessage.textContent = '✗ Something went wrong. Please try again.';
            formMessage.style.color = '#ef4444';
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, steps, and testimonials
document.querySelectorAll('.feature-card, .step, .testimonial, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Track outbound links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        const destination = this.href;
        
        // Track with analytics (if using)
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('Outbound Link Click', { destination });
        }
        
        console.log('Outbound link clicked:', destination);
    });
});

// Mobile menu toggle (for responsive nav)
const createMobileMenu = () => {
    const nav = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = 'display: none; font-size: 1.5rem; background: none; border: none; cursor: pointer; color: var(--primary-color);';
    
    // Insert hamburger before nav-links
    nav.insertBefore(hamburger, navLinks);
    
    // Toggle menu on mobile
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
    
    // Show hamburger on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMobileView = (e) => {
        if (e.matches) {
            hamburger.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            hamburger.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        }
    };
    
    mediaQuery.addListener(handleMobileView);
    handleMobileView(mediaQuery);
};

// Initialize mobile menu
createMobileMenu();

// Page load analytics
window.addEventListener('load', () => {
    console.log('Page loaded');
    
    // Track page view (if using analytics)
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('Page View', {
            page: window.location.pathname,
            referrer: document.referrer
        });
    }
});

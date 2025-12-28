// Main JavaScript for WagTag Aircraft Database

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any interactive elements
    initPage();
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Add animation on scroll
    initScrollAnimations();
});

function initPage() {
    // Check if we're on an aircraft detail page
    const isAircraftPage = window.location.pathname !== '/' && 
                          !window.location.pathname.includes('index.html') &&
                          window.location.pathname !== '/wagtag.xyz/';
    
    if (isAircraftPage) {
        highlightCurrentAircraft();
    }
    
    // Add click tracking for analytics (you can integrate with your analytics service)
    initClickTracking();
}

function initSmoothScrolling() {
    // Smooth scroll for anchor links
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
}

function initScrollAnimations() {
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.aircraft-card, .step, .spec-item').forEach(el => {
        observer.observe(el);
    });
}

function highlightCurrentAircraft() {
    // Get current aircraft from URL
    const currentPath = window.location.pathname;
    const aircraftName = currentPath.split('/').pop().replace('.html', '').replace('-', ' ');
    
    // Update page title dynamically
    const pageTitle = document.title;
    if (!pageTitle.includes(aircraftName)) {
        const formattedName = aircraftName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        document.title = `${formattedName} - WagTag Aircraft Database`;
    }
}

function initClickTracking() {
    // Track clicks on aircraft cards for analytics
    document.querySelectorAll('.aircraft-card').forEach(card => {
        card.addEventListener('click', function() {
            const aircraftName = this.querySelector('h3').textContent;
            console.log(`Aircraft card clicked: ${aircraftName}`);
            // Here you can integrate with Google Analytics or other tracking
            // Example: gtag('event', 'aircraft_card_click', { 'aircraft_name': aircraftName });
        });
    });
}

// Utility function for formatting numbers
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// QR Code generator function (if you want to generate QR codes dynamically)
function generateQRCode(elementId, url) {
    // This would require a QR code library like qrcode.js
    // You can integrate it if needed
    console.log(`Generate QR code for ${url} in element ${elementId}`);
}

// Share functionality
function shareAircraft() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Check out this aircraft on WagTag',
            url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing:', error));
    }
}

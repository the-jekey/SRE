// Restore scroll position after page loads
document.addEventListener('DOMContentLoaded', () => {
    // Get saved scroll positions
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    const savedLocomotivePosition = sessionStorage.getItem('locomotiveScrollPosition');

    if (savedScrollPosition || savedLocomotivePosition) {
        // Wait for everything to load
        setTimeout(() => {
            // If we're on mobile/tablet (not using Locomotive Scroll)
            if (window.innerWidth <= 991) {
                window.scrollTo(0, savedScrollPosition);
            } else {
                // If using Locomotive Scroll
                const scroll = new LocomotiveScroll({
                    el: document.querySelector('[data-scroll-container]'),
                    smooth: true,
                    smartphone: {
                        smooth: false
                    },
                    tablet: {
                        smooth: false
                    }
                });

                // Scroll to saved position after Locomotive is initialized
                scroll.scrollTo(savedLocomotivePosition);
            }

            // Clear the saved positions
            sessionStorage.removeItem('scrollPosition');
            sessionStorage.removeItem('locomotiveScrollPosition');
        }, 100);
    } else {
        // If no saved position, initialize Locomotive Scroll normally
        initLocomotiveScroll();
    }

    // Start counter animation
    startCounterAnimation();

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);

    // Function to toggle menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Function to close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking on overlay
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when resizing window
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Add animation delay to menu items
    const menuItems = navLinks.querySelectorAll('li');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Initialize testimonial animations
    initTestimonialAnimations();
});

const productsContainer = document.querySelector('.products');

let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let velocity = 0;

productsContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    productsContainer.classList.add('active');
    startX = e.pageX - productsContainer.offsetLeft;
    scrollLeft = productsContainer.scrollLeft;
    velocity = 0; // Reset velocity
});

productsContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        productsContainer.classList.remove('active');
        applyMomentum(); // Apply momentum when the mouse leaves
    }
});

productsContainer.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        productsContainer.classList.remove('active');
        applyMomentum(); // Apply momentum when the mouse is released
    }
});

productsContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - productsContainer.offsetLeft;
    const walk = (x - startX) * 0.5; // Reduced multiplier for slower scrolling
    velocity = walk; // Capture the velocity for momentum
    productsContainer.scrollLeft = scrollLeft - walk;
});

// Function to apply momentum for smooth scrolling
function applyMomentum() {
    if (Math.abs(velocity) > 0.2) { // Lower threshold for smoother stop
        productsContainer.scrollLeft -= velocity;
        velocity *= 0.9; // Slower decay for smoother and slower momentum

        // Infinite scrolling logic
        if (productsContainer.scrollLeft <= 0) {
            productsContainer.scrollLeft = productsContainer.scrollWidth / 2;
        } else if (
            productsContainer.scrollLeft + productsContainer.offsetWidth >=
            productsContainer.scrollWidth
        ) {
            productsContainer.scrollLeft = productsContainer.scrollWidth / 2 - productsContainer.offsetWidth;
        }

        requestAnimationFrame(applyMomentum);
    }
}

if (window.innerWidth <= 479) {
    const sreElement = document.querySelector('.sre-text');
    if (sreElement) {
        sreElement.textContent = "SRE"; // Replace SRE with Shree Ram Enter
    }
}

// Update the Locomotive Scroll initialization
function initLocomotiveScroll() {
    if (window.innerWidth <= 991) {
        return;
    }

    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: {
            smooth: false
        },
        tablet: {
            smooth: false
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 991) {
            if (scroll) {
                scroll.destroy();
            }
        } else {
            scroll.update();
        }
    });
}

// Counter animation function
function startCounterAnimation() {
    const counters = document.querySelectorAll('.card h1');
    const speed = 100; // Reduced from 200 to 100 for faster counting

    counters.forEach(counter => {
        const targetNumber = parseInt(counter.innerText);
        counter.innerText = '0';

        // Add CSS for animation
        counter.style.transition = 'transform 0.2s ease-out'; // Reduced from 0.3s to 0.2s

        const updateCounter = () => {
            const currentNumber = parseInt(counter.innerText);
            const increment = targetNumber / speed;

            if (currentNumber < targetNumber) {
                const newNumber = Math.ceil(currentNumber + increment);
                counter.innerText = newNumber;

                // Add bounce animation with faster timing
                counter.style.transform = 'translateY(-8px)'; // Reduced bounce height
                setTimeout(() => {
                    counter.style.transform = 'translateY(0)';
                }, 100); // Reduced from 150 to 100ms

                setTimeout(updateCounter, 30); // Reduced from 40 to 30ms
            } else {
                counter.innerText = targetNumber + '+';
                // Final bounce animation
                counter.style.transform = 'translateY(-12px)'; // Reduced from -15px
                setTimeout(() => {
                    counter.style.transform = 'translateY(0)';
                }, 150); // Reduced from 200 to 150ms
            }
        };

        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        updateCounter();
                    }, 50); // Reduced initial delay from 100 to 50ms
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}


//Gsap for hearder //

var tl = gsap.timeline()

tl.from(".navbar", {
    y: -100,
    duration: 0.9,
    opacity: 0,
    stagger: 0.01,
})
tl.from(".part-3 a", {
    x: -100,
    opacity: 0,
    stagger: 0.1,
})
tl.from(".hero h1", {
    y: -10,
    opacity: 0,
    stagger: 0.1,
},)

tl.from(".hero p", {
    opacity: 0,
    stagger: 0.1,
},)
tl.from(".btn a", {
    opacity: 0,
    stagger: 0.1,
},)
tl.from(".images img", {
    opacity: 0,
    duration: 1.5,
    stagger: 0.1,
},)
tl.from(".blurred-circle", {
    opacity: 0,
    duration: 1.5,
    stagger: 0.1,
},)



function initLocomotiveScroll() {
    const scrollContainer = document.querySelector('[data-scroll-container]');

    if (!scrollContainer) return;

    const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true, // Enable smooth scrolling
        smartphone: {
            smooth: true, // Enable smooth scrolling on smartphones
        },
        tablet: {
            smooth: true, // Enable smooth scrolling on tablets
        },
    });

    // Update Locomotive Scroll on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 991) {
            scroll.update(); // Ensure Locomotive Scroll updates on resize
        }
    });
}
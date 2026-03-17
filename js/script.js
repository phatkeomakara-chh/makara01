document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent body scroll when menu is open
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // --- Reveal on Scroll ---
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('span').innerText;
            
            // Show Lightbox
            lightbox.style.display = 'block';
            
            // We can replace '?w=800' with '?w=1920' for HD image in lightbox if we use unsplash URLs
            const hdImgUrl = img.src.replace('w=800', 'w=1920');
            lightboxImg.src = hdImgUrl;
            lightboxCaption.innerText = caption;
            
            // Set aria attribute for accessibility
            lightbox.setAttribute('aria-hidden', 'false');
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close on click outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== lightboxCaption) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.style.display === "block") {
            closeLightbox();
        }
    });
});

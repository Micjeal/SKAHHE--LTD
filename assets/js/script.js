// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const menuIcon = menuBtn.querySelector('i');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
        
        // Toggle menu icon
        if (isExpanded) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }
    }
    
    // Event listeners
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    window.addEventListener('resize', handleResize);
});

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
const vehicleCards = document.querySelectorAll('.vehicle-card');

// Map filter text to data-vehicle-type values
const filterMap = {
    'All Vehicles': 'all',
    'SUVs & 4x4s': 'suv',
    'Saloon Cars': 'saloon',
    'Vans & Minibuses': 'van',
    'Coasters': 'coaster'
};

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get the filter type from the button text
        const filterType = filterMap[btn.textContent.trim()];
        
        // Show/hide vehicles based on filter
        vehicleCards.forEach(card => {
            const vehicleType = card.getAttribute('data-vehicle-type');
            if (filterType === 'all' || vehicleType === filterType) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
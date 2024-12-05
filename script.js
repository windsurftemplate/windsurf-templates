// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll functionality
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

    // Search functionality with improved UX
    const searchInput = document.getElementById('template-search');
    const searchButton = document.getElementById('search-button');
    const templatesSection = document.getElementById('templates');
    const cards = document.querySelectorAll('.col-md-4');
    let searchTimeout;

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        templatesSection.classList.add('searching');
        
        // Clear previous search timeout
        clearTimeout(searchTimeout);
        
        // Set a small delay for better UX
        searchTimeout = setTimeout(() => {
            let hasResults = false;
            
            cards.forEach(card => {
                const cardContent = card.textContent.toLowerCase();
                const matchesSearch = searchTerm === '' || cardContent.includes(searchTerm);
                
                // Animate cards
                if (matchesSearch) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                    hasResults = true;
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Remove searching class after animation
            setTimeout(() => {
                templatesSection.classList.remove('searching');
            }, 300);

        }, 150); // Small delay for better performance
    }

    // Search on input with debounce
    searchInput.addEventListener('input', performSearch);

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search on enter key
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Add focus animation to search input
    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Add active class to navigation items
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

//Home page JS
 // Animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            // Floating elements animation
            const floatingElements = document.querySelectorAll('.floating');
            floatingElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
            
            // Animated counter
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            });
            
            // Scroll animations
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.animated-element');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.classList.add('animate-in');
                    }
                });
            };
            
            // Initialize animations
            window.addEventListener('scroll', animateOnScroll);
            window.addEventListener('load', animateOnScroll);
            
            // Add animated-element class to all sections
            const sections = document.querySelectorAll('.feature-card, .destination-card, .gallery-item, .testimonial-card');
            sections.forEach(section => {
                section.classList.add('animated-element');
            });
        });
        //Destination Page JS
         document.addEventListener('DOMContentLoaded', function() {
            // Get all destination cards
            const destinationCards = document.querySelectorAll('.destination-card');
            const resultsCount = document.getElementById('resultsCount');
            
            // Initialize all cards as visible
            destinationCards.forEach(card => {
                card.classList.add('visible');
            });
            
            // Filter elements
            const continentFilter = document.getElementById('continentFilter');
            const priceFilter = document.getElementById('priceFilter');
            const durationFilter = document.getElementById('durationFilter');
            const categoryButtons = document.querySelectorAll('.filter-btn[data-category]');
            const resetButton = document.getElementById('resetFilters');
            
            // Current filter values
            let currentFilters = {
                continent: 'all',
                price: 'all',
                duration: 'all',
                category: 'all'
            };
            
            // Function to update results count
            function updateResultsCount(visibleCount) {
                resultsCount.textContent = `Showing ${visibleCount} of ${destinationCards.length} destinations`;
            }
            
            // Function to filter cards
            function filterDestinations() {
                let visibleCount = 0;
                
                destinationCards.forEach(card => {
                    const continent = card.getAttribute('data-continent');
                    const price = parseInt(card.getAttribute('data-price'));
                    const duration = parseInt(card.getAttribute('data-duration'));
                    const categories = card.getAttribute('data-categories');
                    
                    // Check continent filter
                    const continentMatch = currentFilters.continent === 'all' || 
                                          continent === currentFilters.continent;
                    
                    // Check price filter
                    let priceMatch = true;
                    if (currentFilters.price === 'low') {
                        priceMatch = price < 1000;
                    } else if (currentFilters.price === 'medium') {
                        priceMatch = price >= 1000 && price <= 1500;
                    } else if (currentFilters.price === 'high') {
                        priceMatch = price > 1500;
                    }
                    
                    // Check duration filter
                    let durationMatch = true;
                    if (currentFilters.duration === 'short') {
                        durationMatch = duration <= 5;
                    } else if (currentFilters.duration === 'medium') {
                        durationMatch = duration >= 6 && duration <= 9;
                    } else if (currentFilters.duration === 'long') {
                        durationMatch = duration >= 10;
                    }
                    
                    // Check category filter
                    const categoryMatch = currentFilters.category === 'all' || 
                                         categories.includes(currentFilters.category);
                    
                    // Show or hide card based on matches
                    if (continentMatch && priceMatch && durationMatch && categoryMatch) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                updateResultsCount(visibleCount);
            }
            
            // Continent filter change
            continentFilter.addEventListener('change', function() {
                currentFilters.continent = this.value;
                filterDestinations();
            });
            
            // Price filter change
            priceFilter.addEventListener('change', function() {
                currentFilters.price = this.value;
                filterDestinations();
            });
            
            // Duration filter change
            durationFilter.addEventListener('change', function() {
                currentFilters.duration = this.value;
                filterDestinations();
            });
            
            // Category filter buttons
            categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    
                    // Remove active class from all category buttons
                    categoryButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    currentFilters.category = category;
                    filterDestinations();
                });
            });
            
            // Reset all filters
            resetButton.addEventListener('click', function() {
                // Reset filter values
                currentFilters = {
                    continent: 'all',
                    price: 'all',
                    duration: 'all',
                    category: 'all'
                };
                
                // Reset UI elements
                continentFilter.value = 'all';
                priceFilter.value = 'all';
                durationFilter.value = 'all';
                
                // Remove active class from category buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Activate "All" category button
                document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
                
                // Show all cards
                filterDestinations();
            });
            
            // Activate "All" category button by default
            document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
            
            // Initialize filter
            filterDestinations();
        });
//travel Trip page css
// Initialize Bootstrap components
        const accordionItems = document.querySelectorAll('.accordion-button');
        accordionItems.forEach(item => {
            item.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (this.classList.contains('collapsed')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
        
        // Add animation to tip items when they come into view
        const tipItems = document.querySelectorAll('.tip-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateX(0)";
                }
            });
        }, { threshold: 0.1 });
        
        tipItems.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateX(-20px)";
            item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            observer.observe(item);
        });

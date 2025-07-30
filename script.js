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
// Plan trip Js
 // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Budget slider
        const budgetSlider = document.getElementById('budget');
        const budgetValue = document.getElementById('budgetValue');
        
        budgetSlider.addEventListener('input', function() {
            budgetValue.textContent = this.value;
        });
        
        // Days input buttons
        const decreaseBtn = document.getElementById('decreaseDays');
        const increaseBtn = document.getElementById('increaseDays');
        const daysInput = document.getElementById('days');
        
        decreaseBtn.addEventListener('click', function() {
            if (parseInt(daysInput.value) > 3) {
                daysInput.value = parseInt(daysInput.value) - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            if (parseInt(daysInput.value) < 21) {
                daysInput.value = parseInt(daysInput.value) + 1;
            }
        });
        
        // Interest selection
        const interestItems = document.querySelectorAll('.interest-item');
        const interestsInput = document.getElementById('interests');
        
        let selectedInterests = [];
        
        interestItems.forEach(item => {
            item.addEventListener('click', function() {
                const interest = this.getAttribute('data-interest');
                
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedInterests = selectedInterests.filter(i => i !== interest);
                } else {
                    this.classList.add('selected');
                    selectedInterests.push(interest);
                }
                
                interestsInput.value = selectedInterests.join(',');
            });
        });
        
        // Form submission
        const tripForm = document.getElementById('tripForm');
        const itineraryResult = document.getElementById('itineraryResult');
        const itineraryTitle = document.getElementById('itineraryTitle');
        const destinationName = document.getElementById('destinationName');
        const tripDuration = document.getElementById('tripDuration');
        const tripBudget = document.getElementById('tripBudget');
        const travelersCount = document.getElementById('travelersCount');
        const dayPlans = document.getElementById('dayPlans');
        const editPlanBtn = document.getElementById('editPlan');
        
        // Destination data for itinerary generation
        const destinationData = {
            "bali": {
                name: "Bali, Indonesia",
                description: "Tropical paradise with stunning beaches and vibrant culture",
                activities: {
                    "adventure": ["White Water Rafting", "Mount Batur Sunrise Trek", "ATV Adventure"],
                    "relaxation": ["Spa Retreat", "Beach Yoga", "Meditation Session"],
                    "culture": ["Traditional Dance Show", "Temple Tour", "Balinese Cooking Class"],
                    "food": ["Local Food Market Tour", "Seafood Dinner", "Coffee Tasting"],
                    "shopping": ["Ubud Art Market", "Seminyak Boutiques", "Silver Jewelry Workshop"],
                    "nature": ["Rice Terrace Walk", "Waterfall Exploration", "Monkey Forest Visit"]
                }
            },
            "paris": {
                name: "Paris, France",
                description: "Romantic city of lights, art, and culinary delights",
                activities: {
                    "adventure": ["Seine River Kayaking", "Catacombs Exploration", "Montmartre Steps Climb"],
                    "relaxation": ["Luxury Spa Day", "Picnic at Luxembourg Gardens", "Boat Cruise"],
                    "culture": ["Louvre Museum Tour", "Notre Dame Visit", "Opera Garnier Show"],
                    "food": ["Patisserie Tour", "Wine Tasting", "Cheese Workshop"],
                    "shopping": ["Champs-Élysées", "Le Marais Boutiques", "Antique Markets"],
                    "nature": ["Versailles Gardens", "Bois de Boulogne", "Botanical Gardens"]
                }
            },
            "kyoto": {
                name: "Kyoto, Japan",
                description: "Ancient capital with temples, gardens, and traditional culture",
                activities: {
                    "adventure": ["Bamboo Forest Hike", "Cycling Tour", "Archery Experience"],
                    "relaxation": ["Onsen Experience", "Tea Ceremony", "Zen Garden Meditation"],
                    "culture": ["Geisha District Tour", "Samurai Museum", "Kimono Wearing"],
                    "food": ["Sushi Making Class", "Ramen Tasting", "Market Food Tour"],
                    "shopping": ["Nishiki Market", "Pottery District", "Traditional Crafts"],
                    "nature": ["Fushimi Inari Shrines", "Cherry Blossom Viewing", "Monkey Park"]
                }
            }
        };
        
        tripForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const destination = document.getElementById('destination').value;
            const budget = budgetSlider.value;
            const days = daysInput.value;
            const travelers = document.getElementById('travelers').value;
            
            // Validate interests
            if (selectedInterests.length === 0) {
                alert("Please select at least one interest");
                return;
            }
            
            // Update itinerary header
            itineraryTitle.textContent = `${name}'s ${destinationData[destination]?.name || "Dream"} Adventure`;
            destinationName.textContent = destinationData[destination]?.name || "Selected Destination";
            tripDuration.textContent = `${days} Days`;
            tripBudget.textContent = `$${budget}`;
            travelersCount.textContent = `${travelers} Traveler${travelers > 1 ? 's' : ''}`;
            
            // Generate day plans
            dayPlans.innerHTML = '';
            for (let i = 1; i <= days; i++) {
                const dayPlan = document.createElement('div');
                dayPlan.className = 'day-plan';
                dayPlan.innerHTML = `
                    <h3 class="day-title"><i class="fas fa-calendar-day"></i> Day ${i}</h3>
                    <div class="activity">
                        <div class="activity-time">9:00 AM</div>
                        <div class="activity-image">
                            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80">
                        </div>
                        <div class="activity-content">
                            <h4 class="activity-title">Morning Exploration</h4>
                            <p class="activity-desc">Begin your day with a guided tour of the city's historic landmarks and hidden gems.</p>
                        </div>
                    </div>
                    <div class="activity">
                        <div class="activity-time">1:00 PM</div>
                        <div class="activity-image">
                            <img src="https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80">
                        </div>
                        <div class="activity-content">
                            <h4 class="activity-title">Local Cuisine Experience</h4>
                            <p class="activity-desc">Enjoy authentic dishes at a highly-rated local restaurant with traditional ambiance.</p>
                        </div>
                    </div>
                    <div class="activity">
                        <div class="activity-time">4:00 PM</div>
                        <div class="activity-image">
                            <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80">
                        </div>
                        <div class="activity-content">
                            <h4 class="activity-title">Cultural Workshop</h4>
                            <p class="activity-desc">Participate in a hands-on workshop to learn about local crafts and traditions.</p>
                        </div>
                    </div>
                    <div class="activity">
                        <div class="activity-time">7:00 PM</div>
                        <div class="activity-image">
                            <img src="https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80">
                        </div>
                        <div class="activity-content">
                            <h4 class="activity-title">Evening Entertainment</h4>
                            <p class="activity-desc">Experience the vibrant nightlife with a performance or scenic evening tour.</p>
                        </div>
                    </div>
                `;
                dayPlans.appendChild(dayPlan);
            }
            
            // Show itinerary
            itineraryResult.style.display = 'block';
            
            // Scroll to itinerary
            itineraryResult.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Edit plan button
        editPlanBtn.addEventListener('click', function() {
            itineraryResult.style.display = 'none';
            document.getElementById('tripForm').scrollIntoView({ behavior: 'smooth' });
        });
    
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
    // Ai Page JS
    document.addEventListener('DOMContentLoaded', function() {
            const chatMessages = document.querySelector('.chat-messages');
            const userInput = document.getElementById('userInput');
            const sendButton = document.getElementById('sendButton');
            const suggestions = document.querySelectorAll('.suggestion');
            
            // Predefined responses
            const responses = {
                "What to pack for Murree in December?": "For Murree in December, pack warm clothing including heavy jackets, gloves, scarves, and thermal wear. Temperatures often drop below freezing. Waterproof boots are essential for snowy conditions. Don't forget moisturizer and lip balm to protect against cold winds.",
                "Best beaches in Thailand": "Thailand has incredible beaches! Top recommendations: 1. Railay Beach (Krabi) - stunning limestone cliffs, 2. White Sand Beach (Koh Chang) - perfect for families, 3. Maya Bay (Koh Phi Phi) - famous from 'The Beach', 4. Freedom Beach (Phuket) - secluded paradise, 5. Sunrise Beach (Koh Lipe) - amazing snorkeling.",
                "Affordable European destinations": "Great budget-friendly European destinations: 1. Portugal (Lisbon & Porto) - amazing food and architecture, 2. Poland (Krakow & Warsaw) - rich history and culture, 3. Hungary (Budapest) - beautiful thermal baths, 4. Greece (Athens & islands) - outside of peak season, 5. Romania - medieval towns and castles.",
                "How to get a visa for Japan?": "For most tourists, Japan offers visa-free entry for stays up to 90 days for citizens of 68 countries including the US, UK, Canada, and Australia. If you need a visa, apply at your nearest Japanese embassy with: 1. Completed application form, 2. Passport valid 6+ months, 3. Passport photo, 4. Proof of itinerary, 5. Bank statements showing sufficient funds. Processing usually takes 5-7 business days.",
                "default": "I'm your Travel Buddy AI assistant. I can help with destination information, packing lists, itinerary planning, budget tips, and travel advice. Try asking about a specific destination or travel need!"
            };
            
            // Add message to chat
            function addMessage(text, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
                
                const now = new Date();
                const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                
                messageDiv.innerHTML = `
                    <p>${text}</p>
                    <div class="message-time">${timeString}</div>
                `;
                
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Show typing indicator
            function showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.classList.add('typing-indicator');
                typingDiv.innerHTML = `
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <span>Travel Buddy is typing...</span>
                `;
                chatMessages.appendChild(typingDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                return typingDiv;
            }
            
            // Process user input
            function processInput() {
                const question = userInput.value.trim();
                if (!question) return;
                
                // Add user message
                addMessage(question, true);
                userInput.value = '';
                
                // Show typing indicator
                const typingIndicator = showTypingIndicator();
                
                // Find response after delay to simulate AI processing
                setTimeout(() => {
                    // Remove typing indicator
                    typingIndicator.remove();
                    
                    // Find matching response
                    let response = responses.default;
                    for (const [key, value] of Object.entries(responses)) {
                        if (question.toLowerCase().includes(key.toLowerCase())) {
                            response = value;
                            break;
                        }
                    }
                    
                    // Add bot response
                    addMessage(response);
                }, 1500);
            }
            
            // Event listeners
            sendButton.addEventListener('click', processInput);
            
            userInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    processInput();
                }
            });
            
            // Suggestions
            suggestions.forEach(suggestion => {
                suggestion.addEventListener('click', function() {
                    userInput.value = this.getAttribute('data-question');
                    processInput();
                });
            });
            
            // Add initial bot message after a delay
            setTimeout(() => {
                addMessage("I can help you with: destination recommendations, packing lists, budget planning, cultural tips, and travel advisories. What would you like to know?");
            }, 1000);
        });
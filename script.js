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
   
        // OpenAI API integration
        const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
        
        // DOM elements
        const chatMessages = document.getElementById('chatMessages');
        const userInput = document.getElementById('userInput');
        const sendButton = document.getElementById('sendButton');
        const suggestions = document.querySelectorAll('.suggestion');
        const apiKeyInput = document.getElementById('apiKeyInput');
        const saveApiKeyButton = document.getElementById('saveApiKey');
        
        // Load saved API key
        let apiKey = localStorage.getItem('travelBuddyApiKey');
        if (apiKey) {
            apiKeyInput.value = '••••••••••••••••';
        }
        
        // Save API key
        saveApiKeyButton.addEventListener('click', () => {
            const key = apiKeyInput.value.trim();
            if (key) {
                apiKey = key;
                localStorage.setItem('travelBuddyApiKey', key);
                apiKeyInput.value = '••••••••••••••••';
                addBotMessage("API key saved successfully! You can now chat with the AI assistant.");
            } else {
                addBotMessage("Please enter a valid OpenAI API key.");
            }
        });
        
        // Add message to chat
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            
            const now = new Date();
            const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
            
            // Format links in the response
            let formattedText = text;
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            formattedText = formattedText.replace(urlRegex, url => {
                return `<a href="${url}" target="_blank" style="color: var(--primary);">${url}</a>`;
            });
            
            messageDiv.innerHTML = `
                <p>${formattedText}</p>
                <div class="message-time">${timeString}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Add bot message
        function addBotMessage(text) {
            addMessage(text, false);
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
        
        // Get AI response from OpenAI API
        async function getAIResponse(userMessage) {
            if (!apiKey) {
                return "Please add your OpenAI API key to enable real responses. Get your API key from OpenAI's website and click 'Save Key' below.";
            }
            
            const typingIndicator = showTypingIndicator();
            sendButton.disabled = true;
            
            try {
                const response = await fetch(OPENAI_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: "You are a helpful travel assistant for Travel Buddy. Provide concise, helpful travel advice. Format your responses with clear paragraphs. When suggesting destinations, include brief reasons why they're recommended. For packing lists, use bullet points. For itineraries, break them down by days. Always aim for responses between 100-300 words."
                            },
                            {
                                role: "user",
                                content: userMessage
                            }
                        ],
                        max_tokens: 500,
                        temperature: 0.7
                    })
                });
                
                const data = await response.json();
                typingIndicator.remove();
                sendButton.disabled = false;
                
                if (data.choices && data.choices.length > 0) {
                    return data.choices[0].message.content.trim();
                } else {
                    return "I couldn't process your request. Please try again.";
                }
            } catch (error) {
                console.error('Error:', error);
                typingIndicator.remove();
                sendButton.disabled = false;
                return "Sorry, I encountered an error. Please check your API key and connection.";
            }
        }
        
        // Process user input
        async function processInput() {
            const question = userInput.value.trim();
            if (!question) return;
            
            // Add user message
            addMessage(question, true);
            userInput.value = '';
            
            // Get AI response
            const response = await getAIResponse(question);
            addBotMessage(response);
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
    
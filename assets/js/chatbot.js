document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.querySelector('.chat-widget');
    const chatClose = document.querySelector('.chat-close');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Sample car data
    const cars = [
        { name: 'Toyota Land Cruiser Prado', type: 'SUV', pricePerDay: 100, features: '4WD, 7 seats, AC' },
        { name: 'Toyota Rav4', type: 'SUV', pricePerDay: 60, features: '4WD, 5 seats, AC' },
        { name: 'Safari Land Cruiser', type: 'Safari Vehicle', pricePerDay: 150, features: '4WD, Pop-up roof, 6 seats' },
        { name: 'Toyota HiAce', type: 'Van', pricePerDay: 80, features: '10 seats, AC, Long-distance' },
        { name: 'Sedan Toyota Premio', type: 'Sedan', pricePerDay: 50, features: '5 seats, AC, Fuel-efficient' }
    ];

    // Contact information
    const contacts = {
        phone: '+256 775 346 164',
        email: 'skahhe@gmail.com',
        whatsapp: '+256 775 346 164',
        address: 'Plot 123, Main Street, Kampala, Uganda',
        website: 'www.skahhetravel.com'
    };

    // Google Custom Search API credentials
    const API_KEY = 'AIzaSyB30JqhyK4uOac6XVG3O3AQKKIn0s-vU8Q'; // Replace with your Google API key
    const CSE_ID = 'YOUR_CSE_ID';   // Replace with your Custom Search Engine ID

    // Toggle chat widget
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', toggleChat);

    // Send message on button click or Enter key
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // Toggle chat function
    function toggleChat() {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            userInput.focus();
        }
    }

    // Send message function
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage('user', message);
        userInput.value = '';

        // Process the message and get bot response
        const botResponse = await getBotResponse(message);
        
        // Simulate bot typing delay
        setTimeout(() => {
            addMessage('bot', botResponse);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }

    // Add message to chat
    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Perform web search using Google Custom Search API
    async function performWebSearch(query) {
        try {
            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                let result = 'Here are some search results:\n\n';
                data.items.slice(0, 3).forEach((item, index) => {
                    result += `${index + 1}. ${item.title}\n${item.snippet}\nLink: ${item.link}\n\n`;
                });
                return result;
            } else {
                return "Sorry, I couldn't find any results for your search. Try rephrasing your query!";
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            return "Sorry, there was an issue performing the web search. Please try again later.";
        }
    }

    // Generate bot response based on user input
    async function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greetings
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return "Hello! Welcome to Skahhe Travel Care. How can I assist you today? Ask about our cars, services, contact details, or search for travel information!";
        }
        
        // About the company
        if (message.includes('about') || message.includes('who are you') || message.includes('what do you do')) {
            return "Skahhe Travel Care is a premium car hire and tour company based in Uganda. We offer a wide range of vehicles and tour packages to make your travel experience exceptional.";
        }
        
        // List all cars
        if (message.includes('list cars') || message.includes('available cars') || message.includes('vehicles')) {
            let response = "Available vehicles at Skahhe Travel Care:\n\n";
            cars.forEach(car => {
                response += `${car.name} (${car.type})\n- Price: $${car.pricePerDay}/day\n- Features: ${car.features}\n\n`;
            });
            response += "Would you like to book any of these vehicles?";
            return response;
        }
        
        // Car types
        if (message.includes('car types') || message.includes('types of cars') || message.includes('vehicle types')) {
            const carTypes = [...new Set(cars.map(car => car.type))];
            return `We offer the following vehicle types:\n- ${carTypes.join('\n- ')}\n\nWould you like to see specific vehicles in any category?`;
        }
        
        // Specific car details
        if (message.includes('car details') || message.includes('about') && message.includes('car')) {
            const carName = cars.find(car => message.includes(car.name.toLowerCase()));
            if (carName) {
                return `${carName.name} Details:\n- Type: ${carName.type}\n- Price: $${carName.pricePerDay}/day\n- Features: ${carName.features}\n\nWould you like to book this vehicle?`;
            }
            return "Please specify which car you'd like details about. You can ask 'List cars' to see all available vehicles.";
        }
        
        // Contact information
        if (message.includes('contact') || message.includes('how to reach') || message.includes('get in touch')) {
            return `Contact Skahhe Travel Care:\n📞 Phone: ${contacts.phone}\n📧 Email: ${contacts.email}\n📱 WhatsApp: ${contacts.whatsapp}\n📍 Address: ${contacts.address}\n🌐 Website: ${contacts.website}\n\nOur customer service is available 24/7 to assist you.`;
        }
        
        // Pricing
        if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            const carName = cars.find(car => message.includes(car.name.toLowerCase()));
            if (carName) {
                return `The ${carName.name} costs $${carName.pricePerDay} per day. Would you like to book it or see other vehicles?`;
            }
            return "Our pricing varies depending on the vehicle type and rental duration. Please ask 'List cars' to see all vehicles and their prices, or specify a vehicle like 'Price of Land Cruiser Prado'.";
        }
        
        // Working hours
        if (message.includes('open') || message.includes('time') || message.includes('hour')) {
            return `Our working hours are:\nMonday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed\n\n24/7 emergency assistance available at ${contacts.phone}.`;
        }
        
        // Location
        if (message.includes('where') && (message.includes('located') || message.includes('location'))) {
            return `Our main office is located at ${contacts.address}. We offer pick-up and drop-off services from major locations including Entebbe International Airport and Kampala city.`;
        }
        
        // Booking
        if (message.includes('book') || message.includes('reserve') || message.includes('rent')) {
            return `To book a vehicle:\n1. Call: ${contacts.phone}\n2. Email: bookings@skahhetravel.com\n3. WhatsApp: ${contacts.whatsapp}\n4. Visit: ${contacts.address}\n\nPlease specify your travel dates and preferred vehicle.`;
        }
        
        // Web search request
        if (message.includes('search') || message.includes('find') || message.includes('look up')) {
            const query = message.replace(/(search|find|look up)/i, '').trim();
            if (query) {
                return await performWebSearch(query + ' site:*.ug Uganda travel');
            }
            return "Please specify what you'd like to search for, e.g., 'Search for tourist attractions in Uganda' or 'Find hotels in Kampala'.";
        }
        
        // Default response
        return "I'm here to help! You can ask about our cars, car types, prices, contact details, or search for travel information.";
    }
});
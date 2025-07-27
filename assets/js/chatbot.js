document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.querySelector('.chat-widget');
    const chatClose = document.querySelector('.chat-close');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Comprehensive car data
    const cars = [
        { 
            name: 'Toyota Land Cruiser Prado', 
            type: 'Luxury SUV', 
            pricePerDay: 150, 
            features: '4WD, 7 seats, Leather seats, Sunroof, Navigation, Bluetooth, USB ports, Climate control, Alloy wheels, Rearview camera',
            fuelType: 'Diesel',
            transmission: 'Automatic',
            year: '2022',
            ac: true,
            luggage: 6,
            recommendedFor: 'Family trips, Safari tours, Long-distance travel',
            availability: 'Available'
        },
        { 
            name: 'Toyota RAV4', 
            type: 'Mid-size SUV', 
            pricePerDay: 80, 
            features: '4WD, 5 seats, Touchscreen display, Keyless entry, Rear AC vents, Power windows, Central locking, Airbags, ABS',
            fuelType: 'Petrol',
            transmission: 'Automatic',
            year: '2021',
            ac: true,
            luggage: 4,
            recommendedFor: 'City tours, Business trips, Small families',
            availability: 'Available'
        },
        { 
            name: 'Safari Land Cruiser', 
            type: 'Safari Vehicle', 
            pricePerDay: 200, 
            features: '4WD, Pop-up roof, 6 seats, Fridge, Power outlets, Raised suspension, All-terrain tires, Snorkel, Roof rack',
            fuelType: 'Diesel',
            transmission: 'Manual',
            year: '2020',
            ac: true,
            luggage: 8,
            recommendedFor: 'Wildlife safaris, Off-road adventures, Photography tours',
            availability: 'Available'
        },
        { 
            name: 'Toyota HiAce', 
            type: 'Passenger Van', 
            pricePerDay: 120, 
            features: '14 seats, AC, Entertainment system, Reclining seats, Overhead storage, Sliding doors, Power steering',
            fuelType: 'Diesel',
            transmission: 'Manual',
            year: '2021',
            ac: true,
            luggage: 5,
            recommendedFor: 'Group travel, Airport transfers, Corporate events',
            availability: 'Available'
        },
        { 
            name: 'Toyota Premio', 
            type: 'Sedan', 
            pricePerDay: 60, 
            features: '5 seats, Touchscreen infotainment, Push start, Power windows, Airbags, ABS, Power mirrors, USB ports',
            fuelType: 'Petrol',
            transmission: 'Automatic',
            year: '2022',
            ac: true,
            luggage: 3,
            recommendedFor: 'Business meetings, City tours, Couples',
            availability: 'Available'
        },
        { 
            name: 'Toyota Prado TX', 
            type: 'Luxury SUV', 
            pricePerDay: 180, 
            features: '4WD, 7 seats, Leather interior, Sunroof, Navigation, Premium sound system, 360° camera, Heated seats',
            fuelType: 'Diesel',
            transmission: 'Automatic',
            year: '2023',
            ac: true,
            luggage: 7,
            recommendedFor: 'Luxury travel, Family trips, Business executives',
            availability: 'Available'
        },
        { 
            name: 'Toyota Coaster', 
            type: 'Minibus', 
            pricePerDay: 250, 
            features: '25 seats, AC, Entertainment system, Reclining seats, Overhead storage, PA system, Reading lights',
            fuelType: 'Diesel',
            transmission: 'Manual',
            year: '2022',
            ac: true,
            luggage: 10,
            recommendedFor: 'Large groups, School trips, Corporate events',
            availability: 'Available'
        }
    ];

    // Company information
    const companyInfo = {
        name: 'Skahhe Travel Care',
        about: 'Skahhe Travel Care is a premier car hire and tour company based in Uganda, offering exceptional travel experiences with well-maintained vehicles and professional services. We specialize in self-drive car rentals, chauffeur services, and customized tour packages across East Africa.',
        mission: 'To provide reliable, safe, and comfortable transportation solutions while delivering exceptional customer service and creating memorable travel experiences.',
        vision: 'To be the leading travel and car hire service provider in East Africa, known for excellence and reliability.',
        values: 'Integrity, Professionalism, Customer Satisfaction, Safety, Innovation',
        team: 'Our team consists of experienced travel consultants, professional drivers, and customer service representatives dedicated to making your journey comfortable and memorable.',
        awards: ['Best Car Rental Company 2022', 'Excellence in Customer Service 2023', 'TripAdvisor Certificate of Excellence 2023'],
        partners: ['Uganda Tourism Board', 'Auto Care Uganda', 'Uganda Wildlife Authority', 'Uganda Hotel Owners Association'],
        owner: {
            name: 'Skahhe Travel Care Management',
            about: 'Skahhe Travel Care is a proudly Ugandan-owned company with a strong commitment to excellence in the travel and tourism industry. Our leadership team brings together decades of combined experience in transportation, hospitality, and customer service.',
            contact: 'For owner-related inquiries, please contact: info@skahhetravels.com'
        },
        partnerCompanies: [
            {
                name: 'SPiDD Africa',
                sector: 'ICT for Development, Women in Tech, Digital Transformation',
                value: 'Deep expertise in capacity-building and digital inclusion. Implements the Tech She-Roe program to celebrate women leaders in tech. Ideal for joint ventures on digital skilling, gender-based ICT inclusion, and youth innovation labs.'
            },
            {
                name: 'Afrikan Hub for Girls Empowerment (AHGEI)',
                sector: 'STEM Education, Girls’ Empowerment',
                value: 'Runs tech boot camps and science festivals for girls across East Africa. Aims to reach 1 million learners by 2034. Strong alignment with CSR initiatives, girl-child advocacy, and SDG 5 & 4 partnerships.'
            },
            {
                name: 'BDO Uganda',
                sector: 'Financial Consulting, Auditing, Advisory',
                value: 'Part of a global network of professional service firms. Provides governance audits, risk assurance, and financial compliance tools for NGOs and startups. Trusted by donors and public-private institutions for financial transparency services.'
            },
            {
                name: 'Linkage Models',
                sector: 'Development Consultancy, Modeling/Behavioral Research',
                value: 'Expertise in growth modeling and evaluation frameworks. Serves in M&E, behavioral analysis, and program optimization roles.'
            },
            {
                name: 'IGR (Institution for Growth Research & Evaluation)',
                sector: 'Policy Research, M&E, Development',
                value: 'Supports national and regional growth through data-backed research. Ideal for collaboration in evaluations, data systems building, and impact reporting for programs.'
            },
            {
                name: 'Adroit Consult International',
                sector: 'Strategic Consulting, Organizational Development',
                value: 'Offers professional consulting services in governance, finance, and systems development. Suitable for project design, impact analysis, and institutional capacity development.'
            },
            {
                name: 'FSD Uganda (Financial Sector Deepening Uganda)',
                sector: 'Inclusive Finance, FinTech Development',
                value: 'Strong donor-funded initiatives promoting inclusive finance and economic empowerment. High-value partner for MSME financing programs, digital financial literacy campaigns, and fintech innovation labs.'
            },
            {
                name: 'International Republican Institute (IRI) Uganda',
                sector: 'Democracy, Governance, Civic Participation',
                value: 'Globally recognized for democracy support and political participation. Suitable for civic tech, electoral reform support, or youth in governance initiatives.'
            },
            {
                name: 'ACODE (Advocates Coalition for Development and Environment)',
                sector: 'Policy Advocacy, Climate Justice, Governance',
                value: 'A thought leader on public policy and environmental governance. Could co-lead advocacy campaigns, research programs, or civic education projects with wide institutional trust.'
            },
            {
                name: 'UGANET (Uganda Network on Law, Ethics, and HIV/AIDS)',
                sector: 'Health Justice, Legal Aid, Gender Rights',
                value: 'Combines law and public health to empower marginalized communities. Strong fit for GBV response frameworks, human rights-based service delivery, and PLHIV justice initiatives.'
            },
            {
                name: 'CDFU (Communication for Development Foundation Uganda)',
                sector: 'Behavior Change Communication (BCC), Health & Education',
                value: 'Experts in radio, print, and community-based communication. Ideal co-implementers for awareness campaigns, youth behavior change, or reproductive health programs.'
            },
            {
                name: 'SIHA Network (Strategic Initiative for Women in the Horn of Africa)',
                sector: 'Women’s Rights, Conflict Advocacy',
                value: 'Regional advocacy network focusing on women in fragile states. Ideal partner for GBV prevention, refugee women’s empowerment, and cross-border campaigns.'
            }
        ]
    };

    // Contact information
    const contacts = {
        phone: '+256 775 346 164',
        phone2: '+256 700 123 456',
        email: 'info@skahhetravels.com',
        whatsapp: '+256 775 346 164',
        address: 'Plot 42, Kira Road, Kampala, Uganda',
        website: 'https://skahhetravels.netlify.app/',
        social: {
            facebook: 'facebook.com/skahhetravels',
            instagram: 'instagram.com/skahhetravels',
            twitter: 'twitter.com/skahhetravels',
            linkedin: 'linkedin.com/company/skahhetravels'
        },
        workingHours: {
            weekdays: '8:00 AM - 6:00 PM',
            saturday: '9:00 AM - 4:00 PM',
            sunday: 'Closed (Emergency services available)'
        },
        emergency: '+256 772 987 654',
        bookingEmail: 'bookings@skahhetravels.com',
        supportEmail: 'support@skahhetravels.com'
    };

    // Tour packages
    const tourPackages = [
        {
            name: 'Murchison Falls Safari',
            duration: '3 Days / 2 Nights',
            price: '$450 per person',
            highlights: 'Game drives, Boat cruise to the falls, Bird watching, Top of the falls hike',
            includes: 'Full board accommodation, Park fees, Guide, Transport, Water',
            bestTime: 'Year-round',
            description: 'Experience the magnificent Murchison Falls, where the Nile River explodes through a narrow gorge, creating a thunderous waterfall. This safari includes game drives in the national park, a boat cruise to the base of the falls, and a hike to the top for breathtaking views.'
        },
        {
            name: 'Bwindi Gorilla Trekking',
            duration: '3 Days / 2 Nights',
            price: '$1200 per person',
            highlights: 'Gorilla trekking, Community visit, Nature walks',
            includes: 'Gorilla permit, Accommodation, Meals, Guide, Transport',
            bestTime: 'June-August & December-February',
            description: 'Embark on a once-in-a-lifetime adventure to track the endangered mountain gorillas in their natural habitat. This tour includes a guided trek through the Bwindi Impenetrable Forest, cultural encounters with local communities, and opportunities to see other wildlife.'
        },
        {
            name: 'Queen Elizabeth National Park',
            duration: '4 Days / 3 Nights',
            price: '$750 per person',
            highlights: 'Game drives, Boat cruise on Kazinga Channel, Tree climbing lions',
            includes: 'Full board accommodation, Park fees, Guide, Transport',
            bestTime: 'Year-round',
            description: 'Discover the diverse ecosystems of Queen Elizabeth National Park, home to tree-climbing lions, elephants, hippos, and over 600 bird species. The tour includes game drives, a boat cruise on the Kazinga Channel, and visits to the Kyambura Gorge for chimp tracking.'
        },
        {
            name: 'Sipi Falls Adventure',
            duration: '2 Days / 1 Night',
            price: '$300 per person',
            highlights: 'Hiking to three waterfalls, Coffee tour, Abseiling (optional)',
            includes: 'Accommodation, Meals, Guide, Transport',
            bestTime: 'Year-round',
            description: 'Explore the stunning Sipi Falls in Eastern Uganda, featuring three beautiful waterfalls with the tallest dropping 100 meters. The tour includes hiking through local villages, learning about coffee production, and optional activities like abseiling down the falls for the adventurous.'
        },
        {
            name: 'Kidepo Valley National Park',
            duration: '5 Days / 4 Nights',
            price: '$1500 per person',
            highlights: 'Game drives, Cultural encounters, Scenic landscapes',
            includes: 'Full board accommodation, Park fees, Guide, Transport, All activities',
            bestTime: 'November to March',
            description: 'Experience one of Africa\'s most remote and untouched wilderness areas. Kidepo Valley National Park offers spectacular savannah landscapes, abundant wildlife including lions, cheetahs, and zebras, and unique cultural experiences with the Karamojong people.'
        },
        {
            name: 'Lake Bunyonyi Relaxation',
            duration: '3 Days / 2 Nights',
            price: '$400 per person',
            highlights: 'Boat rides, Island hopping, Bird watching, Community visits',
            includes: 'Accommodation, Meals, Boat trips, Guide',
            bestTime: 'Year-round',
            description: 'Unwind at Lake Bunyonyi, Uganda\'s deepest lake, known for its beautiful terraced hills and 29 islands. This relaxing getaway includes boat trips, visits to local communities, and opportunities for swimming, canoeing, and bird watching in a serene environment.'
        }
    ];

    // Services offered
    const services = [
        {
            name: 'Self-Drive Car Hire',
            description: 'Rent a car for personal or business use with flexible rental periods and comprehensive insurance options.',
            features: ['Unlimited mileage', '24/7 road assistance', 'Comprehensive insurance', 'Flexible pickup/drop-off'],
            priceRange: 'From $50/day',
            popularVehicles: ['Toyota Premio', 'Toyota RAV4', 'Toyota Land Cruiser Prado']
        },
        {
            name: 'Chauffeur Services',
            description: 'Professional drivers available for airport transfers, business meetings, and city tours.',
            features: ['Professional drivers', 'Punctual service', 'Local knowledge', 'Comfortable vehicles'],
            priceRange: 'From $30/hour',
            popularVehicles: ['Toyota Prado TX', 'Mercedes-Benz S-Class', 'Toyota Hiace']
        },
        {
            name: 'Airport Transfers',
            description: 'Reliable and comfortable transfers to and from Entebbe International Airport and other major airports.',
            features: ['Meet and greet', 'Flight monitoring', 'Child seats available', 'Fixed prices'],
            priceRange: 'From $40/transfer',
            popularRoutes: ['Entebbe Airport to Kampala', 'Kampala to Jinja', 'Entebbe to Jinja']
        },
        {
            name: 'Safari Tours',
            description: 'Guided tours to Uganda\'s national parks and wildlife reserves with experienced guides.',
            features: ['Custom itineraries', 'Park entry fees included', 'Accommodation arrangements', 'Professional guides'],
            priceRange: 'From $300/person',
            popularDestinations: ['Murchison Falls', 'Queen Elizabeth NP', 'Bwindi Impenetrable Forest']
        },
        {
            name: 'Long-term Rentals',
            description: 'Special rates for extended car rentals with full maintenance and support included.',
            features: ['Monthly discounts', 'Regular maintenance', 'Replacement vehicles', 'Dedicated account manager'],
            priceRange: 'From $800/month',
            popularFor: ['Expatriates', 'Business travelers', 'NGO workers']
        },
        {
            name: 'Corporate Services',
            description: 'Tailored transportation solutions for businesses, including corporate events and staff transportation.',
            features: ['Fleet management', 'Dedicated account manager', 'Custom reporting', '24/7 support'],
            priceRange: 'Custom quotes',
            clients: ['International organizations', 'Embassies', 'Corporate companies', 'NGOs']
        }
    ];

    // FAQ data
    const faqs = [
        {
            question: 'What documents do I need to rent a car?',
            answer: 'You need a valid driver\'s license (international or from your home country), a copy of your passport, and a valid credit card in the main driver\'s name for the security deposit.'
        },
        {
            question: 'What is included in the rental price?',
            answer: 'Our rental prices include unlimited mileage, comprehensive insurance, 24/7 road assistance, and vehicle maintenance. Additional options like GPS, child seats, and additional drivers may incur extra charges.'
        },
        {
            question: 'Can I take the car to another country?',
            answer: 'Yes, cross-border travel is possible with prior arrangement. Additional documentation and fees may apply. Please contact us at least 48 hours before your trip to make the necessary arrangements.'
        },
        {
            question: 'What is your cancellation policy?',
            answer: 'You can cancel your booking free of charge up to 48 hours before the rental start time. For cancellations within 48 hours, a fee equivalent to one day\'s rental may apply.'
        },
        {
            question: 'Do you offer one-way rentals?',
            answer: 'Yes, we offer one-way rentals within Uganda. Additional drop-off fees may apply depending on the location. Please contact us for specific rates and availability.'
        },
        {
            question: 'What happens if the car breaks down?',
            answer: 'All our vehicles are regularly serviced and maintained. In the rare event of a breakdown, our 24/7 emergency assistance will provide immediate support and arrange for a replacement vehicle if necessary.'
        },
        {
            question: 'Is there a minimum rental period?',
            answer: 'The minimum rental period is 24 hours. We also offer hourly rates for special requirements. Please contact us for more information.'
        },
        {
            question: 'Can I modify my booking?',
            answer: 'Yes, you can modify your booking by contacting our customer service team. Changes are subject to vehicle availability and may affect the rental price.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept credit/debit cards (Visa, MasterCard), bank transfers, and mobile money payments. A security deposit is required for all rentals.'
        },
        {
            question: 'Do you provide child seats?',
            answer: 'Yes, we offer child seats for an additional fee. Please request them at the time of booking as availability is limited.'
        },
        {
            question: 'What is your fuel policy?',
            answer: 'Vehicles are provided with a full tank and should be returned with a full tank. Alternatively, you can choose our full-to-empty fuel option for an additional fee.'
        },
        {
            question: 'Can I rent a car if I am under 25?',
            answer: 'Yes, drivers between 23-25 years old can rent vehicles but may be subject to a young driver surcharge. Drivers under 23 are not permitted to rent vehicles.'
        },
        {
            question: 'Do you offer insurance?',
            answer: 'Yes, all our rentals include comprehensive insurance with a standard excess. You can reduce your excess by purchasing our Super Collision Damage Waiver (SCDW) for additional peace of mind.'
        },
        {
            question: 'Can someone else drive the rental car?',
            answer: 'Additional drivers can be added to the rental agreement for a small fee. All drivers must meet our age and license requirements and be present at the time of rental with their documentation.'
        },
        {
            question: 'What should I do in case of an accident?',
            answer: 'In case of an accident, please contact our emergency number immediately. Take photos of the damage and obtain a police report if required. Do not admit fault or make any agreements with third parties.'
        }
    ];

    // Common questions and answers for quick responses
    const commonQuestions = [
        { q: 'how much does it cost to rent a car', a: 'Our car rental prices start from $50 per day for a sedan and go up to $250 per day for luxury SUVs. The exact price depends on the vehicle type, rental duration, and any additional services you require. For example, our Toyota Premio is $60/day while the Safari Land Cruiser is $200/day. Would you like a quote for a specific vehicle or date range?' },
        { q: 'do you offer airport pickup', a: 'Yes, we offer convenient airport pickup and drop-off services at Entebbe International Airport. Our representative will meet you at the arrivals hall with a name sign. The service includes a meet and greet, assistance with luggage, and a comfortable transfer to your destination. Would you like to book an airport transfer?' },
        { q: 'what is included in the rental price', a: 'Our rental prices include unlimited mileage, comprehensive insurance, 24/7 road assistance, and vehicle maintenance. Additional options like GPS, child seats, and additional drivers may incur extra charges. All our vehicles come with a full tank of fuel and should be returned with the same amount.' },
        { q: 'do you have 4x4 vehicles', a: 'Yes, we have a variety of 4x4 vehicles perfect for Uganda\'s terrain, including the Toyota Land Cruiser Prado, Safari Land Cruiser, and Toyota RAV4. These vehicles are ideal for safaris, national parks, and off-road adventures. Would you like more details about our 4x4 options?' },
        { q: 'what are your working hours', a: `Our working hours are:\n- Monday to Friday: ${contacts.workingHours.weekdays}\n- Saturday: ${contacts.workingHours.saturday}\n- Sunday: ${contacts.workingHours.sunday}\n\nFor emergencies outside working hours, please call our 24/7 emergency line at ${contacts.emergency}.` },
        { q: 'how can I pay for my rental', a: 'We accept various payment methods including credit/debit cards (Visa, MasterCard), bank transfers, and mobile money payments. A security deposit is required for all rentals, which will be refunded upon safe return of the vehicle in the same condition.' },
        { q: 'can I extend my rental period', a: 'Yes, you can extend your rental period subject to vehicle availability. Please contact our customer service team at least 24 hours before your scheduled return time to arrange an extension. Additional charges will apply for the extended period.' },
        { q: 'what happens if I return the car late', a: 'If you return the car later than the agreed time without prior notification, late return fees will apply. We understand that delays can happen, so please inform us as soon as possible if you anticipate being late to avoid additional charges.' },
        { q: 'do you offer one way rentals', a: 'Yes, we offer one-way rentals within Uganda. Additional drop-off fees may apply depending on the location. Please contact us for specific rates and availability for your desired pick-up and drop-off locations.' },
        { q: 'what is your fuel policy', a: 'Our standard fuel policy is full-to-full. You will receive the vehicle with a full tank and should return it with a full tank. Alternatively, you can choose our full-to-empty option for an additional fee, where you pay for a full tank upfront and can return the vehicle empty.' },
        { q: 'can I rent a car without a credit card', a: 'A valid credit card in the main driver\'s name is required for the security deposit. However, we may accept alternative arrangements such as a cash deposit in some cases. Please contact our customer service team to discuss your options.' },
        { q: 'what is the minimum rental period', a: 'The minimum rental period is 24 hours. We also offer hourly rates for special requirements. Please contact us for more information about our short-term rental options.' },
        { q: 'do you provide insurance', a: 'Yes, all our rentals include comprehensive insurance with a standard excess. You can reduce your excess by purchasing our Super Collision Damage Waiver (SCDW) for additional peace of mind. The insurance covers damage to the vehicle and third-party liability.' },
        { q: 'can I drive to any national park', a: 'Yes, you can drive to any national park in Uganda with our vehicles. However, some parks may require 4x4 vehicles, especially during the rainy season. We can recommend the most suitable vehicle for your planned itinerary and road conditions.' },
        { q: 'what should I do in case of an accident', a: 'In case of an accident, please follow these steps:\n1. Ensure everyone is safe and call emergency services if needed\n2. Contact our emergency number ${contacts.emergency} immediately\n3. Take photos of the damage and the accident scene\n4. Obtain a police report if required\n5. Do not admit fault or make any agreements with third parties\n6. Our team will guide you through the next steps' },
        { q: 'do you offer discounts for long term rentals', a: 'Yes, we offer special discounts for long-term rentals. For rentals of one month or longer, you can enjoy discounts of up to 20% off our standard daily rates. Please contact our sales team for a personalized quote based on your specific requirements.' },
        { q: 'what is your policy on additional drivers', a: 'Additional drivers can be added to the rental agreement for a small fee. All drivers must meet our age and license requirements and be present at the time of rental with their documentation. Each additional driver must provide a valid driver\'s license and may be subject to the same requirements as the primary driver.' },
        { q: 'can I cancel or modify my booking', a: 'Yes, you can cancel or modify your booking free of charge up to 48 hours before the rental start time. For cancellations within 48 hours, a fee equivalent to one day\'s rental may apply. Changes are subject to vehicle availability and may affect the rental price.' },
        { q: 'what is your policy on mileage', a: 'All our rentals come with unlimited mileage, so you can drive as much as you like without worrying about additional charges. This allows you the freedom to explore Uganda at your own pace without any restrictions.' },
        { q: 'do you provide roadside assistance', a: 'Yes, we provide 24/7 roadside assistance with all our rentals. Our dedicated support team is available around the clock to assist you with any issues that may arise during your rental period. Simply call our emergency number ${contacts.emergency} for immediate assistance.' }
    ];

    // Fuzzy string matching function to handle typos and variations
    function fuzzyMatch(str1, str2) {
        if (!str1 || !str2) return 0;
        
        // Convert to lowercase and remove extra spaces
        const cleanStr1 = str1.toLowerCase().trim().replace(/\s+/g, ' ');
        const cleanStr2 = str2.toLowerCase().trim().replace(/\s+/g, ' ');
        
        // Exact match
        if (cleanStr1 === cleanStr2) return 1.0;
        
        // Check for partial match
        if (cleanStr1.includes(cleanStr2) || cleanStr2.includes(cleanStr1)) return 0.9;
        
        // Check for common abbreviations and variations
        const variations = [
            { pattern: 'whats', replacement: 'what is' },
            { pattern: 'wats', replacement: 'what is' },
            { pattern: 'wat', replacement: 'what' },
            { pattern: 'pls', replacement: 'please' },
            { pattern: 'plz', replacement: 'please' },
            { pattern: 'thx', replacement: 'thanks' },
            { pattern: 'tx', replacement: 'thanks' },
            { pattern: '\\bu\\b', replacement: 'you' },
            { pattern: '\\br\\b', replacement: 'are' },
            { pattern: '\\bur\\b', replacement: 'your' },
            { pattern: '\\b4\\b', replacement: 'for' },
            { pattern: '\\b2\\b', replacement: 'to' },
            { pattern: '\\bb\\b', replacement: 'be' },
            { pattern: '\\bn\\b', replacement: 'and' },
            { pattern: '&', replacement: 'and' },
            { pattern: '\\+', replacement: 'and' }
        ];
        
        // Replace common variations
        let normalized1 = cleanStr1;
        let normalized2 = cleanStr2;
        
        variations.forEach(({pattern, replacement}) => {
            const regex = new RegExp(`\\b${pattern}\\b`, 'g');
            normalized1 = normalized1.replace(regex, replacement);
            normalized2 = normalized2.replace(regex, replacement);
        });
        
        // Check if either string contains the other after normalization
        if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return 0.85;
        
        // Calculate Levenshtein distance for similarity
        const len1 = normalized1.length;
        const len2 = normalized2.length;
        const maxLen = Math.max(len1, len2);
        
        if (maxLen === 0) return 0;
        
        // Simple character-based similarity (faster than full Levenshtein)
        let matches = 0;
        const maxToCheck = Math.min(10, Math.max(len1, len2));
        
        for (let i = 0; i < maxToCheck; i++) {
            if (i < len1 && i < len2 && normalized1[i] === normalized2[i]) {
                matches++;
            }
        }
        
        const similarity = matches / maxLen;
        
        // If similarity is high enough, consider it a match
        return similarity > 0.6 ? similarity : 0;
    }
    
    // Function to find best match from an array of strings
    function findBestMatch(input, options, threshold = 0.5) {
        if (!input || !options || !options.length) return null;
        
        let bestMatch = { score: 0, value: null };
        const inputStr = input.toLowerCase();
        
        for (const option of options) {
            const optionStr = option.toLowerCase();
            const score = fuzzyMatch(inputStr, optionStr);
            
            if (score > bestMatch.score) {
                bestMatch = { score, value: option };
            }
        }
        
        return bestMatch.score >= threshold ? bestMatch.value : null;
    }
    
    // Backend API configuration
    const API_BASE_URL = 'http://localhost:5000'; // Update this in production to your actual backend URL

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

    // Perform web search using our backend API with OpenAI
    async function performWebSearch(query) {
        try {
            const response = await fetch('http://localhost:5000/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    provider: 'openai'
                })
            });

            const data = await response.json();
            
            // If we got a response, return it (server handles fallbacks)
            if (response.ok) {
                return data.aiResponse || data.message || "I'm not sure how to respond to that. Could you try rephrasing your question?";
            }
            
            // If there was an error, try to provide a helpful message
            console.error('Search API error:', data.error || 'Unknown error');
            
            // Common error messages to handle gracefully
            const lowerQuery = query.toLowerCase();
            if (data.error && data.error.includes('quota') || data.error.includes('limit')) {
                return "I'm currently experiencing high demand. You can contact us directly at " + 
                       `${contacts.phone} or ${contacts.email} for immediate assistance.`;
            }
            
            // Fallback responses based on query content
            if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
                return "Hello! Thanks for reaching out to Skahhe Travel Care. How can I assist you today?";
            } else if (lowerQuery.includes('help')) {
                return `I can help you with:\n- Car rental information\n- Tour packages\n- Pricing and availability\n- Booking assistance\n\nPlease let me know what you need help with!`;
            } else if (lowerQuery.includes('contact')) {
                return `You can reach us at:\n📞 Phone: ${contacts.phone}\n📧 Email: ${contacts.email}\n📍 Location: Kampala, Uganda`;
            } else if (lowerQuery.includes('service') || lowerQuery.includes('offer')) {
                return `We offer:\n🚗 Self-drive car hire\n🚙 Chauffeur services\n🌍 Tour packages\n✈️ Airport transfers\n\nWhat would you like to know more about?`;
            }
            
            // Default error message
            return `I'm having trouble connecting to our service right now. ` +
                   `Please try again later or contact us at ${contacts.phone} for immediate assistance.`;
            
        } catch (error) {
            console.error('Search error:', error);
            return `I'm having trouble connecting to the search service right now. This might be a temporary issue. You can try again in a few moments or contact us directly at ${contacts.email} or ${contacts.phone} for assistance.`;
        }
    }
    async function getBotResponse(userMessage) {
        const message = userMessage.trim();
        const lowerMessage = message.toLowerCase();
        
        // Check for greetings with fuzzy matching
        const greetingWords = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
        const isGreeting = greetingWords.some(word => 
            fuzzyMatch(message, word) > 0.7 || 
            lowerMessage.includes(word)
        );
        
        if (isGreeting) {
            return "Hello! Welcome to Skahhe Travel Care. I'm here to assist you with car rentals, tour packages, and travel information. How can I help you today?";
        }
        
        // Check for thank you messages with variations
        const thanksWords = ['thank', 'thanks', 'appreciate', 'grateful'];
        const isThanks = thanksWords.some(word => 
            fuzzyMatch(message, word) > 0.6 || 
            lowerMessage.includes(word)
        );
        
        if (isThanks) {
            return "You're welcome! Is there anything else I can assist you with?";
        }
        
        // Check for goodbyes with variations
        const goodbyeWords = ['bye', 'goodbye', 'see you', 'farewell', 'have a good day', 'have a good night'];
        const isGoodbye = goodbyeWords.some(word => 
            fuzzyMatch(message, word) > 0.7 || 
            lowerMessage.includes(word)
        );
        
        if (isGoodbye) {
            return "Thank you for contacting Skahhe Travel Care! Have a wonderful day and safe travels! If you have more questions later, feel free to ask.";
        }
        
        // Check for car-related queries with fuzzy matching
        const carTriggers = ['car', 'vehicle', 'suv', '4x4', 'sedan', 'van', 'coaster', 'hiace', 'prado', 'land cruiser', 'automobile'];
        const isCarQuery = carTriggers.some(trigger => 
            fuzzyMatch(message, trigger) > 0.6 || 
            lowerMessage.includes(trigger)
        );
        
        // Handle specific car details with fuzzy matching
        if (isCarQuery && (fuzzyMatch(message, 'detail') > 0.6 || fuzzyMatch(message, 'spec') > 0.6 || fuzzyMatch(message, 'about') > 0.7)) {
            // First try exact matches
            let car = cars.find(c => 
                c.name.toLowerCase().split(' ').some(word => 
                    lowerMessage.includes(word.toLowerCase())
                ) ||
                (c.altNames && c.altNames.some(alt => 
                    lowerMessage.includes(alt.toLowerCase())
                ))
            );
            
            // If no exact match, try fuzzy matching
            if (!car) {
                const carNames = cars.map(c => c.name);
                const bestMatch = findBestMatch(message, carNames);
                if (bestMatch) {
                    car = cars.find(c => c.name === bestMatch);
                }
            }
            
            if (car) {
                return `🚗 *${car.name}* (${car.year})

• *Type:* ${car.type}
• *Price:* $${car.pricePerDay}/day
• *Transmission:* ${car.transmission}
• *Fuel Type:* ${car.fuelType}
• *Seating Capacity:* ${car.luggage} passengers
• *Luggage Capacity:* ${car.luggage} suitcases
• *AC:* ${car.ac ? 'Yes' : 'No'}
• *Features:* ${car.features}
• *Best For:* ${car.recommendedFor}
• *Availability:* ${car.availability}

Would you like to check availability or book this vehicle?`;
            }
        }
        
        // List all vehicles
        if (isCarQuery || message.includes('list car') || message.includes('available car') || message.includes('vehicles')) {
            let response = '🚗 *Our Vehicle Fleet* 🚗\n\n';
            cars.forEach((car, index) => {
                response += `${index + 1}. *${car.name}* (${car.type}) - $${car.pricePerDay}/day\n`;
                response += `   👉 Seats: ${car.luggage} | ${car.transmission} | ${car.fuelType}\n\n`;
            });
            response += 'For more details about any vehicle, just ask! For example: "Tell me about the Toyota Land Cruiser"';
            return response;
        }
        
        // Tour packages
        if (message.includes('tour') || message.includes('safari') || message.includes('package')) {
            if (message.includes('list') || message.includes('available') || message.includes('show')) {
                let response = '🌟 *Our Popular Tour Packages* 🌟\n\n';
                tourPackages.forEach((pkg, index) => {
                    response += `*${index + 1}. ${pkg.name}* (${pkg.duration})\n`;
                    response += `   💰 ${pkg.price}\n`;
                    response += `   ⏱️ ${pkg.duration}\n`;
                    response += `   ✨ ${pkg.highlights.split(', ').slice(0, 2).join(', ')}...\n\n`;
                });
                response += 'For more details about any package, just ask! For example: "Tell me more about Murchison Falls Safari"';
                return response;
            }
            
            // Check for specific tour package details
            const tour = tourPackages.find(pkg => 
                pkg.name.toLowerCase().split(' ').some(word => message.includes(word.toLowerCase()))
            );
            
            if (tour) {
                return `*${tour.name}* (${tour.duration})\n\n` +
                `💰 *Price:* ${tour.price}\n` +
                `⏱️ *Duration:* ${tour.duration}\n` +
                `✨ *Highlights:*\n   - ${tour.highlights.split(', ').join('\n   - ')}\n\n` +
                `✅ *Includes:*\n   - ${tour.includes.split(', ').join('\n   - ')}\n\n` +
                `📅 *Best Time to Visit:* ${tour.bestTime}\n\n` +
                `${tour.description}\n\n` +
                `Would you like to book this tour or need more information?`;
            }
        }
        
        // Services
        if (message.includes('service') || message.includes('offer') || message.includes('provide')) {
            let response = '🛠️ *Our Services* 🛠️\n\n';
            services.forEach((service, index) => {
                response += `*${index + 1}. ${service.name}* (${service.priceRange})\n`;
                response += `   ${service.description}\n\n`;
            });
            response += 'For more details about any service, just ask! For example: "Tell me more about Self-Drive Car Hire"';
            return response;
        }
        
        // About the company
        if (message.includes('about') || message.includes('who are you') || message.includes('company')) {
            // Check if asking about the owner
            if (message.includes('owner') || message.includes('who owns') || message.includes('founder')) {
                return `*About ${companyInfo.owner.name}*\n\n` +
                `${companyInfo.owner.about}\n\n` +
                `*Contact for Owner Inquiries:*\n   ${companyInfo.owner.contact}`;
            }
            
            // Check if asking about partners or partner companies
            if (message.includes('partner') || message.includes('collaborat') || message.includes('affiliat')) {
                if (message.match(/how many partn|number of partn|total partn/i)) {
                    return `We currently partner with ${companyInfo.partnerCompanies.length} organizations across various sectors. Would you like me to list them all or are you interested in a specific sector?`;
                }
                
                // Check for specific partner company
                const partnerQuery = companyInfo.partnerCompanies.find(p => 
                    p.name.toLowerCase().includes(message.toLowerCase()) ||
                    message.toLowerCase().includes(p.name.split(' ')[0].toLowerCase())
                );
                
                if (partnerQuery) {
                    return `*${partnerQuery.name}*\n` +
                    `*Sector:* ${partnerQuery.sector}\n\n` +
                    `*Value as Partner:*\n${partnerQuery.value}\n\n` +
                    `Would you like information about any other partner or sector?`;
                }
                
                // List all partners if no specific one mentioned
                if (message.includes('list') || message.includes('all') || message.includes('show')) {
                    let response = `*Our Partner Companies (${companyInfo.partnerCompanies.length} Total):*\n\n`;
                    companyInfo.partnerCompanies.forEach((partner, index) => {
                        response += `${index + 1}. *${partner.name}* (${partner.sector.split(',')[0]})\n`;
                    });
                    response += '\nAsk me about any partner for more details, or ask about a specific sector (e.g., "Partners in education" or "Show me finance partners").';
                    return response;
                }
                
                // Check for sector-based query
                const sectors = [
                    'ICT', 'tech', 'digital', 'education', 'STEM', 'finance', 'consulting',
                    'research', 'governance', 'health', 'women', 'rights', 'advocacy'
                ];
                
                const sectorMatch = sectors.find(sector => message.includes(sector));
                if (sectorMatch) {
                    const filteredPartners = companyInfo.partnerCompanies.filter(p => 
                        p.sector.toLowerCase().includes(sectorMatch) ||
                        p.value.toLowerCase().includes(sectorMatch)
                    );
                    
                    if (filteredPartners.length > 0) {
                        let response = `*Partners in ${sectorMatch.toUpperCase()}:*\n\n`;
                        filteredPartners.forEach(partner => {
                            response += `*${partner.name}*\n`;
                            response += `   ${partner.sector}\n\n`;
                        });
                        response += 'Would you like more details about any of these partners?';
                        return response;
                    }
                }
                
                // Default partner response
                return `We collaborate with ${companyInfo.partnerCompanies.length} organizations across various sectors including technology, education, finance, and governance. ` +
                       `You can ask me about:\n` +
                       `• Specific partners by name\n` +
                       `• Partners in a specific sector (e.g., "tech partners" or "education partners")\n` +
                       `• The total number of partners\n` +
                       `• A list of all partners`;
            }
            
            // General company information
            return `*${companyInfo.name}*\n\n` +
            `${companyInfo.about}\n\n` +
            `*Our Mission:* ${companyInfo.mission}\n\n` +
            `*Our Vision:* ${companyInfo.vision}\n\n` +
            `*Core Values:*\n   - ${companyInfo.values.split(', ').join('\n   - ')}\n\n` +
            `*Awards & Recognition:*\n   - ${companyInfo.awards.join('\n   - ')}\n\n` +
            `*Our Industry Partners:*\n   - ${companyInfo.partners.join('\n   - ')}\n\n` +
            `We also collaborate with ${companyInfo.partnerCompanies.length} organizations across various sectors. Ask me about our partners for more details!`;
        }
        
        // Contact information
        if (message.includes('contact') || message.includes('reach') || message.includes('get in touch') || 
            message.includes('phone') || message.includes('email') || message.includes('address')) {
            return `*Contact ${companyInfo.name}*\n\n` +
            `📞 *Phone:* ${contacts.phone} (24/7 Support)\n` +
            `📱 *WhatsApp:* ${contacts.whatsapp}\n` +
            `📧 *Email:* ${contacts.email}\n` +
            `📍 *Address:* ${contacts.address}\n` +
            `🌐 *Website:* ${contacts.website}\n\n` +
            `*Working Hours:*\n` +
            `   Monday - Friday: ${contacts.workingHours.weekdays}\n` +
            `   Saturday: ${contacts.workingHours.saturday}\n` +
            `   Sunday: ${contacts.workingHours.sunday}\n\n` +
            `*Emergency:* ${contacts.emergency} (24/7)\n\n` +
            `*Social Media:*\n` +
            `   Facebook: ${contacts.social.facebook}\n` +
            `   Instagram: ${contacts.social.instagram}\n` +
            `   Twitter: ${contacts.social.twitter}\n\n` +
            `Feel free to reach out to us anytime!`;
        }
        
        // FAQ handling
        if (message.includes('faq') || message.includes('question') || message.includes('help')) {
            if (message.includes('list') || message.includes('all') || message.includes('show')) {
                let response = '❓ *Frequently Asked Questions* ❓\n\n';
                faqs.forEach((faq, index) => {
                    response += `*${index + 1}.* ${faq.question}\n`;
                });
                response += '\nAsk me any of these questions for detailed answers!';
                return response;
            }
            
            // Try to match a specific FAQ
            const matchedFaq = faqs.find(faq => 
                faq.question.toLowerCase().includes(message) || 
                message.includes(faq.question.toLowerCase().split(' ').find(word => word.length > 3) || '')
            );
            
            if (matchedFaq) {
                return `*Q: ${matchedFaq.question}*\n\n${matchedFaq.answer}\n\nIs there anything else I can help you with?`;
            }
        }
        
        // Booking information
        if (message.includes('book') || message.includes('reserve') || message.includes('rent') || message.includes('hire')) {
            return `📅 *Booking Information*\n\n` +
            `To book a vehicle or tour package, you can:\n\n` +
            `1. *Online:* Visit our website ${contacts.website}\n` +
            `2. *Email:* Send your request to ${contacts.bookingEmail}\n` +
            `3. *Phone/WhatsApp:* Call or message us at ${contacts.phone}\n\n` +
            `*Required Information for Booking:*\n` +
            `- Full name\n` +
            `- Contact information\n` +
            `- Vehicle/Tour package\n` +
            `- Pickup date & time\n` +
            `- Duration of rental/tour\n` +
            `- Number of passengers\n\n` +
            `Would you like to proceed with a booking or need more information?`;
        }
        // Pricing information
        if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            const car = cars.find(c => 
                c.name.toLowerCase().split(' ').some(word => message.includes(word.toLowerCase()))
            );
            
            if (car) {
                return `*${car.name} Rental Rates*\n\n` +
                `• Daily Rate: $${car.pricePerDay}/day\n` +
                `• Weekly Rate: $${Math.round(car.pricePerDay * 7 * 0.9)}/week (10% off)\n` +
                `• Monthly Rate: $${Math.round(car.pricePerDay * 30 * 0.8)}/month (20% off)\n\n` +
                `*Included in the price:*\n` +
                `- Unlimited mileage\n` +
                `- Comprehensive insurance\n` +
                `- 24/7 road assistance\n` +
                `- Vehicle maintenance\n\n` +
                `*Additional options:*\n` +
                `- GPS: $5/day\n` +
                `- Child seat: $3/day\n` +
                `- Additional driver: $5/day\n\n` +
                `Would you like to check availability or make a booking?`;
            }
            
            return `Our prices vary depending on the vehicle type and rental duration. Here are some examples:\n\n` +
            `• Economy Sedan: From $50/day\n` +
            `• Mid-size SUV: From $80/day\n` +
            `• Luxury 4x4: From $150/day\n` +
            `• Safari Vehicle: From $200/day\n\n` +
            `For the most accurate pricing, please specify:\n1. The type of vehicle you're interested in\n2. Rental dates\n3. Pickup location\n\nWould you like me to check specific pricing for you?`;
        }
        
        // Working hours
        if (message.includes('open') || message.includes('time') || message.includes('hour')) {
            return `*Working Hours*\n\n` +
            `🏢 *Office Hours:*\n` +
            `   Monday - Friday: ${contacts.workingHours.weekdays}\n` +
            `   Saturday: ${contacts.workingHours.saturday}\n` +
            `   Sunday: ${contacts.workingHours.sunday}\n\n` +
            `🚗 *24/7 Services Available:*\n` +
            `- Emergency roadside assistance\n` +
            `- Airport pickups\n` +
            `- Support for existing bookings\n\n` +
            `For assistance outside working hours, please call our 24/7 emergency line: ${contacts.emergency}`;
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
                // Return a promise that will be resolved with the search results
                return performWebSearch(query + ' site:*.ug Uganda travel')
                    .catch(error => {
                        console.error('Search failed:', error);
                        return "I'm having trouble with the search right now. Please try again later or contact us directly for assistance.";
                    });
            }
            return "Please specify what you'd like to search for, e.g., 'Search for tourist attractions in Uganda' or 'Find hotels in Kampala'.";
        }
        
        // Default response
        return "I'm here to help! You can ask about our cars, car types, prices, contact details, or search for travel information.";
    }
});
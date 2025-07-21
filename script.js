// Video segments data extracted from transcript
const videoSegments = [
    {
        id: 1,
        title: "Introduction: Transforming Digital Agency Pitches",
        startTime: "0:00",
        endTime: "2:43",
        timeSeconds: 0,
        summary: "Michael introduces the goal: converting a traditional in-room digital agency pitch deck into an effective remote video presentation format.",
        tags: ["Introduction", "Remote Video", "Agency Pitches"],
        icon: "🎯"
    },
    {
        id: 2,
        title: "The Power of Teleprompters for Remote Pitches",
        startTime: "3:42",
        endTime: "5:45",
        timeSeconds: 222,
        summary: "Why teleprompters are the cornerstone tool for remote video presentations - enabling confident eye contact and seamless delivery without memorizing scripts.",
        tags: ["Teleprompter", "CueCam", "Eye Contact"],
        icon: "👁️"
    },
    {
        id: 3,
        title: "CueCam's Video Cue System",
        startTime: "5:29",
        endTime: "6:04",
        timeSeconds: 329,
        summary: "How CueCam transforms Cue cards into video cues with animated titles, graphics, and seamless desktop demos - like having a production team behind you.",
        tags: ["CueCam", "Animation", "Production"],
        icon: "🎬"
    },
    {
        id: 4,
        title: "Case Study: Digitas LBI Pitch Deck Analysis",
        startTime: "7:39",
        endTime: "9:45",
        timeSeconds: 459,
        summary: "Examining a real $292k digital agency pitch deck from Digitas LBI and identifying what works for print vs. what needs changing for video.",
        tags: ["Case Study", "Digitas LBI", "Print vs Video"],
        icon: "📊"
    },
    {
        id: 5,
        title: "Eliminating Cover Slides and Intro Cards",
        startTime: "10:33",
        endTime: "12:16",
        timeSeconds: 633,
        summary: "Why traditional cover slides and 'who's in the room' cards don't work for video calls - better to have people introduce themselves on camera.",
        tags: ["Cover Slides", "Video Optimization", "Introductions"],
        icon: "❌"
    },
    {
        id: 6,
        title: "Branding Without Logo Overlays",
        startTime: "12:45",
        endTime: "15:11",
        timeSeconds: 765,
        summary: "How to properly brand video presentations using fonts, colors, and subtle overlays rather than cheesy logo corners - showing attention to detail.",
        tags: ["Branding", "Design", "Professional"],
        icon: "🎨"
    },
    {
        id: 7,
        title: "Animation for Impact: From Space to Time",
        startTime: "15:46",
        endTime: "18:36",
        timeSeconds: 946,
        summary: "Converting static layouts into animated sequences - moving from spatial rhythm (print) to temporal rhythm (video) for better engagement.",
        tags: ["Animation", "Temporal Design", "Engagement"],
        icon: "⏰"
    },
    {
        id: 8,
        title: "Breaking Down Complex Slides",
        startTime: "18:12",
        endTime: "21:10",
        timeSeconds: 1092,
        summary: "Why dense slides with multiple elements should be split across multiple cards to create visual rhythm and maintain viewer attention.",
        tags: ["Slide Design", "Visual Rhythm", "Simplification"],
        icon: "🔄"
    },
    {
        id: 9,
        title: "Text Readability and Mobile Considerations",
        startTime: "25:52",
        endTime: "26:43",
        timeSeconds: 1552,
        summary: "How video compression and small screens make tiny text unreadable - designing for mobile viewers and poor Wi-Fi conditions.",
        tags: ["Readability", "Mobile", "Compression"],
        icon: "📱"
    },
    {
        id: 10,
        title: "Pan and Zoom Techniques",
        startTime: "27:02",
        endTime: "27:54",
        timeSeconds: 1622,
        summary: "Using pan and zoom to guide viewer attention across large images instead of making audiences squint - you do the zooming for them.",
        tags: ["Pan & Zoom", "Attention", "User Experience"],
        icon: "🔍"
    },
    {
        id: 11,
        title: "Speaker Notes vs. On-Screen Text",
        startTime: "29:36",
        endTime: "31:40",
        timeSeconds: 1776,
        summary: "Moving detailed text to teleprompter speaker notes while showing only key headlines - demonstrating confident delivery without memorization.",
        tags: ["Speaker Notes", "Teleprompter", "Confidence"],
        icon: "📝"
    },
    {
        id: 12,
        title: "Interactive Demos Over Static Images",
        startTime: "32:29",
        endTime: "33:39",
        timeSeconds: 1949,
        summary: "Why showing actual video demos of features (like 360° panoramic ads) is more effective than static mockups in presentations.",
        tags: ["Interactive Demos", "Video vs Static", "Features"],
        icon: "🎮"
    },
    {
        id: 13,
        title: "Handling Complex Timelines and Budgets",
        startTime: "33:47",
        endTime: "35:24",
        timeSeconds: 2027,
        summary: "Making complex project timelines and budget breakdowns more digestible through interactive web pages and strategic card breaks.",
        tags: ["Timelines", "Budgets", "Interactive"],
        icon: "💰"
    },
    {
        id: 14,
        title: "Natural Conversation Over Formal Endings",
        startTime: "35:30",
        endTime: "36:41",
        timeSeconds: 2130,
        summary: "Replacing formal 'thank you' slides with natural conversation transitions and authentic human interaction in video calls.",
        tags: ["Natural Conversation", "Authenticity", "Thank You"],
        icon: "🗣️"
    },
    {
        id: 15,
        title: "Real Branding vs. Logo Obsession",
        startTime: "36:16",
        endTime: "37:40",
        timeSeconds: 2176,
        summary: "True branding is about consistent style, tone, and typography - not just slapping logos everywhere. Focus on confident communication.",
        tags: ["True Branding", "Logo Critique", "Communication"],
        icon: "✨"
    },
    {
        id: 16,
        title: "CueCam Philosophy and Wrap-up",
        startTime: "37:06",
        endTime: "41:30",
        timeSeconds: 2226,
        summary: "CueCam's core mission: clear temporal communication that's easy to author, update, and iterate - plus a peek at Michael's Swift UI rendering project.",
        tags: ["CueCam Philosophy", "Development", "Future"],
        icon: "🚀"
    }
];

// Function to convert time string to seconds
function timeToSeconds(timeString) {
    const parts = timeString.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

// Function to generate YouTube URL with timestamp
function generateYouTubeURL(timeSeconds) {
    return `https://www.youtube.com/watch?v=dBgqJMwK1MU&t=${timeSeconds}`;
}

// Function to create a segment card
function createSegmentCard(segment) {
    const card = document.createElement('div');
    card.className = 'segment-card';
    card.onclick = () => window.open(generateYouTubeURL(segment.timeSeconds), '_blank');
    
    card.innerHTML = `
        <div class="card-image">
            <div style="font-size: 4rem;">${segment.icon}</div>
            <img id="frame-${segment.id}" style="display: none;" alt="Video frame for ${segment.title}">
        </div>
        <div class="card-content">
            <div class="card-timestamp">${segment.startTime}</div>
            <h3 class="card-title">${segment.title}</h3>
            <p class="card-summary">${segment.summary}</p>
            <div class="card-tags">
                ${segment.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Function to load video frames (placeholder for actual implementation)
function loadVideoFrames() {
    // This would typically involve calling the ffmpeg script
    // For now, we'll use placeholder images or keep the icons
    console.log('Video frame extraction would happen here with ffmpeg');
}

// Initialize the application
function initializeApp() {
    const container = document.getElementById('segments-container');
    
    // Show loading state
    container.innerHTML = '<div class="loading"><div class="spinner"></div>Loading segments...</div>';
    
    // Simulate loading time
    setTimeout(() => {
        container.innerHTML = '';
        
        // Create and append segment cards
        videoSegments.forEach(segment => {
            const card = createSegmentCard(segment);
            container.appendChild(card);
        });
        
        // Attempt to load video frames
        loadVideoFrames();
        
        // Add staggered animation
        const cards = document.querySelectorAll('.segment-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    }, 1000);
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Export for potential use in other scripts
window.videoSegments = videoSegments;
window.generateYouTubeURL = generateYouTubeURL;
// Update frame loading function
function loadVideoFrames() {
    videoSegments.forEach(segment => {
        const frameImg = document.getElementById(`frame-${segment.id}`);
        const framePath = `frames/frame_${segment.id}.jpg`;
        
        // Check if frame exists and load it
        const img = new Image();
        img.onload = function() {
            frameImg.src = framePath;
            frameImg.style.display = 'block';
            frameImg.parentElement.querySelector('div').style.display = 'none';
        };
        img.onerror = function() {
            console.log(`Frame ${segment.id} not available, keeping icon`);
        };
        img.src = framePath;
    });
}

// F1 Singapore GP Schedule - Cloudflare Worker
// Data source: https://www.formula1.com/en/latest/article/formula-1-singapore-airlines-singapore-grand-prix-2025.4BY11j0oHQpEJ8JdfH6nIa

const SCHEDULE_DATA = {
  friday: [
    {
      name: "Porsche Carrera Cup Asia - Practice Session",
      start: "2025-10-03T14:00:00+08:00",
      end: "2025-10-03T14:45:00+08:00"
    },
    {
      name: "F1 Academy - Practice Session",
      start: "2025-10-03T15:10:00+08:00",
      end: "2025-10-03T15:50:00+08:00"
    },
    {
      name: "FIA - F1 Car Presentation",
      start: "2025-10-03T16:00:00+08:00",
      end: "2025-10-03T17:00:00+08:00"
    },
    {
      name: "Paddock Club - Pit Lane Walk",
      start: "2025-10-03T16:00:00+08:00",
      end: "2025-10-03T17:10:00+08:00"
    },
    {
      name: "Formula 1 - First Practice Session",
      start: "2025-10-03T17:30:00+08:00",
      end: "2025-10-03T18:30:00+08:00",
      important: true
    },
    {
      name: "F1 Academy - Qualifying Session",
      start: "2025-10-03T19:00:00+08:00",
      end: "2025-10-03T19:30:00+08:00"
    },
    {
      name: "Formula 1 - Teams Press Conference",
      start: "2025-10-03T19:30:00+08:00",
      end: "2025-10-03T20:30:00+08:00"
    },
    {
      name: "Paddock Club - Pit Lane Walk",
      start: "2025-10-03T19:40:00+08:00",
      end: "2025-10-03T20:40:00+08:00"
    },
    {
      name: "Formula 1 - Second Practice Session",
      start: "2025-10-03T21:00:00+08:00",
      end: "2025-10-03T22:00:00+08:00",
      important: true
    },
    {
      name: "F1 Experiences - Champions Club Trophy Photo & Grid Walk",
      start: "2025-10-03T22:45:00+08:00",
      end: "2025-10-03T23:45:00+08:00"
    }
  ],
  saturday: [
    {
      name: "Porsche Carrera Cup Asia - Qualifying Session",
      start: "2025-10-04T13:45:00+08:00",
      end: "2025-10-04T14:15:00+08:00"
    },
    {
      name: "F1 Academy - First Race",
      start: "2025-10-04T15:00:00+08:00",
      end: "2025-10-04T15:35:00+08:00"
    },
    {
      name: "Porsche Carrera Cup Asia - First Race",
      start: "2025-10-04T16:15:00+08:00",
      end: "2025-10-04T16:50:00+08:00"
    },
    {
      name: "Formula 1 - Third Practice Session",
      start: "2025-10-04T17:30:00+08:00",
      end: "2025-10-04T18:30:00+08:00",
      important: true
    },
    {
      name: "Paddock Club - Pit Lane Walk",
      start: "2025-10-04T18:40:00+08:00",
      end: "2025-10-04T20:30:00+08:00"
    },
    {
      name: "Formula 1 - Qualifying Session",
      start: "2025-10-04T21:00:00+08:00",
      end: "2025-10-04T22:00:00+08:00",
      important: true
    },
    {
      name: "Formula 1 - Press Conference",
      start: "2025-10-04T22:00:00+08:00",
      end: "2025-10-04T23:00:00+08:00"
    },
    {
      name: "Paddock Club - Pit Lane Walk",
      start: "2025-10-04T22:15:00+08:00",
      end: "2025-10-04T23:30:00+08:00"
    },
    {
      name: "F1 Experiences - Champions Club Trophy Photo & Grid Walk",
      start: "2025-10-04T22:45:00+08:00",
      end: "2025-10-04T23:45:00+08:00"
    }
  ],
  sunday: [
    {
      name: "F1 Academy - Second Race",
      start: "2025-10-05T15:25:00+08:00",
      end: "2025-10-05T16:00:00+08:00"
    },
    {
      name: "Porsche Carrera Cup Asia - Second Race",
      start: "2025-10-05T16:40:00+08:00",
      end: "2025-10-05T17:15:00+08:00"
    },
    {
      name: "Formula 1 - Drivers' Parade",
      start: "2025-10-05T18:00:00+08:00",
      end: "2025-10-05T18:30:00+08:00"
    },
    {
      name: "Formula 1 - National Anthem",
      start: "2025-10-05T19:44:00+08:00",
      end: "2025-10-05T19:46:00+08:00"
    },
    {
      name: "Formula 1 - Grand Prix",
      start: "2025-10-05T20:00:00+08:00",
      end: "2025-10-05T22:00:00+08:00",
      important: true
    }
  ]
};

const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>F1 Singapore GP Schedule</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #e10600;
        }

        h1 {
            font-size: 2rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 5px;
        }

        .subtitle {
            color: #888;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid #222;
        }

        .tab {
            flex: 1;
            padding: 15px;
            background: #1a1a1a;
            border: none;
            color: #888;
            font-size: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            border-top: 3px solid transparent;
        }

        .tab:hover {
            background: #222;
            color: #fff;
        }

        .tab.active {
            background: #222;
            color: #fff;
            border-top-color: #e10600;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .event-card {
            background: #1a1a1a;
            border-left: 4px solid #333;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .event-card:hover {
            background: #222;
        }

        time-aware[current] .event-card {
            background: #1a2e1a;
            border-left-color: #00d800;
            box-shadow: 0 0 20px rgba(0, 216, 0, 0.2);
        }

        time-aware[upcoming] .event-card {
            border-left-color: #e10600;
        }

        .event-card.important {
            background: linear-gradient(135deg, #1a0e0e 0%, #1a1a1a 100%);
            border-left-color: #e10600;
            border-left-width: 5px;
        }

        time-aware[current] .event-card.important {
            background: linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%);
            border-left-color: #00d800;
        }

        .event-name {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        time-aware[current] .event-card .event-name {
            color: #00d800;
        }

        .event-time {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #888;
            font-size: 0.95rem;
        }

        .time-badge {
            display: inline-block;
            padding: 5px 10px;
            background: #0a0a0a;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-weight: 600;
        }

        time-aware[current] .event-card .time-badge {
            background: #003300;
            color: #00d800;
        }

        .live-indicator {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #00d800;
            border-radius: 50%;
            animation: pulse 2s infinite;
            margin-right: 5px;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            border-radius: 3px;
            margin-left: 10px;
        }

        .status-live {
            background: #00d800;
            color: #000;
        }

        .status-upcoming {
            background: #e10600;
            color: #fff;
        }

        time-aware[current] .status-live {
            display: inline-block;
        }

        time-aware:not([current]) .status-live {
            display: none;
        }

        time-aware[upcoming] .status-upcoming {
            display: inline-block;
        }

        time-aware:not([upcoming]) .status-upcoming {
            display: none;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #555;
        }

        .countdown-container {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            border: 2px solid #e10600;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        }

        .countdown-title {
            font-size: 0.85rem;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .countdown-event {
            font-size: 1.1rem;
            font-weight: 700;
            color: #e10600;
            margin-bottom: 15px;
        }

        .countdown-timer {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .countdown-unit {
            background: #0a0a0a;
            border-radius: 8px;
            padding: 12px 15px;
            min-width: 70px;
        }

        .countdown-value {
            font-size: 2rem;
            font-weight: 900;
            color: #fff;
            line-height: 1;
            font-family: 'Courier New', monospace;
        }

        .countdown-label {
            font-size: 0.7rem;
            color: #666;
            text-transform: uppercase;
            margin-top: 5px;
            letter-spacing: 1px;
        }

        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #1a1a1a;
            border: 2px solid #00d800;
            border-radius: 8px;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 4px 20px rgba(0, 216, 0, 0.3);
            z-index: 1000;
            max-width: 90%;
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }

        .notification-text {
            color: #fff;
            font-size: 0.9rem;
            font-weight: 600;
            flex: 1;
        }

        .notification-text .event-highlight {
            color: #00d800;
            font-weight: 700;
        }

        .notification-buttons {
            display: flex;
            gap: 8px;
        }

        .notification-btn {
            padding: 6px 14px;
            border: none;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 700;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .notification-btn.view {
            background: #00d800;
            color: #000;
        }

        .notification-btn.view:hover {
            background: #00ff00;
        }

        .notification-btn.dismiss {
            background: #333;
            color: #fff;
        }

        .notification-btn.dismiss:hover {
            background: #444;
        }

        @media (max-width: 600px) {
            body {
                padding: 10px;
            }

            h1 {
                font-size: 1.3rem;
                letter-spacing: 1px;
            }

            .subtitle {
                font-size: 0.8rem;
            }

            header {
                margin-bottom: 20px;
                padding-bottom: 15px;
            }

            .tabs {
                gap: 5px;
                margin-bottom: 20px;
            }

            .tab {
                font-size: 0.75rem;
                padding: 10px 6px;
                letter-spacing: 0.5px;
            }

            .event-card {
                padding: 15px;
                margin-bottom: 12px;
            }

            .event-name {
                font-size: 1rem;
                margin-bottom: 8px;
            }

            .event-time {
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: center;
                gap: 8px;
                font-size: 0.85rem;
            }

            .time-badge {
                padding: 4px 8px;
                font-size: 0.8rem;
                white-space: nowrap;
            }

            .event-time span:not(.time-badge) {
                font-size: 0.7rem;
            }

            .status-badge {
                display: block;
                margin-left: 0;
                margin-top: 8px;
                width: fit-content;
                font-size: 0.7rem;
                padding: 3px 6px;
            }

            .notification {
                bottom: 15px;
                left: 10px;
                right: 10px;
                transform: none;
                border-radius: 8px;
                padding: 10px 15px;
                gap: 10px;
                flex-direction: row;
                align-items: center;
                max-width: none;
                width: auto;
                padding-bottom: max(10px, env(safe-area-inset-bottom));
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .notification-text {
                font-size: 0.8rem;
                text-align: left;
            }

            .notification-buttons {
                flex-shrink: 0;
            }

            .notification-btn {
                padding: 6px 10px;
                font-size: 0.75rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🏎️ Singapore GP</h1>
            <div class="subtitle">2025 Schedule</div>
            <div style="font-size: 0.75rem; color: #666; margin-top: 8px; text-transform: none; letter-spacing: 0;">All times in Singapore Time (SGT)</div>
        </header>

        <div class="countdown-container" id="countdown">
            <div class="countdown-title">First Practice Starts In</div>
            <div class="countdown-event">Formula 1 - First Practice Session</div>
            <div class="countdown-timer">
                <div class="countdown-unit">
                    <div class="countdown-value" id="hours">00</div>
                    <div class="countdown-label">Hours</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-value" id="minutes">00</div>
                    <div class="countdown-label">Minutes</div>
                </div>
                <div class="countdown-unit">
                    <div class="countdown-value" id="seconds">00</div>
                    <div class="countdown-label">Seconds</div>
                </div>
            </div>
        </div>

        <div class="tabs">
            <button class="tab" data-day="friday">Friday</button>
            <button class="tab" data-day="saturday">Saturday</button>
            <button class="tab" data-day="sunday">Sunday</button>
        </div>

        <div id="friday" class="tab-content">
            <!-- Friday events will be inserted here -->
        </div>

        <div id="saturday" class="tab-content">
            <!-- Saturday events will be inserted here -->
        </div>

        <div id="sunday" class="tab-content">
            <!-- Sunday events will be inserted here -->
        </div>

        <footer style="margin-top: 40px; padding: 30px 20px; text-align: center; border-top: 2px solid #222;">
            <a href="https://paypal.me/nastasiu/15eur" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none; color: inherit; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <div style="font-size: 1.2rem; font-weight: 700; color: #ffc439; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
                    ☕ I Appreciate This
                </div>
                <div style="font-size: 0.85rem; color: #888; max-width: 400px; margin: 0 auto;">
                    Enjoying this app? Show some love to the developer with a small tip!
                </div>
            </a>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1a1a1a;">
                <div style="font-size: 0.8rem; color: #666; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <div style="margin-bottom: 8px;">
                        © 2025 <a href="https://websqu.ad" target="_blank" rel="noopener noreferrer" style="color: #ffc439; text-decoration: none; transition: color 0.2s ease;" onmouseover="this.style.color='#ffdb70'" onmouseout="this.style.color='#ffc439'">websqu.ad</a> - a brandsquad oü division.<br>All rights reserved.
                    </div>
                    <div>
                        This page is not affiliated with, endorsed by, sponsored by, or connected to Formula One Licensing BV, Formula 1®, FORMULA 1, F1, the F1 logo, FIA FORMULA ONE WORLD CHAMPIONSHIP, Singapore GP Pte. Ltd., the Formula 1 Singapore Airlines Singapore Grand Prix 2025, or any official parties related to the event. All trademarks and logos mentioned are the property of their respective owners and are used here without permission.
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <script>
        const scheduleData = __SCHEDULE_DATA__;

        // Initialize the app
        function init() {
            renderSchedule();
            setupTabSwitching();
            autoSwitchToCurrentDay();
        }

        // Render all events
        function renderSchedule() {
            Object.keys(scheduleData).forEach(day => {
                const container = document.getElementById(day);
                const events = scheduleData[day];

                if (events.length === 0) {
                    container.innerHTML = '<div class="empty-state">No events scheduled</div>';
                    return;
                }

                let html = '';

                events.forEach((event, index) => {
                    const startTime = new Date(event.start);
                    const endTime = new Date(event.end);
                    const isImportant = event.important || false;

                    let cardClass = 'event-card';
                    if (isImportant) cardClass += ' important';

                    html += \`
                        <time-aware start-time="\${event.start}" end-time="\${event.end}" id="\${day}-event-\${index}">
                            <div class="\${cardClass}">
                                <div class="event-name">
                                    \${event.name}
                                    <span class="status-badge status-live"><span class="live-indicator"></span>LIVE NOW</span>
                                    <span class="status-badge status-upcoming">Upcoming</span>
                                </div>
                                <div class="event-time">
                                    <span class="time-badge">\${formatTime(startTime)}</span>
                                    <span>→</span>
                                    <span class="time-badge">\${formatTime(endTime)}</span>
                                </div>
                            </div>
                        </time-aware>
                    \`;
                });

                container.innerHTML = html;
            });
        }

        // Format time for display
        function formatTime(date) {
            return date.toLocaleTimeString('en-SG', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Singapore'
            });
        }

        // Setup tab switching
        function setupTabSwitching() {
            const tabs = document.querySelectorAll('.tab');
            const contents = document.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const day = tab.dataset.day;

                    // Mark that user has interacted
                    userHasInteracted = true;

                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    contents.forEach(c => c.classList.remove('active'));

                    // Add active class to clicked tab and corresponding content
                    tab.classList.add('active');
                    document.getElementById(day).classList.add('active');
                });
            });
        }

        // Auto-switch to current day and scroll to current event
        function autoSwitchToCurrentDay() {
            const now = new Date();
            let currentDay = null;
            let currentEventId = null;

            // Find current event
            Object.keys(scheduleData).forEach(day => {
                scheduleData[day].forEach((event, index) => {
                    const startTime = new Date(event.start);
                    const endTime = new Date(event.end);

                    // Check if event is currently happening
                    if (now >= startTime && now <= endTime) {
                        currentDay = day;
                        currentEventId = \`\${day}-event-\${index}\`;
                    }
                });
            });

            // If no current day found, default to first day with events
            if (!currentDay) {
                currentDay = Object.keys(scheduleData).find(day => scheduleData[day].length > 0) || 'friday';
            }

            // Switch to the appropriate tab
            const targetTab = document.querySelector(\`.tab[data-day="\${currentDay}"]\`);
            if (targetTab) {
                targetTab.click();
            }

            // Scroll to current event only
            if (currentEventId) {
                setTimeout(() => {
                    const targetElement = document.getElementById(currentEventId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 100);
            }
        }

        // Track current event and user interaction
        let lastNotifiedEventId = null;
        let userHasInteracted = false;

        // Listen for time-aware state changes
        function setupTimeAwareListeners() {
            document.body.addEventListener('statechanged', (e) => {
                if (e.detail.state === 'current') {
                    const timeAwareElement = e.target;
                    const eventId = timeAwareElement.id;

                    // Extract day from event ID (format: "day-event-index")
                    const currentDay = eventId.split('-')[0];

                    // Get the parent tab content container
                    const tabContent = document.getElementById(currentDay);

                    // Only process events from the currently active tab OR if user hasn't interacted yet
                    const isTabActive = tabContent && tabContent.classList.contains('active');

                    if (!isTabActive && userHasInteracted) {
                        // If tab is not active and user has interacted, show notification
                        const currentEventName = timeAwareElement.querySelector('.event-name').textContent.trim();

                        if (eventId && eventId !== lastNotifiedEventId) {
                            showNotification(currentEventName, currentDay, eventId);
                            lastNotifiedEventId = eventId;
                        }
                        return;
                    }

                    // Process normally for active tab or initial load
                    if (eventId && eventId !== lastNotifiedEventId) {
                        const currentEventName = timeAwareElement.querySelector('.event-name').textContent.trim();
                        const activeTab = document.querySelector('.tab.active');

                        if (userHasInteracted && activeTab && activeTab.dataset.day !== currentDay) {
                            // Show notification instead of switching
                            showNotification(currentEventName, currentDay, eventId);
                        } else if (!userHasInteracted) {
                            // Auto-switch only on initial load
                            switchToEvent(currentDay, eventId);
                        }

                        lastNotifiedEventId = eventId;
                    }
                }
            });
        }

        // Show notification
        function showNotification(eventName, day, eventId) {
            // Remove existing notification if any
            const existingNotification = document.querySelector('.notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = \`
                <div class="notification-text">
                    <span class="event-highlight">\${eventName}</span> is now live!
                </div>
                <div class="notification-buttons">
                    <button class="notification-btn view">View</button>
                    <button class="notification-btn dismiss">Dismiss</button>
                </div>
            \`;

            document.body.appendChild(notification);

            // View button
            notification.querySelector('.view').addEventListener('click', () => {
                switchToEvent(day, eventId);
                notification.remove();
            });

            // Dismiss button
            notification.querySelector('.dismiss').addEventListener('click', () => {
                notification.remove();
            });
        }

        // Switch to event
        function switchToEvent(day, eventId) {
            const targetTab = document.querySelector(\`.tab[data-day="\${day}"]\`);
            if (targetTab) {
                targetTab.click();
            }

            setTimeout(() => {
                const targetElement = document.getElementById(eventId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);
        }

        // Countdown timer
        function startCountdown() {
            const targetDate = new Date('2025-10-03T17:30:00+08:00');

            function updateCountdown() {
                const now = new Date();
                const diff = targetDate - now;

                if (diff <= 0) {
                    // Event has started, hide countdown
                    document.getElementById('countdown').style.display = 'none';
                    return;
                }

                const totalHours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('hours').textContent = String(totalHours).padStart(2, '0');
                document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
            }

            updateCountdown();
            setInterval(updateCountdown, 1000);
        }

        // Start the app
        init();
        setupTimeAwareListeners();
        startCountdown();
    </script>

    <script type="text/javascript">

    class TimeAware extends HTMLElement
    {
        constructor()
        {
            super();
            this._internals = this.attachInternals();

            this._startTime = null;
            this._endTime = null;
            this._intervalMilliseconds = TimeAware.DefaultConfig.intervalMilliseconds;
            this._upcomingMilliseconds = TimeAware.DefaultConfig.upcomingMilliseconds;
        }

        static observedAttributes = ["start-time", "end-time", "refresh-interval-milliseconds", "upcoming-threshold-milliseconds"];

        static DefaultConfig = {
            intervalMilliseconds: 1000 * 60, // one minute
            upcomingMilliseconds: 1000 * 60 * 30, // 30 minutes
        };

        static States = {
            Past: "past",
            Current: "current",
            Upcoming: "upcoming",
            Future: "future",
        }

        /* State property getters match element attribute names. */

        get past() { return this._hasState(TimeAware.States.Past); }

        get current() { return this._hasState(TimeAware.States.Current); }

        get upcoming() { return this._hasState(TimeAware.States.Upcoming); }

        get future() { return this._hasState(TimeAware.States.Future); }

        connectedCallback()
        {
            this._initialize();
        }

        disconnectedCallback()
        {
            clearInterval(this._intervalId);
        }

        attributeChangedCallback(attributeName, oldValue, newValue)
        {
            switch (attributeName) {
            case "start-time":
                this._startTime = this._configureAsDate({attributeName, dateString: newValue});
                break;

            case "end-time":
                this._endTime = this._configureAsDate({attributeName, dateString: newValue});
                break;

            case "refresh-interval-milliseconds":
                this._intervalMilliseconds = this._configureAsMilliseconds({attributeName, millisecondsString: newValue, fallbackValue: TimeAware.DefaultConfig.intervalMilliseconds});
                break;

            case "upcoming-threshold-milliseconds":
                this._upcomingMilliseconds = this._configureAsMilliseconds({attributeName, millisecondsString: newValue, fallbackValue: TimeAware.DefaultConfig.upcomingMilliseconds});
                break;
            }

            // Restart periodic check when the time frame changes for a past event. It will stop again if it's still in the past.
            if (this._hasState(TimeAware.States.Past) && (attributeName === "start-time" || attributeName === "end-time"))
                this._initialize();
        }

        _initialize()
        {
            if (!this._startTime) {
                console.error(\`Invalid configuration for start time. Expected Date got: \${this._startTime}\`);
                return;
            }

            if (!this._endTime) {
                console.error(\`Invalid configuration for end time. Expected Date got: \${this._endTime}\`);
                return;
            }

            if (this._startTime > this._endTime) {
                console.error(\`Invalid configuration: start time \${this._startTime} occurs after end time \${this._endTime}\`);
                return;
            }

            this._intervalId = setInterval(() => this._refresh(), this._intervalMilliseconds);
            this._refresh();
        }

        _stop()
        {
            clearInterval(this._intervalId);
        }

        _refresh()
        {
            let startTimeMs = this._startTime.getTime();
            let endTimeMs = this._endTime.getTime();
            let nowMs = new Date().getTime();
            let upcomingMilliseconds = this._upcomingMilliseconds;

            function getState() {
                if (nowMs > endTimeMs)
                    return TimeAware.States.Past;

                if ((startTimeMs < nowMs) && (nowMs < endTimeMs))
                    return TimeAware.States.Current;

                // NOTE: Early return of "upcoming" state means we have to append "future" state outside this function.
                if (upcomingMilliseconds && (nowMs < startTimeMs) && (startTimeMs < nowMs + upcomingMilliseconds) && (nowMs + upcomingMilliseconds < endTimeMs))
                    return TimeAware.States.Upcoming;

                if (nowMs < startTimeMs)
                    return TimeAware.States.Future;
            }

            let state = getState();
            this._setState(state);

            if (state === TimeAware.States.Upcoming)
                this._setState(TimeAware.States.Future);
        }

        _setState(value)
        {
            if (this._hasState(value))
                return;

            let statesToClear;

            switch(value) {
            case TimeAware.States.Future:
                statesToClear = [TimeAware.States.Past, TimeAware.States.Current]; // Do not clear TimeAware.States.Upcoming
                break;

            case TimeAware.States.Past:
                statesToClear = [TimeAware.States.Current, TimeAware.States.Upcoming, TimeAware.States.Future];
                break;

            case TimeAware.States.Current:
                statesToClear = [TimeAware.States.Past, TimeAware.States.Upcoming, TimeAware.States.Future];
                break;

            case TimeAware.States.Upcoming:
                statesToClear = [TimeAware.States.Past, TimeAware.States.Current]; // Do not clear TimeAware.States.Future
                break;

            default:
                console.error(\`Unexpected state. Expected one of: \${Object.values(TimeAware.States)}, got \${value}\`);
                return;
            }

            for (let state of statesToClear) {
                this._internals?.states?.delete(state);
                this.removeAttribute(state);
            }

            this._internals?.states?.add(value);
            this.setAttribute(value, "");

            if (value === TimeAware.States.Past)
                this._stop();

            this.dispatchEvent(new CustomEvent("statechanged", { detail: { state: value }, bubbles: true, cancelable: true }));
        }

        _hasState(value)
        {
            if (this._internals?.states)
                return this._internals.states.has(value);

            return this.hasAttribute(value);
        }

        _configureAsDate({dateString, attributeName} = {})
        {
            let date = new Date(dateString);
            // Handle \`null\` value because \`new Date(null)\` returns date at the beginning of the UNIX epoch.
            if (dateString === null || date.toUTCString() == "Invalid Date")
                console.error(\`Invalid value for "\${attributeName}" attribute. Expected date time string format, got \${dateString}.\\nSee https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format\`);

            return date;
        }

        _configureAsMilliseconds({millisecondsString, attributeName, fallbackValue} = {}) {
            let value = fallbackValue;

            if (millisecondsString === null)
                return value;

            let millisecondsNumber = parseInt(millisecondsString, 10);

            if (millisecondsString && (millisecondsNumber.toString() === millisecondsString) && millisecondsNumber > 0)
                value = millisecondsNumber;
            else if (millisecondsString) {
                console.warn(\`Invalid value for "\${attributeName}" attribute. Expected positive number of milliseconds as String, got: \${millisecondsString}.\\nFalling back to default: \${fallbackValue}\`);
                value = fallbackValue;
            }

            return value;
        }
    }

    // Set the global default configuration
    TimeAware.DefaultConfig.intervalMilliseconds = 1000 * 2; // 2 seconds

    customElements.define("time-aware", TimeAware);

    </script>
</body>
</html>
`;

export default {
  async fetch(request, env, ctx) {
    // In production, you would fetch data from formula1.com here
    // For now, we'll use the sample data

    const html = HTML_TEMPLATE.replace(
      '__SCHEDULE_DATA__',
      JSON.stringify(SCHEDULE_DATA)
    );

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
};

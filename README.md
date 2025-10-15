# Hiroshima Setouchi Nomad Fest 2025 - Event Calendar

An interactive event calendar for the Hiroshima Setouchi Nomad Fest 2025, featuring real-time event tracking and mobile-optimized controls.

## Features

### 🕐 Time-Aware Event Tracking
- **Live Events**: Green highlighting for currently happening events
- **Upcoming Events**: Yellow indicators for events starting within 30 minutes
- **Past Events**: Dimmed display for completed events
- Real-time updates every 2 seconds

### 📱 Mobile-Optimized
- Bottom button bar for easy thumb access
- Tilt-based positioning: buttons follow your phone's tilt (left/right)
- Clean interface with only relevant controls (no column buttons on mobile)
- Safe area insets for notched devices

### 🎮 Interactive Controls
- **First day/Now**: Toggle between showing all days or just the current day
- **3/5 Days**: Desktop view options for multi-column layout
- **Demo Mode**: Generate 5 test events (20-second intervals) for testing

### 🎨 Modern UI
- Dark theme optimized for readability
- Gradient backgrounds for different event states
- Smooth transitions and animations
- Responsive grid layout

## Technology Stack

- **Vue 3**: Composition API with `<script setup>` style
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Device Orientation API**: Tilt-based mobile controls

## Project Structure

```
hiroshima/
├── src/
│   ├── components/
│   │   └── TimeAware.vue      # Time-aware state management component
│   ├── data/
│   │   └── events.json         # Event data with times and locations
│   ├── App.vue                 # Main application component
│   └── main.js                 # Application entry point
├── index.html                  # HTML template
└── time-aware-source.js        # Reference implementation (F1 example)
```

## Event Data Format

Events with specific times include `startTime` and `endTime` in ISO 8601 format:

```json
{
  "time": "6:30 PM",
  "title": "Welcome Dinner",
  "description": "Event description...",
  "actions": [
    {
      "text": "🗾 Location",
      "link": "https://maps.google.com/..."
    }
  ],
  "startTime": "2025-10-18T18:30:00+09:00",
  "endTime": "2025-10-18T20:30:00+09:00"
}
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Demo Mode

Click the "Demo" button to generate 5 test events starting immediately:
- Each event lasts 20 seconds
- Events start consecutively
- Perfect for testing time-aware states without waiting

## Browser Support

- Modern browsers with ES6+ support
- Device Orientation API for mobile tilt (iOS 13+ requires permission)
- Graceful degradation for older browsers

## Credits

Built with Claude Code by [websqu.ad](https://websqu.ad)

Event information from [Hiroshima Setouchi Nomad Fest 2025](https://digitalnomadshiroshima.com/hsnf2025/)

---

**Disclaimer**: This is an unofficial page and is NOT affiliated with Hiroshima Setouchi Nomad Fest. Please check official sources for up-to-date information.

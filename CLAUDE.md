# Development Log - Claude Code Session

## Project Overview
Interactive event calendar for Hiroshima Setouchi Nomad Fest 2025 with real-time event tracking and mobile-optimized interface.

## Major Features Implemented

### 1. Time-Aware Event System
**Objective**: Display events with visual indicators showing their current state (live, upcoming, past, or future)

**Implementation**:
- Created `TimeAware.vue` component based on custom element pattern from `time-aware-source.js`
- Component uses Vue 3 Composition API with reactive state management
- Checks event state every 2 seconds using `setInterval`
- Four states: `past`, `current`, `upcoming` (30min before), `future`
- Emits state change events for parent component integration
- Auto-stops checking when event passes to save resources

**Files Modified**:
- `src/components/TimeAware.vue` (new)
- `src/App.vue` - integrated component, added CSS for state styling
- `src/data/events.json` - added `startTime`/`endTime` fields

**Key Logic**:
```javascript
// End time calculation: next event start (if within 3 hours) OR +2 hours default
Oct 18: 1pm→3pm, 3pm→4pm, 4pm→6:30pm, 6:30pm→8:30pm
```

### 2. Dynamic Demo Mode
**Objective**: Allow users to test time-aware functionality without changing system time

**Implementation**:
- Demo button generates 5 events starting at current timestamp
- Each event lasts 20 seconds, consecutive intervals
- Creates temporary "Demo (date)" day object
- Inserts at beginning of event list when active
- Removes when toggled off

**Files Modified**:
- `src/App.vue` - added `generateDemoEvents()`, `toggleDemo()`, updated `displayedEvents` computed

### 3. Mobile UI Optimization
**Objective**: Create thumb-friendly mobile controls with intelligent positioning

**Implementation Phase 1 - Bottom Button Bar**:
- Fixed position bottom bar on mobile
- Right-aligned by default
- Backdrop blur effect for visual separation
- Safe area insets for notched devices
- Extra bottom padding on main content to prevent overlap

**Implementation Phase 2 - Tilt-Based Positioning**:
- Device Orientation API integration
- Reads `gamma` value (left-right tilt): -90° to +90°
- 15-degree threshold prevents jitter
- Smooth CSS transitions (`transition-all duration-300`)
- iOS 13+ permission handling
- Graceful fallback to right-aligned if unavailable

**Implementation Phase 3 - Button Cleanup**:
- Removed "3 Col" and "5 Col" buttons from mobile (irrelevant for single-column view)
- Mobile shows only: "First day/Now" and "Demo"

**Files Modified**:
- `src/App.vue` - added orientation listeners, dynamic justification classes

### 4. Event Information Updates
**Objective**: Update event details with accurate information

**Changes Made**:
- Event name: "Hiroshima Summit 2025" → "Hiroshima Setouchi Nomad Fest 2025"
- Added locations to co-ba hiroshima events (Oct 20-22)
- Updated event descriptions (Pizza & Anime Night, Okonomiyaki Tech events)
- Changed "3-minute pitches" → "2-minute pitches"
- Updated Welcome Dinner description
- Changed Sake Brewery Tour time from "All Day" → "Afternoon"
- Added locations for Sake Brewery, Rabbit Island, Live Music Karaoke
- Removed Oct 18 Community Lunch location (TBD near co-ba)

**Files Modified**:
- `index.html` - updated title
- `src/App.vue` - updated header
- `src/data/events.json` - comprehensive updates

### 5. Dynamic Button Text
**Objective**: Button shows "First day" before events start, "Now" when events begin

**Implementation**:
- Added `currentTime` reactive ref updated every 2 seconds
- `hasCurrentEvent` computed checks if any event is currently happening
- `nowButtonText` computed returns appropriate text based on state

**Files Modified**:
- `src/App.vue` - added time tracking, computed properties

## Technical Decisions

### Why Remove October 15th Test Events?
- Static test events in JSON file are inflexible
- Demo mode provides dynamic, on-demand testing
- Cleaner data file without test pollution

### Why 15-Degree Tilt Threshold?
- Prevents button jitter when phone held relatively still
- Creates "dead zone" for comfortable neutral position
- Based on ergonomic testing patterns

### Why 20-Second Demo Events?
- Long enough to observe state transitions
- Short enough to test full cycle quickly (100 seconds total)
- Matches typical demo attention span

### Why Backdrop Blur on Mobile Bar?
- Maintains content visibility underneath
- Professional iOS/modern app aesthetic
- Better than solid background for transparency

## Styling Approach

### Color Scheme
- **Live Events**: Soft green (#4ade80) - toned down from bright neon
- **Upcoming Events**: Warm yellow (#fbbf24)
- **Past Events**: Grayscale with 50% opacity
- **Demo Button**: Purple (#7c3aed) when active

### Animation Strategy
- 300ms transitions for smooth, not jarring
- Backdrop blur for depth
- Box shadows for state emphasis (subtle, not flashy)

## Browser Compatibility Notes

### Device Orientation API
- ✅ Modern mobile browsers (Chrome, Safari, Firefox)
- ⚠️ iOS 13+ requires user permission
- ❌ Some browsers may not support
- 🔄 Graceful degradation to right-aligned

### Safe Area Insets
- Uses `env(safe-area-inset-bottom)` for notched devices
- Fallback to fixed padding when not supported

## File Structure

```
New files created:
- src/components/TimeAware.vue
- README.md
- CLAUDE.md

Modified files:
- index.html
- src/App.vue
- src/data/events.json

Reference files:
- time-aware-source.js (F1 Singapore GP example)
```

## Performance Considerations

1. **Interval Management**:
   - Time updates: 2000ms (2 seconds)
   - TimeAware component: 2000ms per event
   - Auto-cleanup on unmount prevents memory leaks

2. **Past Event Optimization**:
   - TimeAware stops checking when event is past
   - Reduces unnecessary CPU cycles

3. **Computed Properties**:
   - Vue's reactivity handles caching automatically
   - Only recalculates when dependencies change

## Known Limitations

1. **Orientation Permission**: iOS 13+ users must grant permission on first use
2. **Browser Support**: Tilt feature requires DeviceOrientationEvent API
3. **Timezone**: Events hardcoded to Japan timezone (UTC+9)
4. **Demo Mode**: Doesn't persist across page refreshes

## Future Enhancement Ideas

- [ ] Persist demo mode preference in localStorage
- [ ] Add timezone conversion for international users
- [ ] Implement push notifications for upcoming events
- [ ] Add calendar export (.ics) functionality
- [ ] User preference for button alignment override
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] PWA support for offline access

## Development Timeline

Session 1:
- Initial event data updates
- Event name changes
- Location additions

Session 2:
- TimeAware component implementation
- Time-based event states
- CSS styling for states

Session 3:
- Demo mode implementation
- Dynamic event generation
- Mobile button bar

Session 4:
- Tilt-based positioning
- Mobile UI cleanup
- Documentation

---

Built with ❤️ using Claude Code

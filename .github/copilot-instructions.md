# BelovedzGuard Music React Frontend - AI Coding Instructions

## Architecture Overview

This is a **React 18 + Redux Toolkit** music streaming application with authentication and playlist management. The app follows a component-view separation pattern where `src/components/` contains reusable UI components and `src/views/` contains route-level page components.

### Key Technologies
- **State Management**: Redux Toolkit with RTK Query for API calls
- **Routing**: React Router v6 with nested routes pattern in `/listen/*`
- **HTTP Client**: Axios for REST API calls to Heroku backend
- **Analytics**: Google Analytics 4 via react-ga4
- **Icons**: React Icons (FontAwesome and Feather)
- **Styling**: Pure CSS with centralized color variables in `src/styles/colors.js`

## Critical State Management Patterns

### Redux Store Structure (`src/state/store.js`)
- `player`: Music playback state (queue, currentSongId, context tracking)
- `songs`: Global songs collection from API
- `auth`: User authentication with localStorage persistence
- `playlistApi`: RTK Query endpoints for playlist CRUD operations
- `authApi`: RTK Query endpoints for authentication

### Player State Context Pattern
The `playerSlice.js` uses a **context-aware queue system**:
```javascript
// Always set queue with context for proper state tracking
dispatch(setQueue({ 
  songs: albumSongs, 
  source: "album", 
  sourceId: albumId 
}));
dispatch(setCurrentSong(songId));
```
This enables the app to track whether music is playing from songs list, album, or playlist.

### Authentication Persistence
Auth state automatically syncs with localStorage. Use `setCredentials` action to login and `logout` action to clear both Redux state and localStorage.

## Component Architecture

### Layout Structure
- `App.js`: Root component with conditional CSS classes based on player/lyrics state
- `HeaderNav.js`: Global navigation with auth controls
- `SongPlayer.js`: Persistent bottom player (shows when `currentSongId` exists)
- `Footer.js`: Global footer component

### Nested Routing in Listen View
`src/views/Listen.js` uses a sidebar navigation pattern with nested routes:
- `/listen/songs` - All songs grid
- `/listen/albums` - Albums view  
- `/listen/playlists` - User playlists
- `/listen/playlists/:id` - Playlist details
- `/listen/playlists/create` - Create playlist
- `/listen/playlists/:id/edit` - Edit playlist

## API Integration Patterns

### Backend Base URL
Production API: `https://belovedzguard-ebf890192e0e.herokuapp.com`

### RTK Query Pattern
Use `playlistApi` for authenticated playlist operations. The base query automatically injects Bearer tokens from auth state:
```javascript
const { data: playlists } = useGetPlaylistsQuery();
```

### Direct Axios Pattern  
Songs are fetched via direct axios call in `App.js` and stored in `songsSlice`. This pattern is used for public data that doesn't require authentication.

## Styling Conventions

### Color System
All colors are centralized in `src/styles/colors.js`. Import and use these constants instead of hardcoding colors:
```javascript
import colors from "../styles/colors.js";
// Use colors.background, colors.textPrimary, etc.
```

### CSS Organization
- Component-specific styles: `src/styles/ComponentName.css`
- Global styles: `src/styles/App.css`
- View-specific styles: `src/styles/ViewName.css`

### Responsive Layout Classes
The app uses conditional CSS classes for layout states:
- `.with-lyrics` - Applied when lyrics viewer is open
- `.with-player` - Applied when song player is active

## Analytics Integration

### Tracking Pattern
Use analytics utilities from `src/utils/analytics.js`:
- `trackPageView()` - Automatic on route changes
- `trackSongPlay(title)` - Call when songs start playing
- `trackUIEvent()` - For user interactions

## Development Workflow

### Standard Scripts
- `npm start` - Development server (localhost:3000)
- `npm build` - Production build
- `npm test` - Jest test runner

### Key Files to Understand First
1. `src/state/store.js` - Redux store configuration
2. `src/App.js` - App structure and data fetching
3. `src/components/SongPlayer.js` - Core music player logic
4. `src/views/Listen.js` - Main app navigation structure

## Common Development Tasks

### Adding New API Endpoints
Extend `playlistApi.js` or `authApi.js` with new RTK Query endpoints. For public data, consider direct axios calls like the songs pattern.

### Adding New Routes
Add routes in `App.js` for top-level pages, or in `Listen.js` for music-related sub-pages.

### Player Integration
When adding new music sources, always use the context-aware queue pattern to maintain proper playback state tracking.
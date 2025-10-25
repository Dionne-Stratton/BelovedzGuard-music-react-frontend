# BelovedZGuard Music React Frontend

### A modern React application for streaming Christian music with personalized playlists, theme customization, and comprehensive music management features.

BelovedZGuard Music provides a beautiful, responsive web interface for discovering and enjoying Christian music. Users can create themed playlists, browse albums, and enjoy a seamless music streaming experience with integrated player controls.

## 🌐 [Live Website](https://belovedzguard.com/)

---

## Quicklinks

- [Related Repos](#related-repos)
- [Tech Stack](#tech-stack)
- [Project Features](#project-features)
  - [Authentication](#authentication)
  - [Music Player](#music-player)
  - [Playlist Management](#playlist-management)
  - [Discovery & Featured Content](#discovery--featured-content)
  - [Theme System](#theme-system)
  - [Navigation](#navigation)
  - [Responsive Design](#responsive-design)
  - [User Experience & Accessibility](#user-experience--accessibility)
  - [Marketing & Content Pages](#marketing--content-pages)
  - [Contact Form](#contact-form)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

---

## Related Repos

- [Backend API Server](https://github.com/Dionne-Stratton/belovedzguard-music-server-mongo.git)
- [Live Website](https://belovedzguard.com/)

---

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with RTK Query for API calls
- **React Router v6** - Client-side routing with nested routes
- **Auth0** - Authentication and user management
- **Axios** - HTTP client for REST API calls
- **React Icons** - FontAwesome and Feather icons
- **Google Analytics 4** - User analytics via react-ga4
- **CSS3** - Pure CSS with centralized color variables
- **Yup** - Form validation
- **React Intersection Observer** - Scroll-based interactions
- **Custom Toast System** - User feedback notifications
- **Keyboard Accessibility** - WCAG 2.1 compliant shortcuts

---

## Project Features

### Authentication

- **Auth0 Integration** - Secure authentication with social login options
- **User Profile Management** - View and update user information
- **Protected Routes** - Secure access to user-specific features
- **Local Storage Persistence** - Authentication state persists across sessions

### Music Player

- **Context-Aware Queue System** - Tracks music source (songs, album, playlist)
- **Audio Controls** - Play, pause, next, previous functionality
- **Progress Tracking** - Visual progress bar with seek functionality
- **Volume Control** - Adjustable audio volume
- **Resizable Lyrics Viewer** - Draggable lyrics panel with persistent width preferences (200px-30vw)
- **Lyrics Display** - Full-screen lyrics viewer with smooth transitions
- **Song Information** - Display current song title, artist, and artwork

### Playlist Management

- **Create Playlists** - Build custom playlists with theme selection
- **Add Songs Modal** - Add songs to existing playlists via modal interface
- **Theme Customization** - Choose from 12 beautiful themes
- **Playlist Organization** - View and manage all user playlists
- **Song Management** - Add/remove songs from playlists
- **Playlist Editor** - Dedicated interface for playlist editing

### Discovery & Featured Content

- **Recent Releases Showcase** - Featured card displaying the latest song with animated thumbnail and quick actions
- **Recent Releases Carousel** - Horizontal scrolling carousel of the 5 most recent songs (150px thumbnails)
- **Engaged State Highlighting** - Soft glow when playing from the 6-song showcase queue
- **Auto-Scroll Navigation** - Carousel smoothly follows the currently playing track
- **Context-Aware Playback** - Limited 6-song queue with auto-stop after final track
- **End-of-Queue Prompt** - "Keep listening" card with link to full songs library
- **Share Functionality** - Native share dialog with clipboard fallback for all songs and playlists

### Theme System

- **12 Unique Themes** - Faith, Abide, Devotion, Adoration, Blaze, Ember, Joy, Radiance, Renew, Rooted, Haven, Wonder
- **Visual Customization** - Each theme includes custom gradients, icons, and imagery
- **Theme Dropdown** - Easy theme selection in playlist creation
- **Consistent Design** - Themes applied across all playlist interfaces

### Navigation

- **Responsive Header** - Mobile-friendly navigation with logo and auth controls
- **Listen Navigation** - Dedicated sidebar navigation for music browsing
- **Nested Routing** - Organized route structure under `/listen/*`
- **Footer Links** - Social media and external links
- **Mobile-First Design** - Optimized for mobile devices

### Responsive Design

- **Mobile-First** - Optimized for mobile devices
- **Tablet Support** - Responsive design for tablet screens
- **Desktop Experience** - Full-featured desktop interface
- **Touch-Friendly** - Optimized touch interactions

### User Experience & Accessibility

- **Custom Toast Notifications** - Themed user feedback system replacing browser alerts
- **Confirmation Modals** - Custom themed confirmation dialogs
- **Keyboard Accessibility** - WCAG 2.1 compliant keyboard shortcuts
- **Context-Aware Shortcuts** - Different shortcuts for global, player, and navigation contexts
- **Form Input Protection** - Keyboard shortcuts disabled when typing in forms
- **Unsaved Changes Protection** - Prevents accidental data loss with custom modals
- **Auto Scroll to Top** - Smooth navigation with instant scroll to top on page changes

### Marketing & Content Pages

- **Rich Media Integration** - Animated MP4 backgrounds and images throughout marketing pages
- **Responsive Media** - Images and videos adapt to screen size (200px desktop, 120px tablet)
- **Interactive Videos** - Auto-play on load, restart on hover, pause on mouse leave
- **Gospel Message Section** - Visual storytelling with floating images and scripture references
- **About Page** - Personal story with integrated video content
- **Partner Page** - Partnership information with visual elements
- **Smooth Scaling** - Clamp-based responsive typography for seamless text sizing

### Contact Form

- **Comprehensive Validation** - Yup schema validation with real-time error feedback
- **Required Field Indicators** - Visual asterisks and "required field" notice for user clarity
- **Smart Submit Button** - Automatically disabled until all fields are properly filled
- **Spam Protection** - Multi-layered protection including:
  - **Honeypot Field** - Hidden field that catches automated bots silently
  - **Time-Based Validation** - Rejects submissions faster than 3 seconds
  - **Analytics Tracking** - Logs spam attempts for monitoring and improvement
- **Toast Notifications** - Success/error feedback using the application's custom toast system
- **Responsive Design** - Mobile-optimized layout with touch-friendly inputs
- **Accessibility** - Proper labels, ARIA attributes, and keyboard navigation

---

## Component Architecture

### Core Structure

```
src/
├── components/
│   ├── features/
│   │   ├── AddToPlaylist/          # Playlist creation modal
│   │   ├── Authentication/         # Auth controls and login
│   │   ├── Navigation/             # Header, footer, listen nav
│   │   └── SongPlayer/             # Music player components
│   ├── shared/                     # Reusable components
│   │   ├── ThemeDropdown.js       # Theme selection component
│   │   ├── LyricsViewer.js         # Lyrics display component
│   │   ├── SongThumbnail.js       # Song display component
│   │   ├── GenreFilter.js         # Genre filtering
│   │   ├── Toast.js               # Toast notification component
│   │   ├── ToastContainer.js      # Toast notification container
│   │   ├── ConfirmModal.js        # Confirmation modal component
│   │   ├── ErrorBoundary.js       # Error boundary component
│   │   ├── ThemeThumbnail.js      # Theme thumbnail component
│   │   └── Tooltip.js             # Tooltip component
│   └── viewComponents/             # View-specific components
│       ├── Albums/                 # Album-related components
│       ├── Playlists/              # Playlist-related components
│       └── Songs/                   # Song-related components
├── views/                          # Page components
│   ├── Home.js                     # Landing page
│   ├── About.js                    # About page
│   ├── Watch.js                    # Watch page
│   ├── Partner.js                  # Partner page
│   ├── Contact.js                  # Contact form page
│   └── listen/                     # Music browsing pages
│       ├── Listen.js               # Main listen layout
│       ├── songs/                  # Song pages
│       ├── albums/                 # Album pages
│       └── playlists/              # Playlist pages
├── state/                          # Redux store and slices
│   ├── store.js                    # Redux store configuration
│   ├── authSlice.js               # Authentication state
│   ├── playerSlice.js             # Music player state
│   ├── songsSlice.js              # Songs data state
│   ├── playlistApi.js             # Playlist API endpoints
│   └── publicApi.js               # Public API endpoints
├── hooks/                          # Custom React hooks
│   ├── useGlobalKeyboard.js       # Keyboard accessibility hooks
│   └── useToast.js                # Toast notification hook
├── contexts/                       # React contexts
│   └── ToastContext.js            # Toast notification context
└── utils/                          # Utility functions
    ├── analytics.js               # Analytics tracking
    └── genreMetadata.js           # Genre metadata
```

### Key Features by Component

| Component              | Features                                               |
| ---------------------- | ------------------------------------------------------ |
| **SongPlayer**         | Context-aware queue, audio controls, progress tracking |
| **ThemeDropdown**      | Theme selection, visual preview, responsive design     |
| **AddToPlaylistModal** | Playlist creation, theme selection, song addition      |
| **LyricsViewer**       | Full-screen lyrics display, scrollable content         |
| **ListenNav**          | Sidebar navigation for music browsing                  |
| **HeaderNav**          | Global navigation with auth controls                   |
| **Toast**              | Themed notification system for user feedback           |
| **ConfirmModal**       | Custom confirmation dialogs replacing browser alerts   |
| **SongCard**           | Interactive song cards with hover effects              |

---

## State Management

### Redux Store Structure

```javascript
{
  player: {
    queue: [],                    // Array of songs
    currentSongId: null,          // Currently playing song ID
    isPlaying: false,            // Playback status
    context: {                    // Context tracking
      source: null,              // "songs" | "album" | "playlist"
      sourceId: null             // Album/playlist ID
    }
  },
  auth: {
    user: object,                // User profile data
    token: string,               // Auth token
    isLoggedIn: boolean          // Auth status
  },
  songs: {
    songs: array                 // Global songs collection
  },
  playlistApi: {                 // RTK Query cache
    // Playlist CRUD operations
  },
  publicApi: {                   // RTK Query cache
    // Public data (songs, albums)
  }
}
```

### Context-Aware Player System

The player uses a sophisticated context system to track music sources:

```javascript
// Set queue with context for proper state tracking
dispatch(
  setQueue({
    songs: albumSongs,
    source: "album",
    sourceId: albumId,
  })
);
dispatch(setCurrentSong(songId));
```

This enables the app to track whether music is playing from songs list, album, or playlist.

### API Integration

- **RTK Query** - Efficient data fetching and caching
- **Public API** - Songs, albums, public playlists, and contact form submission
- **Playlist API** - User-specific playlist operations
- **Auth0 Integration** - Secure authentication flow

### Keyboard Accessibility System

The application includes a comprehensive keyboard accessibility system with WCAG 2.1 compliance:

#### Global Shortcuts

- **Ctrl/Cmd + L** - Toggle lyrics display
- **/** - Focus search input
- **?** - Show help modal
- **G + H** - Navigate to home
- **G + M** - Navigate to listen page

#### Player-Specific Shortcuts

- **Space** - Play/pause
- **Arrow Keys** - Previous/next song
- **Ctrl/Cmd + ↑/↓** - Volume up/down
- **Ctrl/Cmd + M** - Mute/unmute
- **Ctrl/Cmd + L** - Toggle lyrics

#### Navigation Shortcuts

- **Tab** - Navigate through focusable elements
- **Shift + Tab** - Navigate backwards
- **Enter** - Activate focused element
- **Escape** - Close modals/dropdowns

#### Smart Context Awareness

- **Form Input Protection** - Shortcuts disabled when typing in forms
- **Context Switching** - Different shortcuts for different app contexts
- **Focus Management** - Proper focus handling for accessibility

---

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>
cd belovedzguard-music-react-frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Development Server

The app will open at [http://localhost:3000](http://localhost:3000) and automatically reload when you make changes.

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Auth0 Configuration
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=your-api-identifier

# API Configuration
REACT_APP_PRODUCTION_SERVER_URL=https://your-api-server.com
```

### Required Environment Variables

| Variable                          | Description          | Example                         |
| --------------------------------- | -------------------- | ------------------------------- |
| `REACT_APP_AUTH0_DOMAIN`          | Auth0 domain         | `your-app.auth0.com`            |
| `REACT_APP_AUTH0_CLIENT_ID`       | Auth0 client ID      | `abc123def456`                  |
| `REACT_APP_AUTH0_AUDIENCE`        | Auth0 API identifier | `https://api.belovedzguard.com` |
| `REACT_APP_PRODUCTION_SERVER_URL` | Backend API URL      | `https://your-api-server.com`   |

---

## Available Scripts

### Development

```bash
npm start          # Start development server (localhost:3000)
npm test           # Run test suite with Jest
npm run build      # Build for production
npm run eject      # Eject from Create React App (one-way operation)
```

### Production

```bash
npm run build      # Create production build
npm install -g serve
serve -s build     # Serve production build locally
```

---

## Deployment

### Build Process

```bash
# Create production build
npm run build

# The build folder contains optimized files ready for deployment
```

### Deployment Options

- **Netlify** - Automatic deployments from Git
- **Vercel** - Zero-config deployments
- **AWS S3** - Static website hosting
- **Cloudflare Pages** - Fast static site hosting

### Environment Configuration

Ensure all environment variables are configured in your deployment platform:

- Auth0 credentials
- API endpoints
- Production server URL

---

## Key Features Implementation

### Theme System

The application includes a comprehensive theme system with 12 unique themes:

```javascript
const themes = {
  Faith: {
    icon: "⛪",
    gradient: "linear-gradient(160deg, #76716B 0%, #52483F 100%)",
  },
  Joy: {
    icon: "🌻",
    gradient: "linear-gradient(160deg, #A39051 0%, #958055 100%)",
  },
  // ... 10 more themes
};
```

### Music Player Integration

- **Context-Aware Queue** - Tracks music source for proper state management
- **Audio Element Management** - Custom hooks for audio control
- **Progress Tracking** - Real-time progress updates
- **Lyrics Integration** - Full-screen lyrics display
- **Responsive Design** - Mobile-optimized player controls

### Custom UI Components

The application features a comprehensive custom UI system replacing browser defaults:

#### Toast Notification System

- **Themed Notifications** - Success, error, warning, and info toasts
- **Context Provider** - Global toast management
- **Auto-dismiss** - Configurable timeout durations
- **Smooth Animations** - Enter/exit transitions
- **Accessibility** - ARIA live regions for screen readers

#### Confirmation Modal System

- **Custom Styling** - Matches application theme
- **Type Variations** - Info, warning, and danger variants
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Proper focus trapping and restoration

#### Enhanced Song Cards

- **Selective Clickability** - Thumbnail and buttons only
- **Hover Effects** - Subtle animations for all interactive elements
- **Visual Feedback** - Clear indication of clickable areas
- **Accessibility** - Proper ARIA labels and keyboard navigation

### Routing Structure

- **Main Routes** - Home, About, Watch, Partner, Contact, Listen
- **Nested Listen Routes** - Songs, Albums, Playlists with sub-routes
- **Dynamic Routes** - Song details, playlist editing, album views
- **Protected Routes** - Authentication-required sections

---

## Development Guidelines

### Component Patterns

- **Functional Components** - Use React hooks for state and effects
- **Custom Hooks** - Extract reusable logic
- **RTK Query** - Use for all API calls
- **Context-Aware Player** - Always set queue with context
- **Responsive Design** - Mobile-first approach

### State Management

- **Redux Toolkit** - Use for global state
- **RTK Query** - Use for server state
- **Local State** - Use useState for component-specific state
- **Persistence** - Auth state persists in localStorage

### Styling

- **Pure CSS** - No CSS-in-JS frameworks
- **Centralized Colors** - Use `src/components/shared/colors.js`
- **Component Styles** - Separate CSS files per component
- **Responsive Design** - Mobile-first breakpoints

---

## Browser Compatibility

### Known Issues

- **Firefox**: Carousel video hover behavior requires a workaround due to Firefox-specific video element state management. See `RecentReleasesCarousel.js` for details.

### Testing

This application has been tested on:

- Chrome ✅
- Firefox ✅ (with workaround)
- Safari ✅
- Edge ✅

---

## Contributing

This project follows modern React best practices and includes:

- **Component-Based Architecture** - Reusable, maintainable components
- **Custom Hooks** - Reusable logic extraction
- **Error Boundaries** - Graceful error handling
- **Accessibility** - WCAG compliance considerations
- **Performance** - Optimized rendering and data fetching

### Development Workflow

1. Use functional components with hooks
2. Follow React best practices
3. Maintain responsive design principles
4. Write clean, readable CSS
5. Test on multiple devices and browsers
6. Use context-aware player patterns

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For questions, issues, or contributions, please contact the development team or create an issue in the repository.

---

## Acknowledgments

- **Auth0** - Authentication and user management
- **React Community** - Excellent documentation and resources
- **Redux Toolkit** - Powerful state management
- **Create React App** - Development tooling and build system

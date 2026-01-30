# System Check

A mobile-first health tracking app built with React, TypeScript, and Tailwind CSS.

## Features

- **Daily Check-in**: Track mood, energy levels, sleep hours, and daily notes
- **3-Day Workout Split**: Pre-configured workout programs with detailed exercises
- **Protein Tracker**: Monitor daily protein intake with quick-add buttons
- **Water Tracker**: Stay hydrated with easy water intake logging
- **History**: View your past check-ins and progress over time
- **Local Storage**: All data stored locally in your browser (no backend required)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Sonner** for toast notifications
- **Local Storage** for data persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser:
   - **Desktop**: http://localhost:5173
   - **Mobile** (same WiFi): http://YOUR_LOCAL_IP:5173

The app will automatically reload when you make changes.

## Usage

### On Desktop
Simply open http://localhost:5173 in your browser

### On Mobile (Same WiFi Network)
1. Find your computer's local IP address:
   - **Mac**: System Settings → Network → Your connection → IP address
   - **Windows**: Open CMD → Run `ipconfig` → Look for IPv4 Address
   - **Linux**: Run `hostname -I` in terminal

2. Open your phone's browser and go to:
   ```
   http://YOUR_IP_ADDRESS:5173
   ```
   Example: http://192.168.1.100:5173

3. Bookmark it for quick access!

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` folder, which you can deploy to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Project Structure

```
fitness-tracker/
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx           # Bottom navigation bar
│   │   └── screens/
│   │       ├── CheckInScreen.tsx   # Daily check-in form
│   │       ├── WorkoutsScreen.tsx  # Workout programs
│   │       ├── ProteinScreen.tsx   # Protein tracker
│   │       ├── WaterScreen.tsx     # Water tracker
│   │       └── HistoryScreen.tsx   # History view
│   ├── data/
│   │   └── workouts.ts             # Workout program data
│   ├── hooks/
│   │   └── useLocalStorage.ts      # Local storage hook
│   ├── utils/
│   │   └── cn.ts                   # Utility functions
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # App entry point
│   └── index.css                   # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Customization

### Modify Workout Programs
Edit `src/data/workouts.ts` to customize the 3-day workout split with your own exercises.

### Change Daily Goals
- Protein goal: `src/components/screens/ProteinScreen.tsx` (line 10)
- Water goal: `src/components/screens/WaterScreen.tsx` (line 10)

### Customize Theme
Edit `tailwind.config.js` to change colors and styling.

## Data Storage

All data is stored locally in your browser's localStorage under the keys:
- `healthCoach_dailyData`: Current day's data
- `healthCoach_history`: Last 30 days of history

To clear all data, open browser console and run:
```javascript
localStorage.clear()
```

## License

MIT

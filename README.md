# Nomad Meetup - Connect with Digital Nomads Nearby

A location-based social app designed specifically for digital nomads to connect, network, and organize meetups with like-minded professionals in their current city or destination.

## Description

Nomad Meetup is a React Native mobile application that helps digital nomads discover and connect with other remote workers in their vicinity. Whether you're looking for a co-working buddy, want to explore the local scene, or need networking opportunities, this app makes it easy to find and meet fellow nomads based on shared interests, skills, and availability.

## Tech Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **Backend**: Supabase (Authentication, Database, Real-time)
- **Maps & Location**: React Native Maps, Expo Location
- **Navigation**: React Navigation v6
- **State Management**: React Context/Redux Toolkit
- **UI Components**: Native Base / React Native Elements

## MVP Phase 1 Features

### User Profile & Onboarding
- **Authentication**: Email, Google, and LinkedIn signup/login
- **Profile Management**:
  - Name, photo, bio
  - Current city/location
  - Professional skills and interests
  - Languages spoken
  - Work schedule and timezone
  - "Available for meetup" toggle
  - Preferred meetup types (co-working, social, networking, etc.)

### Location & Discovery
- **Real-time Proximity Detection**: Find nomads within customizable radius
- **Interactive Map View**: See nomads' locations on map
- **Distance Filtering**: Filter results by distance (1km, 5km, 10km+)
- **Online/Offline Status**: Real-time availability indicators
- **Search & Filters**: By skills, interests, languages, availability

### Messaging & Scheduling
- **In-app Chat**: Direct messaging between users
- **Meetup Scheduling**: Propose and confirm meetup times/locations
- **Push Notifications**: New messages, meetup requests, proximity alerts
- **Meetup History**: Track past and upcoming meetups

## Installation & Setup

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/xfraga/Nomad-Meetup.git
   cd Nomad-Meetup
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   ```

4. **Start the development server**
   ```bash
   expo start
   ```

5. **Run on device/simulator**
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or press 'i' for iOS simulator, 'a' for Android emulator

### Database Setup (Supabase)

1. Create a new Supabase project
2. Set up the following tables:
   - `profiles` (user profiles)
   - `meetups` (meetup requests/history)
   - `messages` (chat messages)
   - `locations` (user location data)

3. Enable Row Level Security (RLS) on all tables
4. Set up authentication providers (Google, LinkedIn)

## Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   ├── navigation/         # Navigation configuration
│   ├── services/           # API calls and external services
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions and utilities
│   └── types/              # TypeScript type definitions
├── assets/                 # Images, fonts, and other static assets
├── app.json               # Expo configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## Deployment

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**Built for Digital Nomads, by Digital Nomads** 🌍✈️💻
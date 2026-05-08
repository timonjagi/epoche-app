# The Anointing

A spiritual wellness app built with React Native + Expo that tracks astrological transits and sacred secretion windows based on your birth chart.

## Features

- **Transit Tracking** — Monitor sacred secretion windows, planetary returns, retrogrades, eclipses, and lunar phases personalized to your birth chart
- **Journal** — Track your experiences during celestial events with mood and energy levels
- **Zodiac Explorer** — Learn about all 12 signs, their elements, qualities, and spiritual significance
- **Auth** — Secure sign-in with email/password or Google via Supabase

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54 (React Native 0.81) |
| Navigation | Expo Router v4 (file-based) |
| Styling | NativeWind (Tailwind CSS for RN) — colors only |
| State | Zustand + Supabase |
| Backend | Supabase (Auth, Postgres, Storage) |
| Animations | Minimal (fade/slide only) |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your Supabase URL and anon key to .env

# Start development server
npx expo start
```

## Project Structure

```
app/
├── _layout.tsx              # Root layout (auth guard, font loading)
├── splash.tsx               # Auto-redirect based on auth state
├── (auth)/
│   ├── _layout.tsx          # Auth stack
│   ├── login.tsx            # Email/password + Google sign-in
│   └── signup.tsx            # Create account
├── (onboarding)/
│   ├── _layout.tsx          # Onboarding stack
│   └── birth-data.tsx        # Collect birth date, time, location
├── (tabs)/
│   ├── _layout.tsx          # Bottom tabs (Home, Journal, Zodiac, Profile)
│   ├── index.tsx            # Home dashboard
│   ├── journal/
│   │   ├── index.tsx        # Journal list
│   │   ├── new.tsx          # Create entry
│   │   └── [id].tsx         # Entry detail
│   ├── zodiac/
│   │   ├── index.tsx        # Zodiac grid
│   │   └── [sign].tsx       # Sign detail
│   └── profile/
│       ├── index.tsx        # Profile home
│       ├── reminders.tsx    # Notification settings
│       └── settings.tsx     # App settings
constants/
└── theme.ts                 # Colors, transit types, zodiac data
lib/
├── supabase.ts              # Supabase client
├── storage.ts               # MMKV helpers
└── astrology.ts             # Sun sign calc, moon phase, sacred secretion
stores/
├── authStore.ts             # Auth state + profile
├── journalStore.ts          # Journal entries CRUD
└── settingsStore.ts         # Notification + theme settings
types/
└── index.ts                 # Zod-validated type definitions
```

## Transit Types

The app generalizes astrological transits as trackable events:

| Transit | Description |
|---------|------------|
| Sacred Secretion | Moon transiting natal Sun (3-day window) |
| Saturn Return | Saturn returns to natal position (~29.5yr) |
| Jupiter Return | Jupiter returns to natal position (~12yr) |
| Mercury Retrograde | Mercury appears retrograde (3x/year) |
| Solar Eclipse | Eclipse near natal planets |
| Lunar Eclipse | Lunar eclipse near natal planets |
| Full Moon | Illumination and culmination |
| New Moon | New beginnings and intentions |
| Venus Return | Venus returns to natal position |
| Mars Return | Mars returns to natal position |

Users choose which transits to track, and the app calculates windows based on their birth data.

## Environment Variables

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

Private — Torus Labs
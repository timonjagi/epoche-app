# Époché

*Pause when the cosmos does.*

A spiritual wellness app built with React Native + Expo that tracks astrological transits and helps you notice when the cosmos pauses — so you can too.

## The Name

**Époché** (ἐποχή) carries three meanings that define the product:

1. **Astronomical** — The point where a planet appears to stop before reversing direction (the "station" in retrograde). Mercury's retrograde station? That's an epoché. Your sacred secretion window? The moon pausing over your natal sun.
2. **Philosophical** — The Pyrrhonist/Husserlian practice of suspending judgment to see clearly. We bracket assumptions to notice what's actually happening.
3. **Practical** — Every notification this app sends is an epoché — a pause in your day. *The cosmos paused. You should too.*

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54 (React Native 0.81) |
| Navigation | Expo Router v4 (file-based) |
| Styling | NativeWind v4 (Tailwind colors only) |
| State | Zustand (client) + Supabase (server) |
| Backend | Supabase (Auth, Postgres, Storage) |
| Storage | MMKV (local persistence) |
| Animations | Minimal (fade/slide only) |

## Getting Started

```bash
# Clone
git clone https://github.com/timonjagi/epoche-app.git
cd epoche-app

# Install
npm install

# Configure
cp .env.example .env
# Add your Supabase URL and anon key

# Run
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
├── supabase.ts              # Supabase client (MMKV session storage)
├── storage.ts               # MMKV helpers
└── astrology.ts             # Sun sign calc, moon phase, transit windows
stores/
├── authStore.ts             # Auth state + profile
├── journalStore.ts          # Journal entries CRUD
└── settingsStore.ts         # Notification + theme settings
types/
└── index.ts                 # TypeScript interfaces
```

## Transit Types

Époché generalizes astrological transits as trackable events. Each transit type represents a "pause" in the cosmos:

| Transit | Description |
|---------|------------|
| Sacred Secretion | Moon transiting natal Sun — a 3-day spiritual renewal window |
| Saturn Return | Saturn returns to natal position (~29.5yr) — major life chapter |
| Jupiter Return | Jupiter returns to natal position (~12yr) — expansion and growth |
| Mercury Retrograde | Mercury appears retrograde (3x/year) — reflect, don't initiate |
| Solar Eclipse | Eclipse near natal planets — powerful new beginnings |
| Lunar Eclipse | Lunar eclipse near natal planets — emotional revelations |
| Full Moon | Illumination and culmination |
| New Moon | New beginnings and intentions |
| Venus Return | Venus returns to natal position — love and values activated |
| Mars Return | Mars returns to natal position — drive and energy ignited |

Users choose which transits to track. The app calculates windows based on their birth data and sends epoché notifications — a pause in your day when the cosmos pauses too.

## Environment Variables

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

Private — Torus Labs
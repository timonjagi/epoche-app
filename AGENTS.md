# Époché — Agent Context

## Product

**Époché** (ἐποχή) — Track transits. Notice patterns. Rest deliberately.

A spiritual wellness app that tracks astrological transits personalized to your birth chart. Named after the astronomical point where a planet appears to pause before reversing — and the philosophical practice of suspending judgment to see clearly.

**Tagline**: *Pause when the cosmos does.*

**Company**: Torus Labs (https://toruslabs.io)
**Bundle ID**: `com.toruslabs.epoche`
**Repo**: https://github.com/timonjagi/epoche-app

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54 (React Native 0.81, New Architecture) |
| Navigation | Expo Router v4 (file-based) |
| Styling | Inline styles with theme constants from `constants/theme.ts` |
| State | Zustand (client) + Supabase (server) |
| Backend | Supabase (Auth + Postgres + Storage, RLS) |
| Local Storage | MMKV v4 (session persistence, preferences) |
| Animations | Minimal — fade/slide only, no elaborate effects |
| Icons | Lucide React Native |
| Type Checking | TypeScript strict mode |

## Architecture

### Navigation Flow

```
Splash → Auth check
  ├── No session → Login/Signup
  ├── Session, no profile → Onboarding (birth data → sign confirmation)
  └── Session, profile → Tabs
      ├── Home (dashboard, transits, quick actions)
      ├── Journal (list, create, detail)
      ├── Zodiac (12-sign grid, sign detail)
      └── Profile (birth data, reminders, settings)
```

### Key Design Decisions

1. **Transit Generalization** — The app tracks 10 transit types, not just sacred secretion. Each transit is a "pause" concept: the cosmos stops, you pause too. This is the product thesis.
2. **Data field naming** — Use `is_transit_window` (not `is_anointing_window`), `transit_reminders` (not `anointing_reminders`). All references to "anointing" in data model are replaced with generalized transit terminology.
3. **Theme system** — "Celestial Depths" palette with cosmic indigo (`#1A0B2E`) and sacred gold (`#D4AF37`). Two dark variants: "Cosmic Indigo" and "Deep Space". All colors in `constants/theme.ts`.
4. **Auth flow** — Supabase Auth with MMKV session storage. Auth guard in root `_layout.tsx` redirects based on session + onboarding state.
5. **Zodiac calculation** — Client-side sun sign calculation from birth date in `lib/astrology.ts`. Moon/rising signs require an ephemeris API (future).
6. **No elaborate animations** — User explicitly chose minimal animations (fade/slide). No twinkling stars, celebration bursts, or rotating zodiac wheels from the original Flutter app.

## Supabase Schema

```sql
-- profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  birth_date date,
  birth_time time,
  birth_location text,
  birth_latitude double precision,
  birth_longitude double precision,
  sun_sign text,
  moon_sign text,
  rising_sign text,
  onboarding_complete boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- journal_entries
create table journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  content text,
  mood_level int check (mood_level between 1 and 10),
  energy_level int check (energy_level between 1 and 10),
  moon_phase text,
  transit_type text,
  is_transit_window boolean default false,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- transit_windows (calculated per user per transit type)
create table transit_windows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  transit_type text not null,
  start_date date not null,
  peak_date date not null,
  end_date date not null,
  moon_sign text,
  moon_phase text,
  intensity int check (intensity between 1 and 10),
  notes text,
  created_at timestamptz default now()
);

-- reminder_settings
create table reminder_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade unique,
  transit_reminders boolean default true,
  journal_reminders boolean default false,
  meditation_reminders boolean default false,
  reminder_time time default '08:00',
  quiet_hours_start time default '22:00',
  quiet_hours_end time default '07:00',
  sound_type text default 'celestial_chimes',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS policies on all tables (users access only their own data)
alter table profiles enable row level security;
alter table journal_entries enable row level security;
alter table transit_windows enable row level security;
alter table reminder_settings enable row level security;
```

## File Conventions

- **Screens**: `app/(group)/screen-name.tsx` — file-based route
- **Stores**: `stores/nameStore.ts` — Zustand stores
- **Types**: `types/index.ts` — all TypeScript interfaces
- **Libs**: `lib/name.ts` — shared utilities (supabase, storage, astrology)
- **Constants**: `constants/theme.ts` — colors, zodiac data, transit types, moon phases
- **No** `components/` directory yet — components are inline in screens. Extract when repetition appears.

## Commands

```bash
npx expo start          # Start dev server
npx expo start --android # Android
npx expo start --ios     # iOS
npx tsc --noEmit         # Type check
```

## Origin

This app was migrated from a Flutter prototype (`~/projects/the_anointing`) that had 9 screens, rich animations, and mock data. The React Native rebuild generalizes from sacred-secretion-only to a multi-transit tracking architecture.

## Branding

- **Name**: Époché (both accents: É and é)
- **Display**: Époché
- **Bundle/URL**: epoche (no accents)
- **Tagline**: Pause when the cosmos does.
- **Subtag**: Track transits. Notice patterns. Rest deliberately.
- **Colors**: Cosmic Indigo (#1A0B2E) + Sacred Gold (#D4AF37)
export interface Profile {
  id: string;
  display_name: string | null;
  birth_date: string | null;
  birth_time: string | null;
  birth_location: string | null;
  birth_latitude: number | null;
  birth_longitude: number | null;
  sun_sign: string | null;
  moon_sign: string | null;
  rising_sign: string | null;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  mood_level: number | null;
  energy_level: number | null;
  moon_phase: string | null;
  transit_type: string | null;
  is_transit_window: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface TransitWindow {
  id: string;
  user_id: string;
  transit_type: string;
  start_date: string;
  peak_date: string;
  end_date: string;
  moon_sign: string | null;
  moon_phase: string | null;
  intensity: number | null;
  notes: string | null;
  created_at: string;
}

export interface ReminderSettings {
  id: string;
  user_id: string;
  transit_reminders: boolean;
  journal_reminders: boolean;
  meditation_reminders: boolean;
  reminder_time: string;
  quiet_hours_start: string;
  quiet_hours_end: string;
  sound_type: string;
  created_at: string;
  updated_at: string;
}
import { create } from "zustand";
import { storage } from "@/lib/storage";

const SETTINGS_KEY = "epoche-settings";

interface AppSettings {
  theme: "dark" | "deeper";
  transitReminders: boolean;
  journalReminders: boolean;
  meditationReminders: boolean;
  reminderTime: string;
  quietHoursStart: string;
  quietHoursEnd: string;
  soundType: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark",
  transitReminders: true,
  journalReminders: false,
  meditationReminders: false,
  reminderTime: "08:00",
  quietHoursStart: "22:00",
  quietHoursEnd: "07:00",
  soundType: "celestial_chimes",
};

function loadPersistedSettings(): AppSettings {
  try {
    const raw = storage.getString(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_SETTINGS;
}

function persistSettings(settings: AppSettings) {
  storage.set(SETTINGS_KEY, JSON.stringify(settings));
}

interface SettingsState extends AppSettings {
  setTheme: (theme: "dark" | "deeper") => void;
  toggleTransitReminders: () => void;
  toggleJournalReminders: () => void;
  toggleMeditationReminders: () => void;
  setReminderTime: (time: string) => void;
  setQuietHours: (start: string, end: string) => void;
  setSoundType: (type: string) => void;
  loadSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...DEFAULT_SETTINGS,

  setTheme: (theme) => {
    const settings = { ...get(), theme };
    set({ theme });
    persistSettings(settings);
  },

  toggleTransitReminders: () => {
    const val = !get().transitReminders;
    const settings = { ...get(), transitReminders: val };
    set({ transitReminders: val });
    persistSettings(settings);
  },

  toggleJournalReminders: () => {
    const val = !get().journalReminders;
    const settings = { ...get(), journalReminders: val };
    set({ journalReminders: val });
    persistSettings(settings);
  },

  toggleMeditationReminders: () => {
    const val = !get().meditationReminders;
    const settings = { ...get(), meditationReminders: val };
    set({ meditationReminders: val });
    persistSettings(settings);
  },

  setReminderTime: (time) => {
    const settings = { ...get(), reminderTime: time };
    set({ reminderTime: time });
    persistSettings(settings);
  },

  setQuietHours: (start, end) => {
    const settings = { ...get(), quietHoursStart: start, quietHoursEnd: end };
    set({ quietHoursStart: start, quietHoursEnd: end });
    persistSettings(settings);
  },

  setSoundType: (type) => {
    const settings = { ...get(), soundType: type };
    set({ soundType: type });
    persistSettings(settings);
  },

  loadSettings: () => {
    const persisted = loadPersistedSettings();
    set(persisted);
  },
}));
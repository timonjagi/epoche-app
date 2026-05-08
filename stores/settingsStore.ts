import { create } from "zustand";
import { StorageKeys, getBoolean, setBoolean, getString, setString } from "@/lib/storage";

interface SettingsState {
  theme: "dark" | "deeper";
  anointingReminders: boolean;
  journalReminders: boolean;
  meditationReminders: boolean;
  reminderTime: string;
  quietHoursStart: string;
  quietHoursEnd: string;
  soundType: string;

  setTheme: (theme: "dark" | "deeper") => void;
  toggleAnointingReminders: () => void;
  toggleJournalReminders: () => void;
  toggleMeditationReminders: () => void;
  setReminderTime: (time: string) => void;
  setQuietHours: (start: string, end: string) => void;
  setSoundType: (type: string) => void;
  loadSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  theme: "dark",
  anointingReminders: true,
  journalReminders: false,
  meditationReminders: false,
  reminderTime: "08:00",
  quietHoursStart: "22:00",
  quietHoursEnd: "07:00",
  soundType: "celestial_chimes",

  setTheme: (theme) => {
    set({ theme });
    setString(StorageKeys.THEME, theme);
  },

  toggleAnointingReminders: () => {
    const val = !get().anointingReminders;
    set({ anointingReminders: val });
  },

  toggleJournalReminders: () => {
    const val = !get().journalReminders;
    set({ journalReminders: val });
  },

  toggleMeditationReminders: () => {
    const val = !get().meditationReminders;
    set({ meditationReminders: val });
  },

  setReminderTime: (time) => {
    set({ reminderTime: time });
  },

  setQuietHours: (start, end) => {
    set({ quietHoursStart: start, quietHoursEnd: end });
  },

  setSoundType: (type) => {
    set({ soundType: type });
  },

  loadSettings: () => {
    const theme = getString(StorageKeys.THEME);
    if (theme) set({ theme: theme as "dark" | "deeper" });
  },
}));
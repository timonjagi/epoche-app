import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({ id: "epoche" });

export const StorageKeys = {
  ONBOARDING_COMPLETE: "onboarding_complete",
  USER_PROFILE: "user_profile",
  CACHED_JOURNAL: "cached_journal",
  REMINDER_SETTINGS: "reminder_settings",
  THEME: "theme",
} as const;

export const getString = (key: string): string | undefined => storage.getString(key);
export const setString = (key: string, value: string): void => storage.set(key, value);
export const getBoolean = (key: string): boolean | undefined => storage.getBoolean(key);
export const setBoolean = (key: string, value: boolean): void => storage.set(key, value);
export const deleteItem = (key: string): void => { storage.remove(key); };
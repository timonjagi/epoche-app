import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { createMMKV } from "react-native-mmkv";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";
const mmkvStorage = createMMKV({ id: "supabase-auth" });

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key: string) => {
        const value = mmkvStorage.getString(key);
        return value ?? null;
      },
      setItem: (key: string, value: string) => {
        mmkvStorage.set(key, value);
      },
      removeItem: (key: string) => {
        mmkvStorage.remove(key);
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
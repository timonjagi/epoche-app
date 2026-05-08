import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types";

interface AuthState {
  session: any | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;

  initialize: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  setSession: (session: any) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  profile: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        set({ session, profile, loading: false, initialized: true });
      } else {
        set({ session: null, profile: null, loading: false, initialized: true });
      }

      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          set({ session, profile, loading: false });
        } else {
          set({ session: null, profile: null, loading: false });
        }
      });
    } catch {
      set({ loading: false, initialized: true });
    }
  },

  signInWithEmail: async (email, password) => {
    set({ loading: true });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ loading: false });
      throw error;
    }
    set({ loading: false });
  },

  signUpWithEmail: async (email, password, displayName) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) {
      set({ loading: false });
      throw error;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        display_name: displayName,
        onboarding_complete: false,
      });
    }
    set({ loading: false });
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
  },

  updateProfile: async (updates) => {
    const { profile } = get();
    if (!profile) return;

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profile.id)
      .select()
      .single();

    if (error) throw error;
    set({ profile: data });
  },

  setSession: (session) => set({ session }),
}));
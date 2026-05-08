import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { JournalEntry } from "@/types";

interface JournalState {
  entries: JournalEntry[];
  loading: boolean;
  creating: boolean;

  fetchEntries: (userId: string) => Promise<void>;
  createEntry: (entry: Omit<JournalEntry, "id" | "created_at" | "updated_at">) => Promise<JournalEntry>;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
}

export const useJournalStore = create<JournalState>((set) => ({
  entries: [],
  loading: false,
  creating: false,

  fetchEntries: async (userId) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      set({ entries: data as JournalEntry[], loading: false });
    } else {
      set({ loading: false });
    }
  },

  createEntry: async (entry) => {
    set({ creating: true });
    const { data, error } = await supabase
      .from("journal_entries")
      .insert(entry)
      .select()
      .single();

    if (error) {
      set({ creating: false });
      throw error;
    }

    set((state) => ({
      entries: [data as JournalEntry, ...state.entries],
      creating: false,
    }));
    return data as JournalEntry;
  },

  updateEntry: async (id, updates) => {
    const { data, error } = await supabase
      .from("journal_entries")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    set((state) => ({
      entries: state.entries.map((e) => (e.id === id ? (data as JournalEntry) : e)),
    }));
  },

  deleteEntry: async (id) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (error) throw error;
    set((state) => ({
      entries: state.entries.filter((e) => e.id !== id),
    }));
  },
}));
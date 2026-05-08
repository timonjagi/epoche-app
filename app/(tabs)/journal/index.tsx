import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useJournalStore } from "@/stores/journalStore";
import { useEffect } from "react";
import { colors, ZODIAC_SIGNS, MOON_PHASES } from "@/constants/theme";
import type { ZodiacSign, MoonPhase } from "@/constants/theme";
import { Plus, Search } from "lucide-react-native";
import { getMoonPhaseName, calculateMoonPhase } from "@/lib/astrology";

export default function JournalListScreen() {
  const { profile } = useAuthStore();
  const { entries, loading, fetchEntries } = useJournalStore();
  const router = useRouter();

  useEffect(() => {
    if (profile?.id) {
      fetchEntries(profile.id);
    }
  }, [profile?.id]);

  const todayPhase = getMoonPhaseName(calculateMoonPhase(new Date()));

  const moonEmojis: Record<string, string> = {
    newMoon: "🌑",
    waxingCrescent: "🌒",
    firstQuarter: "🌓",
    waxingGibbous: "🌔",
    fullMoon: "🌕",
    waningGibbous: "🌖",
    lastQuarter: "🌗",
    waningCrescent: "🌘",
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.deepDark }}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 16 }}>
          Journal
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.cosmicIndigo, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16 }}>
          <Search color={colors.gray[500]} size={18} />
          <Text style={{ color: colors.gray[500], marginLeft: 8, fontSize: 15 }}>Search entries...</Text>
        </View>
      </View>

      {entries.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 40 }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>📓</Text>
          <Text style={{ color: colors.warmOffWhite, fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            No entries yet
          </Text>
          <Text style={{ color: colors.gray[400], textAlign: "center", fontSize: 14 }}>
            Start journaling to track your celestial journey
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
          {entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              onPress={() => router.push(`/(tabs)/journal/${entry.id}`)}
              style={{
                backgroundColor: colors.cosmicIndigo,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderLeftWidth: 3,
                borderLeftColor: entry.is_anointing_window ? colors.sacredGold : colors.lighterIndigo,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ color: colors.warmOffWhite, fontSize: 15, fontWeight: "600", flex: 1 }} numberOfLines={1}>
                  {entry.title}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {entry.moon_phase ? moonEmojis[entry.moon_phase] || "🌙" : "🌙"}
                </Text>
              </View>
              {entry.content && (
                <Text style={{ color: colors.gray[400], fontSize: 13 }} numberOfLines={2}>
                  {entry.content}
                </Text>
              )}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <Text style={{ color: colors.gray[500], fontSize: 11 }}>
                  {new Date(entry.created_at).toLocaleDateString()}
                </Text>
                {entry.mood_level && (
                  <Text style={{ color: colors.mutedGold, fontSize: 11 }}>
                    Mood: {entry.mood_level}/10
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => router.push("/(tabs)/journal/new")}
        style={{
          position: "absolute",
          bottom: 100,
          right: 20,
          backgroundColor: colors.sacredGold,
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: colors.sacredGold,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Plus color={colors.deepDark} size={24} />
      </TouchableOpacity>
    </View>
  );
}
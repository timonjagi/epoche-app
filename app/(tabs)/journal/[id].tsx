import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useJournalStore } from "@/stores/journalStore";
import { colors, ZODIAC_SIGNS } from "@/constants/theme";

export default function JournalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries } = useJournalStore();
  const entry = entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.deepDark, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.gray[400], fontSize: 16 }}>Entry not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.deepDark }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 8 }}>
        {entry.title}
      </Text>
      <Text style={{ color: colors.gray[400], fontSize: 13, marginBottom: 20 }}>
        {new Date(entry.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>

      {entry.is_transit_window && (
        <View style={{ backgroundColor: colors.sacredGold + "20", borderRadius: 8, padding: 12, marginBottom: 16, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: colors.sacredGold, fontSize: 13, fontWeight: "600" }}>
            ✦ Sacred Secretion Window
          </Text>
        </View>
      )}

      {entry.content && (
        <Text style={{ color: colors.warmOffWhite, fontSize: 16, lineHeight: 24, marginBottom: 24 }}>
          {entry.content}
        </Text>
      )}

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 12, padding: 16 }}>
        {entry.mood_level && (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ color: colors.gray[400], fontSize: 13 }}>Mood</Text>
            <Text style={{ color: colors.mutedGold }}>{entry.mood_level}/10</Text>
          </View>
        )}
        {entry.energy_level && (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ color: colors.gray[400], fontSize: 13 }}>Energy</Text>
            <Text style={{ color: colors.earthyGreen }}>{entry.energy_level}/10</Text>
          </View>
        )}
        {entry.moon_phase && (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: colors.gray[400], fontSize: 13 }}>Moon Phase</Text>
            <Text style={{ color: colors.warmOffWhite }}>
              {entry.moon_phase.replace(/([A-Z])/g, " $1").trim()}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
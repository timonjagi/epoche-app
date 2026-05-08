import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useJournalStore } from "@/stores/journalStore";
import { colors, TRANSIT_LABELS } from "@/constants/theme";
import { getMoonPhaseName, calculateMoonPhase } from "@/lib/astrology";
import type { TransitType } from "@/constants/theme";

const MOOD_LABELS = ["", "Very Low", "Low", "Below", "Slightly Low", "Neutral-", "Neutral", "Neutral+", "Slightly High", "High", "Very High"];

export default function NewJournalScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [moodLevel, setMoodLevel] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [saving, setSaving] = useState(false);
  const { profile } = useAuthStore();
  const { createEntry } = useJournalStore();
  const router = useRouter();

  const todayPhase = getMoonPhaseName(calculateMoonPhase(new Date()));

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Please enter a title");
      return;
    }
    if (!profile?.id) return;

    setSaving(true);
    try {
      await createEntry({
        user_id: profile.id,
        title: title.trim(),
        content: content.trim() || null,
        mood_level: moodLevel,
        energy_level: energyLevel,
        moon_phase: todayPhase,
        transit_type: null,
        is_transit_window: false,
        tags: [],
      });
      router.back();
    } catch (err: any) {
      Alert.alert("Failed to save entry", err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.deepDark }}>
      <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: colors.mutedGold, fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ color: colors.warmOffWhite, fontSize: 17, fontWeight: "600" }}>New Entry</Text>
        <TouchableOpacity onPress={handleSave} disabled={saving}>
          <Text style={{ color: colors.sacredGold, fontSize: 16, fontWeight: "700" }}>
            {saving ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 16 }}>
        <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 12, padding: 14, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.gray[400], fontSize: 13 }}>Moon Phase</Text>
          <Text style={{ color: colors.mutedGold, fontSize: 13, fontWeight: "600" }}>
            {todayPhase.replace(/([A-Z])/g, " $1").trim()}
          </Text>
        </View>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Entry title"
          placeholderTextColor={colors.gray[500]}
          style={{
            backgroundColor: colors.cosmicIndigo,
            borderWidth: 1,
            borderColor: colors.lighterIndigo,
            borderRadius: 12,
            padding: 14,
            color: colors.warmOffWhite,
            fontSize: 18,
            fontWeight: "600",
          }}
        />

        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="What's on your mind..."
          placeholderTextColor={colors.gray[500]}
          multiline
          textAlignVertical="top"
          style={{
            backgroundColor: colors.cosmicIndigo,
            borderWidth: 1,
            borderColor: colors.lighterIndigo,
            borderRadius: 12,
            padding: 14,
            color: colors.warmOffWhite,
            fontSize: 15,
            minHeight: 160,
          }}
        />

        <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 12, padding: 16 }}>
          <Text style={{ color: colors.sacredGold, fontSize: 13, fontWeight: "600", marginBottom: 10 }}>
            Mood Level
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setMoodLevel(level)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: moodLevel >= level ? colors.sacredGold : colors.lighterIndigo,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: moodLevel >= level ? colors.deepDark : colors.gray[400], fontSize: 11, fontWeight: "700" }}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{ color: colors.mutedGold, fontSize: 12, marginTop: 6, textAlign: "center" }}>
            {MOOD_LABELS[moodLevel]}
          </Text>
        </View>

        <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 12, padding: 16 }}>
          <Text style={{ color: colors.sacredGold, fontSize: 13, fontWeight: "600", marginBottom: 10 }}>
            Energy Level
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => setEnergyLevel(level)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: energyLevel >= level ? colors.earthyGreen : colors.lighterIndigo,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: energyLevel >= level ? colors.deepDark : colors.gray[400], fontSize: 11, fontWeight: "700" }}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{ color: colors.earthyGreen, fontSize: 12, marginTop: 6, textAlign: "center" }}>
            {MOOD_LABELS[energyLevel]}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
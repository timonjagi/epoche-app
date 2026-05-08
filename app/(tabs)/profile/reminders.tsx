import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/stores/settingsStore";
import { colors } from "@/constants/theme";
import { ArrowLeft } from "lucide-react-native";

const SOUND_OPTIONS = [
  { id: "celestial_chimes", name: "Celestial Chimes", emoji: "🔔" },
  { id: "tibetan_bowls", name: "Tibetan Bowls", emoji: "🪷" },
  { id: "sacred_om", name: "Sacred Om", emoji: "🕉️" },
  { id: "crystal_harmony", name: "Crystal Harmony", emoji: "💎" },
  { id: "silent", name: "Silent", emoji: "🔇" },
];

export default function RemindersScreen() {
  const router = useRouter();
  const {
    transitReminders,
    journalReminders,
    meditationReminders,
    reminderTime,
    soundType,
    toggleTransitReminders,
    toggleJournalReminders,
    toggleMeditationReminders,
    setReminderTime,
    setSoundType,
  } = useSettingsStore();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.deepDark }} contentContainerStyle={{ padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.warmOffWhite} size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.warmOffWhite, marginLeft: 12 }}>
          Notifications
        </Text>
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
        {[
          { label: "Transit Windows", value: transitReminders, toggle: toggleTransitReminders, desc: "When a planetary transit is active in your chart" },
          { label: "Journal Reminders", value: journalReminders, toggle: toggleJournalReminders, desc: "Daily reminder to write in your journal" },
          { label: "Meditation Reminders", value: meditationReminders, toggle: toggleMeditationReminders, desc: "Gentle nudge for spiritual practice" },
        ].map((item) => (
          <View key={item.label} style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.lighterIndigo }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <Text style={{ color: colors.warmOffWhite, fontSize: 15, fontWeight: "600" }}>{item.label}</Text>
              <TouchableOpacity
                onPress={item.toggle}
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: item.value ? colors.sacredGold : colors.lighterIndigo,
                  justifyContent: "center",
                  padding: 2,
                }}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: item.value ? colors.deepDark : colors.gray[400],
                  alignSelf: item.value ? "flex-end" : "flex-start",
                }} />
              </TouchableOpacity>
            </View>
            <Text style={{ color: colors.gray[400], fontSize: 12 }}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 12 }}>
          Reminder Time
        </Text>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          {["06:00", "07:00", "08:00", "09:00", "10:00"].map((time) => (
            <TouchableOpacity
              key={time}
              onPress={() => setReminderTime(time)}
              style={{
                backgroundColor: reminderTime === time ? colors.sacredGold : colors.lighterIndigo,
                borderRadius: 8,
                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: reminderTime === time ? colors.deepDark : colors.warmOffWhite, fontWeight: "600" }}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 16 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 12 }}>
          Notification Sound
        </Text>
        {SOUND_OPTIONS.map((sound) => (
          <TouchableOpacity
            key={sound.id}
            onPress={() => setSoundType(sound.id)}
            style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.lighterIndigo }}
          >
            <Text style={{ fontSize: 20, marginRight: 10 }}>{sound.emoji}</Text>
            <Text style={{ color: colors.warmOffWhite, fontSize: 15, flex: 1 }}>{sound.name}</Text>
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: soundType === sound.id ? colors.sacredGold : colors.gray[600],
              backgroundColor: soundType === sound.id ? colors.sacredGold : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {soundType === sound.id && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.deepDark }} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
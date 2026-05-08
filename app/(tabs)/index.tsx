import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { colors, ZODIAC_SIGNS, TRANSIT_LABELS } from "@/constants/theme";
import type { ZodiacSign, TransitType } from "@/constants/theme";
import { calculateMoonPhase, getMoonPhaseName } from "@/lib/astrology";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const MOON_EMOJIS: Record<string, string> = {
  newMoon: "🌑",
  waxingCrescent: "🌒",
  firstQuarter: "🌓",
  waxingGibbous: "🌔",
  fullMoon: "🌕",
  waningGibbous: "🌖",
  lastQuarter: "🌗",
  waningCrescent: "🌘",
};

export default function HomeScreen() {
  const { profile } = useAuthStore();
  const router = useRouter();
  const sunSign = profile?.sun_sign as ZodiacSign | undefined;
  const moonPhase = getMoonPhaseName(calculateMoonPhase(new Date()));
  const moonEmoji = MOON_EMOJIS[moonPhase] || "🌙";

  if (!sunSign) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.deepDark, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>✦</Text>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 8, textAlign: "center" }}>
          Set your birth data
        </Text>
        <Text style={{ fontSize: 14, color: colors.gray[400], textAlign: "center", marginBottom: 24 }}>
          Enter your birth details to see personalized transit windows and zodiac insights.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/(onboarding)/birth-data")}
          style={{ backgroundColor: colors.sacredGold, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32 }}
        >
          <Text style={{ color: colors.deepDark, fontWeight: "700", fontSize: 16 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const signData = ZODIAC_SIGNS[sunSign];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.deepDark }} contentContainerStyle={{ padding: 20 }}>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 15, color: colors.mutedGold, marginBottom: 2 }}>
          {getGreeting()}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: "700", color: colors.warmOffWhite }}>
          {profile?.display_name || "Seeker"}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 48, marginRight: 16 }}>{signData.symbol}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.sacredGold, fontSize: 12, fontWeight: "600", marginBottom: 2 }}>
            Your Sun Sign
          </Text>
          <Text style={{ color: colors.warmOffWhite, fontSize: 20, fontWeight: "700" }}>
            {sunSign.charAt(0).toUpperCase() + sunSign.slice(1)}
          </Text>
          <Text style={{ color: colors.gray[400], fontSize: 13 }}>{signData.dates}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 32 }}>{moonEmoji}</Text>
          <Text style={{ color: colors.mutedGold, fontSize: 11 }}>Moon</Text>
        </View>
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 12 }}>
          Active Transits
        </Text>
        {(["sacred_secretion", "mercury_retrograde", "full_moon"] as TransitType[]).map((type) => (
          <View
            key={type}
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.lighterIndigo }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.sacredGold, marginRight: 10 }} />
              <Text style={{ color: colors.warmOffWhite, fontSize: 15 }}>{TRANSIT_LABELS[type]}</Text>
            </View>
            <Text style={{ color: colors.mutedGold, fontSize: 13 }}>Coming soon</Text>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 12 }}>
          Next Transit Window
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ color: colors.gray[400], fontSize: 13 }}>Status</Text>
          <Text style={{ color: colors.earthyGreen, fontSize: 13, fontWeight: "600" }}>Calculating...</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.gray[400], fontSize: 13 }}>Next Window</Text>
          <Text style={{ color: colors.warmOffWhite, fontSize: 13 }}>Based on your birth data</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/journal/new")}
          style={{ flex: 1, backgroundColor: colors.sacredGold, borderRadius: 12, padding: 16, alignItems: "center" }}
        >
          <Text style={{ color: colors.deepDark, fontSize: 14, fontWeight: "700" }}>New Journal Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/zodiac/index")}
          style={{ flex: 1, backgroundColor: colors.lighterIndigo, borderRadius: 12, padding: 16, alignItems: "center", borderWidth: 1, borderColor: colors.gray[700] }}
        >
          <Text style={{ color: colors.warmOffWhite, fontSize: 14, fontWeight: "700" }}>Explore Zodiac</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
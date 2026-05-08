import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { ZODIAC_SIGNS, colors } from "@/constants/theme";
import type { ZodiacSign } from "@/constants/theme";

export default function SunSignScreen() {
  const { profile } = useAuthStore();
  const router = useRouter();
  const sunSign = (profile?.sun_sign || "leo") as ZodiacSign;
  const signData = ZODIAC_SIGNS[sunSign];

  return (
    <View style={{ flex: 1, backgroundColor: colors.deepDark }}>
      <ScrollView contentContainerStyle={{ padding: 24, alignItems: "center", paddingTop: 60 }}>
        <Text style={{ fontSize: 72, marginBottom: 16 }}>{signData.symbol}</Text>
        <Text style={{ fontSize: 14, color: colors.sacredGold, fontWeight: "600", marginBottom: 4 }}>
          Your Sun Sign
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 4 }}>
          {sunSign.charAt(0).toUpperCase() + sunSign.slice(1)}
        </Text>
        <Text style={{ fontSize: 14, color: colors.mutedGold, marginBottom: 32 }}>
          {signData.dates}
        </Text>

        <View style={{ width: "100%", backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: colors.gray[400], fontSize: 13 }}>Element</Text>
            <Text style={{ color: colors.warmOffWhite, fontWeight: "600" }}>
              {signData.element.charAt(0).toUpperCase() + signData.element.slice(1)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
            <Text style={{ color: colors.gray[400], fontSize: 13 }}>Quality</Text>
            <Text style={{ color: colors.warmOffWhite, fontWeight: "600" }}>
              {signData.quality.charAt(0).toUpperCase() + signData.quality.slice(1)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ color: colors.gray[400], fontSize: 13 }}>Ruling Planet</Text>
            <Text style={{ color: colors.warmOffWhite, fontWeight: "600" }}>{signData.ruler}</Text>
          </View>
        </View>

        <View style={{ width: "100%", backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 32 }}>
          <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
            Key Traits
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {signData.keywords.map((kw) => (
              <View
                key={kw}
                style={{
                  backgroundColor: colors.lighterIndigo,
                  borderRadius: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                }}
              >
                <Text style={{ color: colors.warmOffWhite, fontSize: 13 }}>{kw}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={{
            width: "100%",
            backgroundColor: colors.sacredGold,
            borderRadius: 12,
            padding: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.deepDark, fontSize: 16, fontWeight: "700" }}>
            Begin Pausing
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
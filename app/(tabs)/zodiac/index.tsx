import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { colors, ZODIAC_SIGNS } from "@/constants/theme";
import type { ZodiacSign, Element } from "@/constants/theme";
import { useAuthStore } from "@/stores/authStore";

const ELEMENT_COLORS: Record<Element, string> = {
  fire: colors.fire,
  earth: colors.earthyGreen,
  air: colors.air,
  water: colors.water,
};

const SIGN_ORDER: ZodiacSign[] = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

export default function ZodiacScreen() {
  const { profile } = useAuthStore();
  const router = useRouter();
  const userSign = (profile?.sun_sign || "") as ZodiacSign;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.deepDark }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 8 }}>
        Zodiac Signs
      </Text>
      <Text style={{ color: colors.gray[400], fontSize: 14, marginBottom: 20 }}>
        Explore the twelve signs and their celestial influences
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {SIGN_ORDER.map((sign) => {
          const data = ZODIAC_SIGNS[sign];
          const isUserSign = sign === userSign;
          return (
            <TouchableOpacity
              key={sign}
              onPress={() => router.push(`/(tabs)/zodiac/${sign}`)}
              style={{
                width: "47%",
                backgroundColor: isUserSign ? colors.sacredGold + "20" : colors.cosmicIndigo,
                borderRadius: 16,
                padding: 16,
                borderWidth: isUserSign ? 1 : 0,
                borderColor: colors.sacredGold,
              }}
            >
              <Text style={{ fontSize: 36, marginBottom: 6 }}>{data.symbol}</Text>
              <Text style={{ color: isUserSign ? colors.sacredGold : colors.warmOffWhite, fontSize: 16, fontWeight: "700", marginBottom: 2 }}>
                {sign.charAt(0).toUpperCase() + sign.slice(1)}
              </Text>
              <Text style={{ color: colors.gray[400], fontSize: 12, marginBottom: 6 }}>{data.dates}</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ backgroundColor: ELEMENT_COLORS[data.element] + "30", borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
                  <Text style={{ color: ELEMENT_COLORS[data.element], fontSize: 11, fontWeight: "600" }}>
                    {data.element.toUpperCase()}
                  </Text>
                </View>
              </View>
              {isUserSign && (
                <Text style={{ color: colors.sacredGold, fontSize: 10, fontWeight: "600", marginTop: 6 }}>
                  YOUR SIGN
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
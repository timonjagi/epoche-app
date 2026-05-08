import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { colors, ZODIAC_SIGNS, TRANSIT_DESCRIPTIONS } from "@/constants/theme";
import type { ZodiacSign, Element, Quality } from "@/constants/theme";

const ELEMENT_COLORS: Record<Element, string> = {
  fire: colors.fire,
  earth: colors.earthyGreen,
  air: colors.air,
  water: colors.water,
};

const ELEMENT_DESCRIPTIONS: Record<Element, string> = {
  fire: "Passionate, dynamic, and impulsive. Fire signs are leaders who ignite change.",
  earth: "Grounded, practical, and reliable. Earth signs build lasting foundations.",
  air: "Intellectual, communicative, and social. Air signs connect ideas and people.",
  water: "Intuitive, emotional, and deeply perceptive. Water signs feel the undercurrents.",
};

const QUALITY_DESCRIPTIONS: Record<Quality, string> = {
  cardinal: "Initiators who start new cycles and take action.",
  fixed: "Stabilizers who sustain, consolidate, and preserve.",
  mutable: "Adapters who facilitate transition and promote flexibility.",
};

export default function ZodiacSignScreen() {
  const { sign } = useLocalSearchParams<{ sign: string }>();
  const signKey = (sign || "leo") as ZodiacSign;
  const data = ZODIAC_SIGNS[signKey];

  if (!data) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.deepDark, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.gray[400] }}>Sign not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.deepDark }} contentContainerStyle={{ padding: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 80, marginBottom: 8 }}>{data.symbol}</Text>
      <Text style={{ fontSize: 32, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 4 }}>
        {signKey.charAt(0).toUpperCase() + signKey.slice(1)}
      </Text>
      <Text style={{ color: colors.mutedGold, fontSize: 15, marginBottom: 24 }}>{data.dates}</Text>

      <View style={{ width: "100%", backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
          <Text style={{ color: colors.gray[400], fontSize: 13 }}>Element</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: ELEMENT_COLORS[data.element], marginRight: 6 }} />
            <Text style={{ color: ELEMENT_COLORS[data.element], fontWeight: "600" }}>
              {data.element.charAt(0).toUpperCase() + data.element.slice(1)}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
          <Text style={{ color: colors.gray[400], fontSize: 13 }}>Quality</Text>
          <Text style={{ color: colors.warmOffWhite, fontWeight: "600" }}>
            {data.quality.charAt(0).toUpperCase() + data.quality.slice(1)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.gray[400], fontSize: 13 }}>Ruling Planet</Text>
          <Text style={{ color: colors.warmOffWhite, fontWeight: "600" }}>{data.ruler}</Text>
        </View>
      </View>

      <View style={{ width: "100%", backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Key Traits</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {data.keywords.map((kw) => (
            <View key={kw} style={{ backgroundColor: colors.lighterIndigo, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 }}>
              <Text style={{ color: colors.warmOffWhite, fontSize: 13 }}>{kw}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ width: "100%", backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
          {data.element.charAt(0).toUpperCase() + data.element.slice(1)} Element
        </Text>
        <Text style={{ color: colors.warmOffWhite, fontSize: 14, lineHeight: 22 }}>
          {ELEMENT_DESCRIPTIONS[data.element]}
        </Text>
      </View>

      <View style={{ width: "100%", backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
          {data.quality.charAt(0).toUpperCase() + data.quality.slice(1)} Quality
        </Text>
        <Text style={{ color: colors.warmOffWhite, fontSize: 14, lineHeight: 22 }}>
          {QUALITY_DESCRIPTIONS[data.quality]}
        </Text>
      </View>

      <View style={{ width: "100%", backgroundColor: colors.sacredGold + "15", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.sacredGold + "40" }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
          ✦ Sacred Secretion
        </Text>
        <Text style={{ color: colors.warmOffWhite, fontSize: 14, lineHeight: 22 }}>
          {TRANSIT_DESCRIPTIONS.sacred_secretion}
        </Text>
      </View>
    </ScrollView>
  );
}
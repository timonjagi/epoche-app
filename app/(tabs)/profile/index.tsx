import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { colors, ZODIAC_SIGNS } from "@/constants/theme";
import type { ZodiacSign } from "@/constants/theme";
import { ChevronRight, LogOut, Bell, Settings } from "lucide-react-native";

export default function ProfileScreen() {
  const { profile, signOut } = useAuthStore();
  const router = useRouter();
  const sunSign = (profile?.sun_sign || "") as ZodiacSign;
  const signData = sunSign ? ZODIAC_SIGNS[sunSign] : null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.deepDark }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 24 }}>
        Profile
      </Text>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 20, alignItems: "center" }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: colors.sacredGold + "20", justifyContent: "center", alignItems: "center", marginBottom: 12 }}>
          <Text style={{ fontSize: 36 }}>{signData?.symbol || "✦"}</Text>
        </View>
        <Text style={{ color: colors.warmOffWhite, fontSize: 20, fontWeight: "700", marginBottom: 4 }}>
          {profile?.display_name || "Seeker"}
        </Text>
        {signData && (
          <Text style={{ color: colors.sacredGold, fontSize: 14 }}>
            {sunSign.charAt(0).toUpperCase() + sunSign.slice(1)} • {signData.element.charAt(0).toUpperCase() + signData.element.slice(1)} Sign
          </Text>
        )}
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <Text style={{ color: colors.sacredGold, fontSize: 14, fontWeight: "600", marginBottom: 16 }}>
          Birth Data
        </Text>
        {[
          { label: "Date", value: profile?.birth_date || "Not set" },
          { label: "Time", value: profile?.birth_time || "Not set" },
          { label: "Location", value: profile?.birth_location || "Not set" },
          { label: "Sun Sign", value: profile?.sun_sign ? profile.sun_sign.charAt(0).toUpperCase() + profile.sun_sign.slice(1) : "Not set" },
          { label: "Moon Sign", value: profile?.moon_sign ? profile.moon_sign.charAt(0).toUpperCase() + profile.moon_sign.slice(1) : "Coming soon" },
          { label: "Rising Sign", value: profile?.rising_sign ? profile.rising_sign.charAt(0).toUpperCase() + profile.rising_sign.slice(1) : "Coming soon" },
        ].map((item) => (
          <View key={item.label} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.lighterIndigo }}>
            <Text style={{ color: colors.gray[400], fontSize: 14 }}>{item.label}</Text>
            <Text style={{ color: colors.warmOffWhite, fontSize: 14 }}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile/reminders")}
          style={{ flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: colors.lighterIndigo }}
        >
          <Bell color={colors.mutedGold} size={20} />
          <Text style={{ color: colors.warmOffWhite, fontSize: 15, marginLeft: 12, flex: 1 }}>Notifications</Text>
          <ChevronRight color={colors.gray[500]} size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/profile/settings")}
          style={{ flexDirection: "row", alignItems: "center", padding: 16 }}
        >
          <Settings color={colors.mutedGold} size={20} />
          <Text style={{ color: colors.warmOffWhite, fontSize: 15, marginLeft: 12, flex: 1 }}>Settings</Text>
          <ChevronRight color={colors.gray[500]} size={18} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={signOut}
        style={{ backgroundColor: colors.deepBurgundy + "30", borderRadius: 12, padding: 16, flexDirection: "row", justifyContent: "center", alignItems: "center" }}
      >
        <LogOut color="#FF6B6B" size={18} />
        <Text style={{ color: "#FF6B6B", fontSize: 15, fontWeight: "600", marginLeft: 8 }}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
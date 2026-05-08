import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { colors } from "@/constants/theme";
import { ArrowLeft, Moon, Shield, Info, Trash2 } from "lucide-react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, setTheme } = useSettingsStore();
  const { profile, signOut } = useAuthStore();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            if (profile?.id) {
              await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/rest/v1/profiles?id=eq.${profile.id}`, {
                method: "DELETE",
                headers: {
                  apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
                  Authorization: `Bearer ${(await useAuthStore.getState().session?.access_token) ?? ""}`,
                },
              }).catch(() => {});
            }
            await signOut();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.deepDark }} contentContainerStyle={{ padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.warmOffWhite} size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "700", color: colors.warmOffWhite, marginLeft: 12 }}>
          Settings
        </Text>
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <Moon color={colors.mutedGold} size={20} />
          <Text style={{ color: colors.warmOffWhite, fontSize: 15, fontWeight: "600", marginLeft: 10 }}>Theme</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {(["dark", "deeper"] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTheme(t)}
              style={{
                flex: 1,
                backgroundColor: theme === t ? colors.sacredGold : colors.lighterIndigo,
                borderRadius: 8,
                padding: 12,
                alignItems: "center",
              }}
            >
              <Text style={{ color: theme === t ? colors.deepDark : colors.warmOffWhite, fontWeight: "600" }}>
                {t === "dark" ? "Cosmic Indigo" : "Deep Space"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ backgroundColor: colors.cosmicIndigo, borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: colors.lighterIndigo }}>
          <Shield color={colors.mutedGold} size={20} />
          <Text style={{ color: colors.warmOffWhite, fontSize: 15, marginLeft: 10 }}>Privacy</Text>
        </View>
        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.lighterIndigo }}>
          <Text style={{ color: colors.gray[300], fontSize: 13, lineHeight: 20 }}>
            Your birth data is encrypted and stored securely. We never share your personal information with third parties. All journal entries are private to your account.
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
          <Info color={colors.mutedGold} size={20} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={{ color: colors.warmOffWhite, fontSize: 15 }}>About</Text>
            <Text style={{ color: colors.gray[400], fontSize: 12 }}>Époché v1.0.0</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleDeleteAccount}
        style={{
          backgroundColor: colors.deepBurgundy + "30",
          borderRadius: 12,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Trash2 color={colors.error} size={18} />
        <Text style={{ color: colors.error, fontSize: 15, fontWeight: "600", marginLeft: 8 }}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
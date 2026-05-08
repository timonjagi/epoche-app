import { Redirect } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { View, ActivityIndicator } from "react-native";
import { colors } from "@/constants/theme";

export default function SplashPage() {
  const { session, profile, initialized } = useAuthStore();

  if (!initialized) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.deepDark, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.sacredGold} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!profile?.onboarding_complete) {
    return <Redirect href="/(onboarding)/birth-data" />;
  }

  return <Redirect href="/(tabs)" />;
}
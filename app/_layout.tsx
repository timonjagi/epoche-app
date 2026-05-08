import { Stack } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { colors } from "@/constants/theme";

export default function RootLayout() {
  const { session, profile, loading, initialized, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  if (!initialized || loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.deepDark, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.sacredGold} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.deepDark } }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
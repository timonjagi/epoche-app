import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signInWithEmail, loading } = useAuthStore();

  const handleLogin = async () => {
    try {
      setError("");
      await signInWithEmail(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.deepDark }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <Text style={{ fontSize: 36, color: colors.sacredGold, marginBottom: 8 }}>✦</Text>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.warmOffWhite, marginBottom: 4 }}>
            The Anointing
          </Text>
          <Text style={{ fontSize: 14, color: colors.mutedGold, opacity: 0.7 }}>
            Track your celestial windows
          </Text>
        </View>

        {error ? (
          <View style={{ backgroundColor: colors.deepBurgundy + "33", padding: 12, borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ color: "#FF6B6B", fontSize: 14 }}>{error}</Text>
          </View>
        ) : null}

        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ color: colors.mutedGold, fontSize: 13, marginBottom: 6, fontWeight: "500" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor={colors.gray[500]}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                backgroundColor: colors.cosmicIndigo,
                borderWidth: 1,
                borderColor: colors.lighterIndigo,
                borderRadius: 12,
                padding: 14,
                color: colors.warmOffWhite,
                fontSize: 16,
              }}
            />
          </View>

          <View>
            <Text style={{ color: colors.mutedGold, fontSize: 13, marginBottom: 6, fontWeight: "500" }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={colors.gray[500]}
              secureTextEntry
              style={{
                backgroundColor: colors.cosmicIndigo,
                borderWidth: 1,
                borderColor: colors.lighterIndigo,
                borderRadius: 12,
                padding: 14,
                color: colors.warmOffWhite,
                fontSize: 16,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: colors.sacredGold,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              marginTop: 8,
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Text style={{ color: colors.deepDark, fontSize: 16, fontWeight: "700" }}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => useAuthStore.getState().signInWithGoogle()}
            style={{
              backgroundColor: colors.lighterIndigo,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.gray[700],
            }}
          >
            <Text style={{ color: colors.warmOffWhite, fontSize: 16, fontWeight: "600" }}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
          <Text style={{ color: colors.gray[400] }}>Don&apos;t have an account? </Text>
          <Link href="/(auth)/signup">
            <Text style={{ color: colors.sacredGold, fontWeight: "600" }}>Sign Up</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
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

export default function SignupScreen() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUpWithEmail, loading } = useAuthStore();

  const handleSignup = async () => {
    try {
      setError("");
      if (!displayName.trim()) {
        setError("Please enter your name");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      await signUpWithEmail(email, password, displayName);
    } catch (err: any) {
      setError(err.message || "Failed to create account");
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
            Create Account
          </Text>
          <Text style={{ fontSize: 14, color: colors.mutedGold, opacity: 0.7 }}>
            Pause when the cosmos does
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
              Display Name
            </Text>
            <TextInput
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Your name"
              placeholderTextColor={colors.gray[500]}
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
              placeholder="At least 6 characters"
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
            onPress={handleSignup}
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
              {loading ? "Creating account..." : "Create Account"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 24 }}>
          <Text style={{ color: colors.gray[400] }}>Already have an account? </Text>
          <Link href="/(auth)/login">
            <Text style={{ color: colors.sacredGold, fontWeight: "600" }}>Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
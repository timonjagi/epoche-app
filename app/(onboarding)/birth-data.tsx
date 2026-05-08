import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { calculateSunSign } from "@/lib/astrology";
import { colors } from "@/constants/theme";

const CITIES = [
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
  { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 },
  { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
];

export default function BirthDataScreen() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showCities, setShowCities] = useState(false);
  const { updateProfile, profile } = useAuthStore();
  const router = useRouter();

  const filteredCities = CITIES.filter((c) =>
    c.name.toLowerCase().includes(locationQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const handleContinue = async () => {
    if (step === 1 && !date) {
      Alert.alert("Please enter your date of birth");
      return;
    }
    if (step === 2 && !time) {
      Alert.alert("Please enter your time of birth");
      return;
    }
    if (step === 3 && !location) {
      Alert.alert("Please select your birth city");
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const selectedCity = CITIES.find((c) => c.name === location);
    const birthDate = new Date(date);
    const sunSign = calculateSunSign(birthDate.getMonth() + 1, birthDate.getDate());

    await updateProfile({
      birth_date: date,
      birth_time: time,
      birth_location: location,
      birth_latitude: selectedCity?.lat ?? null,
      birth_longitude: selectedCity?.lng ?? null,
      sun_sign: sunSign,
      onboarding_complete: true,
    });

    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.deepDark }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <Text style={{ fontSize: 36, color: colors.sacredGold, marginBottom: 16 }}>✦</Text>
          <Text style={{ fontSize: 13, color: colors.sacredGold, fontWeight: "600", marginBottom: 8 }}>
            Step {step} of 3
          </Text>
          <Text style={{ fontSize: 28, fontWeight: "700", color: colors.warmOffWhite, textAlign: "center" }}>
            {step === 1 ? "When were you born?" : step === 2 ? "What time?" : "Where were you born?"}
          </Text>
        </View>

        {step === 1 && (
          <View>
            <Text style={{ color: colors.mutedGold, fontSize: 13, marginBottom: 6, fontWeight: "500" }}>
              Date of Birth
            </Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.gray[500]}
              style={{
                backgroundColor: colors.cosmicIndigo,
                borderWidth: 1,
                borderColor: colors.lighterIndigo,
                borderRadius: 12,
                padding: 16,
                color: colors.warmOffWhite,
                fontSize: 16,
              }}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={{ color: colors.mutedGold, fontSize: 13, marginBottom: 6, fontWeight: "500" }}>
              Time of Birth
            </Text>
            <TextInput
              value={time}
              onChangeText={setTime}
              placeholder="HH:MM (24h format)"
              placeholderTextColor={colors.gray[500]}
              style={{
                backgroundColor: colors.cosmicIndigo,
                borderWidth: 1,
                borderColor: colors.lighterIndigo,
                borderRadius: 12,
                padding: 16,
                color: colors.warmOffWhite,
                fontSize: 16,
              }}
            />
            <Text style={{ color: colors.gray[400], fontSize: 12, marginTop: 8 }}>
              If you don&apos;t know your exact time, an approximation is fine.
            </Text>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={{ color: colors.mutedGold, fontSize: 13, marginBottom: 6, fontWeight: "500" }}>
              Birth City
            </Text>
            <TextInput
              value={locationQuery || location}
              onChangeText={(text) => {
                setLocationQuery(text);
                setLocation("");
                setShowCities(true);
              }}
              onFocus={() => setShowCities(true)}
              placeholder="Search for your city..."
              placeholderTextColor={colors.gray[500]}
              style={{
                backgroundColor: colors.cosmicIndigo,
                borderWidth: 1,
                borderColor: colors.lighterIndigo,
                borderRadius: 12,
                padding: 16,
                color: colors.warmOffWhite,
                fontSize: 16,
              }}
            />
            {showCities && !location && (
              <View style={{ marginTop: 8, borderRadius: 12, overflow: "hidden" }}>
                {filteredCities.map((city) => (
                  <TouchableOpacity
                    key={city.name}
                    onPress={() => {
                      setLocation(city.name);
                      setLocationQuery("");
                      setShowCities(false);
                    }}
                    style={{
                      padding: 14,
                      backgroundColor: colors.cosmicIndigo,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.lighterIndigo,
                    }}
                  >
                    <Text style={{ color: colors.warmOffWhite, fontSize: 15 }}>
                      {city.name}, {city.country}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={{ flexDirection: "row", gap: 12, marginTop: 32 }}>
          {step > 1 && (
            <TouchableOpacity
              onPress={() => setStep(step - 1)}
              style={{
                flex: 1,
                backgroundColor: colors.lighterIndigo,
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.gray[700],
              }}
            >
              <Text style={{ color: colors.warmOffWhite, fontWeight: "600" }}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleContinue}
            style={{
              flex: 1,
              backgroundColor: colors.sacredGold,
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.deepDark, fontWeight: "700" }}>
              {step === 3 ? "Complete" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
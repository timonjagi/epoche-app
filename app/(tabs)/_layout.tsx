import { Tabs } from "expo-router";
import { Home, BookOpen, Sparkles, User } from "lucide-react-native";
import { colors } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cosmicIndigo,
          borderTopColor: colors.lighterIndigo,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.sacredGold,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="journal/index"
        options={{
          title: "Journal",
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="zodiac/index"
        options={{
          title: "Zodiac",
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
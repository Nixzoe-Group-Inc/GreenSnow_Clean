import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* Maps to UpcomingShift */}
      <Stack.Screen name="transportation" />
      <Stack.Screen name="availability" />
      <Stack.Screen name="student" />
      <Stack.Screen name="tax-info" />
      <Stack.Screen name="search-radius" />
      <Stack.Screen name="emergency-contact" />
      <Stack.Screen name="employment-agreement" />
    </Stack>
  );
}

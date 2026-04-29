import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* Maps to UpcomingShift */}
      <Stack.Screen name="identity-verification" />
      <Stack.Screen name="name-screen" />
      <Stack.Screen name="phone" />
    </Stack>
  );
}

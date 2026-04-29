import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* Maps to UpcomingShift */}
      <Stack.Screen name="send-invite" />
      <Stack.Screen name="track-referrals" />
    </Stack>
  );
}

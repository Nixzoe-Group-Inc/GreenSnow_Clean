import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* Maps to UpcomingShift */}
      <Stack.Screen name="ratings-and-assurance" />
      <Stack.Screen name="name-screen" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="IdentityVerification" />
      <Stack.Screen name="image-upload" />
      <Stack.Screen name="id-card-upload" />
      <Stack.Screen name="passport-upload" />
      <Stack.Screen name="certificate-upload" />
      <Stack.Screen name="work-info" />
      <Stack.Screen name="health-and-safety" />
      <Stack.Screen name="help" />
      <Stack.Screen name="referrals" />
    </Stack>
  );
}

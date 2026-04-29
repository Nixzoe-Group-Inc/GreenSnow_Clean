import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="HealthAndSafetyPolicy" />
      <Stack.Screen name="HealthAndSafetyPolicyAgreement" />
      <Stack.Screen name="WHMISCertificationAndEducation" />
      <Stack.Screen name="WHMISCertificationAndEducationAgreement" />
      <Stack.Screen name="report" />
    </Stack>
  );
}

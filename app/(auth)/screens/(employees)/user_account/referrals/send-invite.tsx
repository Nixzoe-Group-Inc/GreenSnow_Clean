import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import { ActionButton } from "../components/ActionButton";
import { router } from "expo-router";
import { HeaderScreens } from "../components/HeaderScreens";

type CreateShiftScreenProps = {};

const SendInviteScreen: React.FC<CreateShiftScreenProps> = () => {
  const [email, setEmail] = useState<string>("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendInvite = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Here you'd send the invite (e.g. via Firebase, backend API, etc.)
    Alert.alert("Success", "Invite sent successfully!");

    // Redirect or reset
    router.push("./CreateShiftContinued");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-4 py-10`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold mb-2 `}>
        Get Your Friends To Join Greensnow And Get Cash!
      </Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes.
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        {/* Email Input */}
        <Text style={tw`text-sm font-medium mb-2`}>
          Email Address of Invitee
        </Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          value={email}
          onChangeText={setEmail}
          placeholder="friend@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Send Invite Button */}
        <ActionButton
          buttonStyle="mt-5"
          onPress={handleSendInvite}
          label="Send Invite"
          isEnabled={email.trim().length > 0}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendInviteScreen;

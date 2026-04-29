import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";
import { ActionButton } from "../components/ActionButton";
import { router } from "expo-router";
import { HeaderScreens } from "../components/HeaderScreens";

type CreateShiftScreenProps = {};

const ReportScreen: React.FC<CreateShiftScreenProps> = () => {
  const [issueType, setIssueType] = useState<string>("Racist Abuse");
  const [businessName, setBusinessName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    const trimmedEmail = email.trim();
    const trimmedBusinessName = businessName.trim();
    const trimmedDescription = description.trim();

    if (!trimmedBusinessName || !trimmedEmail || !trimmedDescription) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Normally you'd send this data to a backend or Firestore here
    Alert.alert("Success", "Your report has been submitted.");
    router.back();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-2 py-10`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold mb-2`}>
        Give Us More Details About Your Incident.
      </Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        {/* Issue Type Picker */}
        <Text style={tw`text-sm font-medium mb-2`}>
          What Type Of Issue Do You Want To Report?
        </Text>
        <View style={tw`border rounded-lg bg-white mb-4`}>
          <Picker
            selectedValue={issueType}
            onValueChange={(itemValue) => setIssueType(itemValue)}
          >
            <Picker.Item label="Racist Abuse" value="Racist Abuse" />
            <Picker.Item label="Unfair Dismissal" value="Unfair Dismissal" />
            <Picker.Item label="Sexual Harassment" value="Sexual Harassment" />
            <Picker.Item label="Unpaid Work" value="Unpaid Work" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Email Input */}
        <Text style={tw`text-sm font-medium mb-2`}>Your Email Address</Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          maxLength={100}
        />

        {/* Business Name Input */}
        <Text style={tw`text-sm font-medium mb-2`}>Name Of Business</Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          value={businessName}
          onChangeText={setBusinessName}
          placeholder="Name of Business"
          maxLength={100}
        />

        {/* Description Input */}
        <Text style={tw`text-sm font-medium mb-2`}>Incident Description</Text>
        <TextInput
          style={tw`border rounded-lg bg-white px-4 pb-20 text-base`}
          value={description}
          onChangeText={setDescription}
          placeholder="Provide a detailed description of the incident..."
          multiline
          maxLength={1000}
        />

        {/* Submit Button */}
        <ActionButton
          buttonStyle="mt-1"
          onPress={handleSubmit}
          label="Submit"
          isEnabled={
            !!businessName.trim() && !!email.trim() && !!description.trim()
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;

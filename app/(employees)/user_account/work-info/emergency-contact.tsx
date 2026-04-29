import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
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

const EmergencyContactForm: React.FC<CreateShiftScreenProps> = () => {
  const [relationType, setRelationType] = useState<string>("Sibling");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhoneNumber = (phone: string) => /^\+?[0-9]{7,15}$/.test(phone);

  const handleSave = () => {
    if (!name || !phone || !email) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
      return;
    }

    // Continue to next screen
    router.push("/");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-2 py-10`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold mb-2`}>
        Who Should We Contact In Case Of Emergency?
      </Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        {/* Name Input */}
        <Text style={tw`text-sm font-medium mb-2`}>Name</Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          value={name}
          onChangeText={setName}
          placeholder="Enter full name"
          maxLength={50}
        />

        {/* Relation Type Picker */}
        <Text style={tw`text-sm font-medium mb-2`}>Relation</Text>
        <View style={tw`border rounded-lg bg-white mb-4`}>
          <Picker
            selectedValue={relationType}
            onValueChange={(itemValue) => setRelationType(itemValue)}
          >
            <Picker.Item label="Sibling" value="Sibling" />
            <Picker.Item label="Parent" value="Parent" />
            <Picker.Item label="Office Work" value="Office Work" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Phone Input */}
        <Text style={tw`text-sm font-medium mb-2`}>Phone Number</Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          maxLength={15}
        />

        {/* Email Input */}
        <Text style={tw`text-sm font-medium mb-2`}>Email</Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          maxLength={50}
        />

        {/* Save Button */}
        <ActionButton
          buttonStyle="mt-1"
          onPress={handleSave}
          label="Save"
          isEnabled={!!name && !!email && !!phone}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyContactForm;

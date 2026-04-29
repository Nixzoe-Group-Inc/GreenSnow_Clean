import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";
import { ActionButton } from "./components/ActionButton";
import { router } from "expo-router";
import { HeaderScreens } from "./components/HeaderScreens";
import { images } from "@/assets/images";

type CreateShiftScreenProps = {};

const HelpScreen: React.FC<CreateShiftScreenProps> = () => {
  const [subject, setSubject] = useState<string>("Payment Enquiry");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  const handleSave = () => {
    const trimmedInfo = additionalInfo.trim();

    if (!subject || !trimmedInfo) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Submit to backend (or Firebase, etc.)
    Alert.alert("Success", "Your report has been submitted.");
    router.back();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-2 py-10`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold mb-2`}>
        What Can We Help You With?
      </Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Tell us your issue by filling the information below. Our team will get
        back to you shortly.
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5 pb-20`}
        showsVerticalScrollIndicator={false}
      >
        {/* Subject Picker */}
        <Text style={tw`text-sm font-medium mb-2`}>Subject</Text>
        <View style={tw`border rounded-lg bg-white mb-4`}>
          <Picker
            selectedValue={subject}
            onValueChange={(itemValue) => setSubject(itemValue)}
          >
            <Picker.Item label="Payment Enquiry" value="Payment Enquiry" />
            <Picker.Item label="Technical Issue" value="Technical Issue" />
            <Picker.Item
              label="Job Posting Question"
              value="Job Posting Question"
            />
            <Picker.Item label="Account Help" value="Account Help" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Additional Info Input */}
        <Text style={tw`text-sm font-medium mb-2`}>Additional Info</Text>
        <TextInput
          style={tw`border rounded-lg bg-white px-4 pb-40 mb-5 text-base`}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          placeholder="Tell us more about your issue..."
          multiline
          maxLength={1000}
        />

        {/* Save Button */}
        <ActionButton
          buttonStyle="mt-1"
          onPress={handleSave}
          label="Submit"
          isEnabled={!!subject && !!additionalInfo.trim()}
        />

        {/* Footer Logo */}
        <View style={tw`mt-10 flex items-center`}>
          <Image
            source={images.logowithcaption}
            style={tw`h-12 w-48`}
            resizeMode="contain"
          />
        </View>

        {/* Watermark logo */}
        <Image
          source={images.logowithoutcaption}
          style={tw`absolute bottom-0 left-0 w-24 h-24 opacity-10`}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

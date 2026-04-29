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
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";
import { ActionButton } from "../components/ActionButton";
import { router } from "expo-router";
import moment from "moment";
import { HeaderScreens } from "../components/HeaderScreens";
import { images } from "@/assets/images";

type CreateShiftScreenProps = {};

const ModeOfTransportationScreen: React.FC<CreateShiftScreenProps> = () => {
  const [publicChecked, setPublicChecked] = useState<boolean>(false);
  const [personalChecked, setPersonalChecked] = useState<boolean>(false);

  const handleSave = () => {
    Alert.alert(
      "Saved",
      `public bus: ${publicChecked}\npersonal car: ${personalChecked}`
    );
    // Save to backend logic here
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-4 py-10`}>
      {/* Header */}
      <HeaderScreens />
      <Text style={tw`text-2xl font-bold mb-2`}>
        How Do You Get About Usually?
      </Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        <Text style={tw`text-small font-bold`}>Mode of Transportation </Text>
        {/* Mode of Transportation Input */}
        <View style={tw`flex-row items-center justify-between mt-5`}>
          <Text style={tw`text-sm text-gray-500`}>Public Bus</Text>
          {/* Radio button for Public Bus */}
          <TouchableOpacity
            onPress={() => {
              setPublicChecked(true);

              setPersonalChecked(false); // Uncheck Personal if Public is checked
            }}
            style={tw`flex-row items-center`}
          >
            {publicChecked ? (
              <Image
                source={images.radiofilled} // Replace with your checked icon
                style={tw`h-5 w-5`}
              />
            ) : (
              <Image source={images.radiooutline} style={tw`h-5 w-5`} />
            )}
          </TouchableOpacity>
        </View>

        {/* Radio button for Personal car */}
        <View style={tw`flex-row items-center justify-between mt-5 mb-10`}>
          <Text style={tw`text-sm text-gray-500`}>Personal Car</Text>
          <TouchableOpacity
            onPress={() => {
              setPersonalChecked(true);

              setPublicChecked(false); // Uncheck Personal if Public is checked
            }}
            style={tw`flex-row items-center`}
          >
            {personalChecked ? (
              <Image
                source={images.radiofilled} // Replace with your checked icon
                style={tw`h-5 w-5`}
              />
            ) : (
              <Image source={images.radiooutline} style={tw`h-5 w-5`} />
            )}
          </TouchableOpacity>
        </View>
        {/* Invite Button */}
        <ActionButton
          buttonStyle="mt-5"
          onPress={handleSave}
          label="Save"
          isEnabled={personalChecked || publicChecked}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModeOfTransportationScreen;

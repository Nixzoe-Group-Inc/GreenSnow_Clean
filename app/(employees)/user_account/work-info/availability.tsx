import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
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

const Availability: React.FC<CreateShiftScreenProps> = () => {
  const [partTimeChecked, setpartTimeChecked] = useState<boolean>(false);
  const [fullTimeChecked, setFullTimeChecked] = useState<boolean>(false);

  const handleSave = () => {
    Alert.alert(
      "Saved",
      `part time: ${partTimeChecked}\nfull time: ${fullTimeChecked}`
    );
    // Save to backend logic here
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-4 py-10`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold mb-2`}>
        How Much Work Are You Looking To Get?
      </Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        <Text style={tw`text-small font-bold`}>
          Number Of Working Hours/Week{" "}
        </Text>
        {/* Mode of Transportation Input */}
        <View style={tw`flex-row items-center justify-between mt-5`}>
          <Text style={tw`text-sm text-gray-500`}>
            Part-Time(20 Hours/Week)
          </Text>
          {/* Radio button for Public Bus */}
          <TouchableOpacity
            onPress={() => {
              setpartTimeChecked(true);

              setFullTimeChecked(false);
            }}
            style={tw`flex-row items-center`}
          >
            {partTimeChecked ? (
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
          <Text style={tw`text-sm text-gray-500`}>
            Full-Time(20 Hours/Week)
          </Text>
          <TouchableOpacity
            onPress={() => {
              setFullTimeChecked(true);

              setpartTimeChecked(false); // Uncheck Personal if Public is checked
            }}
            style={tw`flex-row items-center`}
          >
            {fullTimeChecked ? (
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
          isEnabled={partTimeChecked || fullTimeChecked}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Availability;

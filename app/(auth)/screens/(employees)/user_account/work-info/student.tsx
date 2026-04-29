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

const SchoolingForm: React.FC<CreateShiftScreenProps> = () => {
  const [yes, setYes] = useState<boolean>(false);
  const [no, setNo] = useState<boolean>(false);

  const handleSave = () => {
    Alert.alert("Saved", `yes: ${yes}\nno: ${no}`);
    // Save to backend logic here
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-2 py-10`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold mb-2`}>Are You Schooling?</Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        <Text style={tw`text-small font-bold`}>Are You A Student?</Text>
        {/* Mode of Transportation Input */}
        <View style={tw`flex-row items-center justify-between mt-4`}>
          <Text style={tw`text-sm text-gray-500`}>Yes</Text>
          {/* Radio button for Public Bus */}
          <TouchableOpacity
            onPress={() => {
              setYes(true);

              setNo(false); // Uncheck Personal if Public is checked
            }}
            style={tw`flex-row items-center`}
          >
            {yes ? (
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
          <Text style={tw`text-sm text-gray-500`}>No</Text>
          <TouchableOpacity
            onPress={() => {
              setNo(true);

              setYes(false); // Uncheck Personal if Public is checked
            }}
            style={tw`flex-row items-center`}
          >
            {no ? (
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
          onPress={() => {
            // Form Validation

            router.push({
              pathname: "/",
              params: {},
            });
          }}
          label="Save"
          isEnabled={yes || no}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SchoolingForm;

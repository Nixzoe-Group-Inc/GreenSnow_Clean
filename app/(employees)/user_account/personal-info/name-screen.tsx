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
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";
import { ActionButton } from "../components/ActionButton";
import { router } from "expo-router";
import moment from "moment";
import { HeaderScreens } from "../components/HeaderScreens";

type CreateShiftScreenProps = {};

const NameScreen: React.FC<CreateShiftScreenProps> = () => {
  const [name, setName] = useState<string>("");

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 px-4 py-10`}>
      {/* Header */}
      <HeaderScreens />
      <Text style={tw`text-2xl font-bold mb-2`}>How Should We Call You?</Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        {/* Hourly Rate Input */}
        <Text style={tw`text-small font-medium mb-2`}>Name</Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          value={name}
          onChangeText={setName}
          placeholder="Evanela Aba Forson" //replace with actual name from backend
        />

        {/* Proceed Button */}
        <ActionButton
          buttonStyle="mt-5"
          onPress={() => {
            // Form Validation

            router.push({
              pathname: "./CreateShiftContinued",
              params: {},
            });
          }}
          label="Save"
          isEnabled={name.length > 0}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NameScreen;

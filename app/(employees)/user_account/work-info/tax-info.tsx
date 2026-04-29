import React, { useState } from "react";
import {
  Image,
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
import { images } from "@/assets/images";

type CreateShiftScreenProps = {};

const TaxInfo: React.FC<CreateShiftScreenProps> = () => {
  const [shiftType, setShiftType] = useState<string>("General Labor");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [sin, setSin] = useState<string>("");

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const isValidSIN = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    return /^\d{9}$/.test(cleaned); // Exactly 9 digits
  };

  const handleSave = () => {
    const cleanedSIN = sin.trim();

    if (!cleanedSIN) {
      Alert.alert("Error", "Please enter your Social Insurance Number.");
      return;
    }

    if (!isValidSIN(cleanedSIN)) {
      Alert.alert(
        "Invalid SIN",
        "Please enter a valid 9-digit SIN (with or without dashes)."
      );
      return;
    }

    if (!date) {
      Alert.alert("Error", "Please select a SIN expiry date.");
      return;
    }

    // Continue to next screen
    router.push("/");
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-zinc-100 py-10 px-4`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold mb-2`}>What Is Your SIN?</Text>
      <Text style={tw`text-gray-500 mb-6`}>
        Discover millions of gigs and get in touch with gig hirers as seamless
        as it comes
      </Text>

      <ScrollView
        contentContainerStyle={tw`p-2.5`}
        showsVerticalScrollIndicator={false}
      >
        {/* SIN Input */}
        <Text style={tw`text-sm font-medium mb-2`}>
          Social Insurance Number
        </Text>
        <TextInput
          style={tw`border rounded-lg bg-white p-4 mb-4`}
          keyboardType="numeric"
          value={sin}
          onChangeText={setSin}
          placeholder="123-456-789"
          maxLength={11}
        />

        {/* Date Picker */}
        <Text style={tw`text-sm font-medium mb-2`}>SIN Expiry Date</Text>
        <TouchableOpacity
          style={tw`border rounded-lg bg-white p-4 mb-4 flex-row items-center justify-between`}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={tw`text-gray-800`}>{date.toDateString()}</Text>
          <Image source={images.arrowdown} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Proceed Button */}
        <ActionButton
          buttonStyle="mt-1"
          onPress={handleSave}
          label="Save"
          isEnabled={!!sin && !!date}
        />

        <Text style={tw`text-xs text-gray-500 mt-4`}>
          This information is used for tax purposes only, and is kept safe and
          secure. It will not be shared with anyone.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaxInfo;

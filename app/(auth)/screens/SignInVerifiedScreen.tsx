import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";
import { useRouter } from "expo-router";
import { Header } from "../components/Header";
import { images } from "@/assets/images"; // Import your images if necessary

const SignInVerifiedScreen = () => {
  const router = useRouter();

  const handleAccountPress = () => alert("My Account functionality coming soon.");

  const handleProceedToEmployeeSection = () => {
    // Navigate to the Employee section
    router.push("/(employers)/(tabs)"); // Correct path based on the router setup
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
      {/* Header with Back Arrow */}
      {/* <Header
        showBackButton={true}
        onBackPress={() => router.back()}
        style={tw`absolute top-1 left-1`}
      /> */}
      <View style={tw`absolute top-0 right-0 mt-4 mr-4`}>
        <Image
          source={images.Logo}
          style={tw`w-40 h-45`}
          accessibilityLabel="Company logo"
        />
      </View>
      <Text style={tw`text-2xl font-bold mt-25`}>Account Verified</Text>
      <View style={tw`items-center mb-2`}>
        <View style={tw`p-4 mt-2`}>
          <Image
            source={images.verifield} // Replace with the path to your image
            style={tw`w-[283px] h-[331px]`} // Adjust the size as needed
          />
        </View>
      </View>

      {/* Proceed to Employee Section Button with full width */}
      <TouchableOpacity
        style={tw`bg-[#068A2D] p-4 rounded-lg mb-4 w-full`} // Ensures full width
        onPress={handleProceedToEmployeeSection} // Trigger navigation to Employee section
      >
        <Text style={tw`text-white font-bold text-lg rounded-lg text-center`}>
          Proceed to Employee Section
        </Text>
      </TouchableOpacity>

      <View style={tw`mt-4`}>
        <Image
          source={images.Log} // Replace with the path to your image
          style={tw`w-[82px] h-[57px]`} // Adjust the size as needed
        />
      </View>
    </View>
  );
};

export default SignInVerifiedScreen;

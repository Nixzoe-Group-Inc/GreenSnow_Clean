import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Header } from '../components/Header';
import { images } from '@/assets/images';
import { useRouter } from 'expo-router'; // Import the useRouter hook

const SignInRecoveryScreen = () => {
  const router = useRouter(); // Initialize the router

  const handleAccountPress = () => alert("My Account functionality coming soon.");

  const handleProceedPress = () => {
    // Navigate to the next page when the Proceed button is pressed
    router.push('./SignInVerifiedScreen'); // Ensure '/sign-in-verified' exists in your pages directory
  };

  const handleResendCode = () => {
    // Resend code functionality
    alert('Code has been resent!');
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
   

      <Text style={tw`text-2xl font-bold mb-4`}>Sign In Confirmation</Text>
      <Text style={tw`text-center mb-8 mx-4`}>
        Enter the code sent to your email.
      </Text>

      {/* Label for the input field */}
      <Text style={tw`text-left w-full mb-2`}>Recovery code in your email</Text>

      <TextInput
        style={tw`border border-gray-500 p-4 rounded-lg mb-4 w-full`} // Recovery code input field
        keyboardType="numeric" // Optional: Set keyboard to numeric for code entry
      />

      {/* Proceed button with full width */}
      <TouchableOpacity
        style={tw`bg-[#068A2D] p-4 rounded-lg mb-4 w-full`}
        onPress={handleProceedPress}
      >
        <Text style={tw`text-white text-lg font-bold text-center`}>Proceed</Text>
      </TouchableOpacity>

      {/* "Didn't get the code?" and "Resend" on the same line with Resend link underlined */}
      <View style={tw`flex-row`}>
        <Text style={tw`text-black`}>Didn't get the code? </Text>
        <TouchableOpacity onPress={handleResendCode}>
          <Text style={tw`text-[#068A2D] underline`}>Resend</Text>
        </TouchableOpacity>
      </View>

      {/* Logo at the Bottom */}
      <View style={tw`absolute bottom-0 left-0 right-0 items-center pb-6`}>
        <Image
          source={images.Log}
          style={tw`w-[82px] h-[57px]`}
        />
      </View>
    </View>
  );
};

export default SignInRecoveryScreen;

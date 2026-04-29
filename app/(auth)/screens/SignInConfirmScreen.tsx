import React from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '../components/Header';
import tw from 'twrnc';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import OptionButton from '../components/OptionButton';


const SignInConfirm = () => {
  const router = useRouter();
  const images = {
    Log: require('@/assets/images'), // Adjust the path to your logo image
  };

  const handleAccountPress = () => alert('My Account functionality coming soon.');

  const handleOptionSelect = (option: string) => {
    Alert.alert(
      'Option Selected',
      `You chose to ${option}.`,
      [
        {
          text: 'OK',
          onPress: () => router.push('./SignInRecoveryScreen'), // Correct path to the screen
        },
      ],
      { cancelable: false }
    );
  };

  const options = [
    {
      text: 'Confirm With Phone Number',
      icon: <FontAwesome name="phone" size={24} color="green" />,
    },
    {
      text: 'Continue With Email',
      icon: <MaterialIcons name="email" size={24} color="green" />,
    },
    {
      text: 'Continue With Authenticator',
      icon: <MaterialIcons name="lock" size={24} color="green" />,
    },
  ];

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
     

      <Text style={tw`text-2xl font-bold mb-2`}>Sign In Confirmation</Text>
      <Text style={tw`text-center mx-14 mb-10`}>
        As an added security feature, we want to verify it is really you. Choose your preferred option below.
      </Text>

      {options.map((option, index) => (
        <OptionButton
          key={index}
          text={option.text}
          icon={option.icon}
          onPress={() => handleOptionSelect(option.text.toLowerCase())}
        />
      ))}

      <TouchableOpacity style={tw`bg-[#068A2D] p-4 rounded-lg mx-4 mb-10 flex-row items-center`}>
        <Text style={tw`text-white text-lg font-bold text-center w-full`}>Login</Text>
      </TouchableOpacity>

      <View style={tw`absolute bottom-10 items-center`}>
        {/* Include your logo */}
        <Image
          source={images.Log}
          style={tw`w-[82px] h-[57px]`}
        />
        
      </View>
    </View>
  );
};

export default SignInConfirm;

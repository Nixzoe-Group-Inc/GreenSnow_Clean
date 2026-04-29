import { images } from "@/assets/images";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import tw from "twrnc";
import { ActionButton } from "../components/ActionButton";
import { HeaderScreens } from "../components/HeaderScreens";

const SearchRadiusScreen: React.FC = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(47);

  const handleSave = () => {
    Alert.alert("Saved", `Address: ${address}\nRadius: ${radius} km`);
    // Save to backend logic here
  };

  return (
    <View style={tw`flex-1 bg-gray-100 px-6 pt-12`}>
      {/* Back Button */}
      <HeaderScreens />

      {/* Title */}
      <Text style={tw`text-2xl font-bold mb-2`}>
        How Far Do You Want Us To Search?
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Description */}
        <Text style={tw`text-gray-600 mb-6`}>
          Enter your home address. This would be your starting point. We would
          look for jobs around you.
        </Text>

        {/* Home Address Input */}
        <Text style={tw`text-sm font-semibold text-gray-700 mb-1`}>
          Home Address
        </Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={tw`border border-gray-400 rounded-md px-4 py-3 bg-white mb-4`}
          placeholder="1180 Barlow Trail NE, Calgary, AB T3J, Canada"
        />

        {/* Location Preview (Map Image) */}
        <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>
          Location
        </Text>
        <Image
          source={{ uri: "https://i.imgur.com/zT5G4VU.png" }} // Replace with dynamic map if needed
          style={tw`w-full h-48 rounded-md mb-6`}
          resizeMode="cover"
        />

        {/* Radius Slider */}
        <Text style={tw`text-gray-700 mb-2`}>
          Current search radius is{" "}
          <Text style={tw`font-bold`}>{radius} km</Text>.
        </Text>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={radius}
          minimumTrackTintColor="#22c55e"
          maximumTrackTintColor="#d1d5db"
          thumbTintColor="#16a34a"
          onValueChange={(value) => setRadius(value)}
        />
        <View style={tw`flex-row justify-between w-full mb-10`}>
          <Text style={tw`text-xs font-bold`}>1 km</Text>
          <Text style={tw`text-xs font-bold`}>50 km</Text>
        </View>

        {/* Save Button */}
        <ActionButton onPress={handleSave} isEnabled={!!address} label="Save" />

        {/* Footer */}
        <View style={tw`mt-35 mb-10 flex items-center`}>
          <Image source={images.logowithcaption} />
        </View>

        {/* Watermark logo */}
        <Image
          source={images.logowithoutcaption}
          style={tw`absolute bottom-0 left-0`}
        />
      </ScrollView>
    </View>
  );
};

export default SearchRadiusScreen;

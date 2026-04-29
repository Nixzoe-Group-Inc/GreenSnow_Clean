import { images } from "@/assets/images";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import tw from "twrnc";
import { ActionButton } from "../../components/ActionButton";
import { useLocalSearchParams } from "expo-router";
import { HeaderScreens } from "../../components/HeaderScreens";
import * as ImagePicker from "expo-image-picker";

const CertificateUpload: React.FC = () => {
  const { userImage, description } = useLocalSearchParams<{
    userImage: string;
    description: string;
  }>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [approved, setApproval] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const takeImageHandler = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Camera access is needed to take an ID image."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!image) return;
    Alert.alert("Success", "ID Card image saved.");
    // Upload logic goes here
  };

  return (
    <SafeAreaView style={tw`flex-1 pt-10 bg-gray-100 px-2 items-center`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`self-start text-2xl font-bold text-stone-900`}>
        Have Any Other certification?
      </Text>

      <ScrollView contentContainerStyle={tw`items-center`}>
        {/* Description */}
        <Text style={tw`text-gray-600 mt-5 mb-7`}>
          This will enable us complete checks on your background and get you
          viable for picking gigs. Together, we make Greensnow safe for all of
          us.
        </Text>

        {/* User Image */}

        <TouchableOpacity
          onPress={takeImageHandler}
          style={tw`w-full aspect-square bg-black justify-center items-center mb-6 w-[80%]`}
        >
          {image ? (
            <>
              <Image
                source={{ uri: image }}
                style={tw`w-full h-full absolute`}
              />
              <View style={tw`absolute justify-center items-center`}>
                <Image source={images.camera} />
                <Text style={tw`text-white mt-2 font-semibold`}>
                  Retake Image
                </Text>
              </View>
            </>
          ) : (
            <>
              <Image source={images.file} />
              <Text style={tw`text-white mt-2`}>Upload File</Text>
            </>
          )}
        </TouchableOpacity>

        <ActionButton onPress={handleSave} isEnabled={!!image} label="Save" />

        {/* Footer */}
        <Image
          source={images.logowithoutcaption}
          style={tw`absolute bottom-0 left-0`}
        />

        {/* Footer */}
        <View style={tw`mt-35 mb-5 flex items-center`}>
          <Image source={images.logowithcaption} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CertificateUpload;

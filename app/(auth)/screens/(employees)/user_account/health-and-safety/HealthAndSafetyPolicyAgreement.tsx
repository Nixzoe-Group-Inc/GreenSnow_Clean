import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  LogBox,
  ActivityIndicator,
  FlatList,
} from "react-native";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "@/assets/images";
import { ActionButton } from "../components/ActionButton";
import {
  DisplayPersonalInfoProps,
  EmployerDetailsDisplayProps,
  UserDataProps,
  UserProps,
} from "../types";
import { router, useLocalSearchParams } from "expo-router";
import { UserData } from "@/assets/data/Data";
import { fetchUser } from "@/services/api_test";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderScreens } from "../components/HeaderScreens";

const HealthAndSafetyAgreement = () => {
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [acceptanceDate, setAcceptanceDate] = useState("August 06, 2022"); // Example date, replace with actual logic

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    loadEmployerAgreement();
    setLoading(false); //for testing purposes, remove this line in production
  }, []);

  const loadEmployerAgreement = () => {};
  const handleAccept = () => {
    setIsAccepted(true);
  };

  if (loading)
    return (
      <View
        style={tw`flex-1 overflow-hidden flex-col items-center mx-auto w-full bg-zinc-100 max-w-[480px]`}
      >
        <ActivityIndicator style={tw`mt-[90%]`} size="large" color="green" />
      </View>
    );

  return (
    <SafeAreaView style={tw`flex-1 px-4 py-2 bg-gray-100`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`self-start text-2xl font-bold text-stone-900`}>
        Health & Safety Policy
      </Text>

      <ScrollView style={tw`flex w-full h-full`}>
        {/* Flatlist Begins */}

        <View style={tw`flex`}>
          <Text
            style={tw`text-zinc-600 tracking-tight text-sm text-neutral-500 mt-5`}
          >
            Discover millions of gigs and get in touch with gig hirers as
            seamless as it comes. Discover millions of gigs and get in touch
            with gig hirers as seamless as it comes. Discover millions of gigs
            and get in touch w
          </Text>

          <Text
            style={tw`text-zinc-600 tracking-tight text-sm text-neutral-500 mt-3`}
          >
            Discover millions of gigs and get in touch with gig hirers as
            seamless as it comes. Discover millions of gigs and get in touch
            with gig hirers as seamless as it comes. Discover millions of gigs
            and get in touch w
          </Text>

          <Text
            style={tw`text-zinc-600 tracking-tight text-sm text-neutral-500 mt-3`}
          >
            Discover millions of gigs and get in touch with gig hirers as
            seamless as it comes. Discover millions of gigs and get in touch
            with gig hirers as seamless as it comes. Discover millions of gigs
            and get in touch w
          </Text>

          {/* Footer */}
        </View>
      </ScrollView>
      {/* Watermark logo */}
      <Image
        source={images.logowithoutcaption}
        style={tw`absolute bottom-0 left-0`}
      />
      {/* Accept Button */}
      <ActionButton
        buttonStyle="mt-5"
        onPress={() => handleAccept()}
        label={isAccepted ? "Accepted on " + acceptanceDate : "Accept"}
        isEnabled={!isAccepted}
      />
    </SafeAreaView>
  );
};

export default HealthAndSafetyAgreement;

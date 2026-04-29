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
  SafeAreaView,
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
import { HeaderScreens } from "../components/HeaderScreens";

const Legal = () => {
  const { user_id } = useLocalSearchParams<{ user_id: string }>();
  const [user, setUser] = useState<UserProps>();
  const [filteredData, setFilteredData] = useState<
    EmployerDetailsDisplayProps[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [acceptanceDate, setAcceptanceDate] = useState("August 06, 2022"); // Example date, replace with actual logic

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    loadUserData(user_id);
    setLoading(false); // for test only
  }, []);

  const loadUserData = async (user: string) => {
    try {
      const data = await fetchUser(user);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    <SafeAreaView style={tw`flex-1 px-4 py-10 bg-gray-100`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`self-start text-2xl font-bold text-stone-900`}>
        Legal
      </Text>

      <ScrollView style={tw`flex w-full`} showsVerticalScrollIndicator={false}>
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

          {/* Menu Section */}
          <View style={tw`pt-4`}>
            {[
              {
                name: isAccepted
                  ? "Accepted on " + acceptanceDate
                  : "Pending Acceptance",
                label: "Privacy Policy",
                icon: images.health,
                route: "/(employees)/user_account/legal/privacy-policy",
              },
              {
                name: isAccepted
                  ? "Accepted on " + acceptanceDate
                  : "Pending Acceptance",
                label: "Terms Of Service",
                icon: images.certificate,
                route: "/(employees)/user_account/legal/terms-of-service",
              },
            ].map((item, index) => (
              <DisplayInfo key={index} item={item} isVerified={isAccepted} />
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={tw`mt-35 flex items-center`}>
        <Image source={images.logowithcaption} style={tw``} />
      </View>

      {/* Watermark logo */}
      <Image
        source={images.logowithoutcaption}
        style={tw`absolute bottom-0 left-0`}
      />
    </SafeAreaView>
  );
};

const DisplayInfo: React.FC<DisplayPersonalInfoProps> = ({
  item,
  isVerified,
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(item.route)}
      style={tw`flex-row items-center justify-between py-2`}
    >
      <View style={tw`flex flex-row gap-3 items-start`}>
        <View style={tw`flex items-center justify-center mt-1`}>
          <Image source={item.icon} style={tw`mt-0.5`} />
          {!isVerified && (
            <Image source={images.reddot} style={tw`absolute top-0 right-0`} />
          )}
        </View>

        <View style={tw`flex flex-col`}>
          <Text style={tw`text-sm text-gray-500 font-bold`}>{item.label}</Text>
          <Text style={tw`text-sm text-gray-500`}>{item.name}</Text>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={16} color="gray" />
    </TouchableOpacity>
  );
};

export default Legal;

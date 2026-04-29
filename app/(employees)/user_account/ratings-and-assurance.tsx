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
} from "./types";
import { router, useLocalSearchParams } from "expo-router";
import { UserData } from "@/assets/data/Data";
import { fetchUser } from "@/services/api_test";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderScreens } from "./components/HeaderScreens";

const UserApproved = () => {
  const { user_id } = useLocalSearchParams<{ user_id: string }>();
  const [user, setUser] = useState<UserProps>();
  const [filteredData, setFilteredData] = useState<
    EmployerDetailsDisplayProps[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    loadUserData(user_id);
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
    <SafeAreaView style={tw`flex px-4 py-2 bg-gray-100`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`self-start text-2xl font-bold text-stone-900`}>
        Ratings & Assurance
      </Text>

      <ScrollView style={tw`flex w-full`}>
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

          {/* Ratings */}
          <View style={tw`flex-row mt-5`}>
            <Image source={images.greenstar} style={tw`h-5.5 w-5.5 mt-0.5`} />
            <Text
              style={tw`self-start text-xl font-semibold text-stone-900 ml-2`}
            >
              Ratings
            </Text>
          </View>
          <Text
            style={tw`text-zinc-600 tracking-tight text-sm text-neutral-500 mt-3`}
          >
            Discover millions of gigs and get in touch with gig hirers as
            seamless as it comes. Discover millions of gigs and get in touch
            with gig hirers as seamless as it comes. Discover millions of gigs
            and get in touch w
          </Text>

          {/* Ratings */}
          <View style={tw`flex-row mt-5`}>
            <Image source={images.greenapproval} style={tw`h-5 w-5 mt-1`} />
            <Text
              style={tw`self-start text-xl font-semibold text-stone-900 ml-2`}
            >
              Assurance
            </Text>
          </View>
          <Text
            style={tw`text-zinc-600 tracking-tight text-sm text-neutral-500 mt-3`}
          >
            Discover millions of gigs and get in touch with gig hirers as
            seamless as it comes. Discover millions of gigs and get in touch
            with gig hirers as seamless as it comes. Discover millions of gigs
            and get in touch w
          </Text>
          {/* Footer */}
          <View style={tw`mt-35 mb-5 flex items-center`}>
            <Image source={images.logowithcaption} />
          </View>

          {/* Watermark logo */}
          <Image
            source={images.logowithoutcaption}
            style={tw`absolute bottom-0 left-0`}
          />
        </View>

        {/* description */}
      </ScrollView>
    </SafeAreaView>
  );
};

const DisplayPersonalInfo: React.FC<DisplayPersonalInfoProps> = ({ item }) => {
  return (
    <View style={tw`flex-row items-center justify-between py-2`}>
      <View style={tw`flex flex-row gap-3 items-start`}>
        <Image source={item.icon} style={tw`mt-2`} />
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-sm text-gray-500 font-bold`}>{item.label}</Text>
          <Text style={tw`text-sm text-gray-500`}>{item.name}</Text>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={16} color="gray" />
    </View>
  );
};

export default UserApproved;

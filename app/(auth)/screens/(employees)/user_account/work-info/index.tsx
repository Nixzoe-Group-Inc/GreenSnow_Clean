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
import { ActionButton } from "../../components/ActionButton";
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

const WorkInfo = () => {
  const { user_id } = useLocalSearchParams<{ user_id: string }>();
  const [user, setUser] = useState<UserProps>();
  const [filteredData, setFilteredData] = useState<
    EmployerDetailsDisplayProps[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

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
    <SafeAreaView style={tw`flex px-4 py-10 bg-gray-100`}>
      {/* Header */}
      <HeaderScreens />

      <Text style={tw`self-start text-2xl font-bold text-stone-900`}>
        Work Info
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
                name: (user?.first_name ?? "") + " " + (user?.last_name ?? ""),
                label: "Search Radius",
                icon: images.searchradius,
                route: "/(employees)/user_account/work-info/search-radius",
              },
              {
                name: user?.email,
                label: "Transportation",
                icon: images.transportation,
                route: "/(employees)/user_account/work-info/transportation",
              },
              {
                name: user?.phone,
                label: "Availability",
                icon: images.phonegreen,
                route: "/(employees)/user_account/work-info/availability",
              },
              {
                name: user?.home_address,
                label: "Student",
                icon: images.student,
                route: "/(employees)/user_account/work-info/student",
              },
              {
                name: user?.date_of_birth,
                label: "Tax Info",
                icon: images.taxInfo,
                route: "/(employees)/user_account/work-info/tax-info",
              },
              {
                name: user?.language,
                label: "Employment Agreement",
                icon: images.employmentagreement,
                route:
                  "/(employees)/user_account/work-info/employment-agreement",
              },
              {
                name: user?.language,
                label: "Emergency Contact",
                icon: images.emergencycontact,
                route: "/(employees)/user_account/work-info/emergency-contact",
              },
            ].map((item, index) => (
              <DisplayPersonalInfo
                key={index}
                item={item}
                isVerified={isVerified}
              />
            ))}
          </View>

          {/* Footer */}
          <View style={tw`mt-35 mb-10 flex items-center`}>
            <Image source={images.logowithcaption} />
          </View>

          {/* Watermark logo */}
          <Image
            source={images.logowithoutcaption}
            style={tw`absolute bottom-0 left-0`}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DisplayPersonalInfo: React.FC<DisplayPersonalInfoProps> = ({
  item,
  isVerified,
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(item.route)}
      style={tw`flex-row items-center justify-between py-2`}
    >
      <View style={tw`flex flex-row gap-3 items-start`}>
        <Image source={item.icon} style={tw`mt-0.5`} />

        <View style={tw`flex flex-col`}>
          <Text style={tw`text-sm text-gray-500 font-bold`}>{item.label}</Text>
          <Text style={tw`text-sm text-gray-500`}>{item.name}</Text>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={16} color="gray" />
    </TouchableOpacity>
  );
};

export default WorkInfo;

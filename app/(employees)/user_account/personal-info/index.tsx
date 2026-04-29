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

const UserApproved = () => {
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
        Personal Info
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
                label: "Name",
                icon: images.contactgreen,
                route:
                  "/(employees)/user_account/personal-info/identity-verification/ame-screen",
              },
              {
                name: user?.email,
                label: "Email",
                icon: images.emailmuted,
                route: null, // No route for email
              },
              {
                name: user?.phone,
                label: "Phone",
                icon: images.phonegreen,
                route: "/(employees)/user_account/personal-info/phone",
              },
              {
                name: user?.home_address,
                label: "Home Address",
                icon: images.homeaddressgreen,
                route: "/(employees)/user_account/name-screen",
              },
              {
                name: user?.date_of_birth,
                label: "Date Of Birth",
                icon: images.dobgreen,
                route: "/(employees)/user_account/name-screen",
              },
              {
                name: user?.language,
                label: "Language",
                icon: images.languagegreen,
                route: "/(employees)/user_account/name-screen",
              },
            ].map((item, index) => (
              <DisplayPersonalInfo
                key={index}
                item={item}
                isVerified={isVerified}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={() =>
              router.push(
                "/(employees)/user_account/personal-info/identity-verification"
              )
            }
            style={tw`flex-row items-center justify-between py-2`}
          >
            <View style={tw`flex flex-row gap-3 items-start`}>
              <View
                style={tw`flex w-[18px] h-[18px] items-center justify-center mt-1`}
              >
                <Image source={images.identityverificationmuted} />
                {user?.identity_verification === "Pending" && (
                  <Image
                    source={images.reddot}
                    style={tw`absolute top-0 right-0`}
                  />
                )}
              </View>
              <View style={tw`flex flex-col`}>
                <Text style={tw`text-base text-gray-500 font-bold`}>
                  Identity Verification
                </Text>
                <Text style={tw`text-base text-stone-900`}>
                  {user?.identity_verification}
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" size={16} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={tw`flex-row items-center justify-between py-2`}
          >
            <View style={tw`flex flex-row gap-3 items-start`}>
              <View
                style={tw`flex w-[18px] h-[18px] items-center justify-center mt-1`}
              >
                <Image source={images.backgroundcheckmuted} />
                {user?.background_check === "Pending" && (
                  <Image
                    source={images.reddot}
                    style={tw`absolute top-0 right-0`}
                  />
                )}
              </View>
              <View style={tw`flex flex-col`}>
                <Text style={tw`text-base text-gray-500 font-bold`}>
                  Background Check
                </Text>
                <Text style={tw`text-base text-stone-900`}>
                  {user?.background_check}
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" size={16} color="gray" />
          </TouchableOpacity>

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
      disabled={!item.route} // Disable if no route is provided
      onPress={() => router.push(item.route)}
      style={tw`flex-row items-center justify-between py-2`}
    >
      <View style={tw`flex flex-row gap-3 items-start`}>
        <View style={tw`flex items-center justify-center mt-1`}>
          <Image source={item.icon} style={tw`mt-0.5`} />
          {!isVerified && item.label === "Name" && (
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

export default UserApproved;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  LogBox,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import { images } from "@/assets/images";
import { ActionButton } from "../components/ActionButton";
import {
  DisplayPersonalInfoProps,
  EmployerDetailsDisplayProps,
  UserProps,
} from "../types";
import { router, useLocalSearchParams } from "expo-router";
import { fetchUser } from "@/services/api_test";
import { HeaderScreens } from "../components/HeaderScreens";

const TrackReferrals = () => {
  const { user_id } = useLocalSearchParams<{ user_id: string }>();
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [acceptanceDate] = useState("August 06, 2022");

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    loadUserData(user_id);
    setLoading(false); // for test only
  }, []);

  const loadUserData = async (user: string) => {
    try {
      const data = await fetchUser(user);
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const referrals = [
    { email: "nana@gmail.com", shiftsCompleted: "4", isActive: true },
    { email: "mimi@yahoo.com", shiftsCompleted: "1", isActive: true },
    { email: "grace@gmail.com.com", shiftsCompleted: "0", isActive: false },
    { email: "mary@example.com", shiftsCompleted: "0", isActive: false },
  ];

  const activeReferrals = referrals.filter((r) => r.isActive);
  const invitedReferrals = referrals;

  if (loading)
    return (
      <View style={tw`flex-1 items-center justify-center bg-zinc-100`}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );

  return (
    <SafeAreaView style={tw`flex-1 px-4 py-10 bg-gray-100`}>
      <HeaderScreens />

      <Text style={tw`text-2xl font-bold text-stone-900 mb-2`}>
        Track Progress Of Your Invites
      </Text>

      <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
        <Text style={tw`text-gray-500 text-sm mb-4`}>
          Discover millions of gigs and get in touch with gig hirers as seamless
          as it comes.
        </Text>

        {/* ACTIVE SECTION */}
        <View style={tw`flex flex-row items-center justify-between mt-5`}>
          <Text style={tw`text-xs text-gray-500`}>Active</Text>
          <Text style={tw`text-xs text-gray-500`}>Shifts Completed</Text>
        </View>
        {activeReferrals.length === 0 ? (
          <Text style={tw`text-gray-400 mb-2`}>No active referrals yet.</Text>
        ) : (
          activeReferrals.map((item, index) => (
            <DisplayActiveReferrals key={index} item={item} isVerified={true} />
          ))
        )}

        {/* INVITED SECTION */}
        <Text style={tw`text-xs text-gray-500 mt-6 mb-2`}>Invited</Text>
        {invitedReferrals.length === 0 ? (
          <Text style={tw`text-gray-400`}>No invited referrals yet.</Text>
        ) : (
          invitedReferrals.map((item, index) => (
            <DisplayInvitedReferrals
              key={index}
              item={item}
              isVerified={true}
            />
          ))
        )}

        {/* Invite Button */}
        <ActionButton
          buttonStyle="mt-8"
          onPress={() =>
            router.push("/(employees)/user_account/referrals/send-invite")
          }
          label="Invite Friends"
          isEnabled={true}
        />

        {/* Footer */}
        <View style={tw`mt-10 flex items-center`}>
          <Image
            source={images.logowithcaption}
            style={tw`h-12 w-48`}
            resizeMode="contain"
          />
        </View>

        {/* Watermark logo */}
        <Image
          source={images.logowithoutcaption}
          style={tw`absolute bottom-0 left-0 w-24 h-24 opacity-10`}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const DisplayActiveReferrals: React.FC<DisplayPersonalInfoProps> = ({
  item,
}) => {
  if (!item.isActive) return null;

  return (
    <View style={tw`flex-row items-center justify-between py-2`}>
      <Text style={tw`text-sm font-bold text-gray-700`}>{item.email}</Text>
      <Text style={tw`text-sm text-gray-500`}>{item.shiftsCompleted}/10</Text>
    </View>
  );
};

const DisplayInvitedReferrals: React.FC<DisplayPersonalInfoProps> = ({
  item,
}) => {
  return (
    <View style={tw`flex-row items-center justify-between py-2`}>
      <Text style={tw`text-sm text-gray-500`}>{item.email}</Text>
      <Text style={tw`text-sm text-gray-500`}>{item.shiftsCompleted}/10</Text>
    </View>
  );
};

export default TrackReferrals;

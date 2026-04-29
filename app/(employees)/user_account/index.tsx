import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  LogBox,
  ActivityIndicator,
  FlatList,
  Touchable,
} from "react-native";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "@/assets/images";
import { ActionButton } from "../components/ActionButton";
import { router, useLocalSearchParams } from "expo-router";
import {
  EmployeeProps,
  EmployerDetailsDisplayProps,
  EmployerProps,
  ShiftDetailsProps,
  UserDataProps,
  UserProps,
} from "./types";
import { SafeAreaView } from "react-native-safe-area-context";
import RatingsMeter from "./components/RatingsMeter";
import {
  deleteUser,
  fetchEmployeeDetailsByUser,
  fetchEmployerDetailsByUser,
  fetchOngoingShiftsByEmployee,
  fetchShifts,
  fetchShiftsByEmployer,
  fetchUpcomingShiftsByEmployee,
  fetchUser,
  toggleUserSuspension,
  verifyUser,
} from "@/services/api_test";

const ViewProfile = () => {
  //Search params
  const { user_id } = useLocalSearchParams<{
    user_id: string;
  }>();

  const [isSuspendModalVisible, setSuspendModalVisible] = useState(false);
  const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
  const [isVerifyModalVisible, setVerifyModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [shiftsData, setShiftsData] = useState<ShiftDetailsProps[]>([]);
  const [user, setUserData] = useState<UserProps>();
  const [employee, setEmployee] = useState<EmployeeProps>();
  const [isVerified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(true);

  useEffect(() => {
    // Implement database calls
    setLoading(false); // for test only
  }, [user_id]);

  if (loading)
    return (
      <View
        style={tw`flex-1 overflow-hidden flex-col items-center mx-auto w-full bg-zinc-100 max-w-[480px]`}
      >
        <ActivityIndicator style={tw`mt-[90%]`} size="large" color="green" />
      </View>
    );

  return (
    <SafeAreaView style={tw`flex-1 items-center px-4 py-4 bg-gray-100`}>
      {/* Header */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={tw`absolute top-12 left-4 z-10`}
      >
        <Image
          source={images.closeicon}
          style={tw`object-contain shrink-0 aspect-square w-[60px]`}
        />
      </TouchableOpacity>

      <ScrollView style={tw`flex w-full`} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}

        <View
          style={tw`flex bg-gray-100 items-center justify-center mb-6 mt-8`}
        >
          <View style={tw`flex flex-row gap-3 w-full`}>
            <Image
              source={images.avatarverified}
              style={tw`object-contain shrink-0 aspect-square w-[60px] self-center`}
            />

            {/* Rating and Assurance */}
            <View style={tw`flex flex-col`}>
              <View style={tw`flex flex-row gap-0.5 items-center`}>
                <FontAwesome name="star" size={16} color="black" />
                <Text style={tw`text-sm text-black`}>Rating</Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      "/(employees)/user_account/ratings-and-assurance"
                    )
                  }
                  style={tw`absolute right-8`}
                >
                  <Text style={tw`text-sm text-black underline`}>
                    How it works
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={tw`flex-row items-center mt-0.5`}>
                <View style={tw`flex-row items-center mt-0.5 gap-1`}>
                  <FontAwesome name="star" size={20} color="green" />
                  <FontAwesome name="star" size={20} color="#D9D9D9" />
                  <FontAwesome name="star" size={20} color="#D9D9D9" />
                  <FontAwesome name="star" size={20} color="#D9D9D9" />
                  <FontAwesome name="star" size={20} color="#D9D9D9" />
                </View>
                <View style={tw`flex absolute`}>
                  <RatingsMeter rating={employee?.rating ?? 0} />
                </View>
              </View>

              <View style={tw`flex flex-row justify-between w-[87%]`}>
                <View style={tw`flex flex-row gap-0.5 items-center`}>
                  <Image
                    source={images.verify}
                    style={tw`object-contain shrink-0 aspect-square w-[24px] mt-2`}
                  />
                  <Text style={tw`mt-2`}>Assurance</Text>
                </View>
                <Text style={tw`text-sm text-gray-500 mt-2`}>
                  {employee?.assurance}/100
                </Text>
              </View>
              <View style={tw`w-[90%] bg-gray-300 rounded-full h-2 mt-1`}>
                <View
                  style={tw`bg-green-500 h-2 rounded-full w-[${
                    employee?.assurance ?? 0
                  }%]`}
                />
              </View>
            </View>
          </View>

          <Text style={tw`self-start text-2xl font-bold text-stone-900 mt-5`}>
            {user?.first_name} {user?.last_name}
          </Text>
        </View>

        {/* Menu Section */}
        <View style={tw`mb-6 border-b border-t border-gray-200 py-4`}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(employees)/user_account/personal-info",
                params: {
                  user_id: user_id,
                },
              })
            }
            style={tw`flex-row items-center justify-between py-2`}
          >
            <View style={tw`flex flex-row gap-3 items-center`}>
              <View
                style={tw`flex w-[18px] h-[18px] items-center justify-center mt-1`}
              >
                <Image source={images.personalinfo} />
                {awaitingConfirmation && (
                  <Image
                    source={images.reddot}
                    style={tw`absolute top-0 right-0`}
                  />
                )}
              </View>
              <Text style={tw`text-base text-black`}>Personal Info</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(employees)/user_account/work-info",
                params: {
                  // id: id,
                },
              })
            }
            style={tw`flex-row items-center justify-between py-2`}
          >
            <View style={tw`flex flex-row gap-3 items-center`}>
              <View
                style={tw`flex w-[18px] h-[18px] items-center justify-center mt-1`}
              >
                <Image source={images.jobdetails} />
                {awaitingConfirmation && (
                  <Image
                    source={images.reddot}
                    style={tw`absolute top-0 right-0`}
                  />
                )}
              </View>

              <Text style={tw`text-base text-black`}>Job Details</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(employees)/user_account/help")}
            style={tw`flex-row items-center justify-between py-2`}
          >
            <View style={tw`flex flex-row gap-3 items-center`}>
              <View
                style={tw`flex w-[18px] h-[18px] items-center justify-center mt-1`}
              >
                <Image source={images.help} />
                {awaitingConfirmation && (
                  <Image
                    source={images.reddot}
                    style={tw`absolute top-0 right-0`}
                  />
                )}
              </View>

              <Text style={tw`text-base text-black`}>Help</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(employees)/user_account/referrals")}
            style={tw`flex-row items-center justify-between py-2`}
          >
            <View style={tw`flex flex-row gap-3 items-center`}>
              <View
                style={tw`flex w-[18px] h-[18px] items-center justify-center mt-1`}
              >
                <Image source={images.refer} />
                {awaitingConfirmation && (
                  <Image
                    source={images.reddot}
                    style={tw`absolute top-0 right-0`}
                  />
                )}
              </View>
              <Text style={tw`text-base text-black`}>
                Refer Someone for $100
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(employees)/user_account/legal")}
            style={tw`flex-row items-center justify-between py-2`}
          >
            <View style={tw`flex flex-row gap-3 items-center`}>
              <View
                style={tw`flex w-[18px] h-[18px] items-center justify-center mt-1`}
              >
                <Image source={images.legal} />
                {awaitingConfirmation && (
                  <Image
                    source={images.reddot}
                    style={tw`absolute top-0 right-0`}
                  />
                )}
              </View>
              <Text style={tw`text-base text-black`}>Legal</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          onPress={() => {}}
          style={tw`flex-row items-center justify-between py-2`}
        >
          <View style={tw`flex-row gap-2`}>
            <Image source={images.logout} style={tw`mt-0.5`} />
            <Text style={tw`text-red-500 font-semibold`}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={tw`absolute bottom-2 items-center`}>
        {/* Include your logo */}
        <Image source={images.Log} style={tw`w-[82px] h-[57px]`} />
      </View>
      {/* Snowflake at bottom right */}
      <View style={tw`absolute bottom-2 right-0 z-10`}>
        <Image
          source={images.watermark}
          style={[tw`w-40 h-30`, { resizeMode: "contain" }]}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewProfile;

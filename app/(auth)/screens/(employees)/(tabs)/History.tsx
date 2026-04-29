import {
  fetchOngoingShiftsByEmployee,
  fetchShifts
} from "@/services/api_test";
import { router, useFocusEffect } from "expo-router";
import moment from "moment";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import tw from "twrnc";
import { JobCard } from "../components/JobCard"; // Adjust the path if necessary
import NoShiftHistory from "../home/no-shift-history";
import { OngoingShiftProps, ShiftDetailsProps } from "./types";

export const History = () => {
  const [data, setData] = useState<ShiftDetailsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [ongoing, setOngoing] = useState<OngoingShiftProps[]>([]);

  useFocusEffect(() => {
    const onBackPress = () => true; // Returning true disables going back
    const subscribe = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscribe.remove();
  });

  useFocusEffect(
    useCallback(() => {
      loadData();
      loadOngoingShifts();
    }, []),
  );

  const loadData = async () => {
    try {
      const data = await fetchShifts();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadOngoingShifts = async () => {
    try {
      const data = await fetchOngoingShiftsByEmployee(
        "92453a49-e948-4e0a-804c-7dd58995b29a",
      );
      setOngoing(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter completed shifts
  let completedShifts: ShiftDetailsProps[] = [];
  if (data.length !== 0 && ongoing.length !== 0) {
    const filteredOngoingShifts = ongoing.filter(
      (shift) => shift.shift_progress == "COMPLETED",
    );
    const ongoingIds = filteredOngoingShifts.map((shift) => shift.shift); // Extract shift IDs
    completedShifts = data.filter((shifts) => ongoingIds.includes(shifts.id));
  }

  if (completedShifts.length === 0) {
    // If there are no completed shifts
    return <NoShiftHistory />;
  }

  return (
    <View style={tw`flex-1 bg-zinc-100 w-full px-3.5 mx-auto`}>
      {/* Title Section */}
      <View
        style={tw`flex flex-row gap-5 justify-between w-full max-w-[362px] text-stone-900`}
      >
        <View style={tw`flex flex-col items-start`}>
          <Text
            style={tw`text-xl font-extrabold tracking-tight leading-none mt-9`}
          >
            Previously taken shifts
          </Text>
        </View>
      </View>

      {/* Shift Card Section */}
      <ScrollView nestedScrollEnabled={true}>
        {/* Flatlist---------------------------------------------------------------------------------- */}
        {loading ? (
          <ActivityIndicator style={tw`mt-[50%]`} size="large" color="blue" />
        ) : (
          <FlatList
            style={tw`w-full`}
            data={completedShifts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/shifts/completed-shift-details",
                    params: {
                      id: item.id,
                    },
                  })
                }
              >
                <JobCard
                  jobId={item.id.toString()}
                  date={moment(item.date).format("ddd, Do MMM")}
                  time={moment(item.start_time).format("hh:mm A")}
                  location={item.location}
                  position={item.name}
                  hourlyRate={+item.salary_per_time}
                  hours={+item.shift_duration}
                  totalAmount={+item.total_earning}
                  employer={item.company_name}
                  backgroundImage={item.background_image_url}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default History;

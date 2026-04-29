import { useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import HomePostedShifts from "../home";
import HomeBeingVerified from "../home/HomeBeingVerified";
import HomeNotVerified from "../home/HomeNotVerified";

const Home: React.FC = () => {
  const [seconds, setSeconds] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const [view, setView] = useState("notVerified");

  useFocusEffect(() => {
    const onBackPress = () => true; // Returning true disables going back
    const subscribe = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => subscribe.remove();
  });

  useEffect(() => {
    if (seconds > 24) {
      setView("notVerified");
    } else if (seconds < 25 && seconds > 19) {
      setView("beingVerified");
    } else {
      setView("verified");
    }

    let timer: any;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  switch (view) {
    case "notVerified":
      return <HomeNotVerified />;
    case "beingVerified":
      return <HomeBeingVerified />;
    case "verified":
      return <HomePostedShifts />;
    default:
      return <View />;
  }
};

export default Home;

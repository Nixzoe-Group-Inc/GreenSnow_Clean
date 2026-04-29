import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";
// import { StatsCounter } from "../StatsCounter";
import { router } from "expo-router";
import tw from "twrnc";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function ShiftsHeader() {
  return (
    <View
      style={tw`flex flex-row gap-10 justify-between items-start self-stretch`}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={require("../../../../../assets/images/back_btn.png")}
          // style = {tw`object-contain shrink-0 w-6 aspect-square w-[24px] h-[24px]`}
          className="object-contain shrink-0 w-6 aspect-square"
        />
      </TouchableOpacity>

      <LanguageSwitcher
        currentLanguage="EN"
        icon={require("../../../../../assets/images/flag-france.png")}
      />
    </View>
  );
}

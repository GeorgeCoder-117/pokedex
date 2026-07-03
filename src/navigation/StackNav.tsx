import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigationTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

import Home from "@/screens/Home";
import Pokemon from "@/screens/Pokemon";

const StackNav = () => {
  const [mainRoute, setMainRoute] = useState<keyof RootStackParamList>("Home");
  
  return (
    <Stack.Navigator initialRouteName={mainRoute}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default StackNav;

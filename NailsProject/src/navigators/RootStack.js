import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage/HomePage";
import MyQueues from "../pages/MyQueues/MyQueues";
import Admin_pannel from "../pages/AdminDeshBoard/AdminDeshBoard";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Editing from '../pages/Editing/Editing';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          presentation: "card",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          presentation: "card",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export const AuthStackscreen = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          presentation: "card",
          animationTypeForReplace: "pop",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="MyQueues"
        component={MyQueues}
        options={{
          headerShown: false,
          presentation: "card",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Admin_pannel"
        component={Admin_pannel}
        options={{
          headerShown: false,
          presentation: "card",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Editing"
        component={Editing}
        options={{
          headerShown: false,
          presentation: "card",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

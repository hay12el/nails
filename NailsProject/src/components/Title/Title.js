import React from "react";
import { View, Platform, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../styles/colors";

const Title = ({ text }) => {
  return (
    <View style={{width: '100%'}}>
      {Platform.OS === "android" ? (
        <LinearGradient
          colors={[colors.first, colors.first, colors.second]}
          locations={[0.0, 0.5, 1.0]}
          style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            elevation: 4,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {text}
          </Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={[colors.first, colors.first, colors.second]}
          locations={[0.0, 0.5, 1.0]}
          style={{
            borderRadius: 15,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: -33,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {text}
          </Text>
        </LinearGradient>
      )}
    </View>
  );
};


export default Title;
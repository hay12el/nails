import React from "react";
import { View, Platform, Text} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../styles/colors";

const LittleTitle = ({text}) => {
  return (
    <>
      {Platform.OS === "android" ? (
        <LinearGradient
          colors={[colors.first, colors.first, colors.second]}
          locations={[0.0, 0.5, 1.0]}
          style={{
            width: "30%",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#364F6B", fontSize: 16, fontWeight: "bold" }}>
            {text}
          </Text>
        </LinearGradient>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            marginBottom: 35,
          }}
        >
          <LinearGradient
            colors={[colors.first, colors.first, colors.second]}
            locations={[0.0, 0.5, 1.0]}
            style={{
              width: "30%",
              borderRadius: 15,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: -20,
            }}
          >
            <Text
              style={{
                color: "#364F6B",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {text}
            </Text>
          </LinearGradient>
        </View>
      )}
    </>
  );
};

export default LittleTitle;
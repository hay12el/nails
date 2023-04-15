import React from "react";
import { Image, Platform, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./SHeader";
import colors from "../../styles/colors";

const Header = () => {
  return (
    <View style={styles.HeaderContainer}>
      {Platform.OS === "android" ? (
        <LinearGradient
          colors={[colors.first, colors.first, colors.second]}
          locations={[0.0, 0.7, 1.0]}
          style={styles.linearGradient}
        >
          <Image
            source={require("../../../assets/11.png")}
            style={{ height: 180, width: 180 }}
          ></Image>
        </LinearGradient>
      ) : (
        <LinearGradient
          colors={[colors.first, colors.first, colors.second]}
          locations={[0.0, 0.7, 1.0]}
          style={styles.linearGradientIOS}
        >
          <Image
            source={require("../../../assets/11.png")}
            style={{ height: 180, width: 180 }}
          ></Image>
        </LinearGradient>
      )}

    </View>
  );
};

export default Header;

// {Platform.OS === "android" ? (
//   <LinearGradient
//     colors={[colors.first, colors.first, colors.first]}
//     locations={[0.0, 0.7, 1.0]}
//     style={styles.linearGradient}
//   >
//     {/* <Image
//       source={require("../../../assets/11.png")}
//       style={{ height: 180, width: 180 }}
//     /> */}
//   </LinearGradient>
// ) : (
//   <LinearGradient
//     colors={[colors.first, colors.first, colors.second]}
//     locations={[0.0, 0.7, 1.0]}
//     style={styles.linearGradientIOS}
//   >
//     {/* <Image
//       source={require("../../../assets/11.png")}
//       style={{ height: 180, width: 180 }}
//     ></Image> */}
//   </LinearGradient>
// )}
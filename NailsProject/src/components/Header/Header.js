import React, { useEffect } from "react";
import { Image, Platform, View, Animated, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./SHeader";
import colors from "../../styles/colors";

const Header = ({scrollA}) => {
  // const BANNER_H = 350;
  // const TOPNAVI_H = 50;
  // useEffect(() => {
  //   console.log(scrollA);
  // }, [scrollA]);

  // const styles = {
  //   // HeaderContainer: {
  //   //   position: "absolute",
  //   //   top: 0,
  //   //   zIndex: 10,
  //   //   display: "flex",
  //   //   justifyContent: "center",
  //   //   alignItems: "center",
  //   //   width: "100%",
  //   // },
  //   HeaderContainer: (scrollA) => ({
  //     height: BANNER_H,
  //     width: "200%",
  //     transform: [
  //       {
  //         translateY: scrollA.interpolate({
  //           inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
  //           outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
  //         }),
  //       },
  //       {
  //         scale: scrollA.interpolate({
  //           inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
  //           outputRange: [2, 1, 0.5, 0.5],
  //         }),
  //       },
  //     ],
  //   }),

  //   // linearGradientIOS: {
  //   //   height: 60,
  //   //   display: "flex",
  //   //   justifyContent: "center",
  //   //   alignItems: "center",
  //   //   width: "100%",
  //   // },
  //   // linearGradient: {
  //   //   elevation: 8,
  //   //   height: 60,
  //   //   display: "flex",
  //   //   justifyContent: "center",
  //   //   alignItems: "center",
  //   //   width: "100%",
  //   // },
  //   linearGradient: {
  //     height: 180,
  //     width: "100%",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderBottomRightRadius: 25,
  //     borderBottomLeftRadius: 25,
  //   },
  //   linearGradientIOS: {
  //     height: 180,
  //     width: "100%",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderRadius: 25,
  //   },
  // };
  return (
    <Animated.View style={styles.HeaderContainer}>
        <LinearGradient
          colors={[colors.forth, colors.forth, colors.forth]}
          locations={[0.0, 0.85, 1.0]}
          style={styles.linearGradient}
        >
          <Text style={styles.txt}>NA'AMA NAILS</Text>
          {/* <Image
            source={require("../../../assets/11.png")}
            style={{ height: 180, width: 180 }}
          ></Image> */}
        </LinearGradient>
    </Animated.View>
  );
};

export default Header;
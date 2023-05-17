import React, { useEffect } from "react";
import { Image, Platform, View, Animated, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./SHeader";
import colors from "../../styles/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Ionicons,
  Feather,
  //@ts-ignore
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { SETOPENMENU } from "../../redux/Properties";

const Header = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const open = useSelector((state) => state.properties.openMenu);

  const openMenu = () => {
    dispatch(SETOPENMENU({ open: !open }));
  };

  return (
    <Animated.View style={styles.HeaderContainer}>
      <LinearGradient
        colors={[colors.forth, colors.forth, colors.forth]}
        locations={[0.0, 0.85, 1.0]}
        style={styles.linearGradient}
      >
        <Pressable style={styles.menu} onPress={openMenu}>
          <Feather name="menu" size={22} color={colors.first} />
        </Pressable>
        {route.name == "MyQueues" && (
          <Pressable
            style={styles.Arrow}
            onPress={() => navigation.navigate("HomePage")}
          >
            <Text style={{ fontSize: 23, fontWeight: 600, color: "white" }}>
              <Ionicons
                name="arrow-back-sharp"
                size={22}
                color={colors.first}
              />
            </Text>
          </Pressable>
        )}
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

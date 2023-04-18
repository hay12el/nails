import React from "react";
import { View, Linking, TouchableOpacity, Image } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
// import LittleTitle from "../LittleTitle/LittleTitle";
import { styles } from "./SLinks";
import colors from "../../styles/colors";
import { useSelector } from "react-redux";

const Links = () => {
  const links = useSelector((state) => state.properties.Linkim);
  return (
    <>
      {/* <LittleTitle text={"עקבי אחרי"} /> */}
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: colors.second,
        }}
      >
        <View style={styles.IconBar}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(links.instagram);
            }}
          >
            <AntDesign name="instagram" size={40} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(links.tiktok);
            }}
          >
            <FontAwesome5 name="tiktok" size={40} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(links.whatsapp);
            }}
          >
            <FontAwesome5 name="whatsapp" size={40} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Links;

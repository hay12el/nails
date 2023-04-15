import React from "react";
import { View, Linking, TouchableOpacity, Image } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import LittleTitle from "../LittleTitle/LittleTitle";
import { styles } from "./SLinks";
import colors from "../../styles/colors";
import Linkim from '../../utils/links'

const Links = () => {
  return (
    <>
      <LittleTitle text={"עקבי אחרי"} />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
          width: "100%",
        }}
      >
        <View style={styles.IconBar}>
          {/* Instegram Icon */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(Linkim.instagram);
            }}
          >
            <AntDesign name="instagram" size={40} color={colors.text} />
          </TouchableOpacity>

          {/* Tiktok Icon */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(Linkim.tiktok);
            }}
          >
            <FontAwesome5 name="tiktok" size={40} color={colors.text} />
          </TouchableOpacity>

          {/* Whatsapp Icon */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(Linkim.whatsapp);
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

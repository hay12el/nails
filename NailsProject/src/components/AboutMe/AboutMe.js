import { View, Text } from "react-native";
import React from "react";
import { styles } from "./SAboutMe";
import Title from "../Title/Title";
import { useSelector } from "react-redux";
import LittleTitle from "../LittleTitle/LittleTitle";
import texts from "../../utils/texts";
import colors from "../../styles/colors";

const AboutMe = () => {
  const user = useSelector(state => state.user)
  const text = useSelector(state => state.properties.aboutMe)
  return (
    <View
      style={{
        height: 'auto',
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // marginVertical: 20,
      }}
    >
      <View style={styles.massageStyle}>
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            textAlign: "center",
          }}
        >
        היי {user.username} 😊{" "}
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 17,
            textAlign: "center",
          }}
        >
          {text && text}
        </Text>
      </View>
    </View>
  );
};

export default AboutMe;

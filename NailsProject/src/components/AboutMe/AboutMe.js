import { View, Text } from "react-native";
import React from "react";
import { styles } from "./SAboutMe";
import Title from "../Title/Title";
import { useSelector } from "react-redux";
import LittleTitle from "../LittleTitle/LittleTitle";
import texts from "../../utils/texts";

const AboutMe = () => {
  const user = useSelector(state => state.user)
  return (
    <View
      style={{
        height: 180,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
      }}
    >
      {/* <Title text={"על עצמי"} /> */}
      <View style={{ width: "100%", paddingBottom: 20 }}>
        <LittleTitle text={"קצת עליי"} />
      </View>

      <View style={styles.massageStyle}>
        <Text
          style={{
            color: "#364F6B",
            fontSize: 16,
            textAlign: "center",
          }}
        >
        היי {user.username} 😊{" "}
        </Text>
        <Text
          style={{
            color: "#364F6B",
            fontSize: 17,
            textAlign: "center",
          }}
        >
          {texts.aboutMe}
        </Text>
      </View>
    </View>
  );
};

export default AboutMe;

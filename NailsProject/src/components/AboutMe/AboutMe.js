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
      {/* <Title text={"על עצמי"} /> */}
      {/* <View style={{ width: "100%", paddingBottom: 20 }}>
        <LittleTitle text={"קצת עליי"} />
      </View> */}

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
          {text}
        </Text>
      </View>
    </View>
  );
};

export default AboutMe;

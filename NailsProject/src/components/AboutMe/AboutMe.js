import { View, Text, Pressable, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./SAboutMe";
import Title from "../Title/Title";
import { useDispatch, useSelector } from "react-redux";
import LittleTitle from "../LittleTitle/LittleTitle";
import { SETOPEN } from "../../redux/Properties";
import texts from "../../utils/texts";
import colors from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";

const AboutMe = ({ open }) => {
  const [about, setAbout] = useState(false);
  const user = useSelector((state) => state.user);
  const text = useSelector((state) => state.properties.aboutMe);
  const [firstRender, setFirstRender] = useState(0);
  const dispatch = useDispatch();
  const fadeAnim = new Animated.Value(1);
  const scaleImg = new Animated.Value(1);

  const openModel = () => {
    dispatch(SETOPEN({ open: true }));
  };

  const handleAnim = () => {
    Animated.sequence([
      Animated.timing(scaleImg, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(scaleImg, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (firstRender != 0) {
      fadeAnim.setValue(0);
    } else {
      setFirstRender(1);
    }
    Animated.spring(fadeAnim, {
      toValue: 1,
      friction: 900,
      tension: 3,
      useNativeDriver: false,
    }).start();
  }, [about]);

  return (
    <View
      style={{
        height: "auto",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginBottom: 0,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View style={styles.massageStyle}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            direction: "rtl",
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 18,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            היי {user.username.split(" ")[0]}
          </Text>
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              textAlign: "center",
              direction: "rtl",
            }}
          >
            , שמחה שחזרת
          </Text>
        </View>
        <Pressable style={[styles.QueueButton]} onPress={() => openModel()}>
          <Text style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
            לחצי לקביעת תור
          </Text>
        </Pressable>
        <View
          style={{
            display: "flex",
            width: "100%",
            height: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!about ? (
            <Pressable
              onPress={handleAnim}
              style={{ height: "100%", width: "100%" }}
            >
              <Animated.Image
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                  borderRadius: 30,
                  opacity: fadeAnim,
                  transform: [{ scale: scaleImg }],
                }}
                source={{
                  uri: "https://images.fresha.com/locations/location-profile-images/286009/597600/2ba259a7-b0ee-486d-a9ba-c0b7fcc3066f.jpg?class=venue-gallery-large",
                }}
              />
            </Pressable>
          ) : (
            <Animated.View
              style={{
                height: "100%",
                width: "100%",
                resizeMode: "cover",
                borderRadius: 30,
                backgroundColor: colors.first,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // opacity: fadeAnim,
              }}
            >
              <Animated.Text
                style={{
                  color: colors.text,
                  fontSize: 15,
                  textAlign: "center",
                  position: "absolute",
                  top: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 65],
                  }),
                }}
              >
                {text && text}
              </Animated.Text>
            </Animated.View>
          )}
          <Pressable
            style={[styles.QueueButton1]}
            onPress={() => setAbout(!about)}
          >
            <Text style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
              קצת עליי
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AboutMe;

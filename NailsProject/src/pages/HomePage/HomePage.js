import {
  View,
  ScrollView,
  Animated,
  ImageBackground,
  Text,
} from "react-native";
import React, { useRef } from "react";
import { styles } from "../HomePage/SHomePage";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
// Components
import NavBar from "../../components/NavBar/NavBar";
import Links from "../../components/Links/Links";
import WorkScroll from "../../components/WorkScroll/WorkScroll";
import Header from "../../components/Header/Header";
import AboutMe from "../../components/AboutMe/AboutMe";
import image from "../../../assets/kkaa.png";
import colors from "../../styles/colors";
import NewQueue from "../../components/NewQueue/NewQueue";
import ManuToggle from "../../components/ManuToggle/ManuToggle";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const scrollA = useRef(new Animated.Value(0)).current;
  const rreload = false;

  return (
    <View style={styles.BigContainer}>
      <StatusBar style="light" backgroundColor={colors.forth} />
      <ManuToggle />
      <Header scrollA={scrollA} />
      <View style={styles.main}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>

        <Animated.ScrollView
          // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          style={{ width: "100%" }}
        >
          <View
            style={{
              paddingTop: 200,
            }}
          >
            <AboutMe />
          </View>

          <WorkScroll />
          <Links />
        </Animated.ScrollView>
      </View>
      {!user.isAdmin && (
        <View style={styles.overover}>
          <NewQueue rreload={rreload} />
        </View>
      )}
    </View>
  );
};

export default HomePage;

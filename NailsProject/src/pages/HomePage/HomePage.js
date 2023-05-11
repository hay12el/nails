import { View, ScrollView, Animated, ActivityIndicator } from "react-native";
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
import UserScroll from "../../components/usersScroll/UserScroll";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const scrollA = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.BigContainer}>
      <Header scrollA={scrollA} />
      <View style={styles.main}>
        <StatusBar style="dark" />

        <Animated.ScrollView
          // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollA } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View style={{ paddingTop: 50 }}>
            <AboutMe />
          </View>

          <WorkScroll />
          <Links />
        </Animated.ScrollView>
      </View>
      <NavBar />
    </View>
  );
};

export default HomePage;

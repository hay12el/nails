import { View, ScrollView } from "react-native";
import React from "react";
import { styles } from "../HomePage/SHomePage";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
// Components
import NavBar from "../../components/NavBar/NavBar";
import Links from "../../components/Links/Links";
import WorkScroll from "../../components/WorkScroll/WorkScroll";
import Header from "../../components/Header/Header";
import AboutMe from "../../components/AboutMe/AboutMe";
import UserScroll from "../../components/UserScroll/UserScroll";
import AdminEditor from "../../components/AdminEditor/AdminEditor";

const HomePage = () => {
  const user = useSelector(state => state.user)
  return (
    <View style={styles.BigContainer}>
      <Header />
      <View style={styles.main}>
        <StatusBar style="dark" />

        <ScrollView>
          <View style={{ paddingTop: 50 }}>
            <UserScroll />
            <AboutMe />
          </View>

          <WorkScroll />
          <Links />
          {user.isAdmin ? 
          <AdminEditor />
          : null}
        </ScrollView>
      </View>
      <NavBar />
    </View>
  );
};

export default HomePage;

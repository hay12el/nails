import { View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import {styles} from './SEditing'
import AdminEditor from "../../components/AdminEditor/AdminEditor";
import Header from "../../components/Header/Header";
import ManuToggle from "../../components/ManuToggle/ManuToggle";

const Editing = () => {
  return (
    <View style={styles.BigContainer}>
    <Header/>
    <ManuToggle/>
      <ScrollView style={{width: '100%'}}>
        <AdminEditor />
      </ScrollView>
      {/* <NavBar /> */}
    </View>
  );
};

export default Editing;

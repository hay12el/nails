import { View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import {styles} from './SEditing'
import AdminEditor from "../../components/AdminEditor/AdminEditor";
import NavBar from "../../components/NavBar/NavBar";

const Editing = () => {
  return (
    <View style={styles.BigContainer}>
    
      <ScrollView style={{width: '100%'}}>
        <AdminEditor />
      </ScrollView>
      <NavBar />
    </View>
  );
};

export default Editing;

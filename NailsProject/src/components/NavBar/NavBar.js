import { View, TouchableOpacity, Linking, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "./SNavBar";
import Color from "../../styles/colors";
//@ts-ignore
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  FontAwesome,
  //@ts-ignore
} from "@expo/vector-icons";
//@ts-ignore
import { useNavigation } from "@react-navigation/native";
//@ts-ignore
import { useSelector, useDispatch } from "react-redux";
//@ts-ignore
import { LOGOUT } from "../../redux/User";
//components
import Message from "../Message/Message";
import NewQueue from "../NewQueue/NewQueue";
import colors from "../../styles/colors";

const NavBar = (props) => {
  const [massage, setMassage] = useState(false);
  const user = useSelector((state) => state.user);
  const links = useSelector((state) => state.properties.Linkim);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const rreload = props.rreload;

  const Logout = () => {
    try {
      dispatch(LOGOUT());
      setMassage(false);
    } catch (e) {
      console.log(e);
      console.log("logout func error");
    }
  };

  return (
    <View style={styles.navBar}>
      <Message
        text="האם את בטוחה שאת רוצה להתנתק?"
        action={Logout}
        open={massage}
        onClose={() => setMassage(false)}
      />
      {!user.isAdmin && (
        <View style={styles.overover}>
          <NewQueue rreload={rreload} />
        </View>
      )}

      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <LinearGradient
          colors={[Color.second, Color.forth, Color.forth]}
          locations={[0, 0.35, 1]}
          style={styles.menuNavigator}
        >
          <View>
            <TouchableOpacity
              style={styles.opacBtn}
              onPress={() => navigation.navigate("HomePage")}
            >
              <Ionicons name="home-outline" size={27} color={colors.text} />
            </TouchableOpacity>
          </View>
          {user.isAdmin ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Admin_pannel")}
                style={styles.opacBtn}
              >
                <FontAwesome name="calendar" size={22} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Editing")}
                style={styles.opacBtn}
              >
                <FontAwesome name="edit" size={22} color={colors.text} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyQueues")}
                style={[styles.opacBtn, { marginRight: 10 }]}
              >
                <FontAwesome name="calendar" size={25} color={colors.text} />
              </TouchableOpacity>
              {/* 
              <View>
                <NewQueue rreload={rreload} />
              </View> */}

              <TouchableOpacity
                onPress={() => Linking.openURL(links.wase)}
                style={styles.opacBtn}
              >
                <FontAwesome5 name="waze" size={27} color={colors.text} />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            onPress={() => setMassage(true)}
            style={styles.opacBtn}
          >
            <Entypo name="log-out" size={25} color={colors.text} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default NavBar;

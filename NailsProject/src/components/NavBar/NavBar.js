import { View, TouchableOpacity, Linking } from "react-native";
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

      <View style={{ display: "flex", alignItems: "center" }}>
        <LinearGradient
          colors={[Color.first, Color.first, Color.second]}
          locations={[0, 0.5, 1]}
          style={styles.menuNavigator}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
              <Ionicons name="home-outline" size={25} color={colors.text} />
            </TouchableOpacity>
          </View>
          {user.isAdmin ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("Admin_pannel")}
              >
                <FontAwesome name="calendar" size={22} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Editing")}
              >
                <FontAwesome name="edit" size={22} color={colors.text} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("MyQueues")}
                style={{ marginRight: 10 }}
              >
                <FontAwesome name="calendar" size={22} color={colors.text} />
              </TouchableOpacity>

              <View>
                <NewQueue rreload={rreload} />
              </View>

              <TouchableOpacity onPress={() => Linking.openURL(links.wase)}>
                <FontAwesome5 name="waze" size={25} color={colors.text} />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => setMassage(true)}>
            <Entypo name="log-out" size={22} color={colors.text} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default NavBar;

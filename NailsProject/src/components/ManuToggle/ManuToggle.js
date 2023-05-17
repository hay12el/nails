import { View, Text, Pressable, Animated, Easing, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./SManuToggle";
import {
  Ionicons,
  Feather,
  FontAwesome,
  //@ts-ignore
} from "@expo/vector-icons";
import colors from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { SETOPENMENU, SETOPEN } from "../../redux/Properties";
import { useNavigation } from "@react-navigation/native";
import Message from "../Message/Message";
import { LOGOUT } from "../../redux/User";

const ManuToggle = () => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [hour, setHour] = useState("בוקר טוב,");
  const open = useSelector((state) => state.properties.openMenu);
  const dispatch = useDispatch();
  const openMenu = new Animated.Value(-300);
  const [massage, setMassage] = useState(false);
  const [firstRender, setFirstRender] = useState(0);

  useEffect(() => {
    if (firstRender != 0) {
      if (open) {
        Animated.timing(openMenu, {
          toValue: -20,
          duration: 500,
          easing: Easing.elastic(1),
          useNativeDriver: false,
        }).start();
      } else {
        openMenu.setValue(-20);
        Animated.sequence([
          Animated.timing(openMenu, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }),
          Animated.timing(openMenu, {
            toValue: -300,
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start();
      }
    } else {
      setFirstRender(1);
    }
  }, [open]);

  const Logout = () => {
    try {
      dispatch(LOGOUT());
      setMassage(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    var hours = new Date().getHours(); //To get the Current Hours
    if (hours > 5 && hours < 12) {
      setHour("בוקר טוב,");
    } else if (hours >= 12 && hours < 18) {
      setHour("צהריים טובים,");
    } else {
      setHour("ערב טוב,");
    }
  }, []);

  return (
    <Animated.View
      style={[
        styles.ManuToggleCont,
        {
          left: openMenu,
        },
      ]}
    >
      <Message
        text="האם את בטוחה שאת רוצה להתנתק?"
        action={Logout}
        open={massage}
        onClose={() => setMassage(false)}
      />
      <View style={styles.upper}>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <FontAwesome name="user-circle-o" size={35} color={colors.text} />
          <View style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Text style={{ fontSize: 15, fontWeight: 600 }}>{hour}</Text>
            <Text>{user.username}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(SETOPENMENU({ open: false }));
          }}
          style={{ height: 30, width: 30 }}
        >
          <Feather name="x" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.pressable}
        onPress={() => {
          navigation.navigate("HomePage");
          dispatch(SETOPENMENU({ open: false }));
        }}
      >
        <Ionicons name="home-outline" size={27} color={colors.text} />
        <Text style={{ fontSize: 16 }}>{"  ראשי "}</Text>
      </TouchableOpacity>
      {user.isAdmin ? (
        <>
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => {
              navigation.navigate("Admin_pannel");
              dispatch(SETOPENMENU({ open: false }));
            }}
          >
            <FontAwesome name="calendar-o" size={22} color={colors.text} />
            <Text style={{ fontSize: 16 }}>{"  היומן שלך "}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pressable}
            onPress={() => {
              navigation.navigate("Editing");
              dispatch(SETOPENMENU({ open: false }));
            }}
          >
            <FontAwesome name="edit" size={22} color={colors.text} />
            <Text style={{ fontSize: 16 }}>{"  פינת המנהלת "}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => {
              dispatch(SETOPENMENU({ open: false }));
              dispatch(SETOPEN({ open: true }));
            }}
          >
            <FontAwesome name="calendar-plus-o" size={22} color={colors.text} />
            <Text style={{ fontSize: 16 }}>{"  הזמנת תור "}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => {
              navigation.navigate("MyQueues");
              dispatch(SETOPENMENU({ open: false }));
            }}
          >
            <FontAwesome
              name="calendar-check-o"
              size={22}
              color={colors.text}
            />
            <Text style={{ fontSize: 16 }}>{"  התורים שלך "}</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.pressable} onPress={() => setMassage(true)}>
        <Ionicons name="log-in-outline" size={29} color={colors.text} />
        <Text style={{ fontSize: 16 }}>{"  התנתקי "}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ManuToggle;

import React, { useEffect, useState } from "react";
import {
  View,
  Linking,
  TouchableOpacity,
  Text,
  Pressable,
  Animated,
} from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
// import LittleTitle from "../LittleTitle/LittleTitle";
import { styles } from "./SLinks";
import colors from "../../styles/colors";
import linkss from "../../utils/links";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Links = () => {
  const navigate = useNavigation();
  const links = useSelector((state) => state.properties.Linkim);
  const contact = new Animated.Value(0);
  const [opneCont, setOpenCont] = useState(false);
  const [firstRender, setFirstRender] = useState(0);

  useEffect(() => {
    if (firstRender != 0) {
      if (!opneCont) {
        contact.setValue(150);
        Animated.timing(contact, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(contact, {
          toValue: 150,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    } else {
      setFirstRender(1);
    }
  }, [opneCont]);

  return (
    <>
      {/* <LittleTitle text={"עקבי אחרי"} /> */}
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: 30,
          backgroundColor: colors.first,
        }}
      >
        <View style={styles.navButtons}>
          <Pressable
            style={[styles.QueueButton1]}
            onPress={() => setOpenCont(!opneCont)}
          >
            <Text style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>
              כתובת ויצירת קשר 📞
            </Text>
          </Pressable>
          <Pressable
            style={[styles.QueueButton1]}
            onPress={() => Linking.openURL(links.wase)}
          >
            <Text style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>
              ניווט בעזרת Waze{" "}
            </Text>
            <FontAwesome5 name="waze" size={16} color={colors.text} />
          </Pressable>
        </View>
        <Animated.View
          style={{
            display: 'flex',
            flexDirection: 'rtl',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 30,
            height: contact,
            width: "90%",
            backgroundColor: colors.first,
            borderRadius: 25,
            opacity: contact.interpolate({inputRange: [0, 150], outputRange: [0, 1]}),
            padding: contact.interpolate({inputRange: [0, 150], outputRange: [0,10]}),
            marginBottom: contact.interpolate({inputRange: [0, 150], outputRange: [0,10]}),
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: 500, color: colors.text, direction: 'rtl' }}>
            📞  טלפון: 054-4573847
          </Text>
          <Text style={{ fontSize: 13, fontWeight: 500, color: colors.text }}>
          📍 כתובת: אוסישקין 2, באר-שבע  
          </Text>
        </Animated.View>
        <Text style={{ fontSize: 16, fontWeight: 600, color: colors.text }}>
          עקבו אחרי
        </Text>
        <View style={styles.IconBar}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(linkss.tiktok);
            }}
          >
            <FontAwesome5 name="tiktok" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(links.instagram);
            }}
          >
            <AntDesign name="instagram" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.openURL(links.whatsapp);
            }}
          >
            <FontAwesome5 name="whatsapp" size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(links.whatsapp);
            }}
          >
            <FontAwesome5 name="facebook" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Links;

import { View, Text, TouchableOpacity, Linking } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import React from "react";
import { styles } from "./SUserView";

const UserView = ({ user }) => {
  const changePhone = (p) => {
    if (p[0] == "0") {
      return "+972" + p.slice(1);
    } else {
      return p;
    }
  };

  return (
    <View style={styles.item}>
      <View style={{ height: "45%", justifyContent: "center" }}>
        <Feather name="user" size={35} />
      </View>
      <Text style={{ fontSize: 18 }}>{user.username}</Text>
      <View style={styles.down}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`https://wa.me/${changePhone(user.phone)}`)
          }
          style={{ marginHorizontal: 12 }}
        >
          <FontAwesome
            name="whatsapp"
            size={30}
            color="black"
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${user.phone}`);
          }}
          style={{ marginHorizontal: 12 }}
        >
          <Feather
            name="phone-forwarded"
            size={30}
            color="black"
            style={{ marginHorizontal: 15 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserView;

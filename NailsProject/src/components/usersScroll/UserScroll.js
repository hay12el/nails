import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Platform, Text } from "react-native";
import API from "../../api/api";
import { useSelector } from "react-redux";
import UserView from "../UserView/UserView";
import { styles } from "./SUserScroll";
import colors from "../../styles/colors";

const UserScroll = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      API.get("/user/getAdminUsers", {
        params: {
          token: user.token,
        },
      })
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUsers();
  }, []);

  return (
    <View style={styles.constiner}>
      {user.isAdmin ? (
        <View style={styles.FLView}>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}
            >
              הלקוחות שלך
            </Text>
          </View>
          <FlatList
            horizontal
            data={users}
            renderItem={({ item }) => <UserView user={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      ) : null}
    </View>
  );
};

export default UserScroll;

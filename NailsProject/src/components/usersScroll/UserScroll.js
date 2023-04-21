import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Platform } from "react-native";
import API from "../../api/api";
import { useSelector } from "react-redux";
import UserView from "../UserView/UserView";
import Title from "../Title/Title";
import {styles} from './SUserScroll';

const UserScroll = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      API
      .get("/user/getAdminUsers", {
        params: {
          token: user.token
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    getUsers();
    }, []);

  return (
    <View style={styles.constiner}>
      {user.isAdmin ? (
        <View style={styles.constiner}>
          <Title text={"הלקוחות שלך"} />
          <View style={styles.FLView}>
            <FlatList
              horizontal
              data={users}
              renderItem={({ item }) => <UserView user={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default UserScroll;
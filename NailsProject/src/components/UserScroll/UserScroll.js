import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import UserView from "../UserView/UserView";
import Title from "../Title/Title";
import { styles } from "./SUserScroll";

const UserScroll = () => {
  const user = useSelector((state) => state);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // await client
      //   .get("/users/getAdminUsers", {
      //     params: {
      //       admin: user.id.toString(),
      //     },
      //   })
      //   .then((response) => {
      //     setUsers(response.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    };
    fetchData();
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

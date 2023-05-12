import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import MyQueuesQ from "../../components/MyQueues/MyQueues";
import {
  Image,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { styles } from "./SMyQueues";
import API from "../../api/api";
import colors from "../../styles/colors";

const StatusBarHeight = Constants.statusBarHeight;

const days = {
  0: "ראשון",
  1: "שני",
  2: "שלישי",
  3: "רביעי",
  4: "חמישי",
  5: "שישי",
  6: "שבת",
};

export default function MyQueues({ navigation }) {
  const user = useSelector((state) => state.user);
  const [massage, setMassage] = useState(false);
  const [queues, setQueues] = useState({});
  const [ok, setOk] = useState(true);
  const [reload, setReload] = useState(true);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    setThinking(true);
    const getData = async () => {
      API.get("/event/getMyQueues", { params: { token: user.token } })
        .then((response) => {
          setOk(!ok);
          setQueues(response.data);
          setThinking(false);
        })
        .catch((err) => {
          setOk(!ok);
          setThinking(false);
          console.log(err.message);
        });
    };
    getData();
  }, [reload]);

  const rreload = () => {
    setReload(!reload);
  };

  return (
    <View
      style={{
        height: "100%",
        // paddingBottom: 90,
        marginTop: StatusBarHeight,
        backgroundColor: "white",
      }}
    >
      <LinearGradient
        colors={[colors.first, colors.first, colors.second]}
        locations={[0.0, 0.7, 1.0]}
        style={styles.linearGradient}
      >
        <Image
          source={require("../../../assets/2.png")}
          style={{ height: 80, width: 70 }}
        ></Image>
        <Text style={{ fontSize: 30, color: "#364F6B" }}>התורים שלך:</Text>
      </LinearGradient>

      <View
        style={{
          height: "100%",
          backgroundColor: "white",
          paddingBottom: 50,
          width: "100%",
        }}
      >
        {Object.keys(queues).length === 0 ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              אין תורים עתידיים
            </Text>
          </View>
        ) : (
          <View style={{ marginBottom: 30, paddingTop: 10, height:'69%' }}>
            <FlatList
              data={queues}
              renderItem={({ item }) => (
                <MyQueuesQ item={item} setQueues={setQueues} />
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        )}
      </View>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color="#0000ff"
        animating={thinking}
      />
      {/* <View style={{ display: "flex", backgroundColor: "black", height: 20 }}> */}
        <NavBar rreload={rreload} />
      {/* </View> */}
    </View>
  );
}

import React, { useState } from "react";
import Message from "../Message/Message";
import { FontAwesome } from "@expo/vector-icons";
import { View, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../styles/colors";
import { useSelector } from "react-redux";
import { styles } from "./SMyQueues";
import API from "../../api/api";

const days = {
  0: "ראשון",
  1: "שני",
  2: "שלישי",
  3: "רביעי",
  4: "חמישי",
  5: "שישי",
  6: "שבת",
};

const MyQueuesQ = (props) => {
  const [delete1, setDelete] = useState(false);
  const user = useSelector((state) => state.user);
  const item = props.item;
  const setQueues = props.setQueues;

  let theTime = new Date(item.time);
  const hourAsType = (hour, type) => {
    var hourToReurn = { text: "", type: "" };
    switch (type) {
      case "A":
        hourToReurn.text = (hour + 1) + ":00 - " +  hour + ":00";
        hourToReurn.type = "A";
        break;
      case "B":
        hourToReurn.text =
           (Math.floor(hour) + 1) + ":30 - " + Math.floor(hour) + ":30";
        hourToReurn.type = "B";
        break;
      case "C":
        hourToReurn.text = (hour + 1) + ":30 - " + hour + ":00";
        hourToReurn.type = "C";
        break;
      case "D":
        hourToReurn.text =
           (Math.floor(hour) + 2) + ":00 - " + Math.floor(hour) + ":30";
        hourToReurn.type = "D";
        break;
      case "E":
        hourToReurn.text = hour + ":30 - " + hour + ":00";
        hourToReurn.type = "E";
        break;
      case "F":
        hourToReurn.text =
         (Math.floor(hour) + 1) + ":00 - " + Math.floor(hour) + ":30";
        hourToReurn.type = "F";
        break;
      default:
        break;
    }
    return hourToReurn;
  };

  const deleteQueue = async (id) => {
    API.post("/event/deleteMyQueue", { token: user.token, queueId: id })
      .then((response) => {
        setQueues(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        height: 140,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowColor: "black",
        elevation: 5,
        backgroundColor: "white",
        shadowOpacity: 3,
        borderRadius: 20,
        padding: 3,
        marginHorizontal: 27,
        marginTop: 35,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          position: "absolute",
          height: 50,
          width: 50,
          borderRadius: 100,
          borderColor: colors.forth,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          top: -25,
          backgroundColor: "white",
          elevation: 5,
        }}
      >
        <FontAwesome name="calendar" size={27} color={colors.forth} />
      </View>
      <View
        style={{
          direction: "rtl",
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          alignContent: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "right", fontSize: 16, color: colors.text }}>
          יום {days[theTime.getDay()]} {theTime.getDate()}/
          {theTime.getMonth() + 1}
        </Text>
        <Text> </Text>
        <Text style={{ textAlign: "right", fontSize: 16, color: colors.text }}>
          בשעות {(hourAsType(theTime.getUTCHours(), props.item.type)).text}
        </Text>
      </View>

      <Pressable onPress={() => setDelete(!delete1)}>
        <LinearGradient
          colors={[colors.first, colors.first, colors.fifth]}
          locations={[0.0, 0.5, 1.0]}
          style={[styles.QueueButton]}
        >
          <Text style={{ fontSize: 14, color: colors.text }}>ביטול התור</Text>
        </LinearGradient>
      </Pressable>

      {/* deleting queue alert */}

      <Message
        text="האם את בטוחה שאת רוצה לבטל את התור?"
        action={() => deleteQueue(item._id)}
        open={delete1}
        onClose={() => setDelete(false)}
      />
    </View>
  );
};

export default MyQueuesQ;

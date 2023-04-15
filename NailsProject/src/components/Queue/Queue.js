import React, { useState, useContext } from "react";
import Message from "../Message/Message";
import { FontAwesome, Feather } from "@expo/vector-icons";
import {
  View,
  Linking,
  Pressable,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import {styles} from './SQueue'
import API from "../../api/api";
import colors from "../../styles/colors";

const days = {
  0: "ראשון",
  1: "שני",
  2: "שלישי",
  3: "רביעי",
  4: "חמישי",
  5: "שישי",
  6: "שבת",
};

const Queue = ({item, selectedDate, setThinking, setCatchH, setIndicator, indicator}) => {
  const user = useSelector((state) => state.user);

  const changePhone = (p) => {
    if (p[0] == "0") {
      return "+972" + p.slice(1);
    } else {
      return p;
    }
  };

  const deleteQueue = async (userid, postid, selectedDate) => {
    setThinking(true);
    await client
      .post(
        "/event/AdminDeleteQueue",
        { userid: userid, postid: postid, date: selectedDate },
      )
      .then((response) => {
        setIndicator(!indicator);
        setThinking(false);
        setCatchH(response.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const catchQueue = async (userid, selectedDate, hour) => {
    setThinking(true);
    await API
      .post(
        "/events/AdminCatchQueue",
        { userid: userid, date: selectedDate, hour: hour + 3 },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setCatchH(response.data.events);
        setIndicator(!indicator);
        setThinking(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showAlert = () => {
    Alert.alert(
      "ביטול תור",
      `האם את בטוחה שאת רוצה לבטל את התור? (אל תשכחי לעדכן את ${item.user.username})`,
      [
        { text: "לא" },
        {
          text: "כן",
          onPress: () => deleteQueue(item.user._id, item.postId, selectedDate),
        },
      ]
    );
  };
  // const item = props.item;
  return (
    <View>
      {item.iscatched ? (
        <View
          style={{
            height: 180,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderWidth: 1,
            marginHorizontal: 3,
            marginVertical: 0,
          }}
        >
          <View
            style={{
              marginTop: 3,
              display: "flex",
              flexDirection: "row",
              alignContent: "flex-start",
              justifyContent: "center",
              direction: "rtl",
            }}
          >
            <Text style={{ textAlign: "right", fontSize: 18, color: colors.text }}>
              יום {days[selectedDate.getDay()]} {selectedDate.getDate()}/
              {selectedDate.getMonth() + 1}
            </Text>
            <Text> </Text>
            <Text style={{ textAlign: "right", fontSize: 18, color: colors.text }}>
              בשעה {item.hour}:00
            </Text>
          </View>

          { typeof item.user.isAdmin === "undefined" || !item.user.isAdmin  ? (
            <View
              style={{
                width: "95%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: 12,
                backgroundColor: "#f5f5f5",
                borderRadius: 10,
                paddingBottom: 10,
              }}
            >
              <View style={{ marginBottom: 18 }}>
                <Text style={{ fontSize: 16, color: colors.text }}>
                  התור של {item.user.username}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  direction: "rtl",
                }}
              >
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonOpen,
                  ]}
                  onPress={() => showAlert()}
                >
                  <Text style={{ fontSize: 14, color: colors.text }}>ביטול התור</Text>
                </Pressable>

                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${item.user.phone}`);
                  }}
                >
                  <Feather
                    name="phone-forwarded"
                    size={27}
                    color="black"
                    style={{ marginHorizontal: 15 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://wa.me/${changePhone(item.user.phone)}`
                    )
                  }
                >
                  <FontAwesome
                    name="whatsapp"
                    size={30}
                    color="black"
                    style={{ marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: "95%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: 12,
                backgroundColor: "#f5f5f5",
                borderRadius: 10,
                paddingBottom: 10,
              }}
            >
              <View style={{ marginBottom: 18 }}>
                <Text style={{ fontSize: 16, color: colors.text }}>ביטלת את התור</Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  direction: "rtl",
                }}
              >
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonOpen,
                    { backgroundColor: "#fff7f7" },
                  ]}
                  onPress={() =>
                    deleteQueue(item.user._id, item.postId, selectedDate)
                  }
                >
                  <Text style={{ fontSize: 14, color: colors.text }}>שחרור התור</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            height: 110,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            direction: "rtl",
            backgroundColor: "white",
            borderWidth: 1,
            padding: 3,
            paddingBottom: 10,
            marginHorizontal: 3,
            marginVertical: 0,
            backgroundColor: "#fcfcfc",
          }}
        >
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "right", fontSize: 18, color: colors.text }}>
              {days[selectedDate.getDay()]} {selectedDate.getDate()}/
              {selectedDate.getMonth() + 1}
            </Text>

            <Text style={{ textAlign: "center", fontSize: 18, color: colors.text }}>
              {item.hour}:00
            </Text>
          </View>
          <View>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => catchQueue(user.id, selectedDate, item.hour)}
            >
              <Text style={{ fontSize: 14, color: colors.text }}>ביטול התור</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Queue;

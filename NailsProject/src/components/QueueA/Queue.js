import React, { useState } from "react";
import Message from "../Message/Message";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { View, Linking, Pressable, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./SQueue";
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

const Queue = ({
  item,
  selectedDate,
  setThinking,
  setCatchH,
  setIndicator,
  indicator,
}) => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const changePhone = (p) => {
    if (p[0] == "0") {
      return "+972" + p.slice(1);
    } else {
      return p;
    }
  };

  const hourAsType = (hour, type) => {
    var hourToReurn = { text: "", type: "" };
    switch (type) {
      case "A":
        hourToReurn.text = hour + ":00 - " + (hour + 1) + ":00";
        hourToReurn.type = "A";
        break;
      case "B":
        hourToReurn.text =
          Math.floor(hour) + ":30 - " + (Math.floor(hour) + 1) + ":30";
        hourToReurn.type = "B";
        break;
      case "C":
        hourToReurn.text = hour + ":00 - " + (hour + 1) + ":30";
        hourToReurn.type = "C";
        break;
      case "D":
        hourToReurn.text =
          Math.floor(hour) + ":30 - " + (Math.floor(hour) + 2) + ":00";
        hourToReurn.type = "D";
        break;
      case "E":
        hourToReurn.text = hour + ":00 - " + hour + ":30";
        hourToReurn.type = "E";
        break;
      case "F":
        hourToReurn.text =
          Math.floor(hour) + ":30 - " + (Math.floor(hour) + 1) + ":00";
        hourToReurn.type = "F";
        break;
      default:
        break;
    }
    return hourToReurn;
  };

  const deleteQueue = async () => {
    // setThinking(true);
    setOpen(false);
    try {
      API.post("/event/AdminDeleteQueue", {
        userId: item.user.userId,
        queueId: item.postId,
        date: selectedDate,
        token: user.token,
      })
        .then((response) => {
          setIndicator(!indicator);
          // setThinking(false);
          setCatchH(response.data.events);
        })
        .catch((err) => {
          console.log(err);
          setOpen(false);
        });
    } catch (err) {
      setOpen(false);
      setIndicator(!indicator);
      // setThinking(false);
    }
  };

  const catchQueue = async () => {
    setThinking(true);
    API.post("/event/addNewQueue", {
      token: user.token,
      time: selectedDate,
      hour: item.hour,
      myAdmin: user.myAdmin,
    })
      .then((response) => {
        setCatchH(response.data.events);
        setIndicator(!indicator);
        setThinking(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AMPM = (hour, type, gap) => {
    var hourToReurn = { text: "", type: "" };
    switch (type) {
      case "A":
        hourToReurn.text = hour + ":00 - " + (hour + gap) + ":00";
        hourToReurn.type = "A";
        break;
      case "B":
        hourToReurn.text = hour + ":00 - " + (hour + gap) + ":30";
        hourToReurn.type = "B";
        break;
      case "C":
        hourToReurn.text = hour + ":30 - " + (hour + gap) + ":00";
        hourToReurn.type = "C";
        break;
      case "D":
        hourToReurn.text = hour + ":30 - " + (hour + gap) + ":30";
        hourToReurn.type = "D";
        break;
      default:
        break;
    }
    return hourToReurn;
  };

  const showAlert = () => {
    setOpen(true);
  };
  return (
    <>
      {item.type !== "G" && (
        <View style={{ marginTop: 30 }}>
          {item.iscatched ? (
            // Queue occupied by user
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  marginHorizontal: 3,
                  padding: 20,
                  gap: 10,
                  direction: "rtl",
                },
                item.type == "C" || item.type == "D" ? { height: 200 } : { height: 130 },
              ]}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "flex-start",
                  justifyContent: "center",
                  direction: "rtl",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "black",
                    direction: "rtl",
                  }}
                >
                  {hourAsType(item.hour, item.type).text}
                </Text>
              </View>

              {typeof item.user.isAdmin === "undefined" ||
              !item.user.isAdmin ? (
                <>
                  <View>
                    <Text style={{ fontSize: 18, color: colors.text }}>
                      {item.user.username}
                    </Text>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "space-between",
                      justifyContent: "flex-start",
                      direction: "rtl",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "flex-start",
                        direction: "rtl",
                        width: 100,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(`tel:${item.user.phone}`);
                        }}
                      >
                        <Feather
                          name="phone-forwarded"
                          size={27}
                          color={colors.text}
                          // style={{ marginHorizontal: 15 }}
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
                          color={colors.text}
                          style={{ marginLeft: 20 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonOpen,
                        {
                          marginHorizontal: 0,
                          position: "absolute",
                          top: -45,
                          right: 0,
                        },
                      ]}
                      onPress={() => showAlert()}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.text,
                          fontWeight: "600",
                        }}
                      >
                        ביטול התור
                      </Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                // Queue occupied by Admin
                <View
                  style={[
                    {
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      backgroundColor: "white",
                      marginHorizontal: 3,
                      padding: 20,
                      gap: 10,
                      direction: "rtl",
                    },
                    item.type == "A" ? { height: 130 } : { height: 200 },
                  ]}
                >
                  <View style={{ marginBottom: 18 }}>
                    <Text style={{ fontSize: 16, color: colors.text }}>
                      ביטלת את התור
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
                        { backgroundColor: colors.rejectRed },
                      ]}
                      onPress={() =>
                        deleteQueue(item.user._id, item.postId, selectedDate)
                      }
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.first,
                          fontWeight: "600",
                        }}
                      >
                        שחרור התור
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          ) : (
            // Gaps
            <Pressable
              style={[
                {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  marginHorizontal: 3,
                  padding: 20,
                  gap: 10,
                  direction: "rtl",
                },
                { height: 130 * item.gap },
              ]}
              onPress={() => console.log(item.hour)}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "flex-start",
                  justifyContent: "center",
                  direction: "rtl",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "black",
                    direction: "rtl",
                  }}
                >
                  {AMPM(item.hour, item.type, item.gap).text}
                </Text>
              </View>
            </Pressable>
          )}
          <Message
            open={open}
            text={`האם את בטוחה שאת רוצה לבטל את התור? (אל תשכחי לעדכן את ${item.user?.username})`}
            onClose={() => setOpen(false)}
            action={deleteQueue}
          />
        </View>
      )}
    </>
  );
};

export default Queue;

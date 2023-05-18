import React, { useRef, useState } from "react";
import Message from "../Message/Message";
import { FontAwesome, Feather } from "@expo/vector-icons";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import {
  View,
  Linking,
  Pressable,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import { styles } from "./SQueue";
import API from "../../api/api";
import colors from "../../styles/colors";
import { Overlay } from "react-native-elements";

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
  // const [hourModel, setHourModel] = useState(false)
  const [overlay, setOverlay] = useState({
    hourModal: false,
    open: false,
    from: "10",
    fromMin: "00",
    to: "10",
    toMin: "00",
    type: "A",
    nowChange: "to",
  });
  const h = useRef("");

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

  const hourAsTypeAdmin = (hour, type, to) => {
    var hourToReurn = { text: "", type: "" };
    switch (type) {
      case "A":
        hourToReurn.text = hour + ":00 - " + (to) + ":00";
        hourToReurn.type = "A";
        break;
      case "B":
        hourToReurn.text =
          Math.floor(hour) + ":30 - " + to + ":30";
        hourToReurn.type = "B";
        break;
      case "C":
        hourToReurn.text = hour + ":00 - " + to + ":30";
        hourToReurn.type = "C";
        break;
      case "D":
        hourToReurn.text =
          Math.floor(hour) + ":30 - " + to + ":00";
        hourToReurn.type = "D";
        break;
      default:
        break;
    }
    return hourToReurn;
  };

  const deleteQueue = async () => {
    setThinking(true);
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
          setThinking(false);
          setCatchH(response.data.events);
        })
        .catch((err) => {
          console.log(err);
          setOpen(false);
        });
    } catch (err) {
      setOpen(false);
      setIndicator(!indicator);
      setThinking(false);
    }
  };

  const returnHoursString = () => {
    if (overlay.nowChange == "from" || overlay.nowChange == "to") {
      let hours = [];
      for (let i = item.hour; i <= item.hour + item.gap; i = i + 1) {
        hours.push(i.toString());
      }
      return hours;
    } else {
      return ["00", "30"];
    }
  };

  const catchQueue = async () => {
    setThinking(true);
    try {
      if (overlay.from > overlay.to) throw "טווח שעות לא תקין, נסי שנית";
      switch (item.type) {
        case "A":
          if (overlay.to == item.hour + item.gap && overlay.toMin == "30")
            throw "חרגת מטווח השעות, נסי שנית";
          break;
        case "C":
          if (
            (overlay.from == item.hour && overlay.fromMin == "00") ||
            (overlay.to == item.hour + item.gap && overlay.toMin == "30")
          )
            throw "חרגת מטווח השעות, נסי שנית";
          break;
        case "D":
          if (overlay.from == item.hour && overlay.fromMin == "00")
            throw "חרגת מטווח השעות, נסי שנית";
          break;
        default:
          break;
      }
      API.post("/event/addNewQueue", {
        token: user.token,
        time: selectedDate,
        hour: overlay.from,
        to: overlay.to,
        type: toType(),
        myAdmin: user.myAdmin,
      })
        .then((response) => {
          setCatchH(response.data.events);
          setIndicator(!indicator);
          setThinking(false);
        })
        .catch((err) => {
          setThinking(false);
          console.log(err);
        });
      setThinking(false);
    } catch (err) {
      setThinking(false);
      // console.log(err);
      Alert.alert("שגיאה", err);
    }
  };

  const toType = () => {
    if (overlay.fromMin == "00") {
      if (overlay.toMin == "00") {
        return "MA";
      } else {
        return "MC";
      }
    } else {
      if (overlay.toMin == "00") {
        return "MD";
      } else {
        return "MB";
      }
    }
  };

  const AMPM = (hour, type, gap) => {
    console.log(hour, type, gap);
    var hourToReurn = { text: "", type: "" };
    switch (type) {
      case "A":
        hourToReurn.text = hour + ":00 - " + (hour + Math.floor(gap)) + ":00";
        hourToReurn.type = "A";
        break;
      case "B":
        hourToReurn.text = hour + ":00 - " + (hour + Math.floor(gap)) + ":30";
        hourToReurn.type = "B";
        break;
      case "C":
        hourToReurn.text = hour + ":30 - " + (hour + Math.floor(gap) == hour ? hour + 1 : hour + Math.floor(gap)) + ":00";
        hourToReurn.type = "C";
        break;
      case "D":
        hourToReurn.text = hour + ":30 - " + (hour + Math.floor(gap)) + ":30";
        hourToReurn.type = "D";
        break;
      default:
        break;
    }
    return hourToReurn;
  };

  const openModal = (from, gap, type) => {
    setOverlay({
      hourModal: false,
      from: from,
      to: from + gap,
      toMin: "00",
      fromMin: "30",
      type: type,
      open: true,
    });
  };

  const closeModal = () => {
    let temp = { ...overlay, open: false };
    setOverlay(temp);
  };

  const showAlert = () => {
    setOpen(true);
  };

  const setHour = () => {
    switch (overlay.nowChange) {
      case "from":
        setOverlay({ ...overlay, from: h.current, hourModal: false });
        break;
      case "to":
        setOverlay({ ...overlay, to: h.current, hourModal: false });
        break;
      case "toMin":
        setOverlay({ ...overlay, toMin: h.current, hourModal: false });
        break;
      case "fromMin":
        setOverlay({ ...overlay, fromMin: h.current, hourModal: false });
        break;
      default:
        break;
    }
  };
  return (
    <View>
      <Overlay isVisible={overlay.hourModal}>
        <View
          style={{
            height: 200,
            display: "flex",
            width: 200,
          }}
        >
          <ScrollPicker
            dataSource={returnHoursString()}
            selectedIndex={1}
            renderItem={(data, index) => {
              return (
                <View>
                  <Text>{data}</Text>
                </View>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              h.current = data;
            }}
            wrapperHeight={180}
            wrapperWidth={150}
            wrapperColor="#FFFFFF"
            itemHeight={60}
            highlightColor="#d8d8d8"
            highlightBorderWidth={2}
          />
          <TouchableOpacity
            style={[styles.btn1, { marginTop: 10 }]}
            onPress={setHour}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "600", color: colors.text }}
            >
              בחירת שעה
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={overlay.open}
        onRequestClose={closeModal}
      >
        <View
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "35%",
          }}
        >
          <View
            style={{
              display: "flex",
              width: "80%",
              backgroundColor: colors.first,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              elevation: 8,
              height: 180,
            }}
          >
            <View style={styles.content}>
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                בחרי טווח שעות שתרצי לבטל:
              </Text>
              <View style={styles.gap}>
                <Pressable
                  style={styles.press}
                  onPress={() =>
                    setOverlay({
                      ...overlay,
                      hourModal: true,
                      nowChange: "from",
                    })
                  }
                >
                  <Text>{Math.floor(overlay.from)}</Text>
                </Pressable>
                <Text>:</Text>
                <Pressable
                  style={styles.press}
                  onPress={() =>
                    setOverlay({
                      ...overlay,
                      hourModal: true,
                      nowChange: "fromMin",
                    })
                  }
                >
                  <Text>{overlay.fromMin}</Text>
                </Pressable>
                <Text>-</Text>
                <Pressable
                  style={styles.press}
                  onPress={() =>
                    setOverlay({ ...overlay, hourModal: true, nowChange: "to" })
                  }
                >
                  <Text>{Math.floor(overlay.to)}</Text>
                </Pressable>
                <Text>:</Text>
                <Pressable
                  style={styles.press}
                  onPress={() =>
                    setOverlay({
                      ...overlay,
                      hourModal: true,
                      nowChange: "toMin",
                    })
                  }
                >
                  <Text>{overlay.toMin}</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.down}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: colors.acceptGreeb }]}
                onPress={catchQueue}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  שמירת שינויים
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: colors.rejectRed }]}
                onPress={closeModal}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  ביטול
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {item.type !== "G" && (
        <View style={{ marginTop: 30 }}>
          {item.iscatched ? (
            // Queue occupied by user
            <>
              {typeof item.user.isAdmin === "undefined" ||
              !item.user.isAdmin ? (
                //////////////////////////  USER
                <>
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
                      item.type == "C" || item.type == "D"
                        ? { height: 200 }
                        : { height: 130 },
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
                  </View>
                </>
              ) : (
                // Queue occupied by Admin
                <View
                  style={[
                    {
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      backgroundColor: "white",
                      marginHorizontal: 3,
                      padding: 20,
                      gap: 10,
                      direction: "rtl",
                    },
                    { height: 130 }
                  ]}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "flex-start",
                      justifyContent: "center",
                      direction: "rtl",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        fontSize: 14,
                        color: "black",
                        direction: "rtl",
                      }}
                    >
                      {hourAsTypeAdmin(item.hour, item.type, item.to).text}
                    </Text>
                    <View style={{ marginBottom: 18 }}>
                      <Text style={{ fontSize: 16, color: colors.text }}>
                        ביטלת את התור
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "center",
                      height: '100%',
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
            </>
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
              onPress={() => openModal(item.hour, item.gap, item.type)}
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
    </View>
  );
};

export default Queue;

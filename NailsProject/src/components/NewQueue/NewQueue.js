import React, { useEffect, useState } from "react";
import API from "../../api/api";
import {
  View,
  ScrollView,
  Pressable,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  ActivityIndicator,
  Platform,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Overlay } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./SNewQueue";
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

const NewQueue = (props) => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [thinking, setThinking] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [toApear, SetApearence] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const { user } = useContext(UserContext);
  const [Success, setSuccess] = useState(false);
  const [Error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [massage, setMassage] = useState(false);
  const [catchH, setCatchH] = useState([]);
  const [choousenHour, setChoosenHour] = useState(0);
  const [hours, setHours] = useState([
    { hour: 9, key: "1", color: "#d3ffa3", iscatched: false },
    { hour: 10, key: "2", color: "#d3ffa3", iscatched: false },
    { hour: 11, key: "3", color: "#d3ffa3", iscatched: false },
    { hour: 12, key: "4", color: "#d3ffa3", iscatched: false },
    { hour: 13, key: "11", color: "#d3ffa3", iscatched: false },
    { hour: 14, key: "12", color: "#d3ffa3", iscatched: false },
    { hour: 15, key: "5", color: "#d3ffa3", iscatched: false },
    { hour: 16, key: "6", color: "#d3ffa3", iscatched: false },
    { hour: 17, key: "7", color: "#d3ffa3", iscatched: false },
    { hour: 18, key: "8", color: "#d3ffa3", iscatched: false },
    { hour: 19, key: "9", color: "#d3ffa3", iscatched: false },
    { hour: 20, key: "10", color: "#d3ffa3", iscatched: false },
  ]);
  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];
  const daysF = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const rreload = props.rreload;

  const addQueue = async () => {
    setThinking(true);
    
    await API
      .post(
        "/event/addNewQueue",
        ////add Admin_Id
        // { user: user, time: selectedDate, hour: choousenHour, admin: ADMIN_ID }
        { token: user.token, time: selectedDate, hour: choousenHour, myAdmin: user.myAdmin }
      )
      .then(async (response) => {
        if (!(typeof response.data == "string")) {
          setThinking(false);
          setMassage(false);
          toggleOverlay();
          setIndicator(!indicator);
          rreload == null ? null : rreload();
        } else {
          ErrortoggleOverlay();
          setThinking(false);
          setMassage(false);
          setIndicator(!indicator);
        }
      })
      .catch((err) => {
        setThinking(false);
        console.log(err);
      });
  };

  function visi() {
    SetApearence(!toApear);
  }

  const onDateChange = async (date) => {
    const a = new Date(date);
    setSelectedDate(a);
  };

  useEffect(() => {
    const getData = async () => {
      let x = selectedDate;
      if (x.getDay() == 6 || x.getDay() == 5) {
        setThinking(false);
        setCatchH([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
      } else {
        setThinking(true);
        API.get("/event/getDayQueues", {
          params: { date: selectedDate, admin: user.myAdmin },
        })
          .then((response) => {
            setThinking(false);
            setCatchH(response.data.events);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    getData();
  }, [selectedDate, indicator]);

  const toggleOverlay = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      visi();
    }, 4200);
  };

  const ErrortoggleOverlay = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 35,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >

      {Platform.OS === "android" ? (
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => visi()}
          style={styles.touchi}
        >
          <LinearGradient
            colors={[colors.forth, colors.forth, colors.third]}
            locations={[0.0, 0.5, 1.0]}
            style={styles.linearGradient}
          >
            <FontAwesome name="plus" size={32} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => visi()}
          style={styles.touchiIOS}
        >
          <View style={styles.linearGradient}>
            <FontAwesome name="plus" size={32} color="white" />
          </View>
        </TouchableOpacity>
      )}

      <Modal
        visible={toApear}
        animationType="slide"
        onRequestClose={() => visi()}
        transparent={true}
      >
        <Overlay
          isVisible={Success}
          onBackdropPress={toggleOverlay}
          overlayStyle={{ padding: 0 }}
        >
          <View
            style={{
              height: 300,
              display: "flex",
              flexDirection: "column",
              width: 300,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#e5e5e8",
            }}
          >
            <Image
              source={require("../../../assets/success.gif")}
              style={{ height: 270, width: 270 }}
            />
            <Text style={{ fontSize: 19 }}>התור נקבע בהצלחה!</Text>
          </View>
        </Overlay>

        <Overlay isVisible={Error} onBackdropPress={ErrortoggleOverlay}>
          <View
            style={{
              height: 250,
              display: "flex",
              flexDirection: "column",
              width: 250,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={require("../../../assets/alert.gif")}
              style={{ height: 150, width: 150 }}
            />
            <Text style={{ fontSize: 15 }}>לא הצלחנו לקבוע תור</Text>
            <Text style={{ fontSize: 15 }}>
              שימי לב שצריך שבוע בין תור לתור
            </Text>
          </View>
        </Overlay>
        <View
          style={{
            height: "80%",
            marginTop: "auto",
            width: "100%",
          }}
        >
          <View style={styles.container}>
            <Modal
              animationType={"fade"}
              transparent={true}
              visible={massage}
              onRequestClose={() => {
                console.log("Modal has been closed.");
              }}
            >
              {/*All views of Modal*/}
              <View style={styles.modal}>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <Text style={styles.text}>
                    לקבוע לך תור לתאריך {selectedDate.getUTCDate()}/
                    {selectedDate.getMonth() + 1} בשעה {choousenHour}:00 ?
                  </Text>
                </View>
                <View style={styles.buttons}>
                  <Pressable onPress={() => setMassage(!massage)}>
                    <LinearGradient
                      colors={[colors.first, colors.first, colors.second]}
                      locations={[0.0, 0.5, 1.0]}
                      style={[styles.button, styles.buttonOpen]}
                    >
                      <Text style={styles.textStyle}>ביטול</Text>
                    </LinearGradient>
                  </Pressable>

                  <Pressable onPress={() => addQueue()}>
                    <LinearGradient
                      colors={[colors.first, colors.first, colors.second]}
                      locations={[0.0, 0.5, 1.0]}
                      style={[styles.button, styles.buttonOpen]}
                    >
                      <Text style={styles.textStyle}>כן אני אשמח :)</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <ScrollView>
              <CalendarPicker
                startFromMonday={false}
                weekdays={daysF}
                minDate={new Date()}
                todayBackgroundColor={colors.second}
                selectedDayColor={colors.first}
                months={months}
                onDateChange={onDateChange}
                previousTitle="הקודם"
                nextTitle="הבא"
              />

              <LinearGradient
                colors={["white", "white", "#faf7f7"]}
                locations={[0.0, 0.4, 1.0]}
                style={{
                  height: 80,
                  width: "100%",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 30,
                  marginTop: 0,
                }}
              >
                
                <Text style={{ textAlign: "center", fontSize: 30, color: colors.text }}>
                  יום {days[selectedDate.getDay()]}
                </Text>

                <Text style={{ textAlign: "center", fontSize: 17, color: colors.text }}>
                  {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/
                  {selectedDate.getFullYear()}
                </Text>
              </LinearGradient>

              <View style={styles.FLcontainer}>
                {selectedDate.getDay() != 5 && selectedDate.getDay() != 6 ? (
                  <FlatList
                    horizontal
                    
                    data={hours}
                    renderItem={({ item }) => {
                      //check if hour is catched
                      let flag = false;
                      for (let x in catchH) {
                        if (catchH[x] == item.hour) {
                          flag = true;
                        }
                      }
                      if (flag) {
                        item.color = "white";
                        item.iscatched = true;
                        return <></>;
                      } else {
                        item.color = "white";
                        item.iscatched = false;
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              if (item.iscatched) {
                                console.log("catched " + item.hour);
                              } else {
                                setChoosenHour(item.hour);
                                setMassage(!massage);
                              }
                            }}
                          >
                            <View
                              style={[
                                styles.sectionBox,
                                { backgroundColor: "white" },
                              ]}
                            >
                              <Text
                                style={{ textAlign: "right", fontSize: 19, color: colors.text }}
                              >
                                {" "}
                                {item.hour}:00
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                    }}
                  />
                ) : (
                  <View
                    style={{
                      height: 90,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 22 }}>אין תורים ביום הזה</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#0000ff"
            animating={thinking}
          />

          {Platform.OS === "android" ? (
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => visi(!visible)}
              style={styles.touchiArrow}
            >
              <LinearGradient
                colors={["#f0eded", "#fafafa", "white"]}
                locations={[0.0, 0.3, 1.0]}
                style={styles.linearGradient1}
              >
                <FontAwesome name="arrow-down" size={30} color="#918fb3" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => visi(!visible)}
              style={styles.touchiArrowIOS}
            >
              <LinearGradient
                colors={["#e6e6e6", "white", "white"]}
                locations={[0.0, 0.3, 1.0]}
                style={styles.linearGradient1}
              >
                <FontAwesome name="arrow-down" size={30} color="#918fb3" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default NewQueue;

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
import { FontAwesome } from "@expo/vector-icons";
import { Overlay } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./SNewQueue";
import colors from "../../styles/colors";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import {SETOPEN} from '../../redux/Properties'
import "moment/locale/he";

const days = {
  0: "ראשון",
  1: "שני",
  2: "שלישי",
  3: "רביעי",
  4: "חמישי",
  5: "שישי",
  6: "שבת",
};

const locale = {
  name: "he",
  config: {
    months:
      "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split(
        "_"
      ),
    monthsShort:
      "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובק_נובמבר_דצמבר".split(
        "_"
      ),
    weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
    weekdaysShort: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
    weekdaysMin: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
    week: {
      dow: 0,
    },
  },
};

moment.updateLocale("he", {
  week: {
    dow: 0,
    doy: 0,
  },
});

const NewQueue = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [thinking, setThinking] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Success, setSuccess] = useState(false);
  const [Error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [massage, setMassage] = useState(false);
  const [type, setType] = useState("");
  const [choousenHour, setChoosenHour] = useState({});
  const [availableHours, setAvailableHours] = useState([]);
  const rreload = props.rreload;
  const openAdding = useSelector((state) => state.properties.openAdding);

  const addQueue = async () => {
    setThinking(true);

    API.post("/event/addNewQueue", {
      token: user.token,
      time: selectedDate,
      hour: choousenHour.text.split(":")[0],
      type: choousenHour.type,
      myAdmin: user.myAdmin,
    })
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
    if(openAdding){
      dispatch(SETOPEN({open: false}))
    }else{
      dispatch(SETOPEN({open: true}))
    }
  }

  const onDateChange = async (date) => {
    const a = new Date(date);
    setSelectedDate(a);
  };

  const hourAsType = (hour, type) => {
    var hourToReurn = { text: "", type: "" };
    switch (type) {
      case "1":
        if (hour % 1 != 0) {
          hourToReurn.text =
            Math.floor(hour) + ":30 - " + (Math.floor(hour) + 1) + ":30";
          hourToReurn.type = "B";
        } else {
          hourToReurn.text = hour + ":00 - " + (hour + 1) + ":00";
          hourToReurn.type = "A";
        }
        break;
      case "2":
        if (hour % 1 != 0) {
          hourToReurn.text =
            Math.floor(hour) + ":30 - " + (Math.floor(hour) + 2) + ":00";
          hourToReurn.type = "D";
        } else {
          hourToReurn.text = hour + ":00 - " + (hour + 1) + ":30";
          hourToReurn.type = "C";
        }
        break;
      case "3":
        if (hour % 1 != 0) {
          hourToReurn.text =
            Math.floor(hour) + ":30 - " + (Math.floor(hour) + 1) + ":00";
          hourToReurn.type = "F";
        } else {
          hourToReurn.text = hour + ":00 - " + hour + ":30";
          hourToReurn.type = "E";
        }
        break;

      default:
        break;
    }
    return hourToReurn;
  };
  
  useEffect(() => {
    setType("");
    setAvailableHours([]);
  }, [selectedDate, indicator]);

  const getData = async (type) => {
    setType(type);
    let x = selectedDate;
    if (x.getDay() == 6 || x.getDay() == 5) {
      setThinking(false);
    } else {
      setThinking(true);
      API.get("/event/getDayQueues", {
        params: { date: selectedDate, admin: user.myAdmin, type: type },
      })
        .then((response) => {
          setThinking(false);
          setAvailableHours(
            response.data.events.map((x) => hourAsType(x, type))
          );
        })
        .catch((err) => {
          setThinking(false);
          console.log(err);
        });
    }
  };

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

      <Modal
        visible={openAdding}
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
                    {selectedDate.getMonth() + 1} בין השעות {choousenHour.text}{" "}
                    ?
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

            <View style={{ width: "100%" }}>
              <CalendarStrip
                style={{ height: 130, paddingTop: 20, paddingBottom: 10 }}
                selectedDate={new Date()}
                onDateSelected={onDateChange}
                locale={locale}
                numDaysInWeek={7}
                daySelectionAnimation={{
                  type: "background",
                }}
              />
              <LinearGradient
                colors={["#fff", "#fcfcfc", "#f2f2f2"]}
                locations={[0.0, 0.7, 1.0]}
                style={{
                  height: 80,
                  width: "100%",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  marginTop: 0,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    color: colors.text,
                  }}
                >
                  יום {days[selectedDate.getDay()]}
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    color: colors.text,
                  }}
                >
                  {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/
                  {selectedDate.getFullYear()}
                </Text>
              </LinearGradient>

              <View
                style={{
                  display: type == "" ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  height: 60,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    getData("1");
                  }}
                  style={[
                    styles.sectionBox,
                    { backgroundColor: "white", width: "20%" },
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 15,
                      color: colors.text,
                      fontWeight: "600",
                    }}
                  >
                    ידיים
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    getData("2");
                  }}
                  style={[
                    styles.sectionBox,
                    { backgroundColor: "white", width: "20%", minWidth: 120},
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 15,
                      color: colors.text,
                      fontWeight: "600",
                    }}
                  >
                    ידיים+רגליים
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    getData("3");
                  }}
                  style={[
                    styles.sectionBox,
                    { backgroundColor: "white", width: "20%" },
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 15,
                      color: colors.text,
                      fontWeight: "600",
                    }}
                  >
                    תיקון
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.FLcontainer}>
                {selectedDate.getDay() != 5 && selectedDate.getDay() != 6 ? (
                  <View
                    style={{
                      display: "flex",
                      width: "100%",
                      height: '59%',
                      justifyContent: "flex-start",
                      alignItems: "center",marginBottom: 140,
                    }}
                  >
                    <ScrollView contentContainerStyle={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginBottom:160
                        }}>
                        {availableHours.map((hour) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setChoosenHour(hour);
                                setMassage(!massage);
                              }}
                              key={hour.text}
                            >
                              <View
                                style={[
                                  styles.sectionBox,
                                  { backgroundColor: "white" },
                                ]}
                                key={hour.text}
                              >
                                <Text
                                  style={{
                                    textAlign: "right",
                                    fontSize: 15,
                                    color: colors.text,
                                  }}
                                >
                                  {hour.text}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                    </ScrollView>
                  </View>
                ) : (
                  <View
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={"6456"}
                  >
                    <Text style={{ fontSize: 22 }}>אין תורים ביום הזה</Text>
                  </View>
                )}
              </View>
            </View>
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
                colors={["#f2f2f2", "#f7f7f7", "#fcfcfc"]}
                locations={[0.0, 0.8, 1.0]}
                style={styles.linearGradient1}
              >
                <FontAwesome name="arrow-down" size={30} color={colors.forth} />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() => visi(!visible)}
              style={styles.touchiArrowIOS}
            >
              <LinearGradient
                colors={["#f2f2f2", "#fcfcfc", "#fff"]}
                locations={[0.0, 0.3, 1.0]}
                style={styles.linearGradient1}
              >
                <FontAwesome
                  name="arrow-down"
                  size={30}
                  color={colors.second}
                />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default NewQueue;

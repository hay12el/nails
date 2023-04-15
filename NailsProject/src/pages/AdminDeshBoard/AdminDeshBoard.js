import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, Image, Text, ActivityIndicator } from "react-native";
import { styles } from "./SAdminDeshBoard";
import CalendarPicker from "react-native-calendar-picker";
import { Overlay } from "react-native-elements";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;
//components
import Queue from "../../components/Queue/Queue";
import NavBar from "../../components/NavBar/NavBar";
import API from "../../api/api";
import colors from "../../styles/colors";

export default function Admin_pannel({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [thinking, setThinking] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Success, setSuccess] = useState(false);
  const [catchH, setCatchH] = useState([]);
  const [choousenHour, setChoosenHour] = useState(0);
  const [hours, setHours] = useState([
    { hour: 9, key: "1", iscatched: false, user: {} },
    { hour: 10, key: "2", iscatched: false, user: {} },
    { hour: 11, key: "3", iscatched: false, user: {} },
    { hour: 12, key: "4", iscatched: false, user: {} },
    { hour: 13, key: "11", iscatched: false, user: {} },
    { hour: 14, key: "12", iscatched: false, user: {} },
    { hour: 15, key: "5", iscatched: false, user: {} },
    { hour: 16, key: "6", iscatched: false, user: {} },
    { hour: 17, key: "7", iscatched: false, user: {} },
    { hour: 18, key: "8", iscatched: false, user: {} },
    { hour: 19, key: "9", iscatched: false, user: {} },
    { hour: 20, key: "10", iscatched: false, user: {} },
  ]);

  const onDateChange = async (date) => {
    const a = new Date(date);
    setSelectedDate(a);
  };

  useEffect(() => {
    setThinking(true);
    const getData = async () => {
      await API.get("/event/AdminGetDayQueues", {
        params: { date: selectedDate, token: user.token },
      })
        .then((response) => {
          setThinking(false);
          setCatchH(response.data.events);
          setThinking(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, [selectedDate, indicator]);

  const toggleOverlay = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3300);
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
        marginTop: StatusBarHeight,
      }}
    >
      <StatusBar style="dark" />
      <Overlay isVisible={Success} onBackdropPress={toggleOverlay}>
        <View style={styles.overlay}>
          <Image
            source={require("../../../assets/success.gif")}
            style={{ height: 150, width: 150 }}
          />
          <Text style={{ fontSize: 15 }}>התור נקבע בהצלחה!</Text>
        </View>
      </Overlay>

      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={false}
          weekdays={["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]}
          todayBackgroundColor={colors.second}
          selectedDayColor={colors.first}
          months={[
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
          ]}
          onDateChange={onDateChange}
          previousTitle="הקודם"
          nextTitle="הבא"
        />
        <View style={styles.FLcontainer}>
          {selectedDate.getDay() != 5 && selectedDate.getDay() != 6 ? (
            <FlatList
              data={hours}
              renderItem={({ item }) => {
                //check if hour is catched
                let flag = false;
                let user = {};
                let pId = "";
                for (let x in catchH) {
                  if (catchH[x].hour == item.hour) {
                    flag = true;
                    user = catchH[x].user;
                    pId = catchH[x].postId;
                    break;
                  }
                }
                if (flag) {
                  item.iscatched = true;
                  item.user = user;
                  item.postId = pId;
                } else {
                  item.iscatched = false;
                  item.user = {};
                  item.postId = "";
                }
                return (
                  <Queue
                    item={item}
                    selectedDate={selectedDate}
                    setThinking={setThinking}
                    setCatchH={setCatchH}
                    setIndicator={setIndicator}
                    indicator={indicator}
                  />
                );
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
      </View>

      <View style={styles.menuNavigator}>
        <NavBar />
      </View>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color="#0000ff"
        animating={thinking}
      />
    </View>
  );
}

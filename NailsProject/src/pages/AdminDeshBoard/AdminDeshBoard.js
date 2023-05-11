import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./SAdminDeshBoard";
import { Overlay } from "react-native-elements";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;
import { Agenda, LocaleConfig } from "react-native-calendars";

//components
import Queue from "../../components/QueueA/Queue";
import NavBar from "../../components/NavBar/NavBar";
import API from "../../api/api";

export default function Admin_pannel({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [thinking, setThinking] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Success, setSuccess] = useState(false);
  const [catchH, setCatchH] = useState([]);
  const [choousenHour, setChoosenHour] = useState(0);

  LocaleConfig.locales["he"] = {
    monthNames: [
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
    ],
    monthNames: [
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
    ],
    monthNamesShort: [
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
    ],
    dayNames: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    dayNamesShort: ["א", "ב", "ג", "ד", "ה", "ו", "שבת"],
    today: "Aujourd'hui",
  };

  LocaleConfig.defaultLocale = "he";

  const [items, setItems] = useState({});

  const onDateChange = (date) => {
    const a = new Date(date.dateString);
    setSelectedDate(a);
  };

  const renderItem = ( item ) => {
    
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
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={{fontSize: 16,fontWeight: '700'}}>אין תורים ביום זה</Text>
      </View>
    );
  };
  

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    setItems({});
    setThinking(true);
    const getData = async () => {
      API.get("/event/AdminGetDayQueues", {
        params: { date: selectedDate, token: user.token },
      })
        .then((response) => {
          setThinking(false);
          // console.log(response.data.events);
          setItems(response.data.events);
          setThinking(false);
        })
        .catch((err) => {
          setThinking(false);
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
        width: "100%",
        height: "100%",
        marginTop: StatusBarHeight,
      }}
    >
      <StatusBar style="dark" />
      <Overlay isVisible={Success} onBackdropPress={toggleOverlay}>
        <View style={styles.overlay}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../../../assets/success.gif")}
          />
          <Text style={{ fontSize: 15 }}>התור נקבע בהצלחה!</Text>
        </View>
      </Overlay>

      <View style={styles.container1}>
        <Agenda
          items={items}
          // loadItemsForMonth={loadItems}
          selected={new Date().toISOString().split("T")[0]}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          onDayPress={(day) => {
            onDateChange(day);
          }}
          showOnlySelectedDayItems={true}
        />
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

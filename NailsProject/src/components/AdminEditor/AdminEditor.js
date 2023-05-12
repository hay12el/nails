import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styles } from "./SAdminEditor";
import { useSelector, useDispatch } from "react-redux";
import photos from "../../utils/photos";
import colors from "../../styles/colors";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import {
  FontAwesome,
  //@ts-ignore
} from "@expo/vector-icons";
import { SETABOUTME } from "../../redux/Properties";
import { Overlay } from "react-native-elements";
import UserScroll from "../usersScroll/UserScroll";
import API from "../../api/api";

const AdminEditor = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [text, onChangeText] = useState("");
  const [hoursLimitation, setHoursLimitation] = useState({
    date: new Date(),
    from: 0,
    to: 0,
  });
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [thinking, setThinking] = useState(false);
  const [images, setImage] = useState([]);
  const [imageForOverlay, setimageForOverlay] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPicker, setopenPicker] = useState({ open: false, kind: "to" });
  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      setImage([...images, result.assets[0].uri]);
    } catch (err) {}
  };

  const onChange = (event, selectedDate) => {
    setHoursLimitation({
      ...hoursLimitation,
      date: selectedDate,
    });
    // if (Platform.OS === "android")
    setShowDate(false);
    // setDob(currentDate);
  };

  const handleTextChange = async (text) => {
    try {
      API.post("/properties/changeAboutMe", {
        token: user.token,
        aboutMe: text,
      }).then((response) => {
        dispatch(SETABOUTME({ aboutMe: text }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateHours = async () => {
    setThinking(true);
    try {
      if (Number(hoursLimitation.to) < Number(hoursLimitation.from)) {
        Alert.alert(
          "שימי לב!",
          "שעת ההתחלה צריכה להיות לפני שעת הסיום",
          [
            {
              text: "סבבה!",
            },
          ],
          {
            cancelable: true,
          }
        );
      } else {
        const res = await API.post("/event/addNewQueue", {
          token: user.token,
          time: hoursLimitation.date,
          hour: hoursLimitation.from,
          to: hoursLimitation.to,
          type: "G",
        })
          .then(async (response) => {
            Alert.alert(
              "שימי לב!",
              `מעולה! טווח השעות ביום זה נקבל ל${hoursLimitation.from} עד ${hoursLimitation.to}`,
              [
                {
                  text: "סבבה!",
                },
              ],
              {
                cancelable: true,
              }
            );

            setThinking(false);
          })
          .catch((err) => {
            Alert.alert(
              "שימי לב!",
              err.response.data,
              [
                {
                  text: "סבבה!",
                },
              ],
              {
                cancelable: true,
              }
            );

            setThinking(false);
          });
      }
    } catch (error) {
      setThinking(false);
    }
    setThinking(false);
  };

  ////////////

  const handleImageOpen = (image) => {
    setimageForOverlay(image);
    setOpen(true);
  };

  return (
    <View style={styles.adminContainer}>
      <Overlay isVisible={openPicker.open}>
        <View
          style={{
            height: 200,
            display: "flex",
            width: 180,
          }}
        >
          <ScrollPicker
            dataSource={[
              "8:00",
              "9:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
            ]}
            selectedIndex={1}
            renderItem={(data, index) => {
              return (
                <View>
                  <Text>{data}</Text>
                </View>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              if (typeof data != "undefined") {
                if (openPicker.kind == "from") {
                  setHoursLimitation({
                    ...hoursLimitation,
                    from: data.split(":")[0],
                  });
                } else {
                  setHoursLimitation({
                    ...hoursLimitation,
                    to: data.split(":")[0],
                  });
                }
              }
            }}
            wrapperHeight={180}
            wrapperWidth={150}
            wrapperColor="#FFFFFF"
            itemHeight={60}
            highlightColor="#d8d8d8"
            highlightBorderWidth={2}
          />
          <TouchableOpacity
            style={[styles.btn, { marginTop: 10 }]}
            onPress={() => setopenPicker({ ...openPicker, open: false })}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "600", color: colors.text }}
            >
              בחירת שעה
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Text style={{ fontSize: 19, color: colors.text }}>
        היי {user.username} 😊
      </Text>
      <Text style={{ textAlign: "right", marginTop: 20, color: colors.text }}>
        כאן תוכלי לערוך את שדות האפליקציה לפי טעמך
      </Text>
      <Text style={{ textAlign: "left", color: colors.text }}>
        לכל שאלה תרגישי חופשי ליצור איתנו קשר
      </Text>
      <UserScroll />
      <View style={styles.aboutMeSection}>
        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
            fontWeight: "700",
            color: colors.text,
          }}
        >
          שינוי שדה "קצת עליי":
        </Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={onChangeText}
          value={text}
        />
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingRight: 28,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleTextChange(text)}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "600", color: colors.text }}
            >
              שינוי
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 20,
            color: colors.text,
          }}
        >
          שינוי תמונות בקרוסלה:
        </Text>
        <View style={styles.photos}>
          {imageForOverlay != null ? (
            <Overlay isVisible={open} overlayStyle={{ padding: 0 }}>
              <View
                style={{
                  height: 700,
                  display: "flex",
                  flexDirection: "column",
                  width: 370,
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#e5e5e8",
                }}
              >
                <TouchableOpacity
                  style={styles.TOOverlay}
                  onPress={() => setOpen(false)}
                >
                  <Text style={{ fontWeight: "700", color: colors.text }}>
                    X
                  </Text>
                </TouchableOpacity>
                <Image
                  source={{
                    uri: imageForOverlay.uri,
                  }}
                  style={{ height: "80%", width: "100%" }}
                  resizeMode="cover"
                />

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    direction: "rtl",
                    backgroundColor: colors.third,
                    width: "100%",
                    height: 40,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "600" }}
                  >
                    {imageForOverlay.text}
                  </Text>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    direction: "rtl",
                  }}
                >
                  <TextInput
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="שינוי כותרת תמונה"
                    maxLength={20}
                  />
                </View>

                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "space-between",
                    direction: "rtl",
                    marginBottom: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.acceptGreeb,
                      width: "40%",
                      height: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      שמירת שינויים
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.rejectRed,
                      width: "40%",
                      height: 40,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      מחיקת תמונה
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Overlay>
          ) : null}

          {photos.photos.map((photo) => (
            <TouchableOpacity
              onPress={() => handleImageOpen(photo)}
              key={photo.key}
            >
              <Image
                source={{
                  uri: photo.uri,
                }}
                style={styles.itemPhoto}
                resizeMode="cover"
                key={photo.key}
              />
            </TouchableOpacity>
          ))}
          {images.map((photo) => (
            <Image
              source={{
                uri: photo,
              }}
              style={styles.itemPhoto}
              resizeMode="cover"
              key={photo}
            />
          ))}
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingRight: 28,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={[styles.btn1, { backgroundColor: colors.first }]}
            onPress={pickImage}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "600", color: colors.text }}
            >
              הוספת תמונה
            </Text>
            <FontAwesome name="upload" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutMeSection}>
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color={colors.forth}
          animating={thinking}
        />
        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
            fontWeight: "700",
            color: colors.text,
          }}
        >
          עדכון שעות פעילות
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            marginVertical: 20,
            width: 250,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            direction: "rtl",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 16,
                  fontWeight: "700",
                  color: colors.text,
                }}
              >
                יום:
              </Text>
            </>
            <></>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setShowDate(true)}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  color: colors.text,
                }}
              >
                <Text>{hoursLimitation.date.toISOString().split("T")[0]}</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  fontWeight: "700",
                  color: colors.text,
                }}
              >
                מהשעה:
              </Text>
            </>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setopenPicker({ open: true, kind: "from" })}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  color: colors.text,
                }}
              >
                {hoursLimitation.from}:00
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
              }}
            >
              עד השעה:
            </Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => setopenPicker({ open: true, kind: "to" })}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  color: colors.text,
                }}
              >
                {hoursLimitation.to}:00
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {showDate && Platform.OS == "android" ? (
            <DateTimePicker
              locale="he-HE"
              style={{ width: "100%" }}
              testID="dateTimePicker"
              value={hoursLimitation.date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          ) : (
            <Overlay isVisible={showDate}>
              <DateTimePicker
                locale="he-HE"
                style={{ width: "100%" }}
                testID="dateTimePicker"
                value={hoursLimitation.date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            </Overlay>
          )}
          <View
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                { width: "80%", backgroundColor: colors.forth },
              ]}
              onPress={() => updateHours()}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "600", color: colors.text }}
              >
                עדכון שעות פעילות
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminEditor;

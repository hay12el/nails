import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "./SAdminEditor";
import { useSelector, useDispatch } from "react-redux";
import photos from "../../utils/photos";
import colors from "../../styles/colors";
import * as ImagePicker from "expo-image-picker";
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

  /////////// To Change!!!!!
  const [images, setImage] = useState([]);
  const [imageForOverlay, setimageForOverlay] = useState(null);
  const [open, setOpen] = useState(false);
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

  const handleTextChange = async (text) => {
    try {
      API.post("/properties/changeAboutMe", {
        token: user.token,
        aboutMe: text,
      }).then(response => {
        dispatch(SETABOUTME({ aboutMe: text }));
      })
    } catch (error) {
      console.log(error);
    }
  };

  ////////////

  const handleImageOpen = (image) => {
    setimageForOverlay(image);
    setOpen(true);
  };

  return (
    <View style={styles.adminContainer}>
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
    </View>
  );
};

export default AdminEditor;

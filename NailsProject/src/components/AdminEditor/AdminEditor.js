import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./SAdminEditor";
import { useSelector } from "react-redux";
import photos from "../../utils/photos";

const AdminEditor = () => {
  console.log(photos);
  const user = useSelector((state) => state.user);
  const [text, onChangeText] = useState("");
  return (
    <View style={styles.adminContainer}>
      <Text style={{ fontSize: 19 }}>היי {user.username} 😊</Text>
      <Text style={{ textAlign: "right", marginTop: 20 }}>
        כאן תוכלי לערוך את שדות האפליקציה לפי טעמך
      </Text>
      <Text style={{ textAlign: "left" }}>
        לכל שאלה תרגישי חופשי ליצור איתנו קשר
      </Text>
      <View style={styles.aboutMeSection}>
        <Text style={{ textAlign: "left", fontSize: 16, fontWeight: "700" }}>
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
            onPress={() => console.log(text)}
          >
            <Text style={{ fontSize: 14, fontWeight: "600" }}>שינוי</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageSection}>
        <Text style={{ textAlign: "left", fontSize: 16, fontWeight: "700", marginBottom: 20 }}>
          שינוי תמונות בקרוסלה:
        </Text>
        <View style={styles.photos}>
          {photos.photos.map((photo) => (
            <Image
              source={{
                uri: photo.uri,
              }}
              style={styles.itemPhoto}
              resizeMode="cover"
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
            style={styles.btn1}
            onPress={() => console.log(text)}
          >
            <Text style={{ fontSize: 14, fontWeight: "600" }}>שינוי</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdminEditor;

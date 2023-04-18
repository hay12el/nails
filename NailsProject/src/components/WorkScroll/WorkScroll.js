import React, { useState } from "react";
import { Overlay } from "react-native-elements";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import Title from "../Title/Title";
import { styles } from "./SWorkScroll";
import LittleTitle from "../LittleTitle/LittleTitle";
// import photos from "../../utils/photos";
import { useSelector } from "react-redux";
import colors from "../../styles/colors";

const WorkScroll = () => {
  const photos = useSelector(state => state.properties.photos)
  return (
    // <View style={{ width: "100%", alignItems: "center", marginVertical: 20, position: 'relative' }}>
    <View
      style={{
        width: "100%",
        alignItems: "center",
        position: "relative",
        backgroundColor: 'white',
        paddingVertical: 30,
      }}
    >
      {/* <Title text={"העבודות שלי"} /> */}
      {/* <View style={{width: '100%', paddingBottom: 15}}>
        <LittleTitle text={"העבודות שלי"} />
      </View> */}
      <View
        style={{
          width: "100%",
          paddingBottom: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>
          העבודות שלי
        </Text>
        {/* <LittleTitle text={"העבודות שלי"} /> */}
      </View>
      <View style={styles.FLView}>
        <FlatList
          data={photos}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </View>
  );
};

export default WorkScroll;

const ListItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const closeImage = () => {
    if (open != false) {
      setOpen(false);
    }
  };

  const OpenImage = () => {
    if (open != true) {
      setOpen(true);
    }
  };

  return (
    <View style={styles.item}>
      <Pressable
        delayLongPress={100}
        onLongPress={() => OpenImage()}
        onPressOut={() => closeImage()}
      >
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <View
          style={{
            justifyContent: "center",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "white",
            height: 40,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            {item.text}
          </Text>
        </View>
      </Pressable>
      <Overlay isVisible={open} overlayStyle={{ padding: 0 }}>
        <View
          style={{
            height: 500,
            display: "flex",
            flexDirection: "column",
            width: 300,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e5e5e8",
          }}
        >
          <Image
            source={{
              uri: item.uri,
            }}
            style={{ height: "100%", width: "100%" }}
            resizeMode="cover"
          />
        </View>
      </Overlay>
    </View>
  );
};

import React, { useEffect, useState } from "react";
import { Overlay } from "react-native-elements";
import { View, Text, FlatList, Image, Pressable, Animated } from "react-native";
import Title from "../Title/Title";
import { styles } from "./SWorkScroll";
import LittleTitle from "../LittleTitle/LittleTitle";
// import photos from "../../utils/photos";
import { useSelector } from "react-redux";
import colors from "../../styles/colors";

const WorkScroll = () => {
  const photos = useSelector((state) => state.properties.photos);
  return (
    // <View style={{ width: "100%", alignItems: "center", marginVertical: 20, position: 'relative' }}>
    <View
      style={{
        width: "100%",
        alignItems: "center",
        position: "relative",
        backgroundColor: colors.first,
        paddingTop: 30,
        marginTop: 0,
      }}
    >
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
  const [firstRender, setFirstRender] = useState(0);
  const [open, setOpen] = useState(false);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    if (firstRender != 0) {
      fadeAnim.setValue(0);
    } else {
      setFirstRender(1);
    }
    Animated.spring(fadeAnim, {
      toValue: 1,
      friction: 900,
      tension: 10,
      useNativeDriver: false,
    }).start();
  }, [open]);

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
      </Pressable>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        {item.text}
      </Text>
      <Overlay
        isVisible={open}
        overlayStyle={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Animated.View
          style={{
            height: 500,
            display: "flex",
            flexDirection: "column",
            width: 300,
            borderRadius: 15,
            justifyContent: "center",
            backgroundColor: "transparent",
            opacity: fadeAnim ,
            borderRadius: 25
          }}
        > */}
        <Animated.Image
          source={{
            uri: item.uri,
          }}
          style={{
            height: 500,
            width: 300,
            position: "absolute",
            top: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -250],
            }),
            opacity: fadeAnim,
          }}
          resizeMode="cover"
        />
        {/* </Animated.View> */}
      </Overlay>
    </View>
  );
};

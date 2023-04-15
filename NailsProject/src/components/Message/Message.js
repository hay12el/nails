import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Pressable,
  Modal,
} from "react-native";
import {styles} from './SMessage'
import colors from "../../styles/colors";

const Message = (props) => {
  return (
    <Modal

      animationType={"fade"}
      transparent={true}
      visible={props.open}
      onRequestClose={props.onClose}
    >
      <View style={styles.modal}>
        <View
          style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16 }}>{props.text}</Text>
        </View>
        <View style={[styles.buttons, { flex: 1 }]}>
          <Pressable onPress={props.onClose}>
            <LinearGradient
              colors={[colors.first, colors.first, colors.second]}
              locations={[0.0, 0.5, 1.0]}
              style={[styles.button, styles.buttonOpen]}
            >
              <Text style={styles.textStyle}>ביטול</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => props.action()}>
            <LinearGradient
              colors={[colors.first, colors.first, colors.second]}
              locations={[0.0, 0.5, 1.0]}
              style={[styles.button, styles.buttonOpen]}
            >
              <Text style={styles.textStyle}>כן</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Message;
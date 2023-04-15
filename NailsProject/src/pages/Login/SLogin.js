import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  linearGradient: {
    height: 180,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  linearGradientIOS: {
    height: 180,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  loading: {
    position: "absolute",
    height: 30,
    width: 78,
    left: "40%",
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});

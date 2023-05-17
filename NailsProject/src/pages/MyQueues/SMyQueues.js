import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  linearGradient: {
    height: 120,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  overover: {
    display: 'flex',
    position: 'absolute',
    right: 40,
    bottom: 60,
    zIndex: 60,
  },
  linearGradientIOS: {
    height: 180,
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

  queues: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 90,
    marginLeft: 3,
    marginRight: 3,
    marginVertical: 2,
  },
  text: {
    color: "#3f2949",
    fontSize: 16,
    marginTop: 10,
  },
  textStyle: {
    fontSize: 13,
  },
});
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;

export const styles = StyleSheet.create({
  BigContainer: {
    position: "relative",
    marginTop: StatusBarHeight,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 47,
    // paddingBottom: 100,
  },
  overover: {
    display: 'flex',
    position: 'absolute',
    right: 40,
    bottom: 60,
    zIndex: 60,
  },
  image: {
    position: 'absolute',
    zIndex: -1,
    height: 200,
    width: "100%",
    justifyContent: "flex-start",
  },
  main: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: 'white'
  },
});

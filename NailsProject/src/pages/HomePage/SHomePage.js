import { StyleSheet } from "react-native";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;

export const styles = StyleSheet.create({
  BigContainer: {
    position:"relative",
    marginTop: StatusBarHeight,
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: "#ffffff",
    paddingTop: 145, 
    paddingBottom: 100,
  },

  loading: {
    position: "absolute",
    zIndex: 10,
    height: 30,
    width: 78,
    left: "40%",
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  main: {
    height: "100%",
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
});

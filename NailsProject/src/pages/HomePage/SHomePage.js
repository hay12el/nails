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

  main: {
    height: "100%",
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
});

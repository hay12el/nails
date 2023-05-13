import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  HeaderContainer: {
    position: "absolute",
    top: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "green",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 60,
  },
  txt: {
    fontSize: 25,
    fontWeight: 400,
    color: 'white'
  },
  linearGradient: {
    height: 60,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

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
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 60,
  },
  Arrow: {
    position: 'absolute',
    right: 28
  },
  menu: {
    height: '100%',
    width: 40,
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 28
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

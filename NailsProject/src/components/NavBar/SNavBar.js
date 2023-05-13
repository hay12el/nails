import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
  navBar: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    bottom: 41,
    width: "100%"

  },
  overover: {
    display: 'flex',
    position: 'absolute',
    right: '49%',
    zIndex: 60,
  },
  menuNavigator: {
    direction: "rtl",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.first,
    width: "100%",
    height: 60,
  },
  textStyle: {
    fontSize: 13,
  },
  AndroidButton: {
    height: 50,
    width: 50,
    elevation: 1,
    borderRadius: 100,
    backgroundColor: "#FFE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    elevation: 30,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    height: 150,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    marginTop: "80%",
    marginLeft: 40,
  },
  buttons: {
    direction: "rtl",
    height: 55,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 110,
    alignItems: "center",
    elevation: 8,
    marginHorizontal: 24,
    height: 40,
  },
  buttonOpen: {
    backgroundColor: "#FFf6f6",
  },
  opacBtn: {
    height: '100%',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  }
});

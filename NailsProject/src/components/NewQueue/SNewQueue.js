import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
  linearGradient: {
    elevation: 4,
    margin: 0,
    backgroundColor: "#9b97c4",
    borderRadius: 100,
    height: 65,
    width: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient1: {
    height: 65,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  FLcontainer: {
    display: 'flex',
    width: "100%",
    marginTop: 15,
  },
  touchi: {
    borderRadius: 100,
    position: "absolute",
    backgroundColor: "white",
    top: -30,
    left: -40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    
  },
  touchiIOS: {
    borderRadius: 100,
    position: "absolute",
    backgroundColor: "white",
    top: -3,
    left: -42,
    alignItems: "center",
    justifyContent: "center",
  },
  touchiArrow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 65,
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
    justifyContent: "center",

  },
  touchiArrowIOS: {
    backgroundColor: colors.first,
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 65,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    display: "flex",
    flexDirection: "column",
    padding: 10,
    width: 'auto',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 45,
    marginHorizontal: 9,
    marginVertical: 9,
    elevation: 4,
  },
  container: {
    // margin: 15,
    backgroundColor: "black",
    paddingTop: 0,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: "#0000ff",
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
  button: {
    borderRadius: 7,
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
  text: {
    color: "#3f2949",
    fontSize: 16,
    marginTop: 10,
    direction: 'rtl'
  },
  textStyle: {
    fontSize: 13,
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
    bottom: 0,
  },
});

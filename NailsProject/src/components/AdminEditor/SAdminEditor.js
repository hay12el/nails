import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
  adminContainer: {
    backgroundColor: colors.first,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    paddingTop: 15,
  },
  aboutMeSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 15,
    backgroundColor: colors.second,
    padding: 10,
  },
  textInput: {
    width: 350,
    height: "auto",
    backgroundColor: "#f7f7f7",
    padding: 8,
    borderRadius: 5,
    fontSize: 14,
    marginVertical: 3,
    marginBottom: 10,
    textAlign: "right",
    color: colors.text,
  },
  btn: {
    backgroundColor: colors.first,
    width: 90,
    height: 40,
    padding: 0,
    borderRadius: 5,
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center'
  },
});

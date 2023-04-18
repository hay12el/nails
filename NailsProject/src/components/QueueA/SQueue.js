import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.first,
  },
});

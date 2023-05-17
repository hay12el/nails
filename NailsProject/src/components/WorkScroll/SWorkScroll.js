import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
  FLView: {
    height: 290,
    width: "100%",
    marginTop: 0,
    backgroundColor: colors.first,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: 170,
    height: 225,
    elevation: 4,
    backgroundColor: colors.first,
    borderRadius: 9,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  itemPhoto: {
    width: 170,
    height: 225,
    borderRadius: 25,
  },
});

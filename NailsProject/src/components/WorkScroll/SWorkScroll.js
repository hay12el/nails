import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export const styles = StyleSheet.create({
  FLView: {
    height: 290,
    width: "100%",
    marginTop: 0,
    // elevation: 6,
    backgroundColor: "white",
    paddingRight: 10,
    // backgroundColor: colors.first,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 9,
    margin: 10,
  },
  itemPhoto: {
    width: 170,
    height: 230,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
  },
});

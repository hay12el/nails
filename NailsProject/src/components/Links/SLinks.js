import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    IconBar: {
      height: 70,
      width: 200,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: 50,
      marginTop: 30,
      backgroundColor: "white",
      borderRadius: 12,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },

    tinyLogo: {
      width: 40,
      height: 40,
    },
  });
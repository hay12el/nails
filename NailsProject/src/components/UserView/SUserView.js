import { StyleSheet } from "react-native"; 

export const styles = StyleSheet.create({
    item: {
      alignItems: "center",
      width: 130,
      height: 150,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4,
      backgroundColor: "white",
      borderRadius: 9,
      margin: 10,
    },
    down: {
      display: "flex",
      marginTop:15,
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      direction: "rtl",
    },
  });
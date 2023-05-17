import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  navButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20
  },
  QueueButton1: {
    direction: 'rtl',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 4,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
    marginVertical: 24,
    height: 40,
  },  
  IconBar: {
      height: 50,
      width: 220,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: 50,
      marginTop: 15,
      backgroundColor: "white",
      borderRadius: 12,
      elevation: 3,
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
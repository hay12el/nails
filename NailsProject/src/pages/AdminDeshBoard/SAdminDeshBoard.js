import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  FLcontainer: {
    paddingBottom: 10,
    elevation: 4,
    backgroundColor: "white",
    height: "45%",
    width: "99%",
    borderRadius: 5,
    borderWidth: 4,
    borderColor: "#f5f5f5",
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#0000ff",
  },
  loading: {
    position: "absolute",
    left: "45%",
    top: "50%",
  },

  overlay: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    width: 250,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e8",
  },
});

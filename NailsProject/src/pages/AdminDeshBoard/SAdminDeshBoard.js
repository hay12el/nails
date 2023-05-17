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
  overover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    bottom: 60,
    zIndex: 60,
    height: 60,
    width: 60,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 100
  },
  container1: {
    backgroundColor: "black",
    height: "100%",
    width: '100%',
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
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height: '100%',
  }
});

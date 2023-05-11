import { AppStack } from "./RootStack";
import { AuthStackscreen } from "./RootStack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import c from "../utils/texts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/api";
import { LOGIN } from "../redux/User";
import { SETPROPERTIES, SETLOADING } from "../redux/Properties";
import texts from "../utils/texts";

const Router = () => {
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.properties.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      dispatch(SETLOADING({ loading: true }));
      const token = await AsyncStorage.getItem("token");
      if (user.token !== "") {
        API.post("/user/checkAuth", { token: user.token })
          .then((response) => {
            const newUser = response.data.user;
            const adminProperties = response.data.adminProperties;
            dispatch(
              LOGIN({
                token: user.token,
                username: newUser.username,
                isAdmin: newUser.isAdmin,
                myAdmin: newUser.myAdmin,
              })
            );
            dispatch(SETPROPERTIES({ properties: adminProperties }));
            dispatch(SETLOADING({ loading: false }));
          })
          .catch((err) => {
            dispatch(SETLOADING({ loading: false }));
            console.log(err);
          });
      } else if (token != null) {
        API.post("/user/checkAuth", { token: token })
          .then((response) => {
            const newUser = response.data.user;
            const adminProperties = response.data.adminProperties;
            dispatch(
              LOGIN({
                token: token,
                username: newUser.username,
                isAdmin: newUser.isAdmin,
                myAdmin: newUser.myAdmin,
              })
            );
            dispatch(SETPROPERTIES({ properties: adminProperties }));
            dispatch(SETLOADING({ loading: false }));
          })
          .catch((err) => {
            dispatch(SETLOADING({ loading: false }));
            console.log(err.message);
          });
      }
      dispatch(SETLOADING({ loading: false }));
    };
    checkToken();
    return () => {
      console.log("useEffect");
    };
  }, [user.isAuth]);

  //for not auth users.
  if (!user.isAuth) {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
    // Auth router.
  } else {
    return (
      <NavigationContainer>
        <AuthStackscreen />
      </NavigationContainer>
    );
  }
};

export default Router;

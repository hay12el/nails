import { AppStack } from "./RootStack";
import { AuthStackscreen } from "./RootStack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import API from "../api/api";
//@ts-ignore
import { LOGIN } from "../redux/User";

const Router = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (user.token !== "") {
        API.post("/user/checkAuth", {token: user.token})
          .then((response) => {
            const newUser = response.data.user;
            dispatch(LOGIN({
              token: user.token,
              username: newUser.username,
              isAdmin: newUser.isAdmin,
              myAdmin: newUser.myAdmin
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else if(token != null){
        API.post("/user/checkAuth", {token: token})
          .then((response) => {
            const newUser = response.data.user;
            dispatch(LOGIN({
              token: token,
              username: newUser.username,
              isAdmin: newUser.isAdmin,
              myAdmin: newUser.myAdmin
            }));
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    };
    checkToken();
    return () => console.log("useEffect");
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

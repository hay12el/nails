import { StatusBar } from "expo-status-bar";
import API from "../../api/api";
import React from "react";
import {  ScrollView, Animated, ImageBackground, Text } from "react-native";
import image from "../../../assets/kkaa.png";
import { Formik } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import {
  InnerContainer,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  StyledButton,
  ButtonText,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../../styles/styles";
import { View, Image, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { brand, derLight } = Colors;
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import Constants from "expo-constants";
import { LOGIN } from "../../redux/User";
import { Overlay } from "react-native-elements";
import { styles } from "./SLogin";
import { SETLOADING } from "../../redux/Properties";

const StatusBarHeight = Constants.statusBarHeight;

const Login = ({ navigation }) => {
  ////
  const dispatch = useDispatch();
  ////
  const [hidePassword, setHidePassword] = useState(true);
  const loading = useSelector((state) => state.properties.loading);

  const LOgin = async (values, formikActions) => {
    dispatch(SETLOADING({ loading: true }));
    const cleanEmail = values.email.trim().toLowerCase();
    const cleanData = { email: cleanEmail, password: values.password };
    API.post("/user/login", { ...cleanData })
      .then(async (response) => {
        const newUser = response.data.user;
        dispatch(SETLOADING({ loading: false }));
        dispatch(
          LOGIN({
            token: response.data.token,
            username: newUser.username,
            isAdmin: newUser.isAdmin,
            myAdmin: newUser.myAdmin,
          })
        );
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("username", newUser.username);
        await AsyncStorage.setItem(
          "isAdmin",
          newUser.isAdmin == true ? "1" : "0"
        );
        await AsyncStorage.setItem("myAdmin", newUser.myAdmin);
      })
      .catch((err) => {
        dispatch(SETLOADING({ loading: false }));
        console.log(err);
      });
  };

  return (
    <View style={{ height: "100%", paddingTop: StatusBarHeight }}>
      <StatusBar style="dark" />
      <InnerContainer>
        <Header />
        <View style={styles.main}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          ></ImageBackground>

          <Animated.ScrollView
            style={{ width: "100%" }}
          >
            <View style={{ paddingTop: 200, width: "100%",display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={LOgin}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <StyledFormArea>
                    <MyTextInput
                      label="כתובת מייל"
                      icon="mail"
                      placeholder="אימייל"
                      placeholderTextColor={derLight}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keboardType="email-address"
                    />
                    <MyTextInput
                      label="סיסמא"
                      icon="lock"
                      placeholder="סיסמא"
                      placeholderTextColor={derLight}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry={hidePassword}
                      isPassword={true}
                      hidePassword={hidePassword}
                      setHidePassword={setHidePassword}
                    />
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>התחברי</ButtonText>
                    </StyledButton>
                    <Line />

                    <ExtraView style={{ direction: "rtl" }}>
                      <ExtraText>עוד לא נרשמת?</ExtraText>
                      <TextLinkContent
                        onPress={() => navigation.navigate("SignUp")}
                      >
                        {" "}
                        הירשמי{" "}
                      </TextLinkContent>
                      <TextLink></TextLink>
                    </ExtraView>
                  </StyledFormArea>
                )}
              </Formik>
            </View>
          </Animated.ScrollView>
        </View>

        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
          animating={loading}
        />
      </InnerContainer>
    </View>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPressIn={() => setHidePassword(!hidePassword)}
          onPressOut={() => setHidePassword(!hidePassword)}
        >
          <Ionicons
            size={30}
            color={derLight}
            name={hidePassword ? "md-eye-off" : "md-eye"}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;

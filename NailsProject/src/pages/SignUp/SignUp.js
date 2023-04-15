import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Platform,
  Alert,
} from "react-native";
import { Formik, ErrorMessage } from "formik";
import Constants from "expo-constants";
const StatusBarHeight = Constants.statusBarHeight;
import Header from "../../components/Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../../styles/styles";
import { View } from "react-native";
import API from "../../api/api";
import { LOGIN } from "../../redux/User";
import { LinearGradient } from "expo-linear-gradient";
const { brand, derLight } = Colors;
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { styles } from "./SSignUp";
import colors from "../../styles/colors";

const phoneRegExp = /((05)[0-9]*)$/;
const validationSchema = yup.object().shape({
  name: yup.string().required("הכניסי שם").min(3, "לא מספיק אותיות בשם!"),
  email: yup.string().email("אימייל לא חוקי").required("Required"),
  password: yup
    .string()
    .min(6, "סיסמא חייבת להכיל 6 תוים לפחות")
    .required("הכניסי סיסמא"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "אימות סיסמא אינו תואם")
    .required("הכניסי אימות סיסמא"),
  phone: yup
    .string()
    .required("הכניסי מספר פלאפון")
    .min(10, "מספר טלפון קצר מידי")
    .max(10, "מספר טלפון ארוך מידי")
    .matches(phoneRegExp, "מספר הטלפון שגוי"),
});

const SignUp = ({ navigation }) => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const [thinking, setThinking] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [dob, setDob] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === "android") setShow(false);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow("true");
  };

  const signup = async (values, formikActions) => {
    setThinking(true);

    API.post("/user/register", {
      username: values.name,
      email: values.email.trim().toLowerCase(),
      password: values.password,
      birthDay: dob,
      phone: values.phone,
      myAdmin: user.myAdmin,
    })
      .then(response => {
        setThinking(false);
        if (!response.data.token) {
          showAlertSignOut("האימייל כבר קיים במערכת");
        } else {
          AsyncStorage.setItem("token", response.data.token);
          const newUser = response.data.user;
          dispatch(
            LOGIN(
              newUser._id,
              newUser.username,
              newUser.email,
              newUser.phone,
              newUser.queues,
              newUser.isAdmin
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setThinking(false);
      });
  };

  const showAlertSignOut = (err) => {
    Alert.alert("בעיה", err, [{ text: "הבנתי" }]);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBarHeight,
        // paddingTop: 45,
        backgroundColor: "white",
      }}
    >
      <Header />
     

      <ScrollView>
        <StyledContainer style={{ paddingTop: 160 }}>
          <StatusBar style="dark" />
          <InnerContainer>
            <Formik
              initialValues={{
                name: "",
                dateOfBirth: Date,
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={signup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="שם מלא"
                    icon="person"
                    placeholder="שם"
                    placeholderTextColor={derLight}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {touched.name && errors.name ? (
                    <View>
                      <Text style={styles.error}>
                        {touched.name && errors.name}
                      </Text>
                    </View>
                  ) : null}
                  {/* <MyTextInput
                    label="תאריך לידה"
                    icon="calendar"
                    placeholder="YYYY - MM - DD"
                    placeholderTextColor={derLight}
                    onChangeText={handleChange("dateOfBirth")}
                    onBlur={handleBlur("dateOfBirth")}
                    value={dob ? dob.toDateString() : ""}
                    isDate={true}
                    editable={false}
                    showDatePicker={showDatePicker}
                  />

                  {show && Platform.OS === "android" && (
                    <DateTimePicker
                      locale="he-HE"
                      style={{ width: "100%" }}
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      onChange={onChange}
                    />
                  )}
                  {show && Platform.OS === "ios" && (
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <DateTimePicker
                          locale="he-HE"
                          style={{ width: "100%" }}
                          testID="dateTimePicker"
                          value={date}
                          mode="date"
                          is24Hour={true}
                          display="spinner"
                          onChange={onChange}
                        />
                        <LinearGradient
                          colors={["#FFE2E2", "#fad4d4", "#e8b7b7"]}
                          locations={[0.0, 0.5, 1.0]}
                          style={[styles.button, styles.buttonOpen]}
                        >
                          <TouchableOpacity onPress={() => setShow(false)}>
                            <Text>סגור</Text>
                          </TouchableOpacity>
                        </LinearGradient>
                      </View>
                    </View>
                  )} */}
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
                  {touched.email && errors.email ? (
                    <View>
                      <Text style={styles.error}>
                        {touched.email && errors.email}
                      </Text>
                    </View>
                  ) : null}
                  <MyTextInput
                    label="טלפון"
                    icon="broadcast"
                    placeholder="מספר טלפון"
                    placeholderTextColor={derLight}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    keboardType="phone"
                  />
                  {touched.phone && errors.phone ? (
                    <Text style={styles.error}>
                      {touched.phone && errors.phone}
                    </Text>
                  ) : null}
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
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>
                      {touched.password && errors.password}
                    </Text>
                  ) : null}
                  <MyTextInput
                    label="אימות סיסמא"
                    icon="lock"
                    placeholder="אימות סיסמא"
                    placeholderTextColor={derLight}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={hidePassword1}
                    isPassword1={true}
                    hidePassword1={hidePassword1}
                    setHidePassword1={setHidePassword1}
                  />
                  <Text style={styles.error}>
                    {touched.confirmPassword && errors.confirmPassword}
                  </Text>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.accept}
                  >
                    <Text>הרשמי</Text>
                  </TouchableOpacity>

                  <Line />

                  <ExtraView style={{ direction: "rtl" }}>
                    <ExtraText>כבר יש לך חשבון?</ExtraText>
                    <TextLinkContent
                      onPress={() => navigation.navigate("Login")}
                    >
                      {" "}
                      התחברי{" "}
                    </TextLinkContent>
                    <TextLink></TextLink>
                  </ExtraView>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
          animating={thinking}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  isPassword1,
  hidePassword,
  hidePassword1,
  setHidePassword,
  setHidePassword1,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {isDate && (
        <TouchableOpacity onPress={() => showDatePicker()}>
          <View style={styles.ddate}>
            <Text style={{ color: "#9ca3af", textAlign: "center" }}>
              {props.value}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {!isDate && <StyledTextInput {...props} />}
      {isPassword && (
        <RightIcon
          onPressIn={() => setHidePassword(!hidePassword)}
          onPressOut={() => setHidePassword(!hidePassword)}
        >
          <Ionicons size={30} color={derLight} name={"md-eye-off"} />
        </RightIcon>
      )}
      {isPassword1 && (
        <RightIcon
          onPressIn={() => setHidePassword1(!hidePassword1)}
          onPressOut={() => setHidePassword1(!hidePassword1)}
        >
          <Ionicons size={30} color={derLight} name={"md-eye-off"} />
        </RightIcon>
      )}
    </View>
  );
};

export default SignUp;

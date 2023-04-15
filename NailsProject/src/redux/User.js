import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: '',
  username: '',
  isAdmin: false,
  isAuth: false,
  myAdmin: ''
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
      state.isAuth = true;
      state.myAdmin = action.payload.myAdmin;
    },
    LOGOUT:(state) => {
      state.token = '';
      state.username = '';
      state.isAuth = false;
      state.isAdmin = false;
      state.myAdmin = '';
      AsyncStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer;

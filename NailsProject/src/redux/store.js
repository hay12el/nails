//@ts-ignore
import { configureStore } from '@reduxjs/toolkit'
//@ts-ignore
import userSlice from "../redux/User"
import Properties from '../redux/Properties'

export default store = configureStore({
  reducer: {
    user: userSlice,
    properties: Properties
  },
})
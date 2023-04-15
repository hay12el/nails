//@ts-ignore
import { configureStore } from '@reduxjs/toolkit'
//@ts-ignore
import userSlice from "../redux/User"

export default store = configureStore({
  reducer: {
    user: userSlice,
  },
})
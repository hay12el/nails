import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SECTIONS = [
  {
    key: "1",
    text: "פאני באני",
    uri: "https://www.lady-nails.co.il/wp-content/uploads/2020/06/%D7%9C%D7%A7-%D7%92%D7%9C-12.jpg",
  },
  {
    key: "2",
    text: "סגול מטאלי",
    uri: "https://www.lady-nails.co.il/wp-content/uploads/2020/11/nails5.jpg",
  },

  {
    key: "3",
    text: "לבן פנינה",
    uri: "https://biosculpture.co.il/wp-content/uploads/2021/03/%D7%9E%D7%95%D7%A1%D7%9C%D7%9E%D7%99%D7%95%D7%AA-%D7%9C%D7%A7-%D7%92%D7%9C.jpg",
  },
  {
    key: "4",
    text: "תכלת אפרפר",
    uri: "https://www.lady-nails.co.il/wp-content/uploads/2020/11/nails2.jpg",
  },
  {
    key: "5",
    text: "משולב",
    uri: "https://www.lady-nails.co.il/wp-content/uploads/2020/11/nails6.jpg",
  },
];

const initialState = {
  aboutMe: `אני עושה לק ג'ל עם מניקור בתשומת לב מירבית - אשמח לקבל אתכן ולעזור לשמור על הציפורניים שלכן יפות ומטופחות לאורך זמן.`,
  photos: SECTIONS,
  Linkim: {
    wase: "https://ul.waze.com/ul?ll=31.24937992%2C34.78982806&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
    whatsapp: "https://wa.me/+972545806799",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/en/",
  },
};

export const propertiesSlice = createSlice({
  name: "Properties",
  initialState,
  reducers: {
    SETPROPERTIES: (state, action) => {
      state = action.payload.properties;
    },
    SETPHOTOS: (state, action) => {
      state.photos = action.payload.photos;
    },
    SETLINKIM: (state, action) => {
      state.Linkim = action.payload.linkim;
    },
    SETABOUTME: (state, action) => {
        state.aboutMe = action.payload.aboutMe;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SETPROPERTIES, SETPHOTOS, SETLINKIM, SETABOUTME } = propertiesSlice.actions;
export default propertiesSlice.reducer;

//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://7f4e-87-70-169-97.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;

//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://10a6-2a02-14f-1f1-7f7b-e168-a1f9-9923-3559.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;

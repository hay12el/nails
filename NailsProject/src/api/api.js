//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://8376-2a02-14f-80-822f-e0d6-adda-9da5-ff7b.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;

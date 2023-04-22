//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://c4be-2a02-14f-80-822f-5504-72f9-48a7-8f4b.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;

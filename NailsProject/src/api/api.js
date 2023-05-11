//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://f06a-2a06-c701-4e62-f300-1000-f26b-814a-fb48.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;

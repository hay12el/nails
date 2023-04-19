//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://c17e-2a06-c701-4e65-4400-cd0d-a9a8-b272-8d7f.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;

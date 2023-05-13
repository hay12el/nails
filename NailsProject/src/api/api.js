//@ts-ignore
import axios from "axios";
const API = axios.create({
  baseURL: "https://ab67-2a06-c701-4e62-f300-c99e-99ef-e121-40ba.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default API;

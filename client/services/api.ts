import axios from "axios";

export const api = axios.create({
baseURL: "http://192.168.0.20:3001",
timeout: 5000,
headers: {
    "Content-Type": "application/json",
},
});

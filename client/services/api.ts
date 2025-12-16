import axios from "axios";

export const api = axios.create({
baseURL: "http://172.18.160.1:3001",
timeout: 5000,
headers: {
    "Content-Type": "application/json",
},
});

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",  // JSON-Server URL
  timeout: 5000
});

export default api;

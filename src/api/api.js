import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000" || process.env.REACT_APP_API_URL,
});

export default API;

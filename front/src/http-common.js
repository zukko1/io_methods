import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3200",
  headers: {
    "Content-Type": "application/json"
  }
});
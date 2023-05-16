import axios from "axios";

export default axios.create({
  baseURL: "https://nn7s7vbhih.execute-api.ap-southeast-1.amazonaws.com/dev",
  headers: {
    "Content-type": "application/json",
  },
});

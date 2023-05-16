import axios from "axios";
import http from "../http-common";

const upload = async (signURL, file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  const response = await axios.put(signURL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(response);
};

const getURL = async (fileName) => {
  const response = await http.get(`/get-url?key=${fileName}`);
  console.log(response)
  const signURL = response.data;
  return signURL;
};

const health = () => {
  return http.get("/health");
};

const FileUploadService = {
  upload,
  getURL,
  health,
};

export default FileUploadService;

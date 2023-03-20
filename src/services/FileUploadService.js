import http from "../http-common";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/files");
};

const health = () => {
  return http.get("/health");
};

const FileUploadService = {
  upload,
  getFiles,
  health
};

export default FileUploadService;

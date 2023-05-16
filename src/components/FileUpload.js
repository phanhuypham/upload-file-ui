import React, { useState, useEffect } from "react";
import UploadService from "../services/FileUploadService";

const UploadFiles = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const [signURL, setSignURL] = useState("");

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    getSignURL(event.target.files[0].name);
  };

  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(signURL, currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        return UploadService.getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  };

  const getSignURL = async (fileName) => {
    const newSignURL = await UploadService.getURL(fileName);
    console.log(newSignURL);
    setSignURL(newSignURL);
  };
  return (
    <div>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      <label className="btn btn-default">
        <input type="file" onChange={selectFile} />
      </label>

      <button
        className="btn btn-success"
        disabled={!selectedFiles || !signURL}
        onClick={upload}
      >
       (ノಠ益ಠ)ノ彡Upload 
      </button>

      {/* <button
        className="btn btn-success"
        onClick={getSignURL}
      >
        Get URL
      </button> */}

      <div className="alert alert-light" role="alert">
        {signURL ? "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ URL:" : ""} {signURL}
      </div>
    </div>
  );
};

export default UploadFiles;

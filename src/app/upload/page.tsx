"use client"
import React, { useState, useCallback } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useDropzone } from "react-dropzone";
import "./styles.css";

const Upload = () => {
  const [image, setImage] = useState({});
  const [progressbar, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    simulateProgress()
    console.log(acceptedFiles);
  }, []);

  function simulateProgress() {
    var value = 0;
    var interval = setInterval(function () {
      if (value <= 100) {
        setProgress(value=> value+10)
      
      } else {
        clearInterval(interval);
        // Reset the progress bar after completion
        setTimeout(function () {
            setProgress(0)
          
        }, 1000);
      }
    }, 1000); // Adjust the interval as needed
  }



  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function parseFile(file) {
    // ... your existing parseFile function
    simulateProgress();

  }

  const uploadFile = () => {
    // ... your existing uploadFile function
  };

  return (
    <div className="main-container"> 
    
        <div className="container">
        <h2>Upload the CSV files</h2>

        <div id="file-upload-form" className="uploader">
            <div
            {...getRootProps()}
            id="file-drag"
            className={`${
                isDragActive ? "drag-active" : ""
            }`}
            >
            <input
                {...getInputProps()}
                id="file-upload"
                type="file"
                name="fileUpload"
                accept="image/*"
            />
            <img
                id="file-image"
                src="#"
                alt="Preview"
                className="hidden"
            />
            <div id="start">
                <i className="fa fa-download" aria-hidden="true"></i>
                <div>
                {isDragActive ? "Drop the file here" : "Select a file or drag here"}
                </div>
                <div id="notimage" className="hidden">
                Please select an image
                </div>
                <span id="file-upload-btn" className="btn btn-primary">
                Select a file
                </span>
            </div>
            <div id="response" >
                <div id="messages"></div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                <LinearProgress
                    variant="determinate"
                    style={{ width: "80%" }}
                    value={progressbar}
                />
                </div>
            </div>
            </div>
            <button
            onClick={uploadFile}
            id="Submit_Button"
            className="btn btn-primary hidden"
            >
            Submit
            </button>
        </div>
        </div>
    </div>
  );
};

export default Upload;

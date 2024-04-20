/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/fITlhHMHZZy
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiUpload, FiCheckCircle } from "react-icons/fi";

export function Emails() {
  const [txtFile, setTxtFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile.type === "text/plain") {
      handleFile(droppedFile);
    } else {
      alert("Please drop a .txt file.");
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile.type === "text/plain") {
      handleFile(uploadedFile);
    } else {
      alert("Please upload a .txt file.");
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setTxtFile(text);
      setIsUploaded(true); // Set upload status to true when file is uploaded
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (!isUploaded) {
      // If file is not uploaded, show alert to upload file first
      alert("Please upload a .txt file first.");
      return;
    }

    if (txtFile) {
      const jsonContent = {
        txtFile: txtFile
      };
      console.log("Text file saved:", jsonContent);
      setShowPopup(true); // Show popup after saving the file
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div>
        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="font-bold">Upload Your Emails</div>
            <div>Drag and drop your emails and click the upload button to submit.</div>
          </div>
          <div>
            <br />
          </div>
          <div>
            <div
              className="flex h-16 w-100 items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 py-10 transition-colors hover:border-gray-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {isUploaded ? (
                <div className="text-center">
                  <FiCheckCircle className="mx-auto h-15 w-15 text-green-500" />
                  <p className="mt-2 text-sm font-medium text-green-500">File Uploaded</p>
                </div>
              ) : (
                <div className="text-center">
                  <FiUpload className="mx-auto h-15 w-15 text-gray-400" />
                  <p className="mt-2 text-sm font-medium text-gray-900">Drag and drop your emails .txt</p>
                  <p className="mt-1 text-sm text-gray-500">or click to upload</p>
                  <input type="file" onChange={handleFileUpload} className="hidden" accept=".txt" />
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <br />
            </div>
            <Button className="w-full mx-auto bg-black text-white" variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p className="text-lg font-semibold text-center">Emails Saved</p>
            <p className="text-sm text-gray-600 mt-2">Your emails have been successfully saved.</p>
            <Button
              className="w-full mt-4 bg-black text-white"
              variant="primary"
              onClick={() => setShowPopup(false)}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
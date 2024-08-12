// FileUpload.js
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../Firebase';

const FileUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError("Upload failed: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (onUploadComplete) {
            onUploadComplete(downloadURL);
          }
          setFile(null); // Reset the file input after upload
          setProgress(0); // Reset progress after upload
          setError(''); // Reset error after upload
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {progress > 0 && <progress value={progress} max="100" />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;

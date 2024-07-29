import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/Button'; 

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        onUploadSuccess(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <Button variant="default" onClick={handleFileUpload}>
        Upload
      </Button>
    </div>
  );
};

export default FileUpload;

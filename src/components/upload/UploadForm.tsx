import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, Loader } from 'lucide-react';
import { uploadPdf } from '../../services/api';

const UploadForm: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const selectedFile = acceptedFiles[0];
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setError('Please upload a valid PDF file.');
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await uploadPdf(formData);
      
      if (response.data) {
        localStorage.setItem('resultData', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        throw new Error('Failed to analyze the PDF');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while uploading. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div id="upload-section" className="card p-8 animate-slide-up">
      <h2 className="text-2xl font-semibold mb-6 text-center">Upload Result PDF</h2>
      
      <form onSubmit={handleSubmit}>
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
            ${file ? 'bg-green-50 border-green-400' : ''}`}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="text-center py-4">
              <Loader className="h-12 w-12 text-primary-600 mx-auto animate-spin" />
              <p className="mt-2 text-gray-600">Uploading and analyzing...</p>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center py-4">
              <FileType className="h-12 w-12 text-green-600 mb-2" />
              <p className="text-lg font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-lg text-gray-600">
                {isDragActive ? 'Drop the file here' : 'Drag & drop your PDF file here'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse
              </p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        
        <div className="flex justify-center">
          <button 
            type="submit"
            disabled={!file || isUploading}
            className={`btn btn-primary flex items-center ${!file || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{isUploading ? 'Analyzing...' : 'Analyze Result'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
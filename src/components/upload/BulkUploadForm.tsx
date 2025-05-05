import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, Loader, X } from 'lucide-react';
import { uploadPdf } from '../../services/api';

const BulkUploadForm: React.FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const validFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    
    if (validFiles.length !== acceptedFiles.length) {
      setError('Some files were rejected. Please upload only PDF files.');
    }
    
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true
  });
  
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setError('Please select at least one file to upload.');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      const results = [];
      
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await uploadPdf(formData);
        if (response.data) {
          results.push(response.data);
        }
      }
      
      localStorage.setItem('bulkResultData', JSON.stringify(results));
      navigate('/dashboard');
    } catch (error) {
      console.error('Error uploading files:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while uploading. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="card p-8 animate-slide-up">
      <h2 className="text-2xl font-semibold mb-6 text-center">Bulk Upload Result PDFs</h2>
      <h3 className="text-2xl font-semibold mb-6 text-center">This Feature is in development use Single Upload Instead</h3>
      
      <form onSubmit={handleSubmit}>
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
            ${files.length > 0 ? 'bg-green-50 border-green-400' : ''}`}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="text-center py-4">
              <Loader className="h-12 w-12 text-primary-600 mx-auto animate-spin" />
              <p className="mt-2 text-gray-600">Uploading and analyzing files...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <Upload className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-lg text-gray-600">
                {isDragActive ? 'Drop the files here' : 'Drag & drop your PDF files here'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse
              </p>
            </div>
          )}
        </div>
        
        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <FileType className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        
        <div className="flex justify-center">
          <button 
            type="submit"
            disabled={files.length === 0 || isUploading}
            className={`btn btn-primary flex items-center ${files.length === 0 || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{isUploading ? 'Analyzing...' : 'Analyze Results'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkUploadForm;
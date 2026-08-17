import React, { useState, useRef } from 'react';
import { Upload, X, File, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string; // e.g. "image/*"
  maxSizeMB?: number;
  label?: string;
}

export function FileUpload({ onFileSelect, acceptedTypes = "*", maxSizeMB = 5, label = "Upload File" }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setError(null);
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File exceeds maximum size of ${maxSizeMB}MB`);
      return;
    }
    
    setFile(selectedFile);
    onFileSelect(selectedFile);
    
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-text mb-2">{label}</label>}
      
      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-surface'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            className="hidden" 
            accept={acceptedTypes} 
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-cream rounded-full text-primary">
              <Upload size={24} />
            </div>
          </div>
          <p className="text-text font-medium mb-1">Click to browse or drag and drop</p>
          <p className="text-muted text-xs">Supported formats: {acceptedTypes === '*' ? 'Any' : acceptedTypes} (Max {maxSizeMB}MB)</p>
        </div>
      ) : (
        <div className="border border-border rounded-xl p-4 flex items-center gap-4 bg-surface shadow-sm">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-cream flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <File className="text-primary" size={24} />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text truncate">{file.name}</p>
            <p className="text-xs text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          
          <button 
            onClick={removeFile}
            className="p-2 text-muted hover:text-danger hover:bg-danger/10 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
      {error && <p className="text-danger text-xs mt-2">{error}</p>}
    </div>
  );
}

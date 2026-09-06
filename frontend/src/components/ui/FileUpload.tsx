import React, { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';

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
      {label && <label className="block text-xs font-semibold text-[#2D3A34] mb-2">{label}</label>}
      
      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 bg-[#F7FAF8] ${
            isDragging 
              ? 'border-[#087F5B] bg-[#087F5B]/5 shadow-sm' 
              : 'border-[#E5ECE8] hover:border-[#087F5B]/50 hover:bg-emerald-50/20'
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
          <div className="flex justify-center mb-3">
            <div className="p-3.5 bg-emerald-100/70 border border-emerald-200 rounded-2xl text-[#087F5B] shadow-xs">
              <Upload size={22} />
            </div>
          </div>
          <p className="text-[#17201C] font-semibold text-sm mb-1">Click to browse or drag and drop</p>
          <p className="text-gray-500 text-xs">Supported formats: {acceptedTypes === '*' ? 'Any' : acceptedTypes} (Max {maxSizeMB}MB)</p>
        </div>
      ) : (
        <div className="border border-[#E5ECE8] rounded-2xl p-4 flex items-center gap-4 bg-white shadow-sm">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#F7FAF8] border border-[#E5ECE8] flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <File className="text-[#087F5B]" size={24} />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#17201C] truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          
          <button 
            type="button"
            onClick={removeFile}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}


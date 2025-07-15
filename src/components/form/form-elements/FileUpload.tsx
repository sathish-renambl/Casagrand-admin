import React, { useState, useCallback, useRef } from 'react';
import { X, File, Image, FileText, Download } from 'lucide-react';
// import { Modal } from '../../ui/modal';
// import FileUploadModal from '../../common/FileUpload';
//import { useModal } from '../../../hooks/useModal';

interface UploadedFile extends File {
  id: string;
  preview?: string;
}

interface FileUploadDropzoneProps {
  maxFileSize?: number; // in MB
  maxFiles?: number;
  acceptedFileTypes?: string[];
  title?: string;
  description?: string;
  onFilesChange?: (files: UploadedFile[]) => void;
  disabled?: boolean;
  className?: string;
}

const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  maxFileSize = 10,
  maxFiles = 1,
  acceptedFileTypes = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  title = "File Upload",
  description = "Support for PNG, JPG, WebP, SVG images, PDF documents, and text files.",
  onFilesChange,
  disabled = false,
  className = ""
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  // Update files state and notify parent
  const updateFiles = (newFiles: UploadedFile[]) => {
    setUploadedFiles(newFiles);
    onFilesChange?.(newFiles);
    
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      alert(`File type ${file.type} is not supported`);
      return false;
    }
    
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`File ${file.name} is too large. Maximum size is ${maxFileSize}MB`);
      return false;
    }
    
    return true;
  };

  const processFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: UploadedFile[] = [];

    // Check max files limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    fileArray.forEach(file => {
      if (validateFile(file)) {
        const fileWithId = Object.assign(file, {
          id: Math.random().toString(36).substring(7),
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        });
        validFiles.push(fileWithId);
      }
    });
    
    if (validFiles.length > 0) {
      const newFiles = [...uploadedFiles, ...validFiles];
      updateFiles(newFiles);
    }
  }, [uploadedFiles, maxFiles, validateFile, updateFiles]);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  // File input handler
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [processFiles]);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileId: string) => {
    const newFiles = uploadedFiles.filter(f => {
      if (f.id === fileId) {
        if (f.preview) {
          URL.revokeObjectURL(f.preview);
        }
        return false;
      }
      return true;
    });
    updateFiles(newFiles);
  };

  const clearAllFiles = () => {
    uploadedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    updateFiles([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (fileType === 'application/pdf') return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  return (
    <>
    <div className={`w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{title}</h2>
      
      {/* Dropzone Area */}
      <div className="mb-8">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={disabled ? undefined : handleBrowseClick}
          className={`
            relative border-2 border-dashed rounded-xl p-8 lg:p-12 transition-all duration-200 
            ${disabled 
              ? 'cursor-not-allowed opacity-50 border-gray-200 dark:border-gray-600' 
              : `cursor-pointer ${isDragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105' 
                : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.webp,.svg,.pdf,.txt,.doc,.docx"
            onChange={handleFileInput}
            disabled={disabled}
            className="hidden"
          />
          
          <div className="flex flex-col items-center text-center">
            {/* Upload Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
              {isDragActive ? 'Drop your files here' : 'Drag & drop your files here'}
            </h3>
            
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              {description} Max file size: {maxFileSize}MB
            </p>
            
            <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Browse Files
            </span>
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Uploaded Files ({uploadedFiles.length})
          </h3>
          
          <div className="grid gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* File Preview/Icon */}
                <div className="flex-shrink-0 mr-4">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                  </p>
                </div>

                {/* Upload Status */}
                <div className="flex-shrink-0 mr-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Uploaded
                  </span>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} selected
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={clearAllFiles}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
      
       {/* File Upload Modal */}

        
    </div>
    
</>

  );
  
};


export default FileUploadDropzone;
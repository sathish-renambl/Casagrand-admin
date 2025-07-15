import React from "react";
import { useLogOut } from "../../hooks/useLogOut";
import { useAppContext } from "../../context/appContext";
import { toast } from "react-toastify";
import Button from "../ui/button/Button";


type Props = {
  docuName?:string;
  onClose: () => void ;
  uploadedValue: (value: any) => void;
  selectedFiles: File | undefined; // 👈 add this
};

const FileUploadModal: React.FC<Props> = ({onClose,uploadedValue,selectedFiles}) => {
  const token = localStorage.getItem('token')
  const {URL} = useAppContext()
  //const fileInputRef = useRef<HTMLInputElement | null>(null);
 
 

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selected = e.target.files?.[0];
  //   if (selected) setFile(selected);
  // };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    const formData = new FormData();
    formData.append("file", selectedFiles);
    console.log(selectedFiles)
    try {
        if(!token){
            useLogOut()
        }
        console.log(token)
      const response = await fetch(`${URL}internal/upload`, {
        method:"POST",
        headers:{  Authorization: `Bearer ${token}`} ,
        body:formData
      });

      if(response.status === 200){
        
        toast.success("File Upload successful!")
        const data = await response.json()
        console.log(data.file_url)
        uploadedValue(data.file_url)
        onClose()
      }
      else{
        toast.error("File Upload failed!")
      }
      
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
        {/* <h2 className="font-extrabold text-3xl mt-10">File Upload</h2>
      <div
        className="border-2 mt-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Label>{docuName}</Label>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleChange}
        />
        <p className="text-gray-600">Click to select file</p>
      </div>
      {file && (
        <div className="mt-4 text-sm text-gray-700">Selected: {file.name}</div>
      )} */}
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h2 className="text-xl font-semibold mb-4">Confirm Upload</h2>

      <div className="mb-6 w-full space-y-3">
        
          <div className="p-3 border rounded-lg text-sm text-gray-700 bg-gray-50">
            <p><strong>Name:</strong> {selectedFiles?.name}</p>
            <p><strong>Size:</strong> {selectedFiles?.size &&(selectedFiles?.size / 1024).toFixed(2)} KB</p>
            <p><strong>Type:</strong> {selectedFiles?.type}</p>
          </div>
       
      </div>

      <div className="flex space-x-4">
        <Button  onClick={handleUpload}>Confirm</Button>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </div>


      
      
      
    </div>
  );
};

export default FileUploadModal;

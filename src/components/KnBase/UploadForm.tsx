import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//import Button from "../ui/button/Button";
//import { PlusCircle } from "lucide-react";
//import { Modal } from "../ui/modal";
//import { useModal } from "../../hooks/useModal";
//import FileUpload from "../common/FileUpload";
import { useState } from "react";
//import FileUploadModal from "../common/FileUpload";

// const documentSchema = z.object({
//   knId: z.string().optional(),
//   knName: z.string().min(1, "Document name is required"),
//   knDescription: z.string().optional(),
//   knType: z.enum(["TEXT", "URL"]).default("URL"),
//   knText: z.string().optional().refine((val, ctx) => {
//     const knType = ctx.parent.knType;
//     if (knType === "TEXT" && (!val || val.trim() === "")) {
//       return false;
//     }
//     return true;
//   }, {
//     message: "Text is required when knType is TEXT",
//     path: ["knText"],
//   }),
//   files: z
//     .any()
//     .optional()
//     .refine((val, ctx) => {
//       const knType = ctx.parent.knType;
//       if (knType === "URL") {
//         if (!val || !Array.isArray(val) || val.length === 0) {
//           return false;
//         }
//         if (val.length > 1) {
//           return false;
//         }
//       }
//       return true;
//     }, {
//       message: "A single file is required when knType is URL",
//       path: ["files"],
//     }),
// });


const documentSchema = z.object({
  knId: z.string().optional(),
  knName: z.string().min(1, "Document name is required"),
  knDescription: z.string().optional(),
  knStatus: z.string().optional(),
  files: z
    .array(z.instanceof(File))
    .max(1, "You can upload a maximum of 1 file")
    .optional(),
  knType: z.enum(["TEXT", "URL"]),
  knText: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.knType === "TEXT") {
    if (!data.knText || data.knText.trim() === "") {
      ctx.addIssue({
        path: ["knText"],
        code: z.ZodIssueCode.custom,
        message: "Text is required when knType is TEXT",
      });
    }
  }

  // if (data.knType === "URL") {
  //   if (!url|| url=== '') {
  //     ctx.addIssue({
  //       path: ["files"],
  //       code: z.ZodIssueCode.custom,
  //       message: "File is required when knType is URL",
  //     });
  //   }
  // }
});

type DocumentFormValues = z.infer<typeof documentSchema>;

interface Props {
  formData?: Partial<DocumentFormValues>;
  onSubmit: (data: DocumentFormValues) => void;
  handleClose: () => void;
    updateFlag?: boolean; // Optional prop to indicate if this is an update form
}



export function DocumentUploadForm({ formData, onSubmit, handleClose ,updateFlag=false}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
  } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: { knType: "URL", ...formData },
  });
  //const {isOpen,openModal,closeModal} = useModal()
  const [url,setUrl] = useState('')
  const knType = watch("knType");
  const knId = getValues("knId");

  //  function handleUpdate(value:any){
  //     setUrl(value)
  //     console.log(value)
  //  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
    
  //   // Clear previous file errors
  //   clearErrors("files");
    
  //   if (files && files.length > 0) {
  //     const fileArray = Array.from(files);
  //     const allowed = [".pdf", ".docx"];
  //     const maxSize = 5 * 1024 * 1024; // 5MB

  //     const file = fileArray[0];
  //     const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      
  //     if (!allowed.includes(ext)) {
  //       setError("files", { message: "Only .pdf and .docx files are allowed" });
  //       e.target.value = ""; // Clear the input
  //       return;
  //     }
      
  //     if (file.size > maxSize) {
  //       setError("files", { message: "File size must be less than 5MB" });
  //       e.target.value = ""; // Clear the input
  //       return;
  //     }

  //     setValue("files", fileArray, { shouldValidate: true });
  //   } else {
  //     // If no files selected, clear the files value
  //     setValue("files", undefined, { shouldValidate: true });
  //   }
  // };

  const handleFormSubmit: Parameters<ReturnType<typeof useForm<DocumentFormValues>>["handleSubmit"]>[0] = (data) => {
    // Additional validation before submission
    if (data.knType === "TEXT" && (!data.knText || data.knText.trim() === "")) {
      setError("knText", { message: "Text is required when knType is TEXT" });
      return;
    }
    
    if (data.knType === "URL" && (!url || url === '')) {
      console.log('inside submit',url)
      setError("files", { message: "A single file is required when knType is URL" });
      return;
    }
  
    onSubmit(data);
  };

  const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const selectStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const textareaStyle = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const errorStyle = "text-red-500 text-sm mt-1";
  const buttonStyle = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <>
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      {!knId && (
        <div>
          <label className={labelStyle}>Type</label>
          <select {...register("knType")} className={selectStyle} disabled={updateFlag}>
            <option value="TEXT">Text</option>
            <option value="URL">URL</option>
          </select>
          {errors.knType && <p className={errorStyle}>{errors.knType.message}</p>}
        </div>
      )}

      {knType === "URL" ? (
        <div>
          <label className={labelStyle}>Upload File</label>
          <input 
            type="file" 
            accept=".pdf,.docx" 
            // onChange={handleFileChange}
            className={inputStyle}
          />
          {/*  <button type='button' className="p-2 flex flex-row gap-1 rounded-2xl border-2" onClick={()=>{openModal()}}><PlusCircle/> Upload</button>
          <p className="text-xs text-gray-500 mt-1">
            {url === ' '?  "Maximum file size: 5MB. Allowed formats: PDF, DOCX ":url}
           
          </p>
          */}
          {errors.files && <p className={errorStyle}>{errors.files.message as string}</p>}
        </div>
      ) : (
        <div>
          <label className={labelStyle}>Text Content</label>
          <textarea
            {...register("knText")}
            maxLength={2000}
            placeholder="Enter your text content here"
            className={`${textareaStyle} min-h-[120px]`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum 2000 characters
          </p>
          {errors.knText && <p className={errorStyle}>{errors.knText.message}</p>}
        </div>
      )}

     {updateFlag &&  <div>
          <label className={labelStyle}>knStatus</label>
          <select {...register("knStatus")} className={selectStyle} >
            <option value="PROCESSING">Processing</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
          </select>
          {errors.knType && <p className={errorStyle}>{errors.knType.message}</p>}
        </div>}

      <div>
        <label className={labelStyle}>Document Name *</label>
        <input 
          {...register("knName")} 
          placeholder="Enter document name"
          className={inputStyle}
        />
        {errors.knName && <p className={errorStyle}>{errors.knName.message}</p>}
      </div>

      <div>
        <label className={labelStyle}>Description</label>
        <input 
          {...register("knDescription")} 
          placeholder="Enter description (optional)"
          className={inputStyle}
        />
        {errors.knDescription && <p className={errorStyle}>{errors.knDescription.message}</p>}
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <button 
          type="button" 
          onClick={handleClose}
          className={`${buttonStyle} bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500`}
        >
          Cancel
        </button>
        <button 
          type="submit"
          className={`${buttonStyle} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`}
        >
          Upload
        </button>
      </div>
       
    </form>
    {/* <Modal isOpen={isOpen} onClose={()=>closeModal()} className='bg-white rounded-lg shadow-xl max-w-xl  h-[350px] flex flex-col'>
                  <FileUploadModal selectedFiles={} onClose={( )=> closeModal()} uploadedValue={(value:any)=>handleUpdate(value)} />
                </Modal> */}
    </>
  );
}
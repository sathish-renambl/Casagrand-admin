import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { companySchema, companyFormFields } from "./formConfig"; 
import * as yup from "yup";
import Label from "../../components/form/Label";
// import Select from '../../components/form/Select';
// import DropzoneComponent from "../../components/form/form-elements/DropZone";
// import { useDropzone } from "react-dropzone";
import FileUploadDropzone from "../form/form-elements/FileUpload";
import { Modal } from "../ui/modal";
//import FileUpload from "../common/FileUpload";
import { useModal } from "../../hooks/useModal";
// import Button from "../ui/button/Button";
// import { PlusCircle } from "lucide-react";
import FileUploadModal from "../common/FileUpload";

type FormValues = yup.InferType<typeof companySchema>;

//const partialCompanySchema = companySchema.partial();

interface DynamicFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading?: boolean;
  submitButtonText?: string;
  defaultValues?: Partial<FormValues>;
  fields: 'overview' | 'contact' | 'companyAddress' | 'director' | 'documents';
  schema?: yup.ObjectSchema<any>;
}

export default function CompanyForm({

  onSubmit,
  isLoading = false,
  submitButtonText = "Submit",
  defaultValues = {},
  fields = 'overview',
  schema ,
}: DynamicFormProps) {
 
  const [showPassword, setShowPassword] = useState(false);
  const [url,setUrl] = useState('')
  const {isOpen,closeModal,openModal} = useModal()
  const [uploadedFiles,setUploadedFiles] = useState<File>()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({    
    resolver: yupResolver(schema ?? companySchema),
    defaultValues: defaultValues,
  });

useEffect(() => {
  console.log('Default values',defaultValues)
  console.log("Validation Errors:", errors);
}, [errors]);

  const handleFilesChange = (files: File[]) => {
    console.log('Files selected:', files);
    setUploadedFiles(files[0])
    openModal()
  };

 
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      <div className=" px-2">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 mb-6">
          {companyFormFields[fields].map(({ name, label, type, options }) => (
            <div key={name}>
              <Label className="block font-bold mb-1.5">{type === "file" ? '' : label}</Label>

              <div className="relative">
                {type === "select" ? (
                 <select
                    {...register(name as keyof FormValues)}
                    className="w-full border px-3 py-2"
                  >
                    <option value="">Select {label}</option>
                    {options && options.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
                  <textarea
                    {...register(name as keyof FormValues)}
                    placeholder={`Enter ${label}`}
                    className="w-full border px-3 py-2"
                  />
                ) : type === "file" ? (
                  <>
                   <FileUploadDropzone 
                    {...register(name as keyof FormValues)}
                      title={label} 
                       onFilesChange={handleFilesChange}
                      maxFileSize={5} 
                    />
                    
                    {url !== ' ' && <p>File Update URL :{url}</p> }
                    </>

                ) : (
                  <>
                    <input
                      type={type === "password" && showPassword ? "text" : type}
                      {...register(name as keyof FormValues)}
                      placeholder={`Enter ${label}`}
                      className="w-full border px-3 py-2 pr-10"
                    />
                    {type === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-2 text-sm"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    )}
                  </>
                )}
              </div>
              

              {errors[name as keyof FormValues] && (
                <p className="text-sm text-red-600">
                  {errors[name as keyof FormValues]?.message}
                </p>
              )}   
            </div>
          ))}
        </div>
      </div>          
       <div className="sticky bottom-0  p-4 flex justify-center items-center gap-4">
          <button
            type="submit"
            className="w-[30%] bg-blue-600 text-white px-4 py-2 rounded-2xl"
            // disabled={isLoading}
            
          >
            {isLoading ? "Loading..." : submitButtonText}
          </button>
        </div>
    </form>

    <Modal isOpen={isOpen} onClose={() => closeModal()} className='bg-white rounded-lg shadow-xl max-w-xl h-[450px] flex flex-col'>
  <FileUploadModal
    onClose={() => closeModal()}
    docuName=''
    uploadedValue={(value: any) => setUrl(value)}
    selectedFiles={uploadedFiles} 
  />
</Modal>
    
          </>

  );
}


// components/UserID/DocumentsTab.tsx
import React from 'react';
import { Edit2 } from 'lucide-react';
import { UserData } from './userTypes';
import Button from '../ui/button/Button';
//import Input from '../form/input/InputField';
// import { Modal } from '../ui/modal';
// import { useModal } from '../../hooks/useModal';
//import FileUpload from '../common/FileUpload';
//import FileUploadModal from '../common/FileUpload';


interface DocumentsTabProps {
  data: UserData;
  onEdit: (section: UserData) => void ;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({ data, onEdit }) => {
  
  const documents = [
    { name: 'Company Proof', value: data.companyProof },
    { name: 'Company Logo', value: data.companyLogo },
    { name: 'Tax Registration', value: data.taxRegistration },
    { name: 'Certificate of Incorporation', value: data.certOfIncorporation },
    { name: 'Director Proof', value: data.directorProof }
  ];

//   function toCamelCase(str: string): string {
//   return str
//     .toLowerCase()
//     .replace(/[^a-zA-Z0-9 ]/g, '') // remove special chars
//     .replace(/ (.)/g, (_, char) => char.toUpperCase());
// }

  // function handleUpdate(value:any,docName:string){
  //   const name = toCamelCase(docName) as keyof UserData 
  //   console.log(name)
  //    data[name] = value
  // }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
          <Button 
            variant='ghost'
            size='md'
            updateBtn={true}
            onClick={() => onEdit({
              companyProof: data.companyProof ,
              companyLogo: data.companyLogo,
              taxRegistration: data.taxRegistration,
              certOfIncorporation: data.certOfIncorporation,
              directorProof: data.directorProof,
            })}
          className="flex items-center justify-center p-3 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors rounded-full"
          >
            <Edit2 className="w-5 h-5 text-blue-600" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">{doc.name}</span>
              
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    doc.value ? 'text-green-600 bg-green-100' : 'text-gray-500 bg-gray-200'
                  }`}
                >
                  {doc.value ? 'Available' : 'Not uploaded'}
                </span>

                {doc.value && (
                  <a
                    href={doc.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline hover:text-blue-800"
                  >
                    View
                  </a>
                ) 
                // : (
                //   <button className='text-sm flex bg-gray-300 p-1 rounded' onClick={()=>{setValue(doc.name);  openModal()}}><Plus size={20}/>Upload</button>
                // )
                }
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};


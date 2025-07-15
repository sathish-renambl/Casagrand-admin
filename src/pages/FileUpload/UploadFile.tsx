import  { useState } from 'react'
import FileUploadDropzone from '../../components/form/form-elements/FileUpload'
import { Modal } from '../../components/ui/modal'
import FileUploadModal from '../../components/common/FileUpload'
import { useModal } from '../../hooks/useModal'

function UploadFile() {
  const [url, setUrl] = useState('')
  const {isOpen,openModal,closeModal} = useModal()
  const [uploadedFiles,setUploaded] = useState<File>()
  //  Expect an array, not a single file
  function handleFilesChange(files: File[]) {
    console.log('Files:', files)
   
      console.log('First File:' )
      setUploaded(files[0])
      openModal()
    
  }

  return (
    <>
    <FileUploadDropzone
      title={url !=='' ?   `Uploaded File URL ${url}`:'File Upload'}
      onFilesChange={handleFilesChange}
      
      maxFiles={1} 
    />
    
    <Modal isOpen={isOpen} onClose={() => closeModal()} className='bg-white rounded-lg shadow-xl max-w-xl h-[450px] flex flex-col'>
  <FileUploadModal
    onClose={() => closeModal()}
    docuName=''
    uploadedValue={(value: any) => setUrl(value)}
    selectedFiles={uploadedFiles} 
  />
</Modal>
    </>

  )
}

export default UploadFile

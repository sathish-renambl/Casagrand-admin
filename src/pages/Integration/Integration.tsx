import React, { useEffect, useState } from 'react'
import ComponentCard from '../../components/common/ComponentCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { toast } from 'react-toastify'
import { Modal } from '../../components/ui/modal'
import { useModal } from '../../hooks/useModal'
import IntegrationModal from '../../components/Integration/IntegrationModal'
import { DeleteConfirmModal } from '../../components/Modal/deleteModal'
import IntegrationInfoCard from '../../components/Integration/IntegrationInfoCard'
import { useLogOut } from '../../hooks/useLogOut'

function IntegrationById() {
 const { isOpen, openModal, closeModal } = useModal();
 const {integrationId} = useParams()
 const {URL} = useAppContext()
 const token = localStorage.getItem('token')
 const [integration,setIntegration] =useState<any>()
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
   const navigation = useNavigate()
   const logOut = useLogOut()


//Delete Integration
  async function deleteIntegration(){
    if(!token){
                        toast.error("Not authorised")
                        logOut()
                    }
    try{
        const response = await fetch(`${URL}integration/delete/${integrationId}`,{
            method:"POST",
            headers:{ 'Content-Type': 'application/json',
                                                "Authorization": `Bearer ${token}`,
                                            },
        })

        if(response.ok){
            console.log('deleted')
            toast.success("Successfully deleted")
            setIsDeleting(true)
            navigation('/allIntegration')
        }
        else{
            console.log('error deleting')
            setIsDeleteModalOpen(false)
            toast.error("Error deleting Record")
            setIsDeleteModalOpen(false)
        }
    }catch(e){
       toast.error(`error ${e}`)
    }
  }
//get  the integration
 async function getIntegrationById(){
        
        try{
            const response = await fetch(`${URL}integration/get/${integrationId}`,{
                method:"GET",
                 headers:{ 'Content-Type': 'application/json',
                                                "Authorization": `Bearer ${token}`,
                                            },
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                setIntegration(data)
            }
            else{
                toast.error("error getting integration details")
            }
        }catch(e){
            toast.error(`error ${e}`)
        }
 }
 useEffect(()=>{
    getIntegrationById()
 },[])
  return (
    <div>
      <ComponentCard title='Integration Details'>
        <IntegrationInfoCard integration = {integration} onEditOpen={()=>openModal()} onDeleteClick={() => setIsDeleteModalOpen(true)} />
      </ComponentCard>
      <DeleteConfirmModal
                 isOpen={isDeleteModalOpen}
                 onClose={() => setIsDeleteModalOpen(false)}
                 onConfirm={() => deleteIntegration()}
                
                 isLoading={isDeleting}
               />
      <Modal isOpen={isOpen} onClose={()=>closeModal()}  className="max-w-[700px] m-4">
       <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <IntegrationModal actionType='edit' integrationId={integrationId?integrationId :null} onClose={()=>{closeModal(),getIntegrationById()}} integrationPrevDetails={integration}/>
          </div>
      </Modal>
    </div>
  )
}

export default IntegrationById

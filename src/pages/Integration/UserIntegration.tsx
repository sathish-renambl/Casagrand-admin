import React, { useEffect, useState } from 'react'
import ComponentCard from '../../components/common/ComponentCard'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { toast } from 'react-toastify'
import { useLogOut } from '../../hooks/useLogOut'
import IntegrationInfoCard from '../../components/Integration/IntegrationInfoCard'
import { useModal } from '../../hooks/useModal'
import IntegrationModal, { integration } from '../../components/Integration/IntegrationModal'
import { Modal } from '../../components/ui/modal'

function UserIntegration() {
    const {integrationId,orgId} = useParams()
    const {openModal,isOpen,closeModal} = useModal()
    const [userIntegration,setUserIntegration] = useState<any>([])
   
    const {URL} = useAppContext()
    const token = localStorage.getItem('token')
    const logOut = useLogOut()
    async function getUserIntegrationById(){
        try{
                        if(!token){
                            toast.error("Not authorised")
                            logOut()
                        }
                        const response = await fetch(`${URL}integration/getUserIntegration/${integrationId}?orgId=${orgId}`,{
                             method:"GET",
                            headers:{ 'Content-Type': 'application/json',
                                                        "Authorization": `Bearer ${token}`,
                                                    },
        
                        })
                        if(response.ok){
                            const data = await response.json()
                            console.log(data)
                            setUserIntegration(data)
                            
                        }
                        else{
                            const res = await response.json()
                            console.log(res)
                            toast.error(res.detail)
                        }
                    }catch(e){
                        toast.error(`Error ${e}`)
                    }
    }
    useEffect(()=>{
        getUserIntegrationById()
    },[])
  return (
    <div>
      <ComponentCard title='User Integration '>
        <div>
            <p>
                <IntegrationInfoCard  integration={userIntegration} onEditOpen={()=>openModal()}   />
                    
            </p>
        </div>
      </ComponentCard>
      <Modal isOpen={isOpen} onClose={()=>closeModal()}  className="max-w-[700px] m-4">
       <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <IntegrationModal actionType='Edit User' orgId={orgId} integrationId={integrationId?integrationId :null} onClose={()=>{closeModal(),getUserIntegrationById()}} integrationPrevDetails={userIntegration}/>
          </div>
      </Modal>
    </div>
  )
}

export default UserIntegration

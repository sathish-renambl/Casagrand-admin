import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLogOut } from '../../hooks/useLogOut'
import { useAppContext } from '../../context/appContext'
import { useParams } from 'react-router-dom'
import ComponentCard from '../../components/common/ComponentCard'
import TicketInfoCard from '../../components/ticket/TicketInfoCard'
import { Modal } from '../../components/ui/modal'
import { useModal } from '../../hooks/useModal'
import TicketsModal from '../../components/ticket/TicketsModal'
import ChatModal from '../../components/ticket/chatModal'

function TicketById() {
    const token = localStorage.getItem('token')
    const [isChatModalOpen,setChatModalOpen] = useState(false)
    const {ticketId} = useParams()
    const [unreadCount,setUnReadCount] = useState<number>()
    const [details ,setDetails] = useState<any>()
    const {URL} = useAppContext()
     const {openModal,isOpen,closeModal} = useModal()
    const logOut = useLogOut()
    useEffect(()=>{
        getTicketDetails()
    },[])
    async function getTicketDetails(){
        try{
            if(!token){
                toast.error("Not authorised")
                logOut()
            }
            console.log(ticketId)
            const response = await fetch(`${URL}tickets/${ticketId}`,{
                method:"POST",
            headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
            })
            const data = await response.json()
            setDetails(data[0])
            setUnReadCount(data[0]?.unreadCount)
            console.log(data)
        }catch(e){
            toast.error(`error occured ${e}`)
        }
    }
    async function handleSendMessage(message:any){
        console.log('messageSent in ticketby id',message)

        try{
             if(!token){
                toast.error("Not authorised")
                logOut()
            }
            const payload = {message:message,ticketId:ticketId}
            const response = await fetch(`${URL}tickets/send`,{
                method:"POST",
                headers:{ 'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`,
                        },
                body:JSON.stringify(payload)
            })

            if(response.ok){
                toast.success('message send')

            }else{
                toast.error('error sending message')
            }

        }catch(e){
            toast.error(`error occured ${e}`)
        }
    }
    // async function handleMarkAsRead(){
    //     setUnReadCount(0)
    // }
  return (
    <div>
      <ComponentCard title='Ticket Details'>
         <TicketInfoCard ticketDetail={details} count={unreadCount} onEditOpen={()=>openModal()} onMessageOpen={()=>{setChatModalOpen(true),setUnReadCount(0)}} />
            <Modal isOpen={isOpen} onClose={()=>closeModal()} className="max-w-[700px]  m-4">
                <div className="no-scrollbar relative w-full max-w-[700px]  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <TicketsModal actionType='edit' ticketDetails={details} onClose={()=>{closeModal(),getTicketDetails()}} />
          </div>
            </Modal>
            <Modal isOpen={isChatModalOpen} onClose={() => setChatModalOpen(false)} className='bg-white rounded-lg shadow-xl w-full max-w-5xl h-[550px] flex flex-col'>
                <div className='bg-white no-scrollbar relative  overflow-y-auto rounded-lg shadow-xl w-full max-w-5xl h-[550px] flex flex-col'>
                    <ChatModal 
                        onRefresh={getTicketDetails}
                        // onClose={() => setChatModalOpen(false)}
                        status={details?.status}
                        currentTicketId={details?.ticketId}
                        //messages={details?.messages}
                        onSendMessage={(message)=>handleSendMessage(message)}
                        // onMarkAsRead={handleMarkAsRead}
                    />
                    </div>
            </Modal>        
            
      </ComponentCard>
      
    </div>
  )
}

export default TicketById

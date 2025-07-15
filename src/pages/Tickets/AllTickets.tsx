import React, { ReactNode, useEffect, useState } from 'react'
import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import SearchBar from '../../components/ui/SearchBar'
import { toast } from 'react-toastify'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import Badge from '../../components/ui/badge/Badge'
import { Link,useNavigate} from 'react-router-dom'

import Select from '../../components/form/Select'
import { useLogOut } from '../../hooks/useLogOut'
import { useAppContext } from '../../context/appContext'
import { Edit2,  MessageSquareCode, MessageSquareText, PlusIcon, Trash2 } from 'lucide-react'
import { Modal } from '../../components/ui/modal'
import { useModal } from '../../hooks/useModal'
// import Button from '../../components/ui/button/Button'
// import Label from '../../components/form/Label'
// import Input from '../../components/form/input/InputField'
// import Form from '../../components/form/Form'
import TicketsModal from '../../components/ticket/TicketsModal'
import Pagination from '../../components/common/Pagination'
import Label from '../../components/form/Label'



function AllTickets() {
     const ticketsStatus = [
        {label:"Open",value:"OPEN"},
        {label:"Closed",value:"CLOSED"}
    ]
     const navigate = useNavigate()
     const [totalPages,setTotalPages] = useState(1)
    const [currentPage,setCurrentPage] = useState(1)
    const limit = 10
    const [allTickets,setAllTickets] = useState([])
    const [orgId,setOrgId] = useState("")
    const {openModal,isOpen,closeModal} = useModal()
    const [isLoading,setIsLoading] = useState(false)
    const [status,setStatus] = useState<any>("")
    const token = localStorage.getItem('token')
    const logOut = useLogOut()
    const {URL } = useAppContext()
    
   
    useEffect(()=>{
        console.log(currentPage)
        handleSearch()
    },[status,currentPage])
    async function handleSearch(){
        setIsLoading(true)
        try{
            if(!token){
                toast.error("Not authorised")
                logOut()
            }
            // const payload = {orgId:orgId,status:status}
            let payload: { [key: string]: string } = {}
            if(orgId.length>0){ 
                payload["orgId"]= orgId
            }
            if(status.length>0) {
                payload.status = status
        }
        console.log(payload)
            const response = await fetch(`${URL}tickets/getAllTickets?page=${currentPage}&limit=${limit}`,{
                method:"POST",
                headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                body:JSON.stringify(payload)
            })

            if(!response.ok){
                setIsLoading(false)
                toast.error("error Fetching tickets")
            }
            else{
                const data = await response.json()
            setIsLoading(false)
            setAllTickets(data.tickets)
            setTotalPages(Math.ceil(data.total /data.limit))
            console.log(data)
            }
            
                
        }catch(e){
            toast.error(`error occured ${e}`)
        }
    }
  return (
    <div>
        <PageBreadcrumb pageTitle='Tickets'/>
        <div className="mb-8">
          <div className="flex  items-center justify-end">
            
            <button 
              onClick={()=>openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <PlusIcon  />
              <span>Add New Ticket</span>
            </button>
          </div>
        </div>
      <ComponentCard title=''>
        <div className='grid grid-cols-2 justify-between  gap-2.5'>
          <div>
          <Label>ORG ID(Optional)</Label>
       <SearchBar 
            value={orgId}
            onChange={(value:string)=>{setOrgId(value)}}
            onSearch={handleSearch}
            placeholder="Search  ticket..."
            searchbtn={true}
            loading = {isLoading}
            className=" justify-start flex gap-2 w-3xl pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        </div>
        <div>
        <Label>Status (Optional)</Label>
        <Select className='w-1' options={ticketsStatus} onChange={(value:string)=>{setStatus(value)}}/>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Ticket ID</TableCell>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Title</TableCell>
                
                 <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >UserName</TableCell>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Status</TableCell>
                
                 <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Messages</TableCell>
              
              
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
         <></>
           {allTickets?.length>0?
                    
                    allTickets?.map((item:any,index)=>(
            
                <TableRow key={index} className='cursor-pointer hover:bg-gray-100' onClick={()=>navigate(`/ticketById/${item.ticketId}`)}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >{item.ticketId.length > 10 ? item.ticketId.slice(0, 15) + '...' :item.tikectId}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.title}</TableCell>
                    
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.userName}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                        size="sm"
                    color={
                      item.status === "OPEN"
                        ? "success":"error"
                    }
                  >
                    {item.status }
                        

                        </Badge>
                 
                </TableCell>
                <TableCell className="grid grid-cols-3 px-4 py-3 justify-between gap-0.5 text-start text-theme-sm dark:text-gray-400">
                        {/* <Edit2 color="Blue" onClick={()=>handleModal("edit")}/> */}

                        {item.unreadCount > 0 ? (
                        <UnreadBadge 
                            count={item.unreadCount} 
                            label={<MessageSquareText color="gray" />} 
                        />
                        ) : (
                        <MessageSquareText color="gray" />
                        )}
                        </TableCell>
                </TableRow>
                
            ))
                :
                <TableRow>
                <TableCell colSpan={5} className="px-4 py-3 text-gray-500 text-center text-theme-sm  dark:text-gray-400">Enter OrgId to search for Tickets</TableCell>
                </TableRow>
                    }
           
          </TableBody>
        </Table>
        <Pagination 
        totalPages={totalPages}
        
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        maxVisiblePages={3} />
        </div>
        </div>

      </ComponentCard>
      
      <Modal isOpen={isOpen} onClose={()=>closeModal()} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          
          <TicketsModal actionType={'Create'} onClose={()=>closeModal()}/>

          
          
        </div>
      </Modal>
    </div>
  )
}
interface UnreadBadgeProps {
  count: number;
  label: ReactNode;
  className?: string;
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({ count, label, className = '' }) => {
  return (
    <div className={`relative inline-flex  items-center ${className}`}>
      <div className='relative'>
        <span className="text-gray-700 font-medium">{label}</span>
        {count > 0 && (
        <span className="absolute -top-2 -right-2 md: inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[20px] h-5">
          {count > 10 ? '10+' : count}
        </span>
      )}
      </div>
      
       
      
    </div>
  );
};

export default AllTickets

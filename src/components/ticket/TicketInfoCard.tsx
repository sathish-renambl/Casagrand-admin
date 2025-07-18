
import React from 'react'
import Badge from '../ui/badge/Badge';
import Button from '../ui/button/Button';
import { MessageSquareText } from 'lucide-react';
import { UnreadBadge } from '../../pages/Tickets/AllTickets';
import { useModal } from '../../hooks/useModal';

type Props={
    ticketDetail:any |null,
    onMessageOpen:() => void;
    onEditOpen:()=>void;
    count:any;
}

            
function TicketInfoCard({ticketDetail,onMessageOpen,onEditOpen,count}:Props) {
     //const disable = ticketDetail?.status === 'CLOSED'
  return (
    <div>
       <div>
      <div className="p-5 border grid grid-cols-2 border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Ticket Id
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
               {ticketDetail?.ticketId}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400 ">
                Created By 
              </p>
              <p className="text-sm font-medium  text-gray-800 dark:text-white/90 max-w-[300px] break-all">
               {ticketDetail?.createdBy}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                User Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90 max-w-[300px] break-all">
               {ticketDetail?.userName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                 Assigned To
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90 max-w-[300px] break-all">
               {ticketDetail?.assignedTo}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Created Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
               {ticketDetail?.created_at}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Updated Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
               {ticketDetail?.updated_at}
              </p>
            </div>
            <div>
               
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Ticket Status
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              
             <Badge
                    size='md'
                    color={
                      ticketDetail?.status === "OPEN"
                        ? "success" 
                          
                        : "error"
                    }>
                       {ticketDetail?.status}  
                    </Badge>
              </p>
            </div><br/>
            </div>

           
        </div>
        </div> 
         <div className='gap-2 flex items-start justify-end'>
            <Button variant='outline'
             onClick={onEditOpen}
            updateBtn={true}
            >
                <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
                        </Button>
                <Button variant='outline'  onClick={onMessageOpen}>  CHAT{ticketDetail?.unreadCount > 0 ? (
                        <UnreadBadge 
                        
                            count={count} 
                            label={<MessageSquareText color="gray" />} 
                        />
                        ) : (
                        <MessageSquareText color="gray" />
                        )}</Button>
            </div>
        </div>
         
        
        
        </div>
    </div>
    
  )
}

export default TicketInfoCard

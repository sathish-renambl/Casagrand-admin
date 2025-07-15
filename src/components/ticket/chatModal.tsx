import { X, Send, MoreVertical, RefreshCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/appContext';
import { useLogOut } from '../../hooks/useLogOut';

interface Message {
  msg: string;
  msgId: string;
  readFlag: boolean;
  senderId: string;
  timestamp: string;
  type: string;
}

interface ChatModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  messages?: Message[];
  currentTicketId?: string;
  chatPartnerName?: string;
  status:string;
  onRefresh:() => void;
  onSendMessage?: (message: string) => void;
  onMarkAsRead?: (msgId: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({
  // isOpen,
  // onClose,
  //messages,
  currentTicketId,
  status,
 // onRefresh,
  chatPartnerName = "Chat",
  onSendMessage,
 // onMarkAsRead
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
 // const messagesEndRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('token')
  const [page,setPage] = useState<number>(1)
 // const [hasMore, setHasMore] = useState<boolean>(true);
  const topRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //const observer = useRef<IntersectionObserver | null>(null);
  const {URL} = useAppContext()
  const logOut = useLogOut()
   const lineHeight = 24; // Adjust based on your textarea's line height in px
  const maxRows = 5;
  const maxHeight = lineHeight * maxRows;
  

  useEffect(() => {
    fetchMessages()
    scrollToBottom()
  }, []);
  useEffect(() => {
    console.log(newMessage.length  )
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [newMessage]);

  useEffect(()=>{
    fetchMessages()
  },[page])

  useEffect(() => {
    const container = containerRef.current;
  if (!container) return;

  const handleScroll = () => {
    if (container.scrollTop === 0) {
      // Reached top — load older messages
      console.log("moved to top")
      setPage(prevPage => prevPage + 1)
      // fetchMessages(); // your API call or logic
    }
  };

  setTimeout(() => {
    scrollToBottom()
  }, 100);

  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
  }, [topRef,containerRef]);


  async function fetchMessages(){
      try{
        console.log(page)
        if(!token){
          toast.error("Not authorised")
          logOut()
                    }
        const response = await fetch(`${URL}tickets/getMessages/${currentTicketId}?page=${page}`,{
          method:"POST",
                headers:{ 'Content-Type': 'application/json',
                            "Authorization": `Bearer ${token}`,
                        },
        })

        if(response.ok){
          const data = await response.json()
          console.log(data)
          const reversedMessages = data.slice().reverse();

          setLocalMessages((prev:any)=>[...reversedMessages,...prev])
        }
      }catch(e){
        toast.error(`error Occured ${e}`)
      }
  }


  const scrollToBottom = () => {
    console.log('scroll')
    if (containerRef.current) {
     containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
    }
  };

  

 
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const handleSendMessage = () => {
    // setLocalMessages((prev) => [...prev, messageObj]);
   const  messageAppend = {
       msg: newMessage,
  msgId: Date.now().toString(),
  readFlag: false,
  senderId: 'sender' + Date.now(),
  timestamp: new Date().toISOString(),
  type: 'admin'
    }
    
    if (newMessage.trim() && onSendMessage) {
      setLocalMessages((prev)=>[...prev,messageAppend])
      console.log('chatmesagehandle')
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  // const handleMarkAsRead = (msgId: string) => {
  //   setLocalMessages(prev => 
  //     prev.map(msg => 
  //       msg.msgId === msgId ? { ...msg, readFlag: true } : msg
  //     )
  //   );
  //   if (onMarkAsRead) {
  //     onMarkAsRead(msgId);
  //   }
  // };

  // const isCurrentUser = (type: string) => type === type;

  const userType = (type:string) => type.toLowerCase() ==='admin'

  return (
    // <div className="fixed inset-0 bg-black  flex items-center justify-center z-50 p-4">
      //<div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[550px] flex flex-col">
      <div className='flex flex-col h-full'>
        {/* Header */}
        <div className="  flex h-20 items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg shrink-0">
          <div className=" flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {chatPartnerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className=' flex flex-row'>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{chatPartnerName}</h2>
              {/* <p className="text-xs text-green-500">Online</p> */}
            </div>
            <div >
              <RefreshCcw color='gray' className='mt-1.5 ml-1.5' onClick={()=>{fetchMessages(),setLocalMessages([])}} size={20}/>
            </div>
            </div>
            
            {/* {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[20px] h-5">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )} */}
          </div>
          {/* <div className=" flex mt-2 items-center space-x-2">
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <MoreVertical className=" w-4 h-4 text-gray-500" />
            </button> */}
            {/* <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button> */}
          {/* </div> */}
        </div>

        {/* Messages Container */}
        <div ref={containerRef} className=" flex-1 overflow-y-auto  p-4 space-y-3 bg-gray-50">
          {localMessages?.length === 0 ? (
            <div className=" text-center text-gray-500 py-8">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">💬</span>
              </div>
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          ) : (
            localMessages?.map((message, index) => {
              // const isOwn = isCurrentUser(message.type);
              const showTimestamp = index === 0 || 
                new Date(message.timestamp).getTime() - new Date(localMessages[index - 1].timestamp).getTime() > 300000; // 5 minutes

              return (
                <div className='scroll-auto' key={index}>
                  <div ref={topRef}/>
                  {showTimestamp && (
                    <div className="text-center text-xs text-gray-500 my-2">
                      {formatTimestamp(message.timestamp)}
                    </div>
                  )}
                  <div className={`flex ${(!userType(message.type)) ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                     userType(message.type) 
                        ? 'bg-blue-500 text-white rounded-br-md' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                    }`}>
                      <p className="text-sm break-words whitespace-pre-wrap">{message.msg}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                       userType(message.type) ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        <span className="text-xs">
                          {new Date(message.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {/* {message.type === 'USER' && (
                          <span className="text-xs">
                            {message.readFlag ? '✓✓' : '✓'}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>
                  {/* {!message.readFlag && !message.type === 'USER' && (
                    <div className="flex justify-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>
                    </div>
                  )} */}
                </div>
              );
            })
          )}
        </div>
        

        {/* Message Input */}
        {status === 'OPEN' &&
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg shrink-0">
          <div className="flex items-center space-x-2">
            <textarea
              ref={textareaRef}
              maxLength={5000}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>}
      </div>
    // </div>
  );
};
export default ChatModal

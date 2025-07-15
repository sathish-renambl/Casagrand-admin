
import { useEffect, useState } from 'react'
import { Admin, useAppContext } from '../../context/appContext'
import Label from './Label'
import Input from './input/InputField'
import Button from '../ui/button/Button'
import Switch from './switch/Switch'
import { getUpdatedFields } from '../../utils/updateFields'
import { toast } from 'react-toastify'
import MultiSelect from './MultiSelect'

function Editform({user,title}:{user:Admin | undefined,title:String}) {
   const token = useAppContext()
   const options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "support", label: "Support" },
    { value: "agent", label: "Agent" },
  ]; 
   
    const [editedfields,setEditedFields] = useState<Admin | undefined>()
    const [agentOptions,setAgentOption] =useState<any[]>([])
    const[supportOption,setSupportOptions] = useState<any[]>([])
      async function getSupportAgents(){
        
        const response = await fetch(`http://192.168.1.27:8000/admin/all`,{
           method:"GET",
            headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token.token}`,
                    }
        })
        if(response.ok){
          const agent: any[] = [];
          const support: any[] = [];
          const data = await response.json()
          console.log(data.admins)
          data.admins.forEach((item: any) => {
          console.log(item.roleType);
          
        if (item.roleType === 'support') {
            support.push({text:item.roleId,value:item.roleId})
            
          } else if (item.roleType === 'agent') {
            agent.push(item.roleId)
          }
});
           setSupportOptions(support)
           setAgentOption(agent)
        }
       

       }
    useEffect(() => {
       
      
  if (user) {
    setEditedFields(user);
  }
  getSupportAgents()
}, [user]);

  
  async function handleSubmit(){
    try{
        const token = localStorage.getItem('token')
        const input = getUpdatedFields(JSON.parse(JSON.stringify(user)),JSON.parse(JSON.stringify(editedfields)))
        console.log(token,input)
        const response = await fetch(`http://192.168.1.27:8000/admin/update/${user?.roleId}`,{
        method:"POST",
        headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
        body:JSON.stringify(input)

    })

    if(response.ok){
        const data = await response.json()
        console.log(data)
        toast.success("updated successfully")
    }

    } catch{
            
        }
  }
    function handleChange(key:string,value:any){
      console.log("support",supportOption,"agent",agentOptions)
     setEditedFields((prev) => {
  if (!prev) return prev; // or handle undefined case if needed

  return {
    ...prev,
    [key]: value
  };
});
    }

    
  return (
    <div>
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            {title}
        </h4>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
           {editedfields &&
  Object.entries(editedfields).map(([key, value]) => {
    const valueType = typeof value;

    const renderField = () => {
      // Number or string -> input
      if(key === 'assignedSupport'){
        return (
          
          <MultiSelect label={key} options={supportOption}/>
          
        )
      }
      if(key ==='assignedAgents'){
        return(
          <MultiSelect label={key} options={agentOptions}/>
        )
      }
      
      if (valueType === 'string' || valueType === 'number') {
        // Optional: special dropdowns based on field name
        if (key === 'roleStatus') {
          
          return (
            <Switch label={value} defaultChecked={true}/>
          );
        }

        return (
          <Input
            type="text"
            value={String(value)}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );
      }
      

      // Arrays -> simple tags or readonly
      if (Array.isArray(value)) {
        return (
          <div className="flex flex-wrap gap-1">
            {value.map((item, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-sm rounded"
              >
                {String(item)}
              </span>
            ))}
          </div>
        );
      }

      // Fallback for unknown types
      return <div className="text-gray-500">dssad</div>;
    };
   if(key !=='agentAccess' && key !=='supportAccess' )
    return (
      <div key={key} className="mb-4">
       
        <Label>{key}</Label>
        {renderField()}
      </div>
    );
  })}


     
               
          
            
            
    </div>
    <div className='justify-center'>
        <Button className='w-2xl justify-center' updateBtn={true} onClick={handleSubmit}>Edit</Button>
    </div>
     
    </div>
    </div>
    </div>
    </div>
  )
}

export default Editform

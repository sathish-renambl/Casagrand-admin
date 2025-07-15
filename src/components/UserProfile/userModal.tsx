import React, { useEffect, useState } from 'react'

import Form from '../form/Form'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Select from '../form/Select'
import MultiSelect from '../form/MultiSelect'
import Button from '../ui/button/Button'

import { Admin, useAppContext } from '../../context/appContext'
import { getUpdatedFields } from '../../utils/updateFields'
import { toast } from 'react-toastify'
import { EyeCloseIcon, EyeIcon } from '../../icons'
import { useLogOut } from '../../hooks/useLogOut'

type Props = {
  user: Admin | null;
  onSave: () => void; // <- Add this line
  actionType:string
};


function UserModal({user,onSave,actionType}:Props) {
   const [showPassword,setShowPassword] = useState(false)
  const token = localStorage.getItem('token')
  const [editedfields,setEditedFields] = useState(JSON.parse(JSON.stringify(user)));
  const [agentOptions,setAgentOption] =useState<any[]>([])
    const[supportOption,setSupportOptions] = useState<any[]>([])
    const [adminOption,setAdminOption] = useState<any[]>([])
    const logOut = useLogOut()
      async function getSupportAgents(){
        try{

        if(!token){
                    toast.error("Not authorised")
                    logOut()
                }
        console.log(editedfields)
        const response = await fetch(`http://192.168.1.27:8000/admin/all`,{
           method:"GET",
            headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    }
        })
        if(response.ok){
          const agent: any[] = [];
          const support: any[] = [];
          const admin: any[] =[];
          const data = await response.json()
          console.log(data.admins)


          data.admins.forEach((item: any) => {
        
          
        if (item.roleType === 'support') {
            support.push({text:item.roleId,value:item.roleId})
            
          } else if (item.roleType === 'agent') {
            agent.push({text:item.roleId,value:item.roleId})
          }
          else if(item.roleType ==='admin'){
            
            admin.push({text:item.roleId,value:item.roleId})
          }
}); 

           console.log('admin-value',support)
           setSupportOptions(support)
           setAgentOption(agent)
           setAdminOption(admin)
        }
        else{
          toast.error(`error getting support and agents `)
        }
      }catch(e){
        toast.error(`error occurred ${e}`)
      }
       

       }
    const handleSave = async () => {
    try{
          console.log('inside save')
           console.log(adminOption,editedfields)
           
           if(actionType ==='edit'){
                                    const input = getUpdatedFields(JSON.parse(JSON.stringify(user)),JSON.parse(JSON.stringify(editedfields)))
                                console.log("edited fields",input)
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
                        onSave()
                    }

            }
            else if(actionType ==='create')
                {
                                if(editedfields.email?.length <5 || editedfields.password?.length <5 || editedfields.full_name?.length <4 ){
                            toast.error('Enter Valid details')
                        }
                        else{
                        const response = await fetch(`http://192.168.1.27:8000/admin/create`,{
                            method:"POST",
                        headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                    body:JSON.stringify(editedfields)
                    })

                    if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    }
           
            
                }}}
        catch(e){
               console.log(e)
           }
    
  };
  useEffect(() => {
         
        
    if (user) {
      setEditedFields(user);
    }
     getSupportAgents()
    
  }, [user]);
  const statusOptions = [
    {label:"ACTIVE",value:"ACTIVE"},
    {label:"InACTIVE",value:"INACTIVE"}
  ]

  const roleOption = [
    { value: "admin", label: "Admin" },
   
    { value: "support", label: "Support" },
    { value: "agent", label: "Agent" },
  ];
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    
    const { name, value } = e.target;
    setEditedFields(( prev:Admin) => ({ ...prev, [name]: value }));
  }
  return (
    <div>
      
         <div>
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {actionType}  {user?.roleType}
            </h4>
            
          </div>
          <Form onSubmit={handleSave} className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-1 ">
                    <Label>Full Name</Label>
                    <Input type="text" name="full_name"   value={editedfields?.full_name} onChange={handleChange}/>
                  </div>

                 

                  <div className="col-span-1 ">
                    <Label>Email Address</Label>
                    <Input type="text" name="email"  value={editedfields?.email} onChange={handleChange}/>
                  </div>
                  <div className="col-span-1 ">
                    <Label htmlFor='password'>Password </Label>
                    <div className="relative">
                      <Input
                      id='password' name="password" value={editedfields?.password} onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                      <button type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </button>
                  </div>
                  </div>

                  <div className="col-span-1">
                    <Label >Role</Label>
                    <Select options={roleOption} defaultValue={editedfields?.roleType} onChange={(value:string)=> setEditedFields((prev:any)=>({...prev,roleType:value}))}/>
                  </div>
                  {editedfields?.roleType === 'admin'? <><div className="col-span-1">
                    <MultiSelect label={"Assigned Agent"} options={agentOptions} onChange={(value:any)=>setEditedFields((prev:any)=>({...prev,assignedAgent:value}))}/>
                  </div>
                  <div className="col-span-1">
                    <MultiSelect label={"Assigned Support"} options={supportOption} onChange={(value:any)=>setEditedFields((prev:any)=>({...prev,assignedSupport:value}))}/>
                  </div></>:

                  <div className="col-span-1">
                    <MultiSelect label={"Assigned Admin"} options={adminOption} onChange={(value:any)=>setEditedFields((prev:any)=>({...prev,assignedAdmin:value}))}/>
                  </div>
                  
                  }

                  <div className="col-span-1">
                    <Label >Status</Label>
                     <Select  options={statusOptions} defaultValue={editedfields?.roleStatus} onChange={(value:string)=> setEditedFields((prev:any)=>({...prev,roleStatus:value}))}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={onSave}>
                Close
              </Button>

              <Button size="sm" onClick={handleSave} updateBtn={true} >
               {actionType} 
              </Button>
            </div>
          </Form>

      
    </div>
  )
}
    

export default UserModal

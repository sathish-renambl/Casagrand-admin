import React, { useEffect, useState } from 'react'
import Form from '../form/Form'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Button from '../ui/button/Button'

import Select from '../form/Select'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/appContext'
import { getUpdatedFields } from '../../utils/updateFields'
import { useLogOut } from '../../hooks/useLogOut'

type Props = {
  integrationPrevDetails:integration  | null
  onClose: () => void; // 
  actionType:string;
  integrationId:string | null;
  orgId?:string |null;
};

export interface keys {
    keyName:string;
      keyLabel: string,
      keyPlaceholder: string,
      keyInfo: string,
      keyValue: string,
      keyType: string
}
export interface integration{
    integrationName: string;
  integrationDescription: string;
  integrationIcon: string;
  
  integrationCategory: string;
  integrationStatus:string;
  integrationKeys: Array<keys> ;
  roleId: string |null  ;
}


function IntegrationModal({onClose,actionType,integrationPrevDetails,orgId,integrationId}:Props) {
    const {URL} = useAppContext()
    const token = localStorage.getItem('token')
    const logOut = useLogOut()
    const keyTypeOptions=[
        {label:"Text",value:"TEXT"}, 
        {label:"Select",value:"SELECT"},
        {label:"Radio",value:"RADIO"},
        {label:"CheckBox",value:"CHECKBOX"},

    ]
    const categoryOptions =[
        {label:"LLM",value:"LLM"},
        {label:"Voice Engine",value:"Voice Engine"}
    ]
    const statusOption = [
        {label:"Active",value:"ACTIVE"},
        {label:"Inactive",value:"INACTIVE"}
    ]
     
     const [integrationDetail,setIntegrationDetails] = useState<integration>({
      integrationName: "",
  integrationDescription: "",
  integrationIcon: "",
  
  integrationCategory: "",
  integrationStatus:"",
  integrationKeys:[ ],
  roleId: " "  ,
     });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setIntegrationDetails(( prev:any) => ({ ...prev, [name]: value }));
      }

      useEffect(()=>{
        if(integrationPrevDetails){
          setIntegrationDetails(integrationPrevDetails)
        }
      },[])

      async function handleCreate(){
        try{
      if(!token){
            toast.error("Not authorised")
            logOut()
        }
      
        
          const response = await fetch(`${URL}integration/create`,{
              method:"POST",
              headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        },
              body:JSON.stringify(integrationDetail)
          })

          if(response.ok){
              const data = await response.json()
              console.log(data);
              onClose()
              toast.success("  Integration Created successfully")
              
          }
          else{
            onClose()
                toast.error("error in  Integration")
          }
              
        }catch(e){
          toast.error(`error ${e}`)
        }
      }

      async function handleUserEdit(){
        try{
          console.log("orgId",orgId)

        
          const payload = getUpdatedFields(JSON.parse(JSON.stringify(integrationPrevDetails)),JSON.parse(JSON.stringify(integrationDetail)))
              console.log("edited fields",payload,integrationId)
              
              payload.integrationId = integrationId
              console.log(payload)
              const response = await fetch(`${URL}integration/updateUserIntegration?orgId=${orgId}`,{
                    method:"POST",
                    headers:{ 'Content-Type': 'application/json',
                                                "Authorization": `Bearer ${token}`,
                                            },
                    body:JSON.stringify(payload)
                })

                if(response.ok){
                    const data = await response.json()
                    console.log(data);
                    onClose()

                    toast.success("User Integration Edited successfully")
                    
                }
                else{
                      
                     toast.error("error editing User  Integration")
                }
               }catch(e){
                toast.error(`error ${e}`)
        }
      }

      async function handleEdit(){
        try{
          console.log(integrationId)
               const input = getUpdatedFields(JSON.parse(JSON.stringify(integrationPrevDetails)),JSON.parse(JSON.stringify(integrationDetail)))
              console.log("edited fields",input,integrationId)
              
              const response = await fetch(`${URL}integration/update/${integrationId}`,{
                    method:"POST",
                    headers:{ 'Content-Type': 'application/json',
                                                "Authorization": `Bearer ${token}`,
                                            },
                                body:JSON.stringify(integrationDetail)
                })

                if(response.ok){
                    const data = await response.json()
                    console.log(data);
                    onClose()

                    toast.success("  Integration Edited successfully")
                    
                }
                else{
                    onClose()
                     toast.error("error in  Integration")
                }
        }catch(e){
          toast.error(`error ${e}`)
        }
      }

     async function handleSubmit(){
        console.log(integrationDetail)
        if(!token){
              toast.error("Not authorised")
              logOut()
          }
        try{
            if(actionType ==='create'){
              await handleCreate()
            }
            else if(actionType==='edit'){
              await handleEdit()
                
            }else if(actionType ==='Edit User'){
              await handleUserEdit()
            }
        }catch(e){
            console.log(e)
            onClose()
            toast.error(`error ${e}`)
        }
     }
    function handleKeyChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setIntegrationDetails((prev: any) => {
        const updatedKeys = [...prev.integrationKeys];
        updatedKeys[0] = {
        ...updatedKeys[0],
        [name]: value,
        };

        return {
        ...prev,
        integrationKeys: updatedKeys,
        };
    })
     }
  return (
    <div>
      <div className="px-2 pr-14">
            <div>
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {actionType} Integration
            </h4>
          </div>
           
            <Form onSubmit={handleSubmit}>
                    <div>
                         <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                            
                            <div className="mt-7">
                                <div className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-2">
                                  {actionType !=='Edit User' &&
                                  <>
                                 <div className="col-span-1 ">
                                    <Label htmlFor='integrationName'>Integration Name</Label>
                                    <Input type="text" name="integrationName" value={integrationDetail?.integrationName}  id='integrationName'onChange={handleChange} />
                                 </div>
                                 <div className="col-span-1 ">
                                    <Label htmlFor='description'> Description</Label>
                                    <Input type="text" name="integrationDescription" id='description' value={integrationDetail?.integrationDescription} onChange={handleChange} />
                                 </div>
                                 {/* <div className="col-span-1 ">
                                    <Label htmlFor='icon'> Icon</Label>
                                    <Input type="text" name="integrationIcon" id='icon' value={integrationDetail?.integrationIcon} onChange={handleChange} />
                                 </div> */}
                                 {/* <div className="col-span-1 ">
                                    <Label htmlFor='endPoint'> EndPoint</Label>
                                    <Input type="text" name="integrationEndpoint" id='endPoint' value={integrationDetail.integrationEndpoint} onChange={handleChange} />
                                 </div> */}
                                 <div className="col-span-1 ">
                                    <Label htmlFor='category'> Category</Label>
                                    <Select options={categoryOptions} defaultValue={integrationDetail?.integrationCategory} onChange={(value:string)=> setIntegrationDetails((prev:any)=>({...prev,integrationCategory:value}))}/>
                                 </div>
                                 <div className="col-span-1 ">
                                    <Label htmlFor='status'> Status</Label>
                                    <Select options={statusOption} defaultValue={integrationDetail?.integrationStatus} onChange={(value:string)=> setIntegrationDetails((prev:any)=>({...prev,integrationStatus:value}))}/>
                                 </div>
                                 </>
                                 }
                                 <h3 > Integration Keys</h3><br/>
                                 <div className="col-span-1 ">
                                    
                                    <Label htmlFor='keyName'> Key Name</Label>
                                    <Input type="text" name="keyName" id='keyName' value={integrationDetail?.integrationKeys[0]?.keyName}  onChange={handleKeyChange}/>
                                 </div>
                                 <div className="col-span-1 ">
                                    
                                    <Label htmlFor='keyLabel'> Key Label</Label>
                                    <Input type="text" name="keyLabel" id='keyLabel' value={integrationDetail?.integrationKeys[0]?.keyLabel} onChange={handleKeyChange} />
                                 </div>
                                 <div className="col-span-1 ">
                                    
                                    <Label htmlFor='keyPlaceholder'> Key Placeholder</Label>
                                    <Input type="text" name="keyPlaceholder" id='keyPlaceholder' value={integrationDetail?.integrationKeys[0]?.keyPlaceholder} onChange={handleKeyChange} />
                                 </div>
                                 <div className="col-span-1 ">
                                    
                                    <Label htmlFor='keyInfo'> Key Info</Label>
                                    <Input type="text" name="keyInfo" id='keyInfo'  value={integrationDetail?.integrationKeys[0]?.keyInfo} onChange={handleKeyChange} />
                                 </div>
                                 <div className="col-span-1 ">
                                    
                                    <Label htmlFor='keyValue'> Key Value</Label>
                                    <Input type="text" name="keyValue" id='keyValue'  value={integrationDetail?.integrationKeys[0]?.keyValue} onChange={handleKeyChange} />
                                 </div>
                                 <div className="col-span-1 ">
                                    
                                    <Label htmlFor='keyType'> Key Type</Label>
                                    <Select options={keyTypeOptions} onChange={(value: string) =>
                                        setIntegrationDetails((prev: any) => {
                                                    const updatedKeys = [...prev.integrationKeys];
                                                    updatedKeys[0] = {
                                                    ...updatedKeys[0],
                                                    keyType: value,
                                                    };

                                                    return {
                                                    ...prev,
                                                    integrationKeys: updatedKeys,
                                                    };
                                                })
                                    }/>
                                 </div>
                                
                                 
                                 

                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 justify-center px-2 mt-6 lg:justify-end">
              <Button  size="sm" variant="outline" onClick={onClose}>
                Close
              </Button>

              <Button size="sm"  updateBtn={true} >
               {actionType} Integration
              </Button>
            </div>
            </Form>
            </div>
    </div>
  )
}

export default IntegrationModal

import  { useEffect, useState } from 'react'
import PageBreadcrumb from '../components/common/PageBreadCrumb'
//import Switch from '../components/form/switch/Switch'
import PageMeta from '../components/common/PageMeta'
import ComponentCard from '../components/common/ComponentCard'
import Label from '../components/form/Label'
import Input from '../components/form/input/InputField'
import Select from '../components/form/Select'
import Button from '../components/ui/button/Button'
import { EyeCloseIcon,EyeIcon } from '../icons'
import { toast } from 'react-toastify'
import MultiSelect from '../components/form/MultiSelect'
import { useAppContext } from '../context/appContext'

function CreateUser() {
//     const [showPassword,setShowPassword] = useState(false)
//    // const [checked,setCHecked] = useState(true)
//     const [agentOptions,setAgentOption] =useState<any[]>([])
//     const[supportOption,setSupportOptions] = useState<any[]>([])
//     const token = useAppContext()
//     const [user,setUser] = useState({
//       email:"",
//       full_name:"",
//       roleType:"admin",
//       password:"",
//       status:""

//     })

    

//         const options = [
//     { value: "admin", label: "Admin" },
//     { value: "user", label: "User" },
//     { value: "support", label: "Support" },
//     { value: "agent", label: "Agent" },
//   ];
//   const Statusoptions = [
//     { value: "ACTIVE", label: "Active" },
//     { value: "INACTIVE", label: "Inactive" },
    
//   ];

  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUser(prev => ({ ...prev, [name]: value }));
//   };
//   useEffect(()=>{
//     getSupportAgents()
//   },[])
//   async function getSupportAgents(){
        
//         const response = await fetch(`http://192.168.1.27:8000/admin/all`,{
//            method:"GET",
//             headers:{ 'Content-Type': 'application/json',
//                         "Authorization": `Bearer ${token.token}`,
//                     }
//         })
//         if(response.ok){
//           const agent: any[] = [];
//           const support: any[] = [];
//           const admin:any[] = [];
//           const data = await response.json()
//           console.log(data.admins)
//           data.admins.forEach((item: any) => {
//           console.log(item.roleType);
          
//         if (item.roleType === 'support') {
//             support.push({text:item.roleId,value:item.roleId})
            
//           } else if (item.roleType === 'agent') {
//             agent.push(item.roleId)
//           }
//           else if (item.roleType ==='admin'){
//             admin.push(item.roleIid)
//           }
// });
//            setSupportOptions(support)
//            setAgentOption(agent)
//         }
       

//        }

//   async function handleSubmit(){
//     try{
//       const token = localStorage.getItem('token')
//         console.log(token,user)

//         if(user.email?.length <5 || user.password?.length <5 || user.full_name?.length <4 ){
//             toast.error('Enter Valid details')
//         }
//         else{
//           const response = await fetch(`http://192.168.1.27:8000/admin/create`,{
//             method:"POST",
//           headers:{ 'Content-Type': 'application/json',
//         "Authorization": `Bearer ${token}`,
//       },
//       body:JSON.stringify({email:user.email,full_name:user.full_name,password:user.password,roleType:user.roleType})
//     })

//     if(response.ok){
//       const data = await response.json()
//       console.log(data)
//     }

//         }

    
//     }catch(e){
//       console.log(e)
//     }
    
//   }
//   function handleSelectChange(value:string){
//     setUser(prev=>({...prev,roleType:value}))
//   }
  
//   return (
//     <div>
//       <PageMeta
//         title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
//         description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <PageBreadcrumb pageTitle="Create Admin User" />
//       <div className=" gap-6 ">
//               <div className="space-y-6 flec">
//                <ComponentCard title="Add Admin" >
//                 <div className='grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-2'>
//                     <div className='col-span-1'>
//                         <Label htmlFor="email">Email ID</Label>
//                         <Input type='text' name="email" onChange={handleChange} value={user.email} id="email" placeholder='info@example.com'></Input>
//                     </div>
//                     <div className='col-span-1'>
//                         <Label htmlFor='full_name'>Fullname</Label>
//                         <Input type='text' name="full_name" onChange={handleChange} id='full_name' value={user.full_name} placeholder='FullName'></Input>
//                     </div>
//                     <div>
//                         <Label htmlFor='roleType'>Role</Label>
//                         <Select options={options}   
//                         placeholder="Select a Role"
//                                     onChange={handleSelectChange}
//                                      className="dark:bg-dark-900"/>
//                     </div>
//                     <div>
//                         <Label >Status</Label>
//                         <Select options={Statusoptions} onChange={(value:string)=>{setUser((prev)=>({...prev,status:value}))}} defaultValue='Active'/>
//                     </div>
//                       <div>
//                     <Label htmlFor='password'>Password </Label>
//                     <div className="relative">
//                       <Input
//                       id='password' name="password" value={user.password} onChange={handleChange}
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter your password"
//                       />
//                       <button
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                       >
//                         {showPassword ? (
//                           <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                         ) : (
//                           <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                   {user.roleType ==='admin' &&
//                   <>
//                     <div>
//                         <MultiSelect label={"Support"} options={supportOption}/>
//                     </div>
//                      <div>
//                         <MultiSelect label={"Agent"} options={agentOptions}/>
//                     </div>
                    
//                     </>
//                   }
                  
                  
                      
//                   </div>
//                   <Button onClick={handleSubmit}  className="w-full" size="sm">
//                             Create
//                           </Button>
//                </ComponentCard>
//               </div>
//         </div>
//     </div>
  //)
}

export default CreateUser

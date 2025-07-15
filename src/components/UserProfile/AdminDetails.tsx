import React, { useEffect, useState } from 'react'
import ComponentCard from '../common/ComponentCard'
import { useParams } from 'react-router-dom'
import { Admin } from '../../context/appContext'
import UserInfoCard from './UserInfoCard'
import { toast } from 'react-toastify'
import { useLogOut } from '../../hooks/useLogOut'
// import Editform from '../form/Editform'

function UserDetails() {
    const roleId = useParams()
    const [user,setUser] = useState<Admin|null >(null)
    const logOut = useLogOut()

    async function getUser(){
      
      try{
         const token =localStorage.getItem('token')
        if(!token){
            toast.error("Not authorised")
            logOut()
        }
        
      console.log(roleId)
    const response = await fetch(`http://192.168.1.27:8000/admin/${roleId.roleId}`,{
      method:"GET",
      headers:{ 'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      }
    })
    if(response.ok){
      const data = await response.json()
      console.log("hello",data)
      setUser(data.admin)
     
      
    }
    else{
      toast.error("error fetching data")
    }
      }catch(e){
        toast.error(`error occurred ${e}`)
      }
       
    }
    useEffect(()=>{
      getUser()
    },[])
  return (
    <div>
      <ComponentCard title='Edit Admin'>
           <UserInfoCard user={user}/>
      </ComponentCard>
    </div>
  )
}

export default UserDetails

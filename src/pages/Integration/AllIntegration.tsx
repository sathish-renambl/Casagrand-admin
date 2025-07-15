import React, { useContext, useEffect, useState } from 'react'
import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import { PlusIcon } from 'lucide-react'
import { Modal } from '../../components/ui/modal';
//import Form from '../../components/form/Form';
import { useModal } from '../../hooks/useModal';
//import Label from '../../components/form/Label';
//import Input from '../../components/form/input/InputField';
//import Button from '../../components/ui/button/Button';
import IntegrationModal from '../../components/Integration/IntegrationModal';
import { useAppContext } from '../../context/appContext';
//import { toast } from 'react-toastify';
import Badge from '../../components/ui/badge/Badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogOut } from '../../hooks/useLogOut';

function AllIntegration() {
 
     const { isOpen, openModal, closeModal } = useModal();
     const {URL} = useAppContext()
     const token = localStorage.getItem('token')
     const [allIntegrations,setAllIntegration] = useState<Array<string>>()
    const logOut = useLogOut()
     async function getAllIntegration(){
       if(!token){
                                  toast.error("Not authorised")
                                  logOut()
                              }
        try{
           const response = await fetch(`${URL}integration/getAllIntegrations`,{
            method:"GET",
                    headers:{ 'Content-Type': 'application/json',
                                                "Authorization": `Bearer ${token}`,
                                            },
                                
        })
        if(response.ok){
            const data = await response.json()
           console.log(data)
           setAllIntegration(data)

        }
        else{
            toast.error("Error fetching datas")
        }
        }catch(e){
          toast.error(`error ${e}`)
        }
       
     }
     useEffect(()=>{
        getAllIntegration()
     },[])
  return (
    
    <div>
        <PageBreadcrumb pageTitle='Integration'></PageBreadcrumb>
        <div className="mb-8">
          <div className="flex  items-center justify-end">
            
            <button 
              onClick={()=>openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <PlusIcon  />
              <span>Add New Integration</span>
            </button>
          </div>
        </div>
      <ComponentCard title={"Integrations"}>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >ROLE ID</TableCell>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >NAME</TableCell>
                
                 <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >CATEGORY</TableCell>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >DESCRIPTION</TableCell>
                
                 <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Status</TableCell>
              
              
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
         <></>
           { allIntegrations?.map((item:any,index)=>(
            
                <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"><Link className="text-blue-500 hover:underline" to={`/integrationById/${item.integrationId}`}>{item?.integrationId?.length > 10 ? item?.integrationId?.slice(0, 15) + '...':item.integrationId}</Link></TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" >{item.integrationName}</TableCell>
                    
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.integrationCategory}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item?.integrationDescription?.length > 10 ? item?.integrationDescription?.slice(0, 20) + '...' :item.integrationDescription}</TableCell>
                   
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                        size="sm"
                    color={
                      item.integrationStatus === "ACTIVE"
                        ? "success":"error"
                       
                    }
                  >
                    {item.integrationStatus }
                        

                        </Badge>
                 
                </TableCell>
                </TableRow>
                
            ))}
           
          </TableBody>
        </Table>
        </div>
        </div>
      </ComponentCard>
      <Modal isOpen={isOpen} onClose={()=>{closeModal()}}  className="max-w-[700px] m-4">
       <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <IntegrationModal actionType='create' integrationId={null} onClose={()=>{closeModal(),getAllIntegration()}} integrationPrevDetails={null}/>
          </div>
        
       
      </Modal>
    </div>
  )
}

export default AllIntegration

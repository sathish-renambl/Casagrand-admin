import React, { useState } from 'react'
import ComponentCard from '../../components/common/ComponentCard'
// import SearchBar from '../../components/common/SearchBar'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../../components/ui/table'
import Badge from '../../components/ui/badge/Badge'
import { toast } from 'react-toastify'
import { useAppContext } from '../../context/appContext'
import { useLogOut } from '../../hooks/useLogOut'
import { Link } from 'react-router-dom'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import SearchBar from '../../components/ui/SearchBar'


function AllUserIntegration() {

        const [orgId,setOrgId] = useState('')
        const logOut = useLogOut()
        const {URL,isLoading,setIsLoading} = useAppContext()
        const [userIntegration,setAllUserIntegration] = useState([])
        const token = localStorage.getItem('token')
        async function handleSearch(){
            try{
                setIsLoading(true)
                if(!token){
                    toast.error("Not authorised")
                    logOut()
                }
                const response = await fetch(`${URL}integration/getUserIntegrations?orgId=${orgId}`,{
                     method:"GET",
                    headers:{ 'Content-Type': 'application/json',
                                                "Authorization": `Bearer ${token}`,
                                            },

                })
                if(response.ok){
                    const data = await response.json()
                    console.log(data)
                    setAllUserIntegration(data)
                    setIsLoading(false)
                }
            }catch(e){
                toast.error(`Error ${e}`)
            }
        }

  return (
    <div>
        <PageBreadcrumb pageTitle='User Integration'></PageBreadcrumb>
      <ComponentCard title={'User Integration List'}>
        <>
        <SearchBar 
            value={orgId}
            onChange={(value:string)=>{setOrgId(value)}}
            onSearch={handleSearch}
            placeholder="Search User Integration..."
            searchbtn={true}
            loading = {isLoading}
            className=" justify-end flex gap-2 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
       {/* <div className="mb-4 justify-end flex gap-2">
        <input
          type="text"
          placeholder="Enter Org ID"
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div> */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Integration Id</TableCell>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Integration Name</TableCell>
                 
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" > Integration Description</TableCell>
                 <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Status</TableCell>
              
              
            </TableRow>
          </TableHeader>

          {/* Table Body */}
         

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                
                 
                     {userIntegration?.length>1?
                    
                    userIntegration?.map((item:any,index)=>(
            
                <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" ><Link className="text-blue-500 hover:underline" to={`/userIntegrationById/${item.integrationId}/${orgId}`}>{item.integrationId.length > 10 ? item.integrationId.slice(0, 15) + '...' :item.integrationId}</Link></TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.integrationName}</TableCell>
                    
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.integrationDescription.length > 10 ? item.integrationDescription.slice(0, 30) + '...' :item.integrationDescription}</TableCell>
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
                
            ))
                :
                <TableRow>
                <TableCell colSpan={5} className="px-4 py-3 text-gray-500 text-center text-theme-sm  dark:text-gray-400">Enter OrgId to search for user Integrations</TableCell>
                </TableRow>
                    }
           
          </TableBody>
        </Table>
        
      </div>
    </div>
        </>
      </ComponentCard>
    </div>
  )
}

export default AllUserIntegration

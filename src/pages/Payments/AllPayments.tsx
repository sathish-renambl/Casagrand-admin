import { useEffect } from "react"
import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table"
import { useState } from "react"
import Badge from "../../components/ui/badge/Badge"
import { Link } from "react-router-dom"
import Pagination from "../../components/common/Pagination"
import { useAppContext } from "../../context/appContext"
import { toast } from "react-toastify"
import { useLogOut } from "../../hooks/useLogOut"


function AllPayments() {
    const [payments,setPayments] = useState<Array<String>>([ ])
    const [totalPages,setTotalPages] = useState(1)
    const [currentPage,setCurrentPage] = useState(1)
    const limit = 10
    const logOut = useLogOut()
    const {URL} = useAppContext()
    const token = localStorage.getItem('token')
    async function getPayments(){
        try{
            if(!token){
                                toast.error("Not authorised")
                                logOut()
                            }
        const response = await fetch(`${URL}payment/getAllPayments `,{
            method:"POST",
            headers:{ 'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
            body:JSON.stringify({page:currentPage,limit})
        })

        if(response.ok){
            const data = await response.json()
            console.log("===>",data.totalCount)
             console.log("Data ===>",data)
            setPayments(data.payments)
            setTotalPages(Math.ceil(data.totalCount /limit))
            
        }
        }catch(e){
            toast.error(`error ${e}`)
        }
    }
    useEffect(()=>{
        getPayments()
    },[currentPage])
  return (
    <div>
      <PageBreadcrumb pageTitle="Payment Historys"/>
      <ComponentCard title={"Payment"}>
       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Id</TableCell>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Amount</TableCell>
                 <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Payment Method</TableCell>
                <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Payment ID</TableCell>
                 <TableCell isHeader 
                className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400" >Status</TableCell>
              
              
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
         <></>
           { payments?.map((item:any,index)=>(
            
                <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" ><Link className="text-blue-500 hover:underline" to={`/paymentById/${item.paymentId}`}>{item.orgId.length > 10 ? item.orgId.slice(0, 20) + '...' :item.orgId}</Link></TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.paymentAmount}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.paymentMethod}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.paymentId.length > 10 ? item.paymentId.slice(0, 20) + '...' :item.paymentId}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                        size="sm"
                    color={
                      item.paymentStatus === "SUCCESS"
                        ? "success":item.paymentStatus === "PENDING"?"warning"
                        : "error"
                    }
                  >
                    {item.paymentStatus }
                        

                        </Badge>
                 
                </TableCell>
                </TableRow>
                
            ))}
           
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
    </div>
  )
}

export default AllPayments

// import { useEffect, useState } from "react";
// import Input from "../../components/form/input/InputField";
// import Button from "../../components/ui/button/Button";
// import { useAppContext } from "../../context/appContext";
// import { toast } from "react-toastify";
// import ToolsCard from "../../components/Tools/toolsCard";
// import { DeleteConfirmModal } from "../../components/Modal/deleteModal";
// import { Plus } from "lucide-react";
// import { Modal } from "../../components/ui/modal";

// interface KeyValueItem {
//   key: string;
//   value: string;
//   type: string;
// }

// interface Tool {
//   toolId: string;
//   toolName: string;
//   toolDescription: string;
//   toolStatus: string;
//   toolEndpoint: string;
//   toolType: string;
//   toolBody: KeyValueItem[];
//   toolHeaders: KeyValueItem[];
//   toolParams: KeyValueItem[];
//   toolQuery: KeyValueItem[];
//   toolCreatedBy: string;
//   created_at: string;
//   updated_at: string;
//   toolDefaults: boolean;
//   toolMethod?: string;
//   [key: string]: string | boolean | KeyValueItem[] | undefined;
// }
// function GetTools() {
//   const { URL } = useAppContext();

//   const [Tools, setTools] = useState<Tool[]>([]);

//   const [orgId, setOrgId] = useState<string>("");

//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);

//   const [toolId, setToolId] = useState<string>("");

//   const initialData = {
//     toolId: "",
//     toolName: "",
//     toolDescription: "",
//     toolStatus: "",
//     toolEndpoint: "",
//     toolType: "",
//     toolBody: [],
//     toolCreatedBy: "",
//     created_at: "",
//     updated_at: "",
//     toolHeaders: [],
//     toolParams: [],
//     toolQuery: [],
//     toolDefaults: false,
//   };

//   const [ToolDetails, setdetails] = useState<Tool>({ ...initialData });


//   const [createModalOpen, setModalOpen] = useState(false);


//   const handleOpen = () => {
//     setModalOpen(true);
//   };

//   const handleClose = () => {
//     setModalOpen(false);
//     setdetails({ ...initialData });
//   };

//   const handleDeleteOpen = (toolId: string) => {
//     setToolId(toolId);
//     setDeleteModalOpen(true);
//   };
//   const handleDeleteClose = () => {
//     setDeleteModalOpen(false);
//   };

//   const handlechange = (name: string, value: string) => {
//     setdetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   async function fetchPhones(orgIdSearch: string): Promise<void> {
//     const token = localStorage.getItem("token");

//     // if (!token || !roleId) {
//     //   console.error("Token or Role ID not found in localStorage");
//     //   logOut();
//     //   return;
//     // }

//     try {
//       const response = await fetch(
//         `${URL}tools/getAllPhones?orgId=${orgIdSearch}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();
//       if (response.status === 200) {
//         setTools(data.tools);
//         localStorage.setItem("orgId", orgIdSearch);
//       } else {
//         toast.error("Failed to fetch tools");
//       }

//       // if (response.status === 200) {
//       //   const data = await response.json();
//       //   const screens: Screen[] = data?.role?.supportAccess || data?.role?.agentAccess || [];
//       //   setScreens(screens || []);
//       //   console.log("Access added successfully:", data);

//       //   const result: Option[] = fetchNav();
//       //   const supportPages = screens.map(item => item.pageName);

//       //   console.log("Support Pages:", screensArray);

//       //   const filteredArr = result.filter(item => !supportPages.includes(item.value));

//       //   console.log("Filtered Screens Array:", filteredArr);

//       //   setScreensArray(filteredArr);

//       // } else {
//       //   console.error("Failed to add access:", response.status, response.statusText);
//       // }
//     } catch (error) {
//       console.error("Error occurred while adding access:", error);
//     }
//   }

//     async function createTool() {
//     try {

//       const token = localStorage.getItem("token");

//       const res = await fetch(`${URL}tools/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           orgId: orgId,
//           toolName: ToolDetails.toolName,
//           toolDescription: ToolDetails.toolDescription,
//           toolEndpoint: ToolDetails.toolEndpoint,
//         }),
//       });

//       const data = await res.json();
//       if (res.status === 201) {
//         setTools(data);
//         toast.success("Tool Created Successfully");
//         fetchTools(orgId);
//         handleClose()
//         return;
//       } else {
//         toast.error("Unable to Create Tool");
//       }

      
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function DeleteTool() {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${URL}tools/delete/${toolId}?orgId=${orgId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.status === 200) {
//         handleDeleteClose();
//         fetchTools(orgId);
//         toast.success("Tool Deleted Successfully");
//         return;
//       } else {
//         toast.error("Unable to Delete Tool");
//       }
//     } catch (error) {
//       // setIsLoading(false);
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     const orgIdSearch = localStorage.getItem("orgId");

//     if (orgIdSearch) {
//       fetchTools(orgIdSearch);
//       setOrgId(orgIdSearch);
//     }
//   }, []);

  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">
//       <div className="w-full ">
//         <div className="mb-3">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Get All Phones</h1>
//           <p className="text-gray-600">
//             Discover the best tools and resources to boost your productivity and
//             streamline your workflow
//           </p>
//         </div>

//         {/* Search Section */}
//         <div className="rounded-2xl w-full  p-8 mb-5">
//           <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between">
//             <div className="flex gap-5 w-lg">
//               <div className="flex-1">
//                 <Input
//                   placeholder="Search with OrgId"
//                   className="w-full"
//                   value={orgId}
//                   onChange={(e) => setOrgId(e.target.value)}
//                 />
//               </div>
//               <Button
//                 className="sm:w-auto w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 onClick={() => fetchTools(orgId)}
//               >
//                 Search Tools
//               </Button>
//             </div>
//             <div>
//               <Button updateBtn={true} onClick={handleOpen}>
//                 <Plus /> Create Tool
//               </Button>
//             </div>
//           </div>
//         </div>

   
//       </div>

     
//     </div>
//   );
// }

// export default GetTools;

import React, { useState } from 'react';
import { Search, Plus, Phone, Filter, Download, RefreshCw } from 'lucide-react';
import Input from '../../components/form/input/InputField';
import Select from '../../components/form/Select';

const PhoneManagementUI = () => {
  const [filters, setFilters] = useState({
    orgId: '',
    phoneStatus: '',
    phoneConnectionStatus: '',
    phoneNumberType: '',
    phoneAccessType: '',
    available: '',
    ownedBy: ''
  });

  const [phones, setPhones] = useState([
    {
      id: '1',
      phoneNumber: '+1-555-0123',
      phoneStatus: 'ACTIVE',
      phoneConnectionStatus: 'CONNECTED',
      phoneNumberType: 'LANDLINE',
      phoneAccessType: 'INCOMING',
      available: true,
      ownedBy: 'John Doe',
      orgId: 'org-001'
    },
    {
      id: '2',
      phoneNumber: '+1-555-0124',
      phoneStatus: 'INACTIVE',
      phoneConnectionStatus: 'DISCONNECTED',
      phoneNumberType: 'MOBILE',
      phoneAccessType: 'OUTGOING',
      available: false,
      ownedBy: 'Jane Smith',
      orgId: 'org-002'
    },
    {
      id: '3',
      phoneNumber: '+1-555-0125',
      phoneStatus: 'ACTIVE',
      phoneConnectionStatus: 'CONNECTED',
      phoneNumberType: 'VOIP',
      phoneAccessType: 'BIDIRECTIONAL',
      available: true,
      ownedBy: 'Mike Johnson',
      orgId: 'org-001'
    }
  ]);

  const [filteredPhones, setFilteredPhones] = useState(phones);
  const [isLoading, setIsLoading] = useState(false);

const phoneStatusOptions = [
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "INACTIVE", value: "INACTIVE" },
  { label: "SUSPENDED", value: "SUSPENDED" },
  { label: "PENDING", value: "PENDING" }
];

const connectionStatusOptions = [
  { label: "CONNECTED", value: "CONNECTED" },
  { label: "DISCONNECTED", value: "DISCONNECTED" },
  { label: "CONNECTING", value: "CONNECTING" },
  { label: "ERROR", value: "ERROR" }
];

const phoneTypeOptions = [
  { label: "LANDLINE", value: "LANDLINE" },
  { label: "MOBILE", value: "MOBILE" },
  { label: "VOIP", value: "VOIP" },
  { label: "TOLL_FREE", value: "TOLL_FREE" }
];

const accessTypeOptions = [
  { label: "INCOMING", value: "INCOMING" },
  { label: "OUTGOING", value: "OUTGOING" },
  { label: "BIDIRECTIONAL", value: "BIDIRECTIONAL" }
];

const availableOptions = [
  { label: "true", value: "true" },
  { label: "false", value: "false" }
];


  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = phones.filter(phone => {
        return (
          (!filters.orgId || phone.orgId.toLowerCase().includes(filters.orgId.toLowerCase())) &&
          (!filters.phoneStatus || phone.phoneStatus === filters.phoneStatus) &&
          (!filters.phoneConnectionStatus || phone.phoneConnectionStatus === filters.phoneConnectionStatus) &&
          (!filters.phoneNumberType || phone.phoneNumberType === filters.phoneNumberType) &&
          (!filters.phoneAccessType || phone.phoneAccessType === filters.phoneAccessType) &&
          (!filters.available || phone.available.toString() === filters.available) &&
          (!filters.ownedBy || phone.ownedBy.toLowerCase().includes(filters.ownedBy.toLowerCase()))
        );
      });
      
      setFilteredPhones(filtered);
      setIsLoading(false);
    }, 800);
  };

  const clearFilters = () => {
    setFilters({
      orgId: '',
      phoneStatus: '',
      phoneConnectionStatus: '',
      phoneNumberType: '',
      phoneAccessType: '',
      available: '',
      ownedBy: ''
    });
    setFilteredPhones(phones);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
      case 'CONNECTED':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
      case 'DISCONNECTED':
        return 'bg-red-100 text-red-800';
      case 'SUSPENDED':
      case 'CONNECTING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center gap-3">
            <Phone className="text-blue-600" />
            Phone Management System
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and monitor your organization's phone resources with advanced filtering and search capabilities
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Search & Filter</h2>
          </div>
          
          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {/* Org ID Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Organization ID</label>
              <Input
                type="text"
                placeholder="Enter Org ID"
                // className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={filters.orgId}
                onChange={(e) => handleFilterChange('orgId', e.target.value)}
              />
            </div>

            {/* Phone Status Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Status</label>
              <Select options={phoneStatusOptions} defaultValue={filters.phoneStatus} placeholder="Select Status" onChange={(value) => handleFilterChange('phoneStatus', value)} />
            
            </div>

            {/* Connection Status Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Connection Status</label>
                           <Select options={connectionStatusOptions} defaultValue={filters.phoneConnectionStatus} placeholder="Select Status" onChange={(value) => handleFilterChange('phoneConnectionStatus', value)} />

            
            </div>

            {/* Phone Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Type</label>
            
             <Select options={phoneTypeOptions} defaultValue={filters.phoneNumberType} placeholder="Select Status" onChange={(value) => handleFilterChange('phoneNumberType', value)} />
  
             
            </div>

            {/* Access Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Access Type</label>
              
             <Select options={accessTypeOptions} defaultValue={filters.phoneAccessType} placeholder="Select Status" onChange={(value) => handleFilterChange('phoneAccessType', value)} />
              
            </div>

            {/* Available Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Available</label>
            
                         <Select options={phoneTypeOptions} defaultValue={filters.phoneNumberType} placeholder="Select Status" onChange={(value) => handleFilterChange('phoneNumberType', value)} />

              {/* <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={filters.available}
                onChange={(e) => handleFilterChange('available', e.target.value)}
              >
                <option value="">All</option>
                {availableOptions.map(option => (
                  <option key={option} value={option}>
                    {option === 'true' ? 'Available' : 'Not Available'}
                  </option>
                ))}
              </select> */}
            </div>

            {/* Owned By Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Owned By</label>
              <input
                type="text"
                placeholder="Enter owner name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={filters.ownedBy}
                onChange={(e) => handleFilterChange('ownedBy', e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-end">
            <div className="flex gap-4">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
                {isLoading ? 'Searching...' : 'Search Phones'}
              </button>
              
          
            </div>

           
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100">
          {/* Results Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-900">
                Phone Results ({filteredPhones.length})
              </h3>
              <div className="text-sm text-gray-500">
                Showing {filteredPhones.length} of {phones.length} phones
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Connection</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Access</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Org ID</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPhones.map((phone) => (
                  <tr key={phone.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {phone.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(phone.phoneStatus)}`}>
                        {phone.phoneStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(phone.phoneConnectionStatus)}`}>
                        {phone.phoneConnectionStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {phone.phoneNumberType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {phone.phoneAccessType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${phone.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {phone.available ? 'Available' : 'Not Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {phone.ownedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {phone.orgId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredPhones.length === 0 && (
            <div className="text-center py-12">
              <Phone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No phones found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneManagementUI;
// Main UserID Component (refactored and completed)
import React, { useState, useEffect } from 'react';
import { Building, Mail, CreditCard, FileText, User, Contact } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Blank from '../../components/ui/Blank';
import { useAppContext } from '../../context/appContext';
import { useLogOut } from '../../hooks/useLogOut';
import { Modal } from '../../components/ui/modal/index';
import FormData from '../../components/UsersbyID/FormData';
import { getUpdatedFields } from '../../utils/updateFields';
import { schemas } from "../../components/UsersbyID/formConfig"; 
import SearchBar from '../../components/ui/SearchBar';
import { TabButton } from '../../components/UsersbyID/TabButton';
import { OverviewTab } from '../../components/UsersbyID/OverviewTab';
import { ContactTab } from '../../components/UsersbyID/ContactTab';
import { PlanTab } from '../../components/UsersbyID/PlanTab';
import { DirectorTab } from '../../components/UsersbyID/DirectorTab';
import { DocumentsTab } from '../../components/UsersbyID/DocumentsTab';
import { TabKey, UserData } from '../../components/UsersbyID/userTypes';
import { toast } from "react-toastify";
// import { useModal } from '../../hooks/useModal';
// import FileUpload from '../../components/common/FileUpload';
// import Button from '../../components/ui/button/Button';
import { AddressTab } from '../../components/UsersbyID/AddressTab';


const UserID = () => {
  const { token, URL } = useAppContext();
  const logOut = useLogOut();
  const location = useLocation();
  const {state}=location
  const [orgId, setOrgId] = useState<string>();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [data, setData] = useState<UserData | any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSection, setEditSection] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  

  useEffect(() => {
    const storedOrgId = localStorage.getItem('orgId');
    if(state && state?.orgId)
    {
      fetchUserData(token as string, state?.orgId);
      setOrgId(state.orgId)
    }
    else if (storedOrgId) {
      fetchUserData(token as string, storedOrgId);
      setOrgId(storedOrgId);
    }
  }, []);


  const fetchUserData = async (token: string, orgId: string) => {
    console.log("Fetching user data with token:", token);
    setLoading(true);
    try {
      const response = await fetch(`${URL}users/${orgId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userData: UserData = await response.json();
        console.log("Agent Data ===>", userData);
        setData(userData);
        console.log("===>",userData)
      } else if (response.status === 401 || response.status === 403) {
        console.warn('Unauthorized access. Logging out...');
        logOut();
      } else {
        toast.error(`User Not Found`);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'companyAddress', label: 'Address', icon: Contact },
    { id: 'plan', label: 'Plan & Billing', icon: CreditCard },
    { id: 'director', label: 'Director Info', icon: User },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const handleEdit = (section: UserData) => {
    setEditSection(section);
    setIsModalOpen(true);
  };

  const handleSearch = async (e?: React.MouseEvent | React.KeyboardEvent): Promise<void> => {
    if (e) e.preventDefault();
    const str=orgId ?? ""
    const trimmedTerm = str.trim();
    if (!trimmedTerm) return;
    localStorage.setItem('orgId', trimmedTerm);
    await fetchUserData(token as string, trimmedTerm);
  };





  const handleUpdate = async (updatedData: UserData) => { 
    if (!orgId) return;
    if (Object.keys(updatedData).length === 0) return;
    
    console.log("Function call for update");   
    console.log("Updating user data for orgId:", orgId, "with data:", updatedData);
    
    setUpdateLoading(true);
    try {
      const response = await fetch(`${URL}users/updateUser/${orgId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        fetchUserData(token as string, orgId);
        setIsModalOpen(false);
        setEditSection(null);
        toast.success('User updated successfully');
      } else if (response.status === 401 || response.status === 403) {
        console.warn('Unauthorized access. Logging out...');
        logOut();
      } else {
        console.error(`Update failed: ${response.status}`);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditSection(null);
  };

  const renderTabContent = () => {
    const commonProps = {
      data,
      onEdit: handleEdit,
      formatDate,
      getStatusColor,
      showPassword,
      setShowPassword
    };

    switch (activeTab) {
      case 'overview':
        return <OverviewTab {...commonProps} />;
      case 'contact':
        return <ContactTab {...commonProps} />;
      case 'companyAddress':
        return <AddressTab {...commonProps} />;
      case 'plan':
        return <PlanTab {...commonProps} />;
      case 'director':
        return <DirectorTab {...commonProps} />;
      case 'documents':
        return <DocumentsTab {...commonProps} />;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  if (loading && !data.id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading user data...</div>
      </div>
    );
  }

  return (
    <Blank title='User by Id'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
              <p className="text-gray-600">Manage user information and settings</p>
            </div>
            
            {/* Search Bar */}
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <SearchBar
                value={orgId ?? ""}
                onChange={setOrgId}
                onSearch={handleSearch}
                placeholder="Search users..."
                searchbtn={true}
                loading={loading}
                bodycls='w-120'
              />
            </div>
          </div>
        </div>

        {/* User Basic Info Card */}
        {data && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
             <div className="flex justify-between  w-full items-center">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base text-gray-700">Name:</span>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {data.directorName || 'N/A'}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base text-gray-700">OrgId:</span>
                    <p className="text-gray-600 font-semibold">{data.orgId || 'N/A'}</p>
                  </div>
                    <div className="flex items-center space-x-2">
                    <span className="text-base text-gray-700">Email:</span>
                    <p className="text-gray-600 font-semibold">{data.directorEmail || 'N/A'}</p> 
                  </div>
                   {/* <p className="text-gray-600">{data.orgId || 'N/A'}</p>
                   <p className="text-gray-600">{data.directorEmail || 'N/A'}</p> */}
                </div>

                {data.status && (
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border  ${getStatusColor(
                      data.status
                    )}`}
                  >
                    {data.status}
                  </span>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border ">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 mt-5 mb-5" aria-label="Tabs">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id as TabKey)}
                />
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Edit Modal */}
          {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="max-w-5xl p-3 mx-auto bg-white rounded-3xl shadow-lg"
          showCloseButton={true}
          isFullscreen={false}
        >
            <div className="p-6 py-4 border-b flex flex-row justify-between bg-white">
              <h2 className="text-2xl font-semibold">Edit Section</h2>
              {/* {activeTab === 'documents' && 
              <Button variant='outline' className='align-middle justify-end ' onClick={()=>openModal()}><PlusCircle/> Upload</Button>
              } */}
              
            </div>
            <div className='p-6 max-h-[70vh] scrollbar-thin overflow-y-auto'>
            <FormData
              onSubmit={(data:any) => {
                const payLoad = activeTab === 'companyAddress' ?{companyAddress:data}:getUpdatedFields(editSection || {}, data)
                handleUpdate(payLoad)
                console.log('Submitted data:', getUpdatedFields(editSection || {}, data));
               // setIsModalOpen(false);
              }}
              isLoading={false}
              submitButtonText="Submit"
              defaultValues={editSection || {}}
              fields={ activeTab as 'overview' | 'contact' | 'companyAddress' | 'director' | 'documents'}
              schema={schemas[activeTab as keyof typeof schemas] as import('yup').ObjectSchema<any>}
            />
            </div>
        </Modal>
      )}
       
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results</h3>
            <div className="space-y-3">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setOrgId(result.id);
                    localStorage.setItem('orgId', result.id);
                    setSearchResults([]);
                  }}
                >
                  <div>
                    <p className="font-medium text-gray-900">{result.name}</p>
                    <p className="text-sm text-gray-600">{result.email}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {result.status && (
                      <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(result.status)}`}>
                        {result.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Blank>
  );
};

export default UserID;
import React, { useEffect, useState } from 'react';
import { Plus, Monitor, Trash2} from 'lucide-react';
import PermissionToggle from '../../components/screenCOnfig/permissionToggle';
import StatCard from '../../components/screenCOnfig/statCard';
import { useAppContext } from '../../context/appContext';
import Select from '../../components/form/Select';
import { useLogOut } from '../../components/encryption/encryption';
import { DeleteConfirmModal } from '../../components/Modal/deleteModal';
import { useSidebar } from '../../context/SidebarContext';
import TabBar from '../../components/screenCOnfig/tabNavigation';
import { toast } from 'react-toastify';

interface Screen {
  pageName: string;
  pageAccess: 'READ' | 'WRITE' | 'BLOCK';
}

interface Option {
  label: string;
  value: string;
}



const ScreenConfiguration: React.FC = () => {
  const [screensArray, setScreensArray] = useState<Option[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [newScreenName, setNewScreenName] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

    const [activeTab, setActiveTab] = useState("supportAccess");


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const {URL}=useAppContext()
  const {sidebarItems}=useSidebar()



const logOut= useLogOut();

  const togglePermission = (screenName: string, permission: 'READ' | 'WRITE' | 'BLOCK'): void => {
   
    addScreen(permission, screenName);
  };




 


  console.log("Screens:", screens);

  function findPathByName(name: string): string | undefined {
  for (const item of sidebarItems) {
    // Check if it's a direct path
    if (item.name === name && 'path' in item && item.path) {
      return item.path;
    }

    // Check in subItems
    if (item.subItems) {
      for (const subItem of item.subItems) {
        if (subItem.name === name) {
          return subItem.path;
        }
      }
    }
  }

  return undefined; // Not found
}




 async function addScreen(type: string, newScreenName: string): Promise<void> {
  const token = localStorage.getItem('token');
  const roleId = localStorage.getItem('roleId');

  

  if (!token || !roleId) {
    console.error("Token or Role ID not found in localStorage");
    logOut();
    return;
  }

  const pathName=findPathByName(newScreenName)

  const payload = 
    {
      pageName: newScreenName,
      pageAccess: type,
      roleId: roleId,
      pathName:pathName,
      updatedField: activeTab
    }
  

  try {
    const response = await fetch(`${URL}admin/addAccess`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Access added successfully:", data);
      fetchScreens(); // Refresh the screens after adding a new one
      setShowAddForm(false); 
      setNewScreenName('');
      toast.success("Access added successfully");
    } else {
      toast.error("Failed to add access");
      console.error("Failed to add access:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while adding access:", error);
  }
}


 async function deleteScreen( ): Promise<void> {
  const token = localStorage.getItem('token');
  const roleId = localStorage.getItem('roleId');

  
  if (!token || !roleId) {
    console.error("Token or Role ID not found in localStorage");
    logOut();
    return;
  }
  setIsDeleting(true);

  const payload = {
      pageName: newScreenName,
      roleId: roleId,
      accessType: activeTab
    }
  

  try {
    const response = await fetch(`${URL}admin/deleteAccess`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (response.status===200) {
      const data = await response.json();
      console.log("Access added successfully:", data);
      fetchScreens(); // Refresh the screens after adding a new one
      setShowAddForm(false); 
      setNewScreenName('');
      handleDeleteClose();
      setIsDeleting(false);
      toast.success("Deleted successfully")
    } else {
      toast.error("Failed to delete")
      console.error("Failed to add access:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while adding access:", error);
  }
}

async function fetchScreens(): Promise<void> {
  const token = localStorage.getItem('token');
  const roleId = localStorage.getItem('roleId');

  if (!token || !roleId) {
    console.error("Token or Role ID not found in localStorage");
    logOut();
    return;
  }



  try {
    const response = await fetch(`${URL}admin/getAccess/${roleId}?accessType=${activeTab}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      const screens: Screen[] = data?.role?.supportAccess || data?.role?.agentAccess || [];
      setScreens(screens || []);
      console.log("Access added successfully:", data);
      
      
      const result: Option[] = fetchNav();
      const supportPages = screens.map(item => item.pageName);

      console.log("Support Pages:", screensArray);

      const filteredArr = result.filter(item => !supportPages.includes(item.value));

      console.log("Filtered Screens Array:", filteredArr);


      setScreensArray(filteredArr);

      
    } else {
      console.error("Failed to add access:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error occurred while adding access:", error);
  }
}

useEffect(() => {
  fetchScreens();
},[activeTab])

const fetchNav=()=>{
const result: Option[] = [];

    sidebarItems.forEach((item) => {
      if (item.subItems && item.subItems.length > 0) {
        item.subItems.forEach((sub) => {
          result.push({ label: sub.name.trim(), value: sub.name.trim() });
        });
      } else {
        result.push({ label: item.name.trim(), value: item.name.trim() });
      }
    });

    return result;
}




  return (
    <div className="min-h-screen  p-3">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Screen Access Control</h1>
          <p className="text-gray-600">Manage screen permissions with read, write, and block controls</p>
        </div>

        <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        />

         <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{activeTab === 'supportAccess' ? 'Support' : 'Agent'} Access</h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 ">
          <StatCard label="Total Screens" value={screens.length} />
          <StatCard label="Write Access" value={screens.filter(s => s.pageAccess === 'WRITE').length} color="text-green-600" />
          <StatCard label="Read Only" value={screens.filter(s => s.pageAccess === 'READ').length} color="text-blue-600" />
          <StatCard label="Blocked" value={screens.filter(s => s.pageAccess === 'BLOCK').length} color="text-red-600" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                <Plus size={20} />
                <span>Add New Screen</span>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                {/* <MultiSelect
                  label="Multiple Select Options"
                  options={screensArray}
                  onChange={(values: string[]) => handleSelectChange(values)}
                /> */}
                <Select
                  options={screensArray}
                  onChange={(value: string) => setNewScreenName(value)}
                  className="dark:bg-dark-900"
                />
                <button
                  onClick={()=>{addScreen('WRITE', newScreenName); }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewScreenName('');
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {screens.map((screen, index) => {
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Monitor className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{screen.pageName}</h3>
                        <p className="text-sm text-gray-500">Screen #{index + 1}</p>
                      </div>
                    </div>
                    <button
                      // onClick={() => deleteScreen(screen.pageName)}
                      onClick={() => {setNewScreenName(screen.pageName); setIsDeleteModalOpen(true)}}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                
                </div>

                <div className="p-6 space-y-4">
                  <PermissionToggle screen={screen} type="READ" toggle={togglePermission}  />
                  <PermissionToggle screen={screen} type="WRITE" toggle={togglePermission} />
                  <PermissionToggle screen={screen} type="BLOCK" toggle={togglePermission} />
                </div>
              </div>
            );
          })}
        </div>

        {screens.length === 0 && (
          <div className="text-center py-16">
            <Monitor size={64} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No screens configured</h3>
            <p className="text-gray-600 mb-6">Add your first screen to start managing permissions</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add First Screen
            </button>
          </div>
        )}
      </div>
      <DeleteConfirmModal
           isOpen={isDeleteModalOpen}
           onClose={() => setIsDeleteModalOpen(false)}
           onConfirm={() => deleteScreen()}
           itemName={newScreenName} // Optional: specific item name
           isLoading={isDeleting}
         />
    </div>
  );

};

export default ScreenConfiguration;

// Helper Components





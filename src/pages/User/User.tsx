import { useEffect, useState } from 'react';
import Blank from '../../components/ui/Blank';
import { useAppContext } from '../../context/appContext';
import { useLogOut } from '../../hooks/useLogOut';
import UserTable, { User } from '../../components/User/UserTable';
import UserFilters, { statusOptions } from '../../components/User/UserFilter';
import { toast } from "react-toastify";
import Pagination from "../../components/common/Pagination"

const UserComponent: React.FC = () => {
  const { URL, token } = useAppContext();
  const logOut = useLogOut();
  const [userData, setUserData] = useState<User[]>([]);
  const [pageData, setPageData] = useState<string | undefined>("1");
  
  // Filter states
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);

  const [totalPages,setTotalPages] = useState(5)
  const [currentPage,setCurrentPage] = useState(1)
  const limit = 10


  useEffect(() => {
      const today = new Date();
      const formatted = today.toISOString().split("T")[0];
    if (token) {
      fetchAllUsers(token);
      setStartDate(formatted)
      setEndDate(formatted)
    } else {
      console.log('Token not found. Please log in.');
    }
  }, [token, currentPage]);

  async function fetchAllUsers(token: string) {
    try {
      const res = await fetch(`${URL}users/getAllUsers`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            page: currentPage,
            limit 
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log("====>",data)
        setUserData(data.users);
        setTotalPages(Math.ceil(data.total / limit))
        console.log("Limit ===>",Math.ceil(data.total / limit))
      } else if (res.status === 401 || res.status === 403) {
        console.log('Unauthorized access. Please log in again.');
        logOut();
      } else {
        console.log(`Unexpected error: ${res.status}`);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }

  async function searchUsers() {
    try {
      const payload: any = {
      };
      if (true) {
        if(selectedStatus) payload.status = selectedStatus;
        if (startDate) payload.fromDate = startDate;
        if (endDate) payload.toDate = endDate;
      } 
      console.log("Search payload:", payload);

      // API call
      const res = await fetch(`${URL}users/getAllUsers`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        const data= await res.json();
        console.log("Search results:", data);
        setUserData(data.users);
        setTotalPages(Math.ceil(data.total / limit))
        toast.success('Search completed successfully!');
      }else if (res.status === 401 || res.status === 403) {
        toast.error('Unauthorized access. Please log in again.');
        console.warn('Unauthorized access. Logging out...');
        logOut();
      }  else {
        console.log(`Search error: ${res.status}`);
      }
    } catch (error) {
      console.error('Search failed:', error);
      // For demo purposes, just filter existing data
      if (userData) {
        let filteredData = userData;
        if (selectedStatus) {
          filteredData = userData.filter(user => user.status === selectedStatus);
        }
        setUserData(filteredData);
      }
    }
  }

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setSelectedStatus("");
    setIsStatusDropdownOpen(false);
    if (token) {
      fetchAllUsers(token);
    }
  };

  return (
    <Blank title="User">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage and monitor your users</p>
        </div>
      </div>

      {/* Filter Section */}
      <UserFilters
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        isStatusDropdownOpen={isStatusDropdownOpen}
        setIsStatusDropdownOpen={setIsStatusDropdownOpen}
        onSearch={searchUsers}
        onReset={handleReset}
      />

      {/* Table */}
      <UserTable userData={userData ?? []} />
            <Pagination 
        totalPages={totalPages}
        
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        maxVisiblePages={5} />
    </Blank>
  );
};

export default UserComponent;
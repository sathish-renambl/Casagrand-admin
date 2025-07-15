import React,{useState, useEffect} from 'react'
import Blank from '../../components/ui/Blank'
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { useLogOut } from '../../hooks/useLogOut';

const UserAgentbyId: React.FC = () => {
    const { URL } = useAppContext();
    const logOut = useLogOut();
    const location = useLocation();
    const {state}=location
    const [orgId, setOrgId] = useState<string>();
  return (
    <Blank title="User Agent ID">
      <div className="flex items-center justify-center h-full py-10">
        <p className="text-gray-500">No data available</p>
      </div>
    </Blank>
  )
}

export default UserAgentbyId

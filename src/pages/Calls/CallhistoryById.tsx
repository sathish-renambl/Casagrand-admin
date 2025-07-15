import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { useNavigate, useParams } from 'react-router-dom';

interface CallRecord {
  callId: string;
  agentName: string;
  agentId: string;
  callType: string;
  phoneNo: string;
  callStatus: string;
  callDate: string;
  callDuration: number;
  callTime?: string;
  userAgentId?: string;
  ringGroupId?: string;
  orgId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const CallhistoryById: React.FC = () => {
  const { URL } = useAppContext();
  const { callId } = useParams<{ callId: string }>();
  const [inputCallId, setInputCallId] = useState<string>('');
  const [callData, setCallData] = useState<CallRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchCallById = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}callHistory/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (response.status === 200 && data) {
        setCallData(data);
      }

      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate('/login');
        return;
      }
    } catch (error: any) {
      alert(error.message || 'Failed to fetch call history');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSearch = () => {
    if (inputCallId.trim()) {
      fetchCallById(inputCallId.trim());
    }
  };

  useEffect(() => {
  if (callId && !callId.startsWith(':')) {
    setInputCallId(callId);
    fetchCallById(callId);
  } else {
    setInputCallId('');
    setCallData(null);
    setSearched(false);
  }
}, [callId]);


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight"> Call History By Call ID</h2>

      <div className="flex items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter Call ID"
          value={inputCallId}
          onChange={(e) => setInputCallId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition shadow"
        >
          Search
        </button>
      </div>

      {loading ? (
  <p className="text-gray-600">Loading call details...</p>
) : callData ? (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 max-w-5xl mx-auto space-y-8">
    <h2 className="text-lg font-semibold text-gray-800">Call Details</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-800">
      <div>
        <p className="font-medium text-gray-600">Call ID</p>
        <p>{callData.callId}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Agent</p>
        <p>{callData.agentName} ({callData.agentId})</p>
      </div>

      <div>
        <p className="font-medium text-gray-600">Phone Number</p>
        <p>{callData.phoneNo}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Call Type</p>
        <p>{callData.callType}</p>
      </div>

      <div>
        <p className="font-medium text-gray-600">Call Time</p>
        <p>{callData.callTime}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Duration</p>
        <p>{callData.callDuration} sec</p>
      </div>

      <div>
       <p className="font-medium text-gray-600">Status</p>
<p>
  <span
    className={`inline-block px-3 py-1 text-xs font-medium rounded-full
      ${
        ['success', 'completed'].includes(callData.callStatus.toLowerCase())
          ? 'bg-green-100 text-green-700'
          : ['failed', 'failure'].includes(callData.callStatus.toLowerCase())
          ? 'bg-red-100 text-red-700'
          : 'bg-gray-100 text-gray-700'
      }`}
  >
    {callData.callStatus}
  </span>
</p>

      </div>
    </div>

    <hr className="my-4" />

    <h2 className="text-lg font-semibold text-gray-800">Meta Info</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-800">
      <div>
        <p className="font-medium text-gray-600">User Agent ID</p>
        <p>{callData.userAgentId}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Ring Group ID</p>
        <p>{callData.ringGroupId}</p>
      </div>

      <div>
        <p className="font-medium text-gray-600">Org ID</p>
        <p>{callData.orgId}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Call Date</p>
        <p>{callData.callDate}</p>
      </div>

      <div>
        <p className="font-medium text-gray-600">Created At</p>
        <p>{callData.createdAt}</p>
      </div>
      <div>
        <p className="font-medium text-gray-600">Updated At</p>
        <p>{callData.updatedAt}</p>
      </div>
    </div>
  </div>
) : searched ? (
  <p className="text-red-500 text-sm mt-4">No call found with the provided ID.</p>
) : (
  <p className="text-gray-400 text-sm mt-4">Please enter a Call ID to view details.</p>
)}


    </div>
  );
};

export default CallhistoryById;

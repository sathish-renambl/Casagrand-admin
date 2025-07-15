// import React, { useEffect, useState } from 'react';
// // Update the import path below to the correct location of your appContext file
// import { useAppContext } from '../../context/appContext';


// interface CallRecord {
//   id: string;
//   caller: string;
//   receiver: string;
//   timestamp: string;
//   duration: number;
// }

// const Callhistory: React.FC = () => {
//   const { URL } = useAppContext();
//   const [callHistory, setCallHistory] = useState<CallRecord[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchCallHistory = async () => {

//       try {
//         const response = await fetch(`${URL}/callHistory/getAll`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             page: 1,
//             limit: 10,
//             orgId: 'string',
//             callType: 'INCOMING',
//             callStatus: 'SUCCESS',
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data: CallRecord[] = await response.json();
//         setCallHistory(data);
//       } catch (error: any) {
//         alert(error.message || 'Failed to fetch call history');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCallHistory();
//   }, [URL]);

//   if (loading) return <div>Loading call history...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Call History</h2>
//       <ul className="space-y-2">
//         {callHistory.map((call) => (
//           <li key={call.id} className="border p-3 rounded-md shadow-sm">
//             <p><strong>Caller:</strong> {call.caller}</p>
//             <p><strong>Receiver:</strong> {call.receiver}</p>
//             <p><strong>Time:</strong> {new Date(call.timestamp).toLocaleString()}</p>
//             <p><strong>Duration:</strong> {call.duration} sec</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Callhistory;

import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';

interface CallRecord {
  id: string;
  agentName: string;
  agentId: string;
  callType: string;
  phoneNo: string;
  callStatus: string;
  callDate: string;
  callDuration: number;
}


const Callhistory: React.FC = () => {
  const { URL } = useAppContext();
  const [callHistory, setCallHistory] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [orgId, setOrgId] = useState<string>('');

  const fetchCallHistory = async (orgIdFilter: string = '') => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}callHistory/getAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          page: 1,
          limit: 10, 
          orgId: orgIdFilter,
  
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setCallHistory(data.data);
    } catch (error: any) {
      alert(error.message || 'Failed to fetch call history');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all call history on component mount
  useEffect(() => {
    fetchCallHistory(orgId);
  }, []);

  // Handle orgId search
  const handleSearch = () => {
    fetchCallHistory(orgId.trim());
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4"> Call History</h2>

      <div className="mb-4 flex gap-2">
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
      </div>

      {loading ? (
        <div>Loading call history...</div>
      ) : callHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
               <th className="p-3">Agent Name</th>
    <th className="p-3">Agent ID</th>
    <th className="p-3">Call Type</th>
    <th className="p-3">Phone No</th>
    <th className="p-3">Call Status</th>
    <th className="p-3">Call Date</th>
    <th className="p-3">Duration (sec)</th>
              </tr>
            </thead>
            <tbody>
              {callHistory.map((call) => (
                <tr key={call.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{call.agentName}</td>
                  <td className="p-3">{call.agentId}</td>
                <td className="p-3">{call.callType}</td>
                  <td className="p-3">{call.phoneNo}</td>
                  <td className="p-3">{call.callStatus}</td>
                  <td className="p-3">{call.callDate}</td>
                  <td className="p-3">{call.callDuration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No call history found.</p>
      )}
    </div>
  );
};

export default Callhistory;

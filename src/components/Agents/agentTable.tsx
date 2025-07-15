// import { useState } from 'react';
// import {
//   SettingsIcon,
//   UsersIcon,
//   TagIcon,
//   EditIcon,
//   TrashIcon,
//   CalenderIcon,
//   // EyeIcon
// } from "../../icons";
// import { Agent } from '../../components/Agents/agentType';
// // import  Button  from '../../components/ui/button/Button';


// const API_URL = import.meta.env.VITE_API_URL;

// interface AgentTableProps {
//   agents?: Agent[];
// }

// const AgentTable: React.FC<AgentTableProps> = ({ agents = [] }) => {
//   const [agentDetail, setAgentDetail] = useState<Agent | null>(null);

//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getCategoryColor = (category: Agent['agentCategory']): string => {
//     const colors: Record<Agent['agentCategory'], string> = {
//       conversational: 'bg-blue-100 text-blue-800',
//       analytical: 'bg-green-100 text-green-800',
//       creative: 'bg-purple-100 text-purple-800',
//       utility: 'bg-orange-100 text-orange-800'
//     };
//     return colors[category] || 'bg-gray-100 text-gray-800';
//   };

//   const getUniqueCategories = (): number => {
//     return new Set(agents.map(agent => agent.agentCategory)).size;
//   };

//   const getTotalTags = (): number => {
//     return agents.reduce((acc, agent) => acc + (agent.agentTags?.length || 0), 0);
//   };

//   const handleAddNewAgent = (): void => {
   
//     console.log('Add new agent clicked');
//   };

//   const handleViewAgent = async (agentId: string): Promise<void> => {
//     try {
//       const res = await fetch(`${API_URL}agents/${agentId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (res.status === 200) {
//         const data: Agent = await res.json(); 
//         console.log("Agent Data ===>", data);
//         setAgentDetail(data); 
//       } else if (res.status === 401) {
//         console.log('Unauthorized access. Please log in again.');
//       } else {
//         console.log(`Unexpected error: ${res.status}`);
//       }
//     } catch (error) {
//       console.error('Failed to fetch agent:', error);
//     }

//     console.log('View agent:', agentId);
//   };

//   const handleEditAgent = (agentId: string): void => {
//     // Add your logic for editing agent
//     console.log('Edit agent:', agentId);
//   };

//   const handleDeleteAgent = (agentId: string): void => {
//     // Add your logic for deleting agent
//     console.log('Delete agent:', agentId);
//   };

//   return (
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
//               <p className="text-gray-600 mt-2">Manage and monitor your AI agents</p>
//             </div>
//             <button 
//               onClick={handleAddNewAgent}
//               className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//             >
//               <SettingsIcon className="w-4 h-4" />
//               <span>Add New Agent</span>
//             </button>
//            {/* <Button variant="outline" >Click Me</Button> */}
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <SettingsIcon className="w-6 h-6 text-blue-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Agents</p>
//                 <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <UsersIcon className="w-6 h-6 text-green-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Active Agents</p>
//                 <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <CalenderIcon className="w-6 h-6 text-yellow-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Categories</p>
//                 <p className="text-2xl font-bold text-gray-900">{getUniqueCategories()}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <TagIcon className="w-6 h-6 text-purple-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Tags</p>
//                 <p className="text-2xl font-bold text-gray-900">{getTotalTags()}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default AgentTable;


"use client";
import React, { useState, useEffect } from 'react';
import { Phone, Users, Clock, TrendingUp, User, PhoneCall } from 'lucide-react';
import Badge from "../ui/badge/Badge";

interface CallStats {
  totalCalls: number;
  activeCalls: number;
  pendingCalls: number;
  avgCallDuration: string;
}

interface Department {
  id: string;
  name: string;
  icon: string;
  badge: {
    text: string;
    variant: "solid" | "outline";
    color: "success" | "warning" | "danger" | "info";
  };
  metrics: {
    todayCalls: number;
    metric1: string;
    metric1Value: string | number;
    metric2: string;
    metric2Value: string | number;
    metric3: string;
    metric3Value: string | number;
    metric4: string;
    metric4Value: string | number;
  };
  lastUpdated: string;
}

interface RecentCall {
  id: string;
  phoneNumber: string;
  timestamp: string;
  duration: string;
  status: 'completed' | 'missed' | 'ongoing';
}

// Dashboard data in JSON format
const dashboardData = {
  header: {
    title: "Analytics Dashboard",
    description: "Real-time call performance metrics"
  },
  callStats: {
    totalCalls: 1247,
    activeCalls: 23,
    pendingCalls: 8,
    avgCallDuration: "4:23"
  },
  departments: [
    {
      id: "lead-gen",
      name: "Lead Generation",
      icon: "TrendingUp",
      badge: {
        text: "Active",
        variant: "solid",
        color: "success"
      },
      metrics: {
        todayCalls: 142,
        metric1: "Conversion Rate",
        metric1Value: "23.5%",
        metric2: "Hot Leads",
        metric2Value: 18,
        metric3: "Follow-ups",
        metric3Value: 67,
        metric4: "New Leads",
        metric4Value: 42
      },
      lastUpdated: "2 mins ago"
    },
    {
      id: "customer-support",
      name: "Customer Support",
      icon: "Users",
      badge: {
        text: "Active",
        variant: "solid",
        color: "success"
      },
      metrics: {
        todayCalls: 89,
        metric1: "Queue Length",
        metric1Value: 5,
        metric2: "Escalations",
        metric2Value: 3,
        metric3: "Callbacks",
        metric3Value: 12,
        metric4: "Satisfaction",
        metric4Value: "92%"
      },
      lastUpdated: "1 min ago"
    }
  ],
  recentCalls: [
    {
      id: "call-1",
      phoneNumber: "+91 98765 43210",
      timestamp: "10:23:45 AM",
      duration: "2:45",
      status: "completed"
    },
    {
      id: "call-2",
      phoneNumber: "+91 87654 32109",
      timestamp: "10:15:22 AM",
      duration: "1:30",
      status: "missed"
    },
    {
      id: "call-3",
      phoneNumber: "+91 76543 21098",
      timestamp: "9:58:11 AM",
      duration: "5:12",
      status: "completed"
    },
    {
      id: "call-4",
      phoneNumber: "+91 65432 10987",
      timestamp: "9:42:33 AM",
      duration: "3:18",
      status: "ongoing"
    },
    {
      id: "call-5",
      phoneNumber: "+91 54321 09876",
      timestamp: "9:25:07 AM",
      duration: "4:56",
      status: "completed"
    }
  ]
};

const AgentTable: React.FC = () => {
  const [callStats, setCallStats] = useState<CallStats>(dashboardData.callStats);
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>(dashboardData.recentCalls);

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="h-6 w-6 text-black" />;
      case 'Users': return <Users className="h-6 w-6 text-black" />;
      case 'Phone': return <Phone className="h-6 w-6 text-blue-700" />;
      case 'Clock': return <Clock className="h-6 w-6 text-purple-600" />;
      case 'PhoneCall': return <PhoneCall className="h-6 w-6 text-green-600" />;
      default: return <User className="h-6 w-6 text-black" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'missed': return 'text-red-400';
      case 'ongoing': return 'text-yellow-400';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-2">
          <div className="mb-2">
            <h1 className="text-2xl font-bold">{dashboardData.header.title}</h1>
            <p className="text-gray-600">{dashboardData.header.description}</p>
          </div>
        </div>

        {/* Call Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-colors border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Calls</p>
                <p className="text-2xl font-bold text-black">{callStats.totalCalls.toLocaleString()}</p>
              </div>
              <div className="bg-blue-300 p-3 rounded-full">
                <Phone className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-colors border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Call Duration</p>
                <p className="text-2xl font-bold text-black">{callStats.avgCallDuration}</p>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-colors border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Calls</p>
                <p className="text-2xl font-bold text-black">{callStats.activeCalls}</p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <PhoneCall className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-colors border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Calls</p>
                <p className="text-2xl font-bold text-black">{callStats.pendingCalls}</p>
              </div>
              <div className="bg-red-200 p-3 rounded-full">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Active Agents
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardData.departments.map((dept) => (
              <div key={dept.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-colors border border-gray-200 relative">
                <div className="absolute top-6 right-6">
                  <Badge variant={dept.badge.variant} color={dept.badge.color} size="md">
                    {dept.badge.text}
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-3">
                      {getIconComponent(dept.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">{dept.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Today's Calls</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.todayCalls}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{dept.metrics.metric1}</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.metric1Value}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{dept.metrics.metric2}</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.metric2Value}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{dept.metrics.metric3}</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.metric3Value}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last updated: {dept.lastUpdated}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Calls */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Recent Calls Activity
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Phone Number</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Time</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentCalls.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-black font-mono">{call.phoneNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{call.timestamp}</td>
                      <td className="py-3 px-4 text-gray-700">{call.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`capitalize font-medium ${getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentTable;
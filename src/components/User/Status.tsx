import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusColors: Record<string, string> = {
    "Registration Started": "bg-blue-100 text-blue-800",
    "Basic Details Completed": "bg-indigo-100 text-indigo-800",
    "Document Upload Pending": "bg-yellow-100 text-yellow-800",
    "Document Uploaded": "bg-cyan-100 text-cyan-800",
    "Document Verification Pending": "bg-orange-100 text-orange-800",
    "Document Rejected": "bg-red-100 text-red-800",
    "Document Resubmission Pending": "bg-pink-100 text-pink-800",
    "Active": "bg-green-100 text-green-800",
    "Suspended": "bg-red-100 text-red-800",
    "Inactive": "bg-gray-100 text-gray-800"
  };

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        statusColors[status] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
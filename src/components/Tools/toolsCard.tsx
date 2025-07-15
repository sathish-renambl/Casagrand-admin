import { Activity, Check, Copy, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Tool {
  toolId: string;
  toolName: string;
  toolDescription: string;
  toolStatus: string;
  toolEndpoint: string;
}

interface ToolsCardProps {
  api: Tool;
  index: number;
  orgId: string;
  handleDeleteOpen: (toolId: string) => void;
}

function ToolsCard({ api, index, orgId, handleDeleteOpen }: ToolsCardProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    if (!status) return;
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const copyToClipboard = (text: string, index: number): void => {
    setActiveCardIndex(index);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCardClick = () => {
    navigate(`/getToolsById`, { state: { toolId: api.toolId, orgId: orgId } });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    handleDeleteOpen(api.toolId);
  };


  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    copyToClipboard(api.toolEndpoint, index);
  };

  return (
    <div 
      key={index} 
      className="bg-white rounded-lg cursor-pointer border mb-5 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-200 group relative"
      onClick={handleCardClick}
    >
    

      {/* Card Header */}
      <div className="p-6 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {api.toolName}
          </h3>
          <div className="flex items-center space-x-2">
            {/* Status Badge */}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                api.toolStatus
              )}`}
            >
              <Activity className="w-3 h-3 mr-1" />
              {api.toolStatus}
            </span>

            {/* Delete Button */}
            <button
              onClick={handleDeleteClick}
              className="inline-flex items-center justify-center p-1.5 text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 opacity-0 group-hover:opacity-100"
              title="Delete tool"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mt-2 text-sm">
          {api.toolDescription}
        </p>
      </div>

      {/* Card Content */}
      <div className="px-6 pb-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Endpoint
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-2 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-700 font-mono break-all">
              {api.toolEndpoint}
            </div>
            <button
              onClick={handleCopyClick}
              className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shrink-0"
            >
              {copied && activeCardIndex === index ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsCard;
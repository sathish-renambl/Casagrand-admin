// components/ApiKeyTable.jsx
import React, { useState } from 'react';
import { Trash2, Eye, EyeOff, Copy } from 'lucide-react';
import { DeleteConfirmModal } from '../Modal/deleteModal';

type ApiKey = {
    apiName: string;
    apiDescription: string;
    apiKey: string;
    updated_at: string;
    apiExpiry: string;
    apiKeyStatus: string;
};
    
interface ApiKeyTableProps {
  apiKeys: ApiKey[];
  onDelete: (apiName: string) => void;
  loading: boolean;
}

const ApiKeyTable: React.FC<ApiKeyTableProps> = ({ apiKeys, onDelete, loading }) => {

  // Use hardcoded data instead of props
  const displayApiKeys = apiKeys;

  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKeyDel, setApiKeysDel] =useState<string | null>(null)
   const [apiNameDel, setApiNameDel] =useState<string | null>(null)
  
 


  const toggleKeyVisibility = (apiName: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [apiName]: !prev[apiName]
    }));
  };

  const copyToClipboard = async (key: string, apiName: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(apiName);
      setTimeout(() => setCopiedKey(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatKey = (key: string, apiName: string) => {
    if (visibleKeys[apiName]) {
      return key;
    }
    return key.substring(0, 8) + '•'.repeat(20);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else if (normalizedStatus === 'expired') {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading API keys...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name & Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayApiKeys.map((apiKey: ApiKey, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {apiKey.apiName}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                       <div className="text-xs bg-gray-100 px-2 py-1 rounded font-mono w-60 overflow-hidden overflow-x-auto whitespace-nowrap">
                            {formatKey(apiKey.apiKey, apiKey.apiName)}
                        </div>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.apiName)}
                        className="text-gray-400 hover:text-gray-600"
                        title={visibleKeys[apiKey.apiName] ? "Hide key" : "Show key"}
                      >
                        {visibleKeys[apiKey.apiName] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.apiKey, apiKey.apiName)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {copiedKey === apiKey.apiName && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {apiKey.apiDescription}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(apiKey.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(apiKey.apiExpiry).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(apiKey.apiKeyStatus)}>
                    {apiKey.apiKeyStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {setIsModalOpen(true)
                                  setApiKeysDel(apiKey.apiKey)
                                  setApiNameDel(apiKey.apiName)
                    }}
                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    title="Delete API key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                
                 
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {displayApiKeys.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No API keys found</p>
        </div>
      )}

        <DeleteConfirmModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => {
                                if (apiKeyDel) {
                                  onDelete(apiKeyDel);
                                }
                                setIsModalOpen(false);
                              }}
                    title="Delete API Key"
                    itemName={apiNameDel ?? undefined}
                    message="Are you sure you want to delete this API key? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel" 
                  />
      
    </div>
  );
};

export default ApiKeyTable;
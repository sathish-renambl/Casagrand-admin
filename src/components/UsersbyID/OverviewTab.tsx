// components/UserID/OverviewTab.tsx
import React from 'react';
import { Building, Users, Package, CreditCard, Edit2 } from 'lucide-react';
import { UserData } from './userTypes';
import Button from '../ui/button/Button';

interface OverviewTabProps {
  data: UserData;
  onEdit: (section: UserData) => void;
  getStatusColor: (status: string) => string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ data, onEdit, getStatusColor }) => {
  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              {data.companyLogo ? (
                <img
                  src={data.companyLogo}
                  alt="Company Logo"
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <Building className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.companyName || 'N/A'}</h1>
              <p className="text-gray-500">Organization ID: {data.orgId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(data.status || '')}`}>
              {(data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1) : 'N/A')}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant='ghost'
                size='md'
                updateBtn={true}
                onClick={() => onEdit({
                  companyLogo: data.companyLogo,
                  companyName: data.companyName,
                  status: data.status,
                  companySize: data.companySize,
                  volumeCount: data.volumeCount,
                  companyType: data.companyType,
                  productInfo: data.productInfo,
                })}
              className="flex items-center justify-center p-3 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors rounded-full"
          >
            <Edit2 className="w-5 h-5 text-blue-600" />
          </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Company Size</p>
              <p className="font-semibold text-gray-900">{data.companySize || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Volume Count</p>
              <p className="font-semibold text-gray-900">{data.volumeCount || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Company Type</p>
              <p className="font-semibold text-gray-900">{data.companyType || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-semibold text-gray-900">{data.plan?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information */}
      {data.productInfo && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
          </div>
          <div className="flex items-start space-x-3">
            <Package className="w-5 h-5 text-gray-400 mt-1" />
            <p className="text-gray-900">{data.productInfo}</p>
          </div>
        </div>
      )}
    </div>
  );
};
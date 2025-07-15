import React from 'react';
import { MapPin, Calendar, Edit2, Home, Building, Globe, Mail } from 'lucide-react';
import { UserData } from './userTypes';
import Button from '../ui/button/Button';

interface AddressTabProps {
  data: UserData;
  onEdit: (section: UserData) => void;
  formatDate: (dateString: string) => string;
}

export const AddressTab: React.FC<AddressTabProps> = ({ 
  data, 
  onEdit, 
  formatDate 
}) => {
  return (
    <div className="space-y-6">
      {/* Address Information */}
      {data.companyAddress && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Address Information</h2>
            <Button
              variant='ghost'
              size='md'
              updateBtn={true}
              onClick={() => onEdit({
                ...data.companyAddress
              })}
            className="flex items-center justify-center p-3 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors rounded-full"
          >
            <Edit2 className="w-5 h-5 text-blue-600" />
          </Button>
          </div>
          
          <div className="space-y-4">
            {/* Street Address */}
            {data.companyAddress.street && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Home className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Street Address</p>
                  <p className="text-gray-900 font-medium">{data.companyAddress.street}</p>
                </div>
              </div>
            )}

            {/* Area/Locality */}
            {data.companyAddress.area && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area/Locality</p>
                  <p className="text-gray-900 font-medium">{data.companyAddress.area}</p>
                </div>
              </div>
            )}

            {/* City */}
            {data.companyAddress.city && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-gray-900 font-medium">{data.companyAddress.city}</p>
                </div>
              </div>
            )}

            {/* State */}
            {data.companyAddress.state && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Globe className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">State/Province</p>
                  <p className="text-gray-900 font-medium">{data.companyAddress.state}</p>
                </div>
              </div>
            )}

            {/* Country */}
            {data.companyAddress.country && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Globe className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="text-gray-900 font-medium">{data.companyAddress.country}</p>
                </div>
              </div>
            )}

            {/* ZIP Code */}
            {data.companyAddress.zipCode && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Mail className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">ZIP/Postal Code</p>
                  <p className="text-gray-900 font-medium">{data.companyAddress.zipCode}</p>
                </div>
              </div>
            )}

            {/* Complete Address Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Complete Address</p>
              <p className="text-gray-900 font-medium leading-relaxed">
                {data.companyAddress.street && `${data.companyAddress.street}, `}
                {data.companyAddress.area && `${data.companyAddress.area}, `}
                {data.companyAddress.city && `${data.companyAddress.city}, `}
                {data.companyAddress.state && `${data.companyAddress.state}, `}
                {data.companyAddress.country && `${data.companyAddress.country} `}
                {data.companyAddress.zipCode && `- ${data.companyAddress.zipCode}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="text-gray-900 font-medium">{data.created_at ? formatDate(data.created_at) : 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Updated At</p>
              <p className="text-gray-900 font-medium">{data.updated_at ? formatDate(data.updated_at) : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
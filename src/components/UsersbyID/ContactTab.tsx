// components/UserID/ContactTab.tsx
import React from 'react';
import { Mail, Phone, Globe, MapPin, Calendar, Edit2, Eye, EyeOff, KeyRound } from 'lucide-react';
import { UserData } from './userTypes';
import Button from '../ui/button/Button';

interface ContactTabProps {
  data: UserData;
  onEdit: (section: UserData) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  formatDate: (dateString: string) => string;
}

export const ContactTab: React.FC<ContactTabProps> = ({ 
  data, 
  onEdit, 
  showPassword, 
  setShowPassword, 
  formatDate 
}) => {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
          <Button 
            variant='ghost'
            size='md'
            updateBtn={true}
            onClick={() => onEdit({
              companyEmail: data.companyEmail,
              password: data.password,
              companyPhone: data.companyPhone,
              companyWebsite: data.companyWebsite,
            })} 
            className="flex items-center justify-center p-3 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors rounded-full"
          >
            <Edit2 className="w-5 h-5 text-blue-600" />
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Mail className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900 font-medium">{data.companyEmail || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <KeyRound className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex items-center space-x-96">
              <div className='w-120'>
                <p className="text-sm text-gray-500">Password</p>
                <p className="text-gray-900 font-medium">
                  {showPassword ? (data.password || 'N/A') : '••••••••'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none justify-end"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Phone className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900 font-medium">{data.companyPhone || 'N/A'}</p>
            </div>
          </div>
          {data.companyWebsite && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Globe className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <a href={data.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                  {data.companyWebsite}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

    
    </div>
  );
};
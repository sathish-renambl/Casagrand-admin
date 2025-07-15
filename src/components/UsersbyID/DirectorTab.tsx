// components/UserID/DirectorTab.tsx
import React from 'react';
import { CircleUserRound, Mail, Phone, Edit2 } from 'lucide-react';
import { UserData } from './userTypes';
import Button from '../ui/button/Button';

interface DirectorTabProps {
  data: UserData;
  onEdit: (section: UserData) => void;
}

export const DirectorTab: React.FC<DirectorTabProps> = ({ data, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Director Information</h2>
          <Button 
            variant='ghost'
            size='md'
            updateBtn={true}
            onClick={() => onEdit({
              directorName: data.directorName,
              directorEmail: data.directorEmail,
              directorPhone: data.directorPhone,
            })}
           className="flex items-center justify-center p-3 bg-blue-50 text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors rounded-full"
          >
            <Edit2 className="w-5 h-5 text-blue-600" />
          </Button>
        </div>
        
        {data.directorName || data.directorEmail || data.directorPhone ? (
          <div className="space-y-4">
            {data.directorName && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <CircleUserRound className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium">{data.directorName}</p>
                </div>
              </div>
            )}
            {data.directorEmail && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium">{data.directorEmail}</p>
                </div>
              </div>
            )}
            {data.directorPhone && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900 font-medium">{data.directorPhone}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No director information available</p>
        )}
      </div>
    </div>
  );
};

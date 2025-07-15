// components/UserID/PlanTab.tsx
import React from 'react';
import { CreditCard, Users, Calendar } from 'lucide-react';
import { UserData } from './userTypes';

interface PlanTabProps {
  data: UserData;
  formatDate: (dateString: string) => string;
}

export const PlanTab: React.FC<PlanTabProps> = ({ data, formatDate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Subscription Plan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Plan Name</p>
                <p className="text-gray-900 font-medium">{data.plan?.name || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">User Limit</p>
                <p className="text-gray-900 font-medium">{data.plan?.users} users</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-gray-900 font-medium">{data.plan?.planPrice || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Expires</p>
                <p className="text-gray-900 font-medium">
                  {data.plan?.expires ? formatDate(data.plan.expires) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {data.plan?.planFeatures && data.plan.planFeatures.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Plan Features</h3>
            <div className="flex flex-wrap gap-2">
              {data.plan.planFeatures.map((feature: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
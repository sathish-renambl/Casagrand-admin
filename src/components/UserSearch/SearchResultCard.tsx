import React from 'react';
import {
  Building2,
  Phone,
  Mail,
  Calendar,
  Settings,
  Workflow,
  Puzzle,
  Key,
  BookOpen,
  CreditCard,
  LucideIcon,
  Clock
} from 'lucide-react';

interface Organization {
  orgId: string;
  created_at: string;
  updated_at: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
}

interface NavigationCard {
  title: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
}

interface SearchResultCardProps {
  org: Organization;
  onNavigate?: (cardTitle: string, orgId: string) => void;
}

const navigationCards: NavigationCard[] = [
  {
    title: 'Tools',
    icon: Settings,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Workflow',
    icon: Workflow,
    color: 'bg-green-50 hover:bg-green-100 border-green-200',
    iconColor: 'text-green-600',
  },
  {
    title: 'Integration',
    icon: Puzzle,
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    iconColor: 'text-purple-600',
  },
  {
    title: 'APIKey',
    icon: Key,
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    iconColor: 'text-orange-600',
  },
  {
    title: 'KnBase',
    icon: BookOpen,
    color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'Plan',
    icon: CreditCard,
    color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
    iconColor: 'text-pink-600',
  },
];

const SearchResultCard: React.FC<SearchResultCardProps> = ({ org, onNavigate }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleNavigation = (cardTitle: string, orgId: string): void => {
    if (onNavigate) {
      onNavigate(cardTitle, orgId);
    } else {
      console.log(`Navigating to ${cardTitle} with orgId: ${orgId}`);
      // Default navigation logic
      // Example: navigate(`/${cardTitle.toLowerCase().replace(' ', '-')}?orgId=${orgId}`);
    }
  };

  return (
    // <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    //   {/* Organization Header */}
    //   <div className="flex items-start justify-between mb-10">
    //     <div className="flex items-center space-x-3">
    //       <div className="bg-blue-100 p-2 rounded-lg">
    //         <Building2 className="w-6 h-6 text-blue-600" />
    //       </div>
    //       <div>
    //         <h3 className="text-xl font-semibold text-gray-900">{org.companyName}</h3>
    //         <p className="text-sm text-gray-500">ID: {org.orgId}</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Organization Details */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    //     <div className="flex flex-col text-sm text-gray-600">
    //         <span className="font-medium mb-1">Email</span>
    //         <div className="flex items-center space-x-2">
    //             <Mail className="w-4 h-4 text-gray-400" />
    //             <span>{org.companyEmail}</span>
    //         </div>
    //     </div>
    //     <div className="flex flex-col text-sm text-gray-600">
    //         <span className="font-medium mb-1">Contact</span>
    //         <div className="flex items-center space-x-2">
    //             <Phone className="w-4 h-4 text-gray-400" />
    //             <span>{org.companyPhone}</span>
    //         </div>
    //     </div>
    // </div>
    //  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    //     <div className="flex flex-col text-sm text-gray-600">
    //         <span className="font-medium mb-1">Created At</span>
    //         <div className="flex items-center space-x-2">
    //             <Phone className="w-4 h-4 text-gray-400" />
    //             <span>{org.created_at}</span>
    //         </div>
    //     </div>
    //      <div className="flex flex-col text-sm text-gray-600">
    //         <span className="font-medium mb-1">Updated At</span>
    //         <div className="flex items-center space-x-2">
    //             <Phone className="w-4 h-4 text-gray-400" />
    //             <span>{org.updated_at}</span>
    //         </div>
    //     </div>
    // </div>

    //   {/* Navigation Cards */}
    //   <div className="border-t pt-4">
    //     <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
    //     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
    //       {navigationCards.map((card) => {
    //         const Icon = card.icon;
    //         return (
    //           <button
    //             key={card.title}
    //             onClick={() => handleNavigation(card.title, org.orgId)}
    //             className={`${card.color} border p-3 rounded-lg transition-colors hover:shadow-sm group`}
    //           >
    //             <div className="flex flex-col items-center space-y-2">
    //               <Icon className={`w-5 h-5 ${card.iconColor}`} />
    //               <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
    //                 {card.title}
    //               </span>
    //             </div>
    //           </button>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
    <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-400">
        {/* Organization Header */}
        <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-sm">
                <Building2 className="w-7 h-7 text-blue-600" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{org.companyName}</h3>
                <p className="text-sm text-gray-500 font-medium">Organization ID: {org.orgId}</p>
            </div>
            </div>
        </div>

        {/* Organization Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <span className="text-sm font-semibold text-gray-700 mb-3 block">Contact Information</span>
            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Mail className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-800 font-medium">{org.companyEmail}</span>
                </div>
                <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Phone className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-800 font-medium">{org.companyPhone}</span>
                </div>
            </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <span className="text-sm font-semibold text-gray-700 mb-3 block">Timeline</span>
            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Calendar className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Created</span>
                    <span className="text-sm text-gray-800 font-medium">{org.created_at}</span>
                </div>
                </div>
                <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Last Updated</span>
                    <span className="text-sm text-gray-800 font-medium">{org.updated_at}</span>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Navigation Cards */}
        <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Actions</h4>
            <div className="h-px bg-gradient-to-r from-gray-200 to-transparent flex-1 ml-4"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {navigationCards.map((card) => {
                const Icon = card.icon;
                return (
                <button
                    key={card.title}
                    onClick={() => handleNavigation(card.title, org.orgId)}
                    className="bg-white border-2 border-gray-200 hover:border-blue-300 p-4 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <div className="flex flex-col items-center space-y-3">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg group-hover:from-blue-50 group-hover:to-indigo-100 transition-all duration-200">
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200 text-center leading-tight">
                        {card.title}
                    </span>
                    </div>
                </button>
                );
            })}
            </div>
        </div>
    </div>
  );
};

export default SearchResultCard;
export type { Organization, NavigationCard, SearchResultCardProps };
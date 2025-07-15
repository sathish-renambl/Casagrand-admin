// components/UserID/TabButton.tsx
import React from 'react';

// Define TabType interface if not already defined or import it from the correct module
interface TabType {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface TabButtonProps {
  tab: TabType;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onClick }) => {
  const Icon = tab.icon;
  return (
    <button
      onClick={() => onClick(tab.id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{tab.label}</span>
    </button>
  );
};

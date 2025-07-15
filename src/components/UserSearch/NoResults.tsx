import React from 'react';
import { Search } from 'lucide-react';

interface NoResultsProps {
  term: string;
}

const NoResults: React.FC<NoResultsProps> = ({ term }) => {
  return (
    <div className="text-center py-8">
      <div className="bg-gray-50 rounded-lg p-6">
        <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No organizations found for "{term}"</p>
        <p className="text-sm text-gray-500 mt-1">
          Try searching with a different Organization ID or Email
        </p>
      </div>
    </div>
  );
};

export default NoResults;
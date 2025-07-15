import React from 'react';

export const statusOptions = [
    "REGISTRATION_STARTED",
    "BASIC_DETAILS_COMPLETED",
    "DOCUMENT_UPLOAD_PENDING",
    "DOCUMENT_UPLOADED",
    "DOCUMENT_VERIFICATION_PENDING",
    "DOCUMENT_REJECTED",
    "DOCUMENT_RESUBMISSION_PENDING",
    "ACTIVE",
    "SUSPENDED",
    "INACTIVE",
];

interface UserFiltersProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  isStatusDropdownOpen: boolean;
  setIsStatusDropdownOpen: (open: boolean) => void;
  onSearch: () => void;
  onReset: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedStatus,
  setSelectedStatus,
  isStatusDropdownOpen,
  setIsStatusDropdownOpen,
  onSearch,
  onReset,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            // disabled={!!selectedStatus}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            // disabled={!!selectedStatus}
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex justify-between items-center"
            //   disabled={!!(startDate || endDate)}
            >
              <span className={selectedStatus ? "text-gray-900" : "text-gray-500"}>
                {selectedStatus || "Select Status"}
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isStatusDropdownOpen && (
              <div className="absolute z-100 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                <button
                  onClick={() => {
                    setSelectedStatus("");
                    setIsStatusDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-500"
                >
                  Select Status
                </button>
                {statusOptions.map((status, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsStatusDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-900"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search button */}
        <div className="flex items-end">
          <button
            onClick={onSearch}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default UserFilters;
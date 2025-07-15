import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
type PaginationProps = {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
};
const Pagination = ({ 
  totalPages =10 , 
  currentPage =1, 
  onPageChange = () => {},
  maxVisiblePages = 1 
}:PaginationProps) => {
  
  
  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }
    
    // Add ellipsis and first page if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (
      typeof page === 'number' &&
      page !== currentPage &&
      page >= 1 &&
      page <= totalPages
    ) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-1 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
          ${currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
          }
        `}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            className={`
              px-3 py-2 text-sm font-medium rounded-md transition-colors min-w-[40px]
              ${page === currentPage
                ? 'bg-blue-600 text-white shadow-sm'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
          ${currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
          }
        `}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};


export default Pagination
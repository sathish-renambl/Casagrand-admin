// components/ApiKeyForm.jsx
import React, { useState,useRef } from 'react';

// API Key Form Component
interface ApiKeyFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading: boolean;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    expiryDate: ''
  });

    const inputRef = useRef<HTMLInputElement>(null);


 const handleIconClick = () => {
    if (inputRef.current) {
      // @ts-ignore - showPicker is not yet in TypeScript's type definitions for all browsers
      inputRef.current.showPicker?.();
    }
  };




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div>
         
    <form className="space-y-4" onSubmit={handleSubmit}>
       
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Enter API name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          placeholder="Enter description (optional)"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expiry Date *
        </label>
        {/* <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        /> */}

        <input
            ref={inputRef}
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            onClick={handleIconClick}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />

      </div>
      
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !formData.name || !formData.expiryDate}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? 'Creating...' : 'Create API Key'}
        </button>
      </div>
    </form>
    
    </div>
  );
};

export default ApiKeyForm;
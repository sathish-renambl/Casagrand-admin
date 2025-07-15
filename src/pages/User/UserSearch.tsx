import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/ui/SearchBar';
import SearchResultCard from '../../components/UserSearch/SearchResultCard';
import NoResults from '../../components/UserSearch/NoResults';
import Blank from '../../components/ui/Blank';
import type { Organization } from '../../components/UserSearch/SearchResultCard';
import { useAppContext } from '../../context/appContext';
import { useLogOut } from '../../hooks/useLogOut';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// API Response type (you can extend this based on your actual API response)
interface ApiResponse {
  data: Organization[];
  success: boolean;
  message?: string;
}

const UserSearch: React.FC = () => {
    const { token } = useAppContext();
    const { URL } = useAppContext();
    const navigate = useNavigate();
    const logOut = useLogOut();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Organization[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const savedTerm = localStorage.getItem('searchStr');
        if (savedTerm) {
            setSearchTerm(savedTerm);
            searchUser(savedTerm); 
        }
    }, []);


    const buildSearchPayload = (searchTerm: string) => {
        // Basic email pattern check
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchTerm);

        return isEmail
            ? { companyEmail: searchTerm }
            : { orgId: searchTerm };
    };

    const searchUser = async (query: string): Promise<void> => {
        setLoading(true);
        setError('');
        const payload = buildSearchPayload(searchTerm);

        try {
            const res = await fetch(`${URL}users/searchUser`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (res.status === 200) {
                const data = await res.json();
                toast.success('Search completed successfully!');
                const filteredResults = data.filter((org: Organization) =>
                    org.orgId.toLowerCase().includes(query.toLowerCase()) ||
                    org.companyEmail.toLowerCase().includes(query.toLowerCase())
                );
                setSearchResults(filteredResults);
            } else if (res.status === 401 || res.status === 403) {
                toast.error('Unauthorized access. Please log in again.');
                console.warn('Unauthorized access. Logging out...');
                logOut();
            } else {
                console.error(`Unexpected error: ${res.status}`);
            }
        } catch (err) {
            setError('Failed to search users');
          console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e?: React.MouseEvent | React.KeyboardEvent): Promise<void> => {
        if (e) e.preventDefault();

        const trimmedTerm = searchTerm.trim();
        if (!trimmedTerm) return;

        localStorage.setItem('searchStr', trimmedTerm);
        await searchUser(trimmedTerm);
    };


    const handleNavigation = (cardTitle: string, orgId: string): void => {
        // Replace with your actual navigation logic
        navigate(`/${cardTitle.toLowerCase().replace(/\s+/g, '-')}`, { state: { orgId: orgId } });        
    
    };

    const handleInputChange = (value: string): void => {
        console.log('Input changed:', value);   
        setSearchTerm(value);
        
        // Clear results when input is empty
        if (!value.trim()) {
        setSearchResults([]);
        setError('');
        }
    };

return (
    <Blank title="User Search">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className='max-w-xl '>
        <SearchBar
          value={searchTerm}
          onChange={handleInputChange}
          onSearch={handleSearch}
          placeholder='Search by Organization ID or Email...'
          searchbtn={true}
          loading={loading}
        />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((org: Organization) => (
              <SearchResultCard 
                key={org.orgId} 
                org={org} 
                onNavigate={handleNavigation}
              />
            ))}
          </div>
        ) : (
          searchTerm && !loading && !error && <NoResults term={searchTerm} />
        )}
      </div>
    </Blank>
  );
};


export default UserSearch;
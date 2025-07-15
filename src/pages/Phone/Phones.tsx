import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import Blank from '../../components/ui/Blank';


interface Phone {
    phoneId: string;
    orgId: string;
    phoneBuyer: string;
    status: string;
    phoneType: string;
    phoneAccess: string;
}

const Phones: React.FC = () => {
    const { URL } = useAppContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [phone, setPhone] = useState<Phone[]>([]);
    const [searched, setSearched] = useState<boolean>(false);
    //const [orgId, setOrgId] = useState<string>('');

    const fetchAllPhones = async () => {
        setLoading(true);
        try {
            const resp = await fetch(`${URL}phone/getAllPhones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
                },
                body: JSON.stringify({
                    page: 1,
                    limit: 10,
                    // status: "ACTIVE",
                    // phoneType: "LANDLINE",
                    // phoneAccess: "INCOMING",
                    // available: true,
                    //orgId: orgIdFilter,
                }),
            });

            if (!(resp.status==200)) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }

            const data = await resp.json();
            setPhone(data.data || []);
        } 
        catch (error: unknown) 
        {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert('Unexpected error occurred');
                }
        }
        finally 
        {
                setLoading(false);
                setSearched(true);
        }
        };

        useEffect(() => {
        fetchAllPhones();
    }, []);

    // const handleSearch = () => {
    //     if (orgId.trim()) {
    //         fetchAllPhones(orgId.trim());
    //     }
    // };

    return (
        <div className="p-4">
            

            {/* <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Enter org ID"
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    className="border p-2 rounded w-64"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </div> */}

            <Blank title="Phones">

                <div className="overflow-x-auto">
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                        <th className="p-3">Phone ID</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Phone Type</th>
                        <th className="p-3">Phone Access</th>
                        <th className="p-3">Phone Buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                        <tr>
                            <td colSpan={5} className="p-4 text-center">
                            Loading Phone Details...
                            </td>
                        </tr>
                        ) : phone.length > 0 ? (
                        phone.map((p) => (
                            <tr key={p.phoneId} className="border-b hover:bg-gray-50">
                            <td className="p-3">{p.phoneId}</td>
                            <td className="p-3">{p.status}</td>
                            <td className="p-3">{p.phoneType}</td>
                            <td className="p-3">{p.phoneAccess}</td>
                            <td className="p-3">{p.phoneBuyer}</td>
                            </tr>
                        ))
                        ) : searched ? (
                        <tr>
                            <td colSpan={5} className="p-4 text-center text-gray-500">
                            No Phones Found.
                            </td>
                        </tr>
                        ) : (
                        <tr>
                            <td colSpan={5} className="p-4 text-center text-gray-400">
                            Please enter an Org ID to view Phones
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                </div>

            </Blank>
        </div>
        
    );
};

export default Phones;

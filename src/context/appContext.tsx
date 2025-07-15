import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Admin {
  
  roleId: string;
  email: string;
  full_name: string;
  roleStatus: string; // or string if not fixed
  assignedAgents: string[];         // or another object[] if needed
  assignedSupport: string[];        // same as above
  roleType: 'admin' | 'support' | 'agent'; // use union type if known
  password:string;
  agentAccess: string[];            // or object[]
  supportAccess: string[];          // or object[]
  assignedAdmin: string;
  notes: string[];                  // assuming array of plain notes
  createdBy: string;
  createdDate: string;              // or Date if parsed
  lastUpdatedDate: string;          // or Date
}

// 1. Define the context value type
export type AppContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  data:string;
  setData:(data:string)=>void
  adminProfile:Admin | null
  setAdmin:(adminProfile :Admin |null) => void;
  URL:string
  token?: string | null;
};

// 2. Create the context with default undefined
const AppContext = createContext<AppContextType | undefined>(undefined);
const URL=import.meta.env.VITE_API_URL
const token = localStorage.getItem('token');
// 3. Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const[data,setData]=useState<string>('')
  const [adminProfile,setAdmin] = useState<Admin |null>(null)
  const value: AppContextType = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    data,
    setData,
    adminProfile,
    setAdmin,
    URL,
    token
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 4. Custom hook for consuming the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};


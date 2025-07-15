import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/tables/table';
import { TableCell, TableRow } from '../../components/ui/table';
import StatusBadge from './Status';

// Organization type for the new structure
export type Organization = {
  orgId: string;
  orgName: string;
  orgStatus: string;
};

// Keep the existing User type for backward compatibility
export type User = {
  orgId: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  status: string;
  created_at: string;
  updated_at: string;
};

interface UserTableProps {
  userData?: User[];
  orgData?: Organization[];
  onRowClick?: (user: User | Organization) => void;
}

const UserTable: React.FC<UserTableProps> = ({ userData, orgData, onRowClick }) => {
  const navigate = useNavigate();

  const handleRowClick = (item: User | Organization) => {
    if (onRowClick) {
      onRowClick(item);
    } else {
      // Default behavior
      localStorage.setItem("orgId", item.orgId);
      localStorage.setItem("searchStr", item.orgId);
      navigate("/userbyid", { state: { orgId: item.orgId } });
      console.log("Processing row:", item.orgId);
    }
  };

  // Determine which data to use and what type of table to render
  const isOrgData = orgData && orgData.length > 0;
  const dataToRender = isOrgData ? orgData : (userData || []);

  const renderUserRow = (row: Record<string, any>, rowIndex: number) => {
    const user = row as User;
    
    return (
      <TableRow
        key={rowIndex}
        onClick={() => handleRowClick(user)}
        className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer border-b border-gray-100"
      >
        <TableCell className="px-6 py-4 text-start text-sm font-medium text-gray-900 hover:text-blue-600">
          {user.orgId}
        </TableCell>
        <TableCell className="px-6 py-4 text-start text-sm text-gray-700 hover:text-blue-600">
          {user.companyName}
        </TableCell>
        <TableCell className="px-6 py-4 text-start text-sm text-gray-700 hover:text-blue-600">
          {user.companyEmail}
        </TableCell>
        <TableCell className="px-6 py-4 text-start text-sm text-gray-700 hover:text-blue-600">
          {user.companyPhone}
        </TableCell>
        <TableCell className="px-6 py-4 text-start text-sm text-gray-700">
          <StatusBadge status={user.status} />
        </TableCell>
      </TableRow>
    );
  };

  const renderOrgRow = (row: Record<string, any>, rowIndex: number) => {
    const org = row as Organization;
    
    return (
      <TableRow
        key={rowIndex}
        onClick={() => handleRowClick(org)}
        className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer border-b border-gray-100"
      >
        <TableCell className="px-6 py-4 text-start text-sm font-medium text-gray-900 hover:text-blue-600">
          {org.orgId}
        </TableCell>
        <TableCell className="px-6 py-4 text-start text-sm text-gray-700 hover:text-blue-600">
          {org.orgName}
        </TableCell>
        <TableCell className="px-6 py-4 text-start text-sm text-gray-700">
          <StatusBadge status={org.orgStatus} />
        </TableCell>
      </TableRow>
    );
  };

  if (isOrgData) {
    return (
      <Table
        header={["Org ID", "Org Name", "Status"]}
        data={dataToRender}
        renderRow={renderOrgRow}
        className="enhanced-table"
      />
    );
  }

  return (
    <Table
      header={["Org ID", "Company Name", "Email", "Phone", "Status"]}
      data={dataToRender}
      renderRow={renderUserRow}
      className="enhanced-table"
    />
  );
};

export default UserTable;
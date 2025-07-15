// components/NavItems.tsx

import React from "react";
import {
  GridIcon,
  UsersIcon,
  AgentIcon,
  UserCircleIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  // CalenderIcon // Uncomment if needed later
} from "../icons"; // Adjust import paths based on your project structure

export interface NavSubItem {
  name: string;
  path: string;
  pro: boolean;
}

export interface NavItem {
  icon?: React.ReactNode;
  name: string;
  path?: string;
  subItems?: NavSubItem[];
}



export const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  // Uncomment if needed
  // {
  //   icon: <CalenderIcon />,
  //   name: "Calendar",
  //   path: "/calendar",
  // },
  {
    name: "User",
    icon: <UsersIcon />,
    subItems: [
      { name: "Get Users", path: "/user", pro: false },
      { name: "Get Users by ID", path: "/userbyid", pro: false },
      { name: "Tools", path: "/tools", pro: false },
      { name: "Work Flow", path: "/workflow", pro: false },
      { name: "Integration", path: "/integration", pro: false },
      { name: "Api Key", path: "/apikey", pro: false },
      { name: "Knowledge Base", path: "/knbase", pro: false },
    ],
  },
  {
    icon: <AgentIcon />,
    name: "Agents",
    path: "/agent",
  },
  {
    icon: <UserCircleIcon />,
    name: "Admin Users ",
    path: "/adminusers",
  },
  {
    icon: <UserCircleIcon />,
    name: "Screen Configuration",
    path: "/screenconfig",
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

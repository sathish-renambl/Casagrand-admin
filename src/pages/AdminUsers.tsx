import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table/index";
import { Link } from "react-router-dom";
import { PlusIcon } from "../icons";
import Badge from "../components/ui/badge/Badge";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
//import Badge from "../components/ui/badge/Badge";
import { useEffect, useState } from "react";
import ComponentCard from "../components/common/ComponentCard";
import { Modal } from "../components/ui/modal";
import UserModal from "../components/UserProfile/userModal";
import { useModal } from "../hooks/useModal";
import { useAppContext } from "../context/appContext";
import { useLogOut } from "../hooks/useLogOut";
import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";

// interface Order {
//   id: number;
//   user: {
//     image: string;
//     name: string;
//     role: string;
//   };
//   projectName: string;
//   team: {
//     images: string[];
//   };
//   status: string;
//   budget: string;
// }

// Define the table data using the interface
// const tableData: Order[] = [
//   {
//     id: 1,
//     user: {
//       image: "/images/user/user-17.jpg",
//       name: "Lindsey Curtis",
//       role: "Web Designer",
//     },
//     projectName: "Agency Website",
//     team: {
//       images: [
//         "/images/user/user-22.jpg",
//         "/images/user/user-23.jpg",
//         "/images/user/user-24.jpg",
//       ],
//     },
//     budget: "3.9K",
//     status: "Active",
//   },
//   {
//     id: 2,
//     user: {
//       image: "/images/user/user-18.jpg",
//       name: "Kaiya George",
//       role: "Project Manager",
//     },
//     projectName: "Technology",
//     team: {
//       images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
//     },
//     budget: "24.9K",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     user: {
//       image: "/images/user/user-17.jpg",
//       name: "Zain Geidt",
//       role: "Content Writing",
//     },
//     projectName: "Blog Writing",
//     team: {
//       images: ["/images/user/user-27.jpg"],
//     },
//     budget: "12.7K",
//     status: "Active",
//   },
//   {
//     id: 4,
//     user: {
//       image: "/images/user/user-20.jpg",
//       name: "Abram Schleifer",
//       role: "Digital Marketer",
//     },
//     projectName: "Social Media",
//     team: {
//       images: [
//         "/images/user/user-28.jpg",
//         "/images/user/user-29.jpg",
//         "/images/user/user-30.jpg",
//       ],
//     },
//     budget: "2.8K",
//     status: "Cancel",
//   },
//   {
//     id: 5,
//     user: {
//       image: "/images/user/user-21.jpg",
//       name: "Carla George",
//       role: "Front-end Developer",
//     },
//     projectName: "Website",
//     team: {
//       images: [
//         "/images/user/user-31.jpg",
//         "/images/user/user-32.jpg",
//         "/images/user/user-33.jpg",
//       ],
//     },
//     budget: "4.5K",
//     status: "Active",
//   },
// ];

  interface AdminUser {
    email: string;
    roleId: string;
    full_name: string;
    roleType: string;
    roleStatus: string;
  }
export default function AdminUsers() {
  const { isOpen, openModal, closeModal } = useModal();
  const [users, setUsers] = useState<unknown[]>([]);
  const { URL } = useAppContext();
  const token = localStorage.getItem('token')
  const logOut = useLogOut();
  // const navigation = useNavigate()
  //  function handleAddNewAdmin(){
  //   navigation('/addAdmin')
  //  }
  async function getAllUsers() {
    try {
      if (!token) {
        toast.error("Not authorised");
        logOut();
      }
      const response = await fetch(`${URL}admin/all?roleType=admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data.admins);
      }
    } catch (e) {
      toast.error(`error ${e}`);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <PageBreadcrumb pageTitle="Admin Users" />
      {/* Header */}
      <div className="mb-8">
        <div className="flex  items-center justify-end">
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <PlusIcon />
            <span>Add New Admin</span>
          </button>
        </div>
      </div>

      <ComponentCard title="Admin Users">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400"
                  >
                    Id
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400"
                  >
                    Full Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-700 text-start text-theme-sm dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {users &&
                  users.map((item: any, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {item.email}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Link
                          className="text-blue-500 hover:underline"
                          to={`/adminbyid/${item.roleId}`}
                        >
                          {item.roleId}
                        </Link>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {item.full_name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {item.roleType}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            item.roleStatus === "ACTIVE" ? "success" : "error"
                          }
                        >
                          {item.roleStatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => closeModal()}
          className="max-w-[700px] m-4"
        >
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <UserModal
                user={null}
                actionType={"create"}
                onSave={() => closeModal()}
              />
            </div>
          </div>
        </Modal>
      </ComponentCard>
    </div>
  );
}

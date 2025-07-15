import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { CircleUser, CircleUserRound, LogOut, User, User2, UserRound } from "lucide-react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const {adminProfile} = useAppContext()

    const userName = localStorage.getItem("name");
    const userEmail = localStorage.getItem("email");


  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    localStorage.clear();
    
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="overflow-hidden rounded-full h-11 w-11 flex justify-center items-center ">
          {/* <img src="/images/user/owner.jpg" alt="User" /> */}
          <CircleUserRound size={35}/>
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{adminProfile?.full_name}</span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

       <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl dark:bg-gray-900 dark:border-gray-700 overflow-hidden"
      >
        {/* Header Section */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {userName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {userEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="p-2">
          <Link
            onClick={handleLogout}
            to="/"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200 group dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600 dark:text-gray-400 dark:group-hover:text-red-400 transition-colors duration-200" />
            <span>Sign out</span>
          </Link>
        </div>
      </Dropdown>
    </div>
  );
}

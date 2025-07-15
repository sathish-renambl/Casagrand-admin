import { ReactNode, use, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getFromLocalStorage } from "../../encryption/encryption";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline" | "ghost"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  updateBtn?: boolean; // Update button state
}

type AccessRole = {
  pathName: string;
  pageAccess: string;
  // add other properties if needed
};


const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  updateBtn = false, // Update button state
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    ghost:"!ring-0 !p-2 !text-blue-600 !hover:bg-blue-50 !rounded-lg"

  };

  const location=useLocation();

  const getRestrict=()=>{
    const accessRoles = getFromLocalStorage("accessRoles"); // Assuming accessRoles is provided by context or props

    if(!accessRoles) return true; // If no access roles, allow the button to be clickable
      const roleScreen = accessRoles.find((item: AccessRole) => item.pathName === location.pathname);
  
  
      if(roleScreen && roleScreen.pageAccess==="READ" && updateBtn){
        return false;
      }
      return true;
      
  }


   

  return (
   getRestrict() && <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition !${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;

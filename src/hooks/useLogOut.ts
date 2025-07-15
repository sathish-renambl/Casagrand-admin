import { useNavigate } from "react-router-dom";

export const useLogOut = (): (() => void) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return logOut;
};

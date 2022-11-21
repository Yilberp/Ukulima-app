import { useContext } from "react";
import LoginContext from "../context/auth/authContext";
import { Navigate } from "react-router-native";
const PublicRoute = ({ children }) => {
  const { state } = useContext(LoginContext);
  return state.userToken == null ? children : <Navigate to={"/home"} />;
};

export default PublicRoute;

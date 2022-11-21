import { useContext } from "react";
import LoginContext from "../context/auth/authContext";
import { Navigate } from "react-router-native";
const PrivateRoute = ({ children }) => {
  const { state } = useContext(LoginContext);
  return state.userToken != null ? children : <Navigate to={"/"} />;
};

export default PrivateRoute;

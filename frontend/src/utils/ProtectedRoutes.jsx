import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;

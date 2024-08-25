import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AuthenticatedRoutes = ({ children }) => {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return children ? children : <Outlet />;
};

AuthenticatedRoutes.propTypes = {
  children: PropTypes.node,
};

export default AuthenticatedRoutes;

import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // const accessToken = localStorage.getItem("accessToken");
  // return accessToken == null ? <Navigate to="/login" /> : <Outlet />;

  return <Outlet />;
};

export default ProtectedRoute;

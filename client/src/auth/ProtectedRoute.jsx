import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("access_token");
  return accessToken == null ? <Navigate to="/login" /> : <Outlet />;

};

export default ProtectedRoute;

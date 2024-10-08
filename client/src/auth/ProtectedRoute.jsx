import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token == null ? <Navigate to="/login" /> : <Outlet />;

};

export default ProtectedRoute;

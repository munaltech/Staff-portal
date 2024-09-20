import { Route, Routes, useLocation } from "react-router-dom";
import { SideBar, TopBar } from "../components";
import { Signup } from "../auth";
import {
  Dashboard,
  Clients,
  Packages,
  Services,
  Users,
  Settings,
} from "../pages";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Main = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const location = useLocation();
  useEffect(() => {
    setActivePage(location.pathname.split("/")[1]);
  }, [location]);
  return (
    <div className="relative">
      <div className="flex flex-col w-screen h-screen">
        <TopBar />
        <div className="flex h-full">
          <SideBar activePage={activePage} />
          <div className="flex-1 px-8 py-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/services" element={<Services />} />
              <Route path="/users/*" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
      
        <Routes>
          <Route path="/users/signup" element={<Signup />} />
        </Routes>
      
    </div>
  );
};

export default Main;

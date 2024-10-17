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
  AddService,
  AddCategory,
  Subscriptions,
  AddSubscription,
} from "../pages";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddClient from "./AddClient";
import ClientDetails from "./ClientDetails";
import AddPackage from "./AddPackage";

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
        <div
          className={
            activePage === "client" ? "overflow-y-auto" : "flex h-[calc(100%-3.5rem)]"
          }
        >
          <Routes>
            <Route path="/*" element={<SideBar activePage={activePage} />} />
            <Route path="/client/:id" element={<ClientDetails />} />
          </Routes>
          <div
            className={
              activePage === "client"
                ? "hidden"
                : "flex-1 px-8 py-4 overflow-y-auto"
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients/*" element={<Clients />} />
              <Route path="/subscriptions/*" element={<Subscriptions />} />
              <Route path="/packages/*" element={<Packages />} />
              <Route path="/services/*" element={<Services />} />
              <Route path="/users/*" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/users/signup" element={<Signup action="signup" />} />
        <Route path="/users/edit/:id" element={<Signup action="edit" />} />
        <Route path="/clients/add" element={<AddClient />} />
        <Route path="/services/add" element={<AddService action={"add"} />} />
        <Route path="/services/edit/:id" element={<AddService action={"edit"} />} />
        <Route path="/services/category/add" element={<AddCategory action={"add"} />} />
        <Route path="/services/category/edit/:id" element={<AddCategory action={"edit"} />} />
        <Route
          path="/subscriptions/add"
          element={<AddSubscription action="add" />}
        />
        <Route
          path="/subscriptions/edit/:id"
          element={<AddSubscription action="edit" />}
        />
        <Route path="/packages/add" element = {<AddPackage action={"add"}/>} />
        <Route path="/packages/edit/:id" element = {<AddPackage action={"edit"}/>} />
      </Routes>
    </div>
  );
};

export default Main;

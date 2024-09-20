import { useNavigate } from "react-router-dom";

function SideBar({ activePage }) {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToClients = () => {
    navigate("/clients");
  };

  const goToPackages = () => {
    navigate("/packages");
  };

  const goToServices = () => {
    navigate("/services");
  };

  const goToUsers = () => {
    navigate("/users");
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <>
      <div className="lg:w-1/6 h-full border-r flex flex-col justify-between px-6 py-4">
        <div className="flex flex-col items-center ">
          

          {/* Dashboard Button */}
          <button
            className={`w-full px-2 py-2 flex justify-start items-center gap-6 rounded-md ${activePage === "dashboard" && "bg-slate-100"} hover:bg-slate-100`}
            onClick={goToDashboard}
          >
            <img
              width="25"
              height="25"
              src={`https://img.icons8.com/fluency-systems-${activePage === "dashboard" ? "filled" : "regular"}/50/dashboard-layout.png`}
              alt="dashboard-layout"
            />
            <h3 className="space-grotesk-semibold hidden lg:block">Dashboard</h3>
          </button>

          {/* Clients Button */}
          <button
            className={`w-full px-2 py-2 flex justify-start items-center gap-6 rounded-md ${activePage === "clients" && "bg-slate-100"} hover:bg-slate-100`}
            onClick={goToClients}
          >
            <img
              width="25"
              height="25"
              src={`https://img.icons8.com/fluency-systems-${activePage === "clients" ? "filled" : "regular"}/50/crowd.png`}
              alt="link"
            />
            <h3 className="space-grotesk-semibold hidden lg:block">Clients</h3>
          </button>

          {/* Packages Button */}
          <button className={`w-full px-2 py-2 flex justify-start items-center gap-6 rounded-md ${activePage === "packages" && "bg-slate-100"} hover:bg-slate-100`}
          onClick={goToPackages}>
            <img
              width="25"
              height="25"
              src={`https://img.icons8.com/fluency-systems-${activePage === "packages" ? "filled" : "regular"}/50/cardboard-box.png`}
              alt="analytics"
            />
            <h3 className="space-grotesk-semibold hidden lg:block">Packages</h3>
          </button>

          {/* Services Button */}
          <button className={`w-full px-2 py-2 flex justify-start items-center gap-6 rounded-md ${activePage === "services" && "bg-slate-100"} hover:bg-slate-100`}
          onClick={goToServices}>
            <img
              width="25"
              height="25"
              src={`https://img.icons8.com/fluency-systems-${activePage === "services" ? "filled" : "regular"}/50/services.png`}
              alt="services"
            />
            <h3 className="space-grotesk-semibold hidden lg:block">Services</h3>
          </button>
          
          {/* Users Button */}
          <button className={`w-full px-2 py-2 flex justify-start items-center gap-6 rounded-md ${activePage === "users" && "bg-slate-100"} hover:bg-slate-100`}
          onClick={goToUsers}>
            <img
              width="25"
              height="25"
              src={`https://img.icons8.com/fluency-systems-${activePage === "users" ? "filled" : "regular"}/50/user.png`}
              alt="users"
            />
            <h3 className="space-grotesk-semibold hidden lg:block">Users</h3>
          </button>
        </div>

        {/* Settings Button */}
        <button className="w-full px-2 py-2 flex justify-start items-center gap-6 rounded-md hover:bg-slate-100"
        onClick={goToSettings}>
          <img
            width="25"
            height="25"
            src={`https://img.icons8.com/fluency-systems-${activePage === "settings" ? "filled" : "regular"}/50/settings.png`}
            alt="settings"
          />
          <h3 className="space-grotesk-semibold hidden lg:block">Settings</h3>
        </button>
      </div>
    </>
  );
}

export default SideBar;

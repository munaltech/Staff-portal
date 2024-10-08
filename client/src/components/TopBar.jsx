import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

function TopBar() {
  const navigate = useNavigate();

  const logout =  async () => {
    
    const response = await fetch("https://api.munaltechnology.com/api/users/logout", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    if (response.ok) {
      localStorage.removeItem("token");
      navigate("/login");
    }else{
      alert("Something went wrong");
    }
    
  }
  return (
    <div className="flex h-14 items-center justify-between px-8 py-2 border shadow-sm">
      <div className="flex gap-6 ">
        <button aria-label="Menu" hidden>
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/fluency-systems-filled/50/menu.png"
            alt="menu"
          />
        </button>
        <a
          className="text-2xl space-grotesk-bold text-gray-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Munal Technology
        </a>
      </div>

      {/* <div className="flex gap-6">
        <img
          src=""
          alt="profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />
      </div> */}
      <Button
      text={"Logout"}
      icon="exit"
      className={"bg-red-600 hover:bg-red-700"}
      
      onClick={logout}
      />
    </div>
  );
}

export default TopBar;

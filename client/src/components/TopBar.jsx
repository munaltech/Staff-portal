import { useNavigate } from "react-router-dom";


function TopBar() {

  const navigate = useNavigate();
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
        <a className="text-2xl space-grotesk-bold text-gray-600 cursor-pointer" onClick={() => navigate("/")}>
          Munal Technology
        </a>
      </div>

      <div className="flex gap-6">
        
        
          <img src="" alt="profile" className="w-10 h-10 rounded-full object-cover cursor-pointer" />

      </div>
    </div>
  );
}

export default TopBar;

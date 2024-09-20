import Button from "./ui/Button";

function TopBar() {
  return (
    <div className="flex items-center justify-between px-8 py-2 border shadow-sm">
      <div className="flex gap-6 ">
        <button aria-label="Menu" hidden>
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/fluency-systems-filled/50/menu.png"
            alt="menu"
          />
        </button>
        <h1 className="text-2xl space-grotesk-bold text-gray-600">
          Munal Technology
        </h1>
      </div>

      <div className="flex gap-6">
        <Button text="Add Client" icon="plus" className="hidden sm:flex" />
        
          <img src="" alt="profile" className="w-10 h-10 rounded-full object-cover cursor-pointer" />

      </div>
    </div>
  );
}

export default TopBar;

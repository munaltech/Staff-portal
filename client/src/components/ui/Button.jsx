import { cn } from "../../utils";
const Button = ({ icon, text, className, onClick, iconClass }) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 active:ring-1 active:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
        className
      )}
      onClick={onClick}
    >
      <img
        width="20"
        height="20"
        src={`https://img.icons8.com/ffffff/fluency-systems-regular/35/${icon}.png`}
        alt="plus"
        className={iconClass}
      />
      <h3 className={`space-grotesk-regular ${text ? "block ":"hidden"}`}>{text}</h3>
    </button>
  );
};

export default Button;

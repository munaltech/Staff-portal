import { cn } from "../../utils";
const Button = ({icon, text, className, onClick}) => {
  return (
    <button className={cn("flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 active:ring-1 active:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center", className)} onClick={onClick}>
      <img
        width="20"
        height="20"
        src={`https://img.icons8.com/ffffff/fluency-systems-regular/25/${icon}.png`}
        alt="plus"
      />
      <h3 className="space-grotesk-regular">{text}</h3>
    </button>
  );
};

export default Button;

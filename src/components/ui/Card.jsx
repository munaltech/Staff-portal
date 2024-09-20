import { cn } from "../../utils";

const Card = ({ className, children }) => {
  return (
    <div className={cn("max-w-screen-sm mx-auto bg-[#fef9ef] rounded-lg shadow-md px-8 py-4", className)}>
      {children}
    </div>
  );
};

export default Card;

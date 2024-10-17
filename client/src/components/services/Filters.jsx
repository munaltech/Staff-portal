import { useNavigate } from "react-router-dom";

const Filters = ({ title, icon, filter, id, onClick }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (icon) {
      navigate("/services/category/add");
    } else {
      onClick();
    }
  };

  return (
    <div
      className={`relative w-fit px-4 py-1 ${
        filter === id ? "bg-gray-500 text-white" : "bg-gray-200"
      } rounded-lg border cursor-pointer hover:scale-x-105 duration-300 transition-all ease-in-out`}
      onDoubleClick={() => navigate(`/services/category/edit/${id}`)}
      onClick={clickHandler}
    >
      {(title && <h1 className="text-sm inter-medium">{title}</h1>) ||
        (icon && (
          <img
            width="20"
            height="20"
            src={`https://img.icons8.com/ffffff/fluency-systems-regular/35/${icon}.png`}
            alt="plus"
          />
        ))}
    </div>
  );
};

export default Filters;

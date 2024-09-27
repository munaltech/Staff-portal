import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Filters = ({ title, icon, filter, id }) => {
  const [doubleClick, setDoubleClick] = useState(false);
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const clickHandler = () => {
    if (icon) {
      navigate("/services/category/add");
    } else {
      if (filter === id) {
        setClick(false);
      } else {
        setClick(true);
      }
    }
  };

  const deleteCategory = () => {
    setDoubleClick(false);
  };

  return (
    <div
      className={`relative w-fit px-4 py-1 ${
        click ? "bg-gray-500 text-white" : "bg-gray-200"
      } rounded-lg border cursor-pointer`}
      onDoubleClick={() => setDoubleClick(!doubleClick)}
      onClick={clickHandler}
    >
      {(title && <h1 className="text-sm inter-medium">{title}</h1>) ||
        (icon && (
          <img
            width="20"
            height="20"
            src={`https://img.icons8.com/000000/fluency-systems-regular/35/${icon}.png`}
            alt="plus"
          />
        ))}

      {icon ? (
        ""
      ) : (
        <button
          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
          hidden={!doubleClick}
          onClick={deleteCategory}
        >
          <img
            width="15"
            height="15"
            src="https://img.icons8.com/000000/fluency-systems-regular/15/delete.png"
            alt="delete"
            className="animate-bounce"
          />
        </button>
      )}
    </div>
  );
};

export default Filters;

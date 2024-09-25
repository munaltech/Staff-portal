import { useNavigate } from "react-router-dom"

const Card = ({ client }) => {
  const navigate = useNavigate();
  return (
    <a className="bg-white w-64 rounded-lg border border-gray-400 px-6 py-4 cursor-pointer hover:bg-gray-200 duration-300 transition-all ease-in-out" onClick={()=>navigate(`/client/${client?.id}`)}>
      <h1 className="inter-medium">{client?.business_name || "N/A"}</h1>
      <h3 className="text-sm text-gray-600 truncate">
        {client?.representative_name || "N/A"}
      </h3>
      <h3 className="text-sm text-gray-400 truncate">
        {client?.address || "N/A"}
      </h3>
      <h3 className="text-sm text-gray-400 truncate">
        {client?.email || "N/A"}
      </h3>
      <h3 className="text-sm text-gray-400 truncate">
        {client?.phone_number || "N/A"}
      </h3>
    </a>
  );
};

export default Card;

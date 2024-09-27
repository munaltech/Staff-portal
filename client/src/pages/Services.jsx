import { useNavigate } from "react-router-dom";
import { PageHeading, Button } from "../components";
import Filters from "../components/services/Filters";
import { useEffect, useState } from "react";

const Services = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [services, setServices] = useState([]);

  const [filter, setFilter] = useState(0);

  useEffect(() => {
    getCategories();
    getServices();
  }, [navigate]);

  const getCategories = async () => {
    const response = await fetch("http://localhost:8000/api/v1/categories", {
      method: "GET",
    });
    const res = await response.json();

    setCategories(res.data);
  };

  const getServices = async () => {
    const response = await fetch("http://localhost:8000/api/v1/services", {
      method: "GET",
    });

    const res = await response.json();

    setServices(res.data);
  };

  const filteredServices = services.filter((service) => {
    return service.category_id === filter || filter === 0;
  });

  const filterCategory = (id) => {
    if (id === filter) {
      setFilter(0);
    }else{
      setFilter(id);
    }

  };
  return (
    <>
      <div className="flex  justify-between">
        <PageHeading title="Services" />
        <Button
          text="Add Service"
          icon="support"
          onClick={() => navigate("/services/add")}
        />
      </div>

      <div className="flex gap-4 select-none">
        {categories.map((category) => (
          <div key={category.id} onClick={() => filterCategory(category.id)}>
            <Filters title={category.name} filter={filter} id={category.id} />
          </div>
        ))}
        <Filters icon="plus" />
      </div>

      <div className="flex flex-wrap gap-4 mt-4 ">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`w-64 h-48 p-4 ${
              service.status === "inactive"
                ? "bg-gray-300 cursor-default"
                : "bg-[#faebd7] cursor-pointer hover:bg-[#fff8e7] duration-300 transition-all ease-in-out"
            }  border rounded-lg`}
          >
            <div className="h-full w-full flex flex-col items-stretch justify-between">
              <div>
                <h1 className="text-lg inter-medium">{service.name}</h1>
                <p className="text-sm inter-regular">{service.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm inter-regular">£{service.price}</p>
                <p className="text-sm inter-regular mt-2">{service.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Services;

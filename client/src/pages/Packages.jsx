import { useNavigate } from "react-router-dom";
import { PageHeading, Button } from "../components";
import { useEffect, useState } from "react";

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getPackages();
  }, [navigate]);

  const getPackages = async () => {
    const response = await fetch(
      "https://api.munaltechnology.com/api/packages",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await response.json();
    
    setPackages(res.packages);
  };

  return (
    <>
      <div className="flex justify-between">
        <PageHeading title="Packages" />
        <Button
          text="Create Package"
          icon="document"
          onClick={() => navigate("/packages/add")}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {packages.map((packageData) => (
          <div
            key={packageData.id}
            className="flex flex-wrap justify-between gap-8 px-4 py-2 border-2 rounded-lg w-full h-fit hover:bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out"
          >
            <div className="flex-1">
              <div className="flex justify-between">
                <h1 className="inter-semibold">
                  {packageData.name}
                </h1>
              </div>

              

              {packageData.services.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center inter-medium text-sm text-gray-600"
                >
                  <h3>{service.name}</h3>
                  <h3> &pound; {service.price}</h3>
                </div>
              ))}
              <div className="flex justify-between mt-2 inter-medium text-center text-base">
                <h3>
                  <strong>Total</strong>
                </h3>
                <h1>&pound; {packageData.total}</h1>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <Button
                icon={"edit"}
                onClick={() => navigate(`/packages/edit/${packageData.id}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Packages;

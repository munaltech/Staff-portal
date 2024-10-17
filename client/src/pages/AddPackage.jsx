import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Button, Card } from "../components";

const AddPackage = ({ action }) => {
  const [loading, setLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [services, setServices] = useState([]);

  const [total, setTotal] = useState(0);

  const [selectedServices, setSelectedServices] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [packageData, setPackageData] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getServices();

    if (action === "edit") {
      getPackage();
      totalPrice();
    }
  }, [navigate]);

  const handleServiceSelectChange = (e) => {
    const serviceId = parseInt(e.target.value, 10);

    e.target.value = "";

    const alreadySelected = selectedServices.some(
      (service) => service.id === serviceId
    );

    if (!alreadySelected) {
      const selectedService = services.find(
        (service) => service.id === serviceId
      );

      if (selectedService) {
        setSelectedServices([...selectedServices, selectedService]);
      }
    }
  };

  useEffect(() => {
    totalPrice();
  }, [selectedServices, discount]);

  const totalPrice = () => {
    let tempTotal = 0;
    selectedServices?.forEach((service) => {
      tempTotal += service.price;
    });
    setTotal(tempTotal - discount);
  };

  // API CALLS

  // GET SERVICES FROM BACKEND
  const getServices = async () => {
    const response = await fetch(
      "https://api.munaltechnology.com/api/services",
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

    setServices(res.services);
  };

  // ADD PACKAGE TO BACKEND
  const addPackage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      if (key !== "service") {
        data[key] = value;
      }
    });

    data.services = selectedServices;
    data.total = total;
    data.discount = discount;

    try {
      const response = await fetch(
        "https://api.munaltechnology.com/api/packages",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      if (response.ok) {
        setLoading(false);
        navigate("/packages");
      } else {
        alert(res.message);
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const getPackage = async () => {
    const response = await fetch(
      `https://api.munaltechnology.com/api/packages/${id}`,
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
    setPackageData(res.package);
    setSelectedServices(res.package.services);
    setTotal(res.package.total);
    setDiscount(res.package.discount);
  };

  const updatePackage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      if (key !== "service") {
        data[key] = value;
      }
    });

    data.services = selectedServices;
    data.total = total;
    data.discount = discount;

    try {
      const response = await fetch(
        `https://api.munaltechnology.com/api/packages/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();

      if (response.ok) {
        setLoading(false);
        navigate("/packages");
      } else {
        alert(res.message);
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const deletePackage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmDelete) {
      return;
    }
    setDeleteLoading(true);
    try {
      const response = await fetch(
        `https://api.munaltechnology.com/api/packages/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const res = await response.json();

      if (response.ok) {
        setDeleteLoading(false);
        navigate("/packages");
      } else {
        setDeleteLoading(false);
        alert(res.message);
      }
    } catch (error) {
      setDeleteLoading(false);
      alert(error.message);
    }
  }; 
    

  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular bg-white">
        <h1 className="text-2xl space-grotesk-bold text-center">
          {action === "edit" ? "Edit Package" : "Add Package"}
        </h1>

        <form
          method="post"
          onSubmit={action === "edit" ? updatePackage : addPackage}
          className="space-y-4 inter-regular mt-4"
        >
          {/* PACKAGE NAME */}
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            placeholder="Package Name"
            defaultValue={packageData?.name}
            maxLength={255}
            required
            disabled={loading || deleteLoading}
          />

          {/* SELECT SERVICES */}
          <select
            id="service"
            name="service"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            onChange={handleServiceSelectChange}
            required={selectedServices?.length === 0}
            disabled={loading || deleteLoading}
            defaultValue={""}
          >
            <option value="" className="text-gray-400" disabled>
              Select Service(s)
            </option>
            {services
              .filter((service) => !selectedServices?.includes(service.id))
              .filter((service) => service.status === "active")
              .map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
          </select>

          {/* ALL THE SELECTED SERVICES ARE DISPLAYED HERE WITH EDITABLE PRICE */}
          {selectedServices?.map((service) => (
            <div
              key={service.id}
              className="w-full border border-black/50  px-4 py-2 rounded-lg  flex flex-wrap gap-4 justify-between items-center"
            >
              {/* Service Name */}
              <h3>{service.name}</h3>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <span className="absolute top-1.5 left-1.5 text-gray-500 cursor-default">
                    £
                  </span>

                  {/* Editable Service Price */}
                  <input
                    type="number"
                    className="border w-32 text-right rounded-md border-black/50 focus:outline focus:outline-gray-500 px-2 ps-6 py-1"
                    placeholder=""
                    defaultValue={service.price ? service.price : 0}
                    max={999999}
                    min={0}
                    onChange={(e) => {
                      const newServices = selectedServices.map((s) => {
                        if (s.id === service.id) {
                          return {
                            ...s,
                            price: parseInt(e.target.value, 10),
                          };
                        }
                        return s;
                      });
                      setSelectedServices(newServices);
                    }}
                    disabled={loading || deleteLoading}
                  />

                  <p className=" ml-2 text-sm text-gray-500 inline">per Post</p>
                </div>

                {/* REMOVE SELECTION BUTTON */}
                <Button
                  icon={"minus"}
                  className={
                    "bg-red-700 hover:bg-red-500 duration-300 transition-colors ease-in-out"
                  }
                  iconClass={"text-white"}
                  onClick={() =>
                    setSelectedServices(
                      selectedServices.filter((s) => s.id !== service.id)
                    )
                  }
                  disabled={loading || deleteLoading}
                />
              </div>
            </div>
          ))}

          {/* DISCOUNT */}
          <h3 className="space-grotesk-bold flex justify-between text-gray-500">
            <span>Discount:</span>{" "}
            <span>
              {" "}
              £{" "}
              <input
                type="number"
                className="border w-32 text-right rounded-md border-black/50 focus:outline focus:outline-gray-500 px-2 ps-6 py-1"
                placeholder=""
                defaultValue={action === "edit" ? packageData?.discount : 0}
                max={999999}
                min={0}
                onChange={(e) => setDiscount(e.target.value)}
                disabled={loading || deleteLoading}
              />
            </span>
          </h3>

          {/* TOTAL */}
          <h3 className="space-grotesk-bold flex justify-between text-gray-500">
            <span>Total:</span> <span> £ {total ? total : 0}</span>
          </h3>

          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="w-full max-h-40 min-h-20 rounded-md bg-slate-200  border border-gray-200 p-2"
            maxLength={2000}
            disabled={loading || deleteLoading}
            defaultValue={packageData?.description}
          />

          <button
            className="w-full rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : action === "edit" ? (
              "Update Package"
            ) : (
              "Add Package"
            )}
          </button>
        </form>
        {action === "edit" && (
          <button
            className="w-full rounded-md bg-red-500 p-2 text-white mt-2"
            onClick={deletePackage}
          >
            {deleteLoading ? (
              <ClipLoader loading={deleteLoading} color="white" size={15} />
            ) : (
              "Delete Package"
            )}
          </button>
        )}
        <button
          onClick={() => navigate("/packages")}
          className="w-full rounded-md bg-blue-200 p-2 text-black mt-4"
        >
          Cancel
        </button>
      </Card>
    </div>
  );
};

export default AddPackage;

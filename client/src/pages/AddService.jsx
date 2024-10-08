import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../components";
import { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners";

const AddService = ({ action }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getCategories();
    if (action === "edit") {
      getService();
    }
  }, [navigate]);

  const handleStatusChange = (status) => {
    setService((prevService) => ({
      ...prevService,
      status: status,
    }));
  };

  const getCategories = async () => {
    const response = await fetch("https://api.munaltechnology.com/api/categories", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const res = await response.json();

    setCategories(res.categories);
  };

  const addService = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch(
        "https://api.munaltechnology.com/api/services",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (response.ok) {
        setLoading(false);
        navigate("/services");
      } else {
        setLoading(false);
        alert(res.message);
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const updateService = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch(
        `https://api.munaltechnology.com/api/services/${id}`,
        {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (response.ok) {
        setLoading(false);
        navigate("/services");
      } else {
        setLoading(false);
        alert(res.message);
      }
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const getService = async () => {
    const response = await fetch(
      `https://api.munaltechnology.com/api/services/${id}`,
      {
        method: "GET",

        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await response.json();

    setService(res.service);
  };
  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular bg-white">
        <h1 className="text-2xl space-grotesk-bold text-center">
          {action === "add" ? "Add Service" : "Edit Service"}
        </h1>

        <form
          method="post"
          onSubmit={action === "add" ? addService : updateService}
          className="space-y-4 inter-regular mt-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2 "
            maxLength={100}
            required
            disabled={loading}
            defaultValue={action === "edit" ? service.name : ""}
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="w-full max-h-40 min-h-20 rounded-md bg-slate-200  border border-gray-200 p-2"
            maxLength={300}
            required
            disabled={loading}
            defaultValue={action === "edit" ? service.description : ""}
          />

          <div className="flex gap-4 w-full">
            <select
              name="category_id"
              className="flex-1 rounded-md bg-slate-200  border border-gray-200 p-2"
              required
              disabled={loading}
              value={service?.category_id || ""}
              onChange={(e) => {
                setService({ ...service, category_id: e.target.value });
              }}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {/* <select
              name="unit"
              id="unit"
              className="rounded-md bg-slate-200  border border-gray-200 p-2"
            >
              <option value="per Hour">per Hour</option>
              <option value="per Day">per Day</option>
              <option value="per Project">per Project</option>
            </select> */}
          </div>

          <div className="relative">
            <input
              type="number"
              name="price"
              placeholder="Pricing"
              className="w-full rounded-md bg-slate-200  border border-gray-200 p-2 ps-8"
              required
              min={1}
              disabled={loading}
              defaultValue={action === "edit" ? service.price : ""}
            />
            <div className="absolute top-1/2 left-3 -translate-y-1/2">$</div>
          </div>

          <input
            type="number"
            name="duration"
            placeholder="Duration (in days)"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
            min={1}
            disabled={loading}
            defaultValue={action === "edit" ? service.duration : ""}
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags/Keywords"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            maxLength={100}
            disabled={loading}
            defaultValue={action === "edit" ? service.tags : ""}
          />

          <textarea
            type="text"
            name="additional_notes"
            placeholder="Additional Notes"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2 max-h-28 min-h-20"
            maxLength={300}
            disabled={loading}
            defaultValue={action === "edit" ? service.additional_notes : ""}
          />

          <div className="flex justify-center gap-10">
            <div className="flex gap-4">
              <input
                type="radio"
                name="status"
                value="active"
                className="w-full rounded-md bg-slate-200 border border-gray-200 p-2"
                required
                disabled={loading}
                checked={service.status === "active"} // Set checked based on the condition
                onChange={() => handleStatusChange("active")} // Add onChange handler to update the status
              />
              <label htmlFor="status-active">Active</label>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="status"
                value="inactive"
                className="w-full rounded-md bg-slate-200 border border-gray-200 p-2"
                required
                disabled={loading}
                checked={service.status === "inactive"} // Set checked based on the condition
                onChange={() => handleStatusChange("inactive")} // Add onChange handler to update the status
              />
              <label htmlFor="status-inactive">Inactive</label>
            </div>
          </div>

          <button
            className="w-full rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : (
              action === "edit" ? "Update Service" : "Add Service"
            )}
          </button>
        </form>
        <button
          onClick={() => navigate("/services")}
          className="w-full rounded-md bg-blue-200 p-2 text-black mt-4"
        >
          Cancel
        </button>
      </Card>
    </div>
  );
};

export default AddService;

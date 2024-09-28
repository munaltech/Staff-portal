import { useNavigate } from "react-router-dom";
import { Card } from "../components";
import { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners";

const AddService = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, [navigate]);

  const getCategories = async () => {
    const response = await fetch("http://localhost:8000/api/v1/categories", {
      method: "GET",
    });

    const res = await response.json();

    setCategories(res.data);
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
        "http://localhost:8000/api/v1/services/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (response.ok) {
        setLoading(false);
        alert(res.message);
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
  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular bg-white">
        <h1 className="text-2xl space-grotesk-bold text-center">New Service</h1>

        <form
          method="post"
          onSubmit={addService}
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
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="w-full max-h-40 min-h-20 rounded-md bg-slate-200  border border-gray-200 p-2"
            maxLength={300}
            required
            disabled={loading}
          />

          <select
            name="category_id"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
            disabled={loading}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="relative">
            <input
              type="number"
              name="price"
              placeholder="Pricing"
              className="w-full rounded-md bg-slate-200  border border-gray-200 p-2 ps-8"
              required
              min={1}
              disabled={loading}
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
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags/Keywords"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            maxLength={100}
            disabled={loading}
          />

          <textarea
            type="text"
            name="additional_notes"
            placeholder="Additional Notes"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2 max-h-28 min-h-20"
            maxLength={300}
            disabled={loading}
          />

          <div className="flex  justify-center gap-10">
            <div className="flex gap-4">
              <input
                type="radio"
                name="status"
                value="active"
                className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
                required
                disabled={loading}
              />
              <label htmlFor="">Active</label>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="status"
                value="inactive"
                className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
                required
                disabled={loading}
              />
              <label htmlFor="">Inactive</label>
            </div>
          </div>

          <button
            className="w-full rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : (
              "Add Service"
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

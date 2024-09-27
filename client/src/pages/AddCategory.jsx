import { useState } from "react";
import { Card } from "../components";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch("http://localhost:8000/api/v1/categories/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
      setLoading(false);
      navigate("/services", { reload: true });
    } else {
      alert(result.message);
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular bg-white">
        <h1 className="text-2xl space-grotesk-bold text-center">New Category</h1>

        <form
          method="post"
          onSubmit={addCategory}
          className="space-y-4 inter-regular mt-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Category Name"
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

          

          <button
            className="w-full rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : (
              "Add Category"
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

export default AddCategory;

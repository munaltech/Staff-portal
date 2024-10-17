import { useEffect, useState } from "react";
import { Card } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AddCategory = ({ action }) => {
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [category, setCategory] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, [navigate]);

  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch(
      "https://api.munaltechnology.com/api/categories",
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

    const result = await response.json();
    if (response.ok) {
      setLoading(false);
      navigate("/services");
    } else {
      alert(result.message);
      setLoading(false);
    }
  };

  const getCategory = async () => {
    const response = await fetch(
      `https://api.munaltechnology.com/api/categories/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();

    if (response.ok) {
      setCategory(result.category);
    } else {
      alert(result.message);
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await fetch(
        `https://api.munaltechnology.com/api/categories/${id}`,
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

      const result = await response.json();
      if (response.ok) {
        setLoading(false);
        navigate("/services");
      } else {
        alert(result.message);
        setLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const deleteCategory = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(
        `https://api.munaltechnology.com/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setDeleteLoading(false);
        navigate("/services");
      } else {
        alert(result.message);
        setDeleteLoading(false);
      }
    } catch (error) {
      alert(error.message);
      setDeleteLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular bg-white">
        <h1 className="text-2xl space-grotesk-bold text-center">
          New Category
        </h1>

        <form
          method="post"
          onSubmit={action === "edit" ? updateCategory : addCategory}
          className="space-y-4 inter-regular mt-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2 "
            maxLength={100}
            defaultValue={category?.name || ""}
            required
            disabled={loading || deleteLoading}
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="w-full max-h-40 min-h-20 rounded-md bg-slate-200  border border-gray-200 p-2"
            maxLength={300}
            defaultValue={category?.description || ""}
            required
            disabled={loading || deleteLoading}
          />

          <button
            className="w-full rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : action === "edit" ? (
              "Update Category"
            ) : (
              "Add Category"
            )}
          </button>
        </form>
        {action === "edit" && (
          <button
            className="w-full rounded-md bg-red-500 p-2 text-white mt-2"
            onClick={deleteCategory}
          >
            {deleteLoading ? (
              <ClipLoader loading={deleteLoading} color="white" size={15} />
            ) : (
              "Delete Category"
            )}
          </button>
        )}
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

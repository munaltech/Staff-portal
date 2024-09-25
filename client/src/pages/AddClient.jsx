import { Card } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const AddClient = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const addClient = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch("http://localhost:8000/api/v1/clients/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.status === "success") {
      alert(result.message);
      setLoading(false);
      goToClients();
    }else{
      alert(result.message);
      setLoading(false);
    }

  };

  const goToClients = () => {
    navigate("/clients",{ state: { refresh: true } });
  };
  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular bg-slate-100">
        <h1 className="text-2xl space-grotesk-bold text-center">New Client</h1>

        <form
          method="post"
          onSubmit={addClient}
          className="space-y-4 inter-regular mt-4"
        >
          <input
            type="text"
            name="business_name"
            placeholder="Business Name"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />

          <input
            type="text"
            name="representative_position"
            placeholder="Representative Position"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />
          <input
            type="text"
            name="representative_name"
            placeholder="Representative Name"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
          />

          <input
            type="text"
            name="card_name"
            placeholder="Card Name"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />

          <input
            type="text"
            name="sort_code"
            placeholder="Sort Code"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />

          <input
            type="text"
            name="account_number"
            placeholder="Account Number"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />

          <input
            type="text"
            name="bank_name"
            placeholder="Bank Name"
            className="w-full rounded-md bg-slate-200  border border-gray-200 p-2"
            required
          />

          <button
            className="w-full rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : (
              "Add Client"
            )}
          </button>
        </form>
        <button
          className="w-full rounded-md bg-blue-200 p-2 text-black mt-4"
          onClick={goToClients}
        >
          Cancel
        </button>
      </Card>
    </div>
  );
};

export default AddClient;

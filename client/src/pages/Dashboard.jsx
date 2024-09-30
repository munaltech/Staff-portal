import { useNavigate } from "react-router-dom";
import { PageHeading } from "../components";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [numberOfActiveClients, setNumberOfActiveClients] = useState(0);
  const [numberOfActiveSubscriptions, setNumberOfActiveSubscriptions] =
    useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getNumberOfActiveClients();
    getNumberOfActiveSubscriptions();
  }, [navigate]);
  const getNumberOfActiveClients = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/clients/active",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const res = await response.json();
    setNumberOfActiveClients(res.data.length);
  };

  const getNumberOfActiveSubscriptions = async () => {
    const response = await fetch(
      "http://localhost:8000/api/v1/subscriptions/active",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    const res = await response.json();
    setNumberOfActiveSubscriptions(res.data.length);
  };
  return (
    <>
      <div className="flex  justify-between">
        <PageHeading title="Dashboard" />
      </div>
      <div className="flex gap-6 mt-4">
        <div className="border rounded-xl w-fit px-8 py-4">
          <h2 className="inter-semibold text-lg">Active Clients</h2>
          <h1 className="inter-bold text-5xl">{numberOfActiveClients}</h1>
        </div>

        <div className="border rounded-xl w-fit px-8 py-4">
          <h2 className="inter-semibold text-lg">Active Subscriptions</h2>
          <h1 className="inter-bold text-5xl">{numberOfActiveSubscriptions}</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import { useNavigate } from "react-router-dom";
import { PageHeading, Button, Card } from "../components";
import { useEffect, useState } from "react";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions();
  }, [navigate]);

  const getSubscriptions = async () => {
    const response = await fetch("http://localhost:8000/api/v1/subscriptions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    setSubscriptions(data.data);
    console.log(data.data);
  };

  return (
    <>
      <div className="flex gap-4 sm:gap-8 justify-between items-center">
        <PageHeading title="Subscriptions" />

        <Button
          text="Add Subscription"
          icon="subscription"
          className="hidden sm:flex"
          onClick={() => navigate("/subscriptions/add")}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {subscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="flex flex-wrap justify-between gap-8 px-4 py-2 border-2 rounded-lg w-full h-fit hover:bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out"
          >
            <div className="flex-1">
              <div className="flex justify-between">
                <h1 className="inter-semibold">
                  {subscription.client.business_name}
                </h1>
                <h3 className="space-grotesk-bold text-sm text-gray-600">
                  {subscription.ended_at < new Date() &&
                  subscription.ended_at !== null
                    ? "Expired"
                    : "Active"}
                </h3>
              </div>

              {subscription.services.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center inter-medium text-sm text-gray-600"
                >
                  <h3>{service.name}</h3>
                  <h3> &pound; {service.price}</h3>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button icon={"edit"} onClick={() => navigate(`/subscriptions/edit/${subscription.id}`)} />
              <Button icon={"checkmark"} className={"bg-red-600 hover:bg-red-800"} onClick={() => navigate(`/subscriptions/delete/${subscription.id}`)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Subscriptions;

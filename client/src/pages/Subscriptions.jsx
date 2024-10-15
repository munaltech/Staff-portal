import { useNavigate } from "react-router-dom";
import { PageHeading, Button } from "../components";
import { useEffect, useState } from "react";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions();
  }, [navigate]);

  const getSubscriptions = async () => {
    const response = await fetch(
      "https://api.munaltechnology.com/api/subscriptions",
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
    setSubscriptions(res.subscriptions);
  };

  const markAsEnded = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to mark this subscription as ended?"
      )
    ) {
      const response = await fetch(
        `https://api.munaltechnology.com/api/subscriptions/end/${id}`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ended_at: new Date(),
          }),
        }
      );

      const res = await response.json();
      if (response.ok) {
        getSubscriptions();
      } else {
        alert(res.message);
      }
    }
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
                  {subscription.ended_at !== null ? "Expired" : "Active"}
                </h3>
              </div>

              <div className="flex items-center inter-medium text-xs text-gray-600 mb-2">
                <h3 className=""><em>Since</em> {subscription.started_at.split(" ")[0]}</h3>

                {subscription.ended_at !== null && (
                  <h3 className="">&nbsp;<em>To</em> {subscription.ended_at.split(" ")[0]}</h3>
                )}

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
              <div className="flex justify-between mt-2 inter-medium text-center text-base">
                <h3>
                  <strong>Total</strong>
                </h3>
                <h1>&pound; {subscription.total}</h1>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
              <Button
                icon={"edit"}
                onClick={() =>
                  navigate(`/subscriptions/edit/${subscription.id}`)
                }
              />
              <Button
                icon={"checkmark"}
                className={"bg-red-600 hover:bg-red-800"}
                onClick={() => markAsEnded(subscription.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Subscriptions;

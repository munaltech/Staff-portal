import { PageHeading } from "../components";
import Card from "../components/clients/Card";
import { Button } from "../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  const [searchLoading, setSearchLoading] = useState(false);

  const [clients, setClients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getClients();
  }, [navigate]);

  const searchClients = (e) => {
    e.preventDefault();
    setSearchLoading(true);
  };

  const getClients = async () => {
    const response = await fetch("http://localhost:8000/api/v1/clients", {
      method: "GET",
    });
    const res = await response.json();

    setClients(res.data);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeading title="Clients" />
        <form className="flex">
          <input
            type="text"
            className="border font-mono focus:outline-none border-gray-300 rounded-l-md px-4 py-2"
            placeholder="Search"
          />
          <Button
            text=""
            icon={searchLoading ? "loading" : "search"}
            iconClass={searchLoading ? "animate-spin" : ""}
            className="rounded-l-none"
            onClick={searchClients}
          />
        </form>

        <Button
          text="Add Client"
          icon="plus"
          className="hidden sm:flex"
          onClick={() => navigate("/clients/add")}
        />
      </div>
      <div className="mt-8 inter-regular flex flex-wrap gap-4">
        {clients.map((client) => (
            <Card key={client.id} client={client} />
        ))}

        {clients.length === 0 && (
          <div className="w-full h-64 flex flex-col gap-8 justify-center items-center cursor-default">
            <p className="text-center font-mono text-slate-400">
              No clients to show
            </p>
            <img
              width="96"
              height="96"
              src="https://img.icons8.com/pulsar-color/96/image-not-avialable.png"
              alt="image-not-avialable"
              className="opacity-50"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Clients;

import { PageHeading } from "../components";
import Card from "../components/clients/Card";
import { Button } from "../components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Clients = () => {
  

  const [clients, setClients] = useState([]);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getClients();
  }, [navigate]);

  

  const getClients = async () => {
    const response = await fetch("http://localhost:8000/api/v1/clients", {
      method: "GET",
    });
    const res = await response.json();

    setClients(res.data);
  };

  const filteredClients = clients.filter((client) => {
    return (
      client.business_name.toLowerCase().includes(query.toLowerCase()) ||
      client.representative_name.toLowerCase().includes(query.toLowerCase()) ||
      client.email.toLowerCase().includes(query.toLowerCase()) ||
      client.phone_number.toLowerCase().includes(query.toLowerCase()) ||
      client.address.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <>
      <div className="flex gap-4 sm:gap-8 justify-between items-center">
        <PageHeading title="Clients" />
        <form className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            className="border font-mono bg-slate-100  focus:outline-none border-gray-500 rounded-md focus:rounded-xl px-4 py-2 transition-all duration-300 ease-in-out"
            placeholder="Search"
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
        {filteredClients.map((client) => (
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

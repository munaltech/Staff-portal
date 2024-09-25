import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components";

const ClientDetails = () => {
  const { id } = useParams();

  const [client, setClient] = useState({});

  useEffect(() => {
    getClientDetails();
  });

  const getClientDetails = async () => {
    const response = await fetch(`http://localhost:8000/api/v1/clients/${id}`, {
      method: "GET",
    });

    const res = await response.json();

    setClient(res.data);
  };
  return (
    // {
    //     "id": 1,
    //     "business_name": "Munal Technology",
    //     "address": "Wolverhampton",
    //     "representative_position": "MD",
    //     "representative_name": "Bibek Sapkota",
    //     "email": "bibek@munaltechnology.com",
    //     "phone_number": "1234567890",
    //     "card_name": "Bibek Sapkota",
    //     "sort_code": "242342",
    //     "account_number": "6235482369374",
    //     "bank_name": "Some Bank",
    //     "createdAt": "2024-09-25T08:16:01.000Z",
    //     "updatedAt": "2024-09-25T08:16:01.000Z"
    // }
    <div className="px-8 py-4 w-full inter-regular">
      <Button
        text="Go Back"
        icon="circled-left-2"
        onClick={() => window.history.back()}
        className={"mb-4 bg-slate-600 hover:bg-slate-500"}
      />
      <div className=" px-8 py-4 border rounded-lg w-full">
        <h1 className="space-grotesk-semibold text-2xl text-wrap">
          {client.business_name}
        </h1>
        <p className="text-sm text-gray-500">{client.address}</p>

        <hr className="my-4" />

        <div className="w-full flex flex-wrap justify-between">
          <div className="w-full">
            <h3 className="inter-semibold inline text-lg">
              {client.representative_name}
            </h3>
            <p className="ms-4 inline text-gray-500">
              {client.representative_position}
            </p>

            <div className="flex flex-col text-gray-600 items-baseline mt-2">
              <p className="">{client.email}</p>
              <p>{client.phone_number}</p>
            </div>

            <div className="w-full flex flex-wrap  gap-x-8 gap-y-2 mt-4">
              <div>
                <h3 className="text-sm text-gray-500">Account Name</h3>
                <p className="space-grotesk-regular ">{client.card_name}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Account Number</h3>
                <p className="space-grotesk-regular ">
                  {client.account_number}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Sort Code</h3>
                <p className="space-grotesk-regular ">{client.sort_code}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Bank Name</h3>
                <p className="space-grotesk-regular ">{client.bank_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components";

const ClientDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  const [client, setClient] = useState({});

  const [edit, setEdit] = useState(false);

  const [comments, setComments] = useState([]);

  const commentRef = useRef(null);

  useEffect(() => {
    getClientDetails();
    getComments();
  },[navigate]);

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
  };

  const getClientDetails = async () => {
    const response = await fetch(`http://localhost:8000/api/v1/clients/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const res = await response.json();

    setClient(res.data);
  };

  const updateClient = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch(
      `http://localhost:8000/api/v1/clients/update/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    if (response.ok) {
      alert(res.message);
      navigate(`/client/${id}`);
      setEdit(false);
    } else {
      alert(res.message);
      setEdit(false);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch(
      `http://localhost:8000/api/v1/comments/${id}`,
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
      commentRef.current.value = "";
      getComments();
    } else {
      alert(res.message);
    }
  };

  const getComments = async () => {
    const response = await fetch(`http://localhost:8000/api/v1/comments/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();

    setComments(data.data);
  };

  return (
    <div className="px-8 py-4 w-full inter-regular">
      <Button
        text="Go Back"
        icon="circled-left-2"
        onClick={() => navigate("/clients")}
        className={"mb-4 bg-slate-600 hover:bg-slate-500"}
      />
      <form
        onSubmit={updateClient}
        className="px-8 py-4 border rounded-lg w-full"
      >
        <div className="w-full flex justify-between">
          <div>
            <h1 className="space-grotesk-semibold text-2xl text-wrap">
              {edit ? (
                <input
                  type="text"
                  name="business_name"
                  className={`${
                    edit
                      ? "bg-white border border-gray-300"
                      : "bg-transparent border-none"
                  } focus:outline-none`}
                  defaultValue={client.business_name}
                  disabled={!edit}
                  onChange={(e) =>
                    setClient({ ...client, business_name: e.target.value })
                  }
                />
              ) : (
                client.business_name
              )}
            </h1>
            <p className="text-sm text-gray-500">
              {edit ? (
                <input
                  type="text"
                  name="address"
                  className={`${
                    edit
                      ? "bg-white border border-gray-300"
                      : "bg-transparent border-none"
                  } focus:outline-none`}
                  defaultValue={client.address}
                  disabled={!edit}
                  onChange={(e) =>
                    setClient({ ...client, address: e.target.value })
                  }
                />
              ) : (
                client.address
              )}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Button
              text="Edit"
              icon="edit"
              onClick={() => setEdit(!edit)}
              type={"button"}
              className={`bg-slate-600 hover:bg-slate-500 disabled:bg-slate-400 ${
                edit ? "hidden" : ""
              }`}
              disabled={edit}
            />
            <Button
              text="Save"
              icon="save"
              type={"submit"}
              className={`bg-blue-600 hover:bg-blue-500 disabled:bg-blue-500 ${
                edit ? "" : "hidden"
              } `}
              disabled={!edit}
            />
          </div>
        </div>

        <hr className="my-4" />

        <div className="w-full flex flex-wrap justify-between">
          <div className="w-full">
            <h3 className="inter-semibold inline text-lg">
              {edit ? (
                <input
                  type="text"
                  name="representative_name"
                  className={`${
                    edit
                      ? "bg-white border border-gray-300"
                      : "bg-transparent border-none"
                  } focus:outline-none`}
                  defaultValue={client.representative_name}
                  disabled={!edit}
                  onChange={(e) =>
                    setClient({
                      ...client,
                      representative_name: e.target.value,
                    })
                  }
                />
              ) : (
                client.representative_name
              )}
            </h3>
            <p className="ms-4 inline text-gray-500">
              {edit ? (
                <input
                  type="text"
                  name="representative_position"
                  className={`${
                    edit
                      ? "bg-white border border-gray-300"
                      : "bg-transparent border-none"
                  } focus:outline-none`}
                  defaultValue={client.representative_position}
                  disabled={!edit}
                  onChange={(e) =>
                    setClient({
                      ...client,
                      representative_position: e.target.value,
                    })
                  }
                />
              ) : (
                client.representative_position
              )}
            </p>

            <div className="flex flex-col text-gray-600 items-baseline mt-2">
              <p>
                {edit ? (
                  <input
                    type="email"
                    name="email"
                    className={`${
                      edit
                        ? "bg-white border border-gray-300"
                        : "bg-transparent border-none"
                    } focus:outline-none`}
                    defaultValue={client.email}
                    disabled={!edit}
                    onChange={(e) =>
                      setClient({ ...client, email: e.target.value })
                    }
                  />
                ) : (
                  client.email
                )}
              </p>
              <p>
                {edit ? (
                  <input
                    type="text"
                    name="phone_number"
                    className={`${
                      edit
                        ? "bg-white border border-gray-300"
                        : "bg-transparent border-none"
                    } focus:outline-none`}
                    defaultValue={client.phone_number}
                    disabled={!edit}
                    onChange={(e) =>
                      setClient({ ...client, phone_number: e.target.value })
                    }
                  />
                ) : (
                  client.phone_number
                )}
              </p>
            </div>

            <div className="w-full flex flex-wrap gap-x-8 gap-y-2 mt-4">
              <div>
                <h3 className="text-sm text-gray-500">Account Name</h3>
                <p className="space-grotesk-regular">
                  {edit ? (
                    <input
                      type="text"
                      name="card_name"
                      className={`${
                        edit
                          ? "bg-white border border-gray-300"
                          : "bg-transparent border-none"
                      } focus:outline-none`}
                      defaultValue={client.card_name}
                      disabled={!edit}
                      onChange={(e) =>
                        setClient({ ...client, card_name: e.target.value })
                      }
                    />
                  ) : (
                    client.card_name
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Account Number</h3>
                <p className="space-grotesk-regular">
                  {edit ? (
                    <input
                      type="text"
                      name="account_number"
                      className={`${
                        edit
                          ? "bg-white border border-gray-300"
                          : "bg-transparent border-none"
                      } focus:outline-none`}
                      defaultValue={client.account_number}
                      disabled={!edit}
                      onChange={(e) =>
                        setClient({ ...client, account_number: e.target.value })
                      }
                    />
                  ) : (
                    client.account_number
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Sort Code</h3>
                <p className="space-grotesk-regular">
                  {edit ? (
                    <input
                      type="text"
                      name="sort_code"
                      className={`${
                        edit
                          ? "bg-white border border-gray-300"
                          : "bg-transparent border-none"
                      } focus:outline-none`}
                      defaultValue={client.sort_code}
                      disabled={!edit}
                      onChange={(e) =>
                        setClient({ ...client, sort_code: e.target.value })
                      }
                    />
                  ) : (
                    client.sort_code
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Bank Name</h3>
                <p className="space-grotesk-regular">
                  {edit ? (
                    <input
                      type="text"
                      name="bank_name"
                      className={`${
                        edit
                          ? "bg-white border border-gray-300"
                          : "bg-transparent border-none"
                      } focus:outline-none`}
                      defaultValue={client.bank_name}
                      disabled={!edit}
                      onChange={(e) =>
                        setClient({ ...client, bank_name: e.target.value })
                      }
                    />
                  ) : (
                    client.bank_name
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        <div className="mt-8 flex flex-col gap-4">
          <h3 className="inter-semibold text-xl">Subscriptions</h3>
          {subscriptions
            .filter((subscription) => subscription.client_id === client.id)
            .map((subscription) => (
              <div
                key={subscription.id}
                className="flex flex-wrap justify-between gap-8 px-4 py-2 border rounded-lg w-full h-fit hover:bg-gray-200 cursor-pointer transition-colors duration-300 ease-in-out"
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
                  <Button
                    icon={"edit"}
                    onClick={() =>
                      navigate(`/subscriptions/edit/${subscription.id}`)
                    }
                  />
                  <Button
                    icon={"checkmark"}
                    className={"bg-red-600 hover:bg-red-800"}
                    onClick={() =>
                      navigate(`/subscriptions/delete/${subscription.id}`)
                    }
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="border-t mt-8 px-4 py-2">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="text-sm inter-regular text-gray-500">{comment.text}</div>
            </div> 
          ))}
          {comments.length === 0 && (
            <div className="text-sm inter-regular text-gray-500">No comments</div>
          )}
          
          <form
            onSubmit={addComment}
            className="  flex items-center justify-between gap-4"
          >
            <input
              type="text"
              name="text"
              className="border px-4 py-2 rounded-lg w-full mt-2"
              placeholder="Add comment"
              ref={commentRef}
            />
            <Button icon={"comments"} type={"submit"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;

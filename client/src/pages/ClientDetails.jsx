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

  const [usernames, setUsernames] = useState({});

  const commentRef = useRef(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  useEffect(() => {
    getClientDetails();
    getComments();
  }, [navigate]);

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
    const response = await fetch(
      `http://localhost:8000/api/v1/comments/${id}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await response.json();

    setComments(data.data);
  };

  const getUsername = async (userId) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/users/${userId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data.data.username;
    }
    return null;
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      const newUsernames = {};
      for (const comment of comments) {
        if (!newUsernames[comment.user_id]) {
          const username = await getUsername(comment.user_id);
          newUsernames[comment.user_id] = username;
        }
      }

      setUsernames(newUsernames);
    };
    fetchUsernames();
  }, [comments]);

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
      <div className="mt-8 w-full flex flex-wrap gap-x-8 gap-y-2 ">
        <div className="flex flex-col gap-4 flex-1">
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

        <div className="flex-1 sm:flex-none">
          <h3 className="inter-semibold text-xl">Comments</h3>
          <div className="border overflow-clip rounded-lg mt-4 sm:w-96 ">
            <div className="overflow-y-scroll h-52 px-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex justify-between items-center text-sm inter-regular text-gray-700 border py-2 mt-2 px-4 rounded-2xl bg-slate-100"
                >
                  <h1 className="inter-regular text-wrap">{comment.text}</h1>
                  <h3 className="text-xs bg-slate-300 p-2 rounded-2xl">
                    {usernames[comment.user_id] || "Loading..."}
                  </h3>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-sm w-full h-full flex justify-center items-center  inter-regular text-gray-500">
                 
                  <h1> No comments to show</h1>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={addComment}
              className=" flex flex-col gap-2 px-2 py-2"
            >
              <input
                type="text"
                name="text"
                className="border px-4 py-2 rounded-lg w-full mt-2"
                placeholder="Add comment"
                ref={commentRef}
                required
              />
              <Button
                icon={"comments"}
                text={"Comment"}
                className={"h-full"}
                type={"submit"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDetails;

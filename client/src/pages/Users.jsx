import { useNavigate } from "react-router-dom";
import { Button, PageHeading } from "../components";
import { useEffect, useState } from "react";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);


  useEffect(() => {
    getUsers();
  }, [navigate]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:8000/api/v1/users");

    const { data } = await response.json();

    setUsers(data);
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:8000/api/v1/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };

  return (
    <>
      <div className="flex  justify-between">
        <PageHeading title="Users" />
        <Button
          text="Create User"
          icon="user"
          onClick={() => navigate("/users/signup")}
        />
      </div>
      <div className="mt-4 inter-regular">
        <table className="border w-full">
          <thead className="border">
            <tr>
              <th className="border px-4 py-2 bg-slate-100">Username</th>
              <th className="border px-4 py-2 bg-slate-100">Name</th>
              <th className="border px-4 py-2 bg-slate-100">Email</th>
              <th className="border px-4 py-2 bg-slate-100">Role</th>
              <th className="border px-4 py-2 bg-slate-100">Phone</th>
              <th className="border px-4 py-2 bg-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-balance">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.full_name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.phone_number}</td>
                <td className="border w-full h-full flex justify-center items-center gap-4 px-4 py-2">
                  <Button
                    icon="edit"
                    className=" bg-blue-500 hover:bg-blue-700"
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                  />

                  {user.role !== "admin" && (
                    <Button
                      icon="delete"
                      className="bg-red-700 hover:bg-red-900"
                      onClick={() => deleteUser(user.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;

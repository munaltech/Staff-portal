import { useNavigate } from "react-router-dom";
import { Button, PageHeading } from "../components";

const Users = () => {
  const navigate = useNavigate();

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
            <tr >
              <th className="border px-4 py-2 bg-slate-100">Name</th>
              <th className="border px-4 py-2 bg-slate-100">Email</th>
              <th className="border px-4 py-2 bg-slate-100">Role</th>
              <th className="border px-4 py-2 bg-slate-100">Status</th>
              <th className="border px-4 py-2 bg-slate-100">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-balance">
            <tr>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2">2KdJZ@example.com</td>
              <td className="border px-4 py-2">Admin</td>
              <td className="border px-4 py-2">Active</td>
              <td className="border flex justify-center items-center gap-4 px-4 py-2">
                <Button icon="edit" className=" bg-blue-500 hover:bg-blue-700" />
                <Button icon="delete" className="bg-red-700 hover:bg-red-900" />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2">2KdJZ@example.com</td>
              <td className="border px-4 py-2">Admin</td>
              <td className="border px-4 py-2">Active</td>
              <td className="border flex justify-center items-center gap-4 px-4 py-2">
                <Button icon="edit" className=" bg-blue-500 hover:bg-blue-700" />
                <Button icon="delete" className="bg-red-700 hover:bg-red-900" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;

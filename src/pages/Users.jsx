
import { useNavigate } from "react-router-dom";
import { Button, PageHeading } from "../components";


const Users = () => {
  const navigate = useNavigate();



  return (
    <>
    <div className="flex justify-between">
      <PageHeading title="Users" />
      <Button text="Create User" icon="user" onClick={() => navigate("/users/signup")}/>
    </div>

    
      
    </>
  );
};

export default Users;

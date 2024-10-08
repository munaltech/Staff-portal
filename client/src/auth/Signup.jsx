import { Card } from "../components";
import { ClipLoader } from "react-spinners";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Signup = ({ action }) => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pVisibility, setPVisibility] = useState("invisible");
  const [cpVisibility, setCPVisibility] = useState("invisible");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (action === "edit" && id) {
      fetchUser(id);
    }
  }, [action, id]);

  const navigate = useNavigate();

  const goToUsers = () => {
    navigate("/users",{ state: { refresh: true } });
  };

  const togglePVisibility = () => {
    setPVisibility((prevState) => (prevState === "visible" ? "invisible" : "visible"));
  };

  const toggleCPVisibility = () => {
    setCPVisibility((prevState) => (prevState === "visible" ? "invisible" : "visible"));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (phoneNumber.length !== 10) {
      alert("Phone number must be 10 digits long");
      setLoading(false);
      return;
    }

    if (password.length < 8 && confirmPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/register",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            full_name: fullName,
            role,
            email,
            phone_number: phoneNumber,
            username,
            password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      
      

      if (response.ok) {
        alert("User created successfully");
        setLoading(false);
        goToUsers();
      } else {
        const res = await response.json();
        if(response.status === 422){
          const errors = res.errors;
          let errorMessage = "Please fix the following errors: \n";
          for (const [field,messages] of Object.entries(errors)) {
            errorMessage += `${field}: ${messages.join(", ")}\n`;
          }
          alert(errorMessage);
        }
        setLoading(false);
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  const fetchUser = async (id) => {
    const response = await fetch(`http://localhost:8000/api/users/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await response.json();
    
    setUser(res.user);
    setFullName(res.user.full_name);
    setRole(res.user.role);
    setEmail(res.user.email);
    setPhoneNumber(res.user.phone_number);
    setUsername(res.user.username);
  };

  const update = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (phoneNumber.length !== 10) {
      alert("Phone number must be 10 digits long");
      setLoading(false);
      return;
    }

    if (password.length < 8 && confirmPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      
      const response = await fetch(
        "http://localhost:8000/api/users/"+ id,
        {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            full_name: fullName,
            role,
            email,
            phone_number: phoneNumber,
            username,
            password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        alert("User updated successfully");
        setLoading(false);
        goToUsers();
      } else {
        alert("Error updating user");
        setLoading(false);
      }

      
    } catch (error) {
      alert("Error updating user");
      setLoading(false);
    }

  };

  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular">
        <h1 className="text-2xl space-grotesk-bold text-center">
          {action === "signup" ? "Sign Up" : "Edit"}
        </h1>

        <form
          method="post"
          onSubmit={action === "signup" ? signup : update}
          className="space-y-4 inter-regular mt-4"
        >
          <label htmlFor="fullName" hidden>
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            className="w-full rounded-md border border-gray-200 p-2"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            required
            disabled={loading}
          />

          <label htmlFor="role" hidden>
            Role
          </label>
          <select
            name="role"
            id="role"
            className="w-full rounded-md border border-gray-200 p-2"
            value={role}
            onChange={handleRoleChange}
            required
            disabled={loading || (action === "edit" && user?.role === "admin")}
          >
            <option value="admin">Admin</option>
            <option value="level1">Level 1</option>
            <option value="level2">Level 2</option>
          </select>

          <label htmlFor="email" hidden>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-200 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label htmlFor="phone" hidden>
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            className="w-full rounded-md border border-gray-200 p-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            disabled={loading}
          />

          <label htmlFor="username" hidden>
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="w-full rounded-md border border-gray-200 p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />

          <label htmlFor="password" hidden>
            Password
          </label>
          <div className="relative">
            <input
              type={pVisibility === "visible" ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-md border border-gray-200 p-2"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <img
              width="15"
              height="15"
              src={`https://img.icons8.com/fluency-systems-regular/25/${pVisibility}--v1.png`}
              alt="visiblity"
              onClick={togglePVisibility}
              className="absolute top-1/3 right-2 cursor-pointer"
            />
          </div>

          <label htmlFor="password_confirmation" hidden>
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={cpVisibility === "visible" ? "text" : "password"}
              name="password_confirmation"
              id="password_confirmation"
              placeholder="Confirm Password"
              className="w-full rounded-md border border-gray-200 p-2"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />

            <img
              width="15"
              height="15"
              src={`https://img.icons8.com/fluency-systems-regular/25/${cpVisibility}--v1.png`}
              alt="visiblity"
              onClick={toggleCPVisibility}
              className="absolute top-1/3 right-2 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-2 text-white"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : (
              action === "edit" ? "Update" : "Sign Up"
            )}
          </button>
        </form>
        <button
          className="w-full rounded-md bg-blue-200 p-2 text-black mt-4"
          disabled={loading}
          onClick={goToUsers}
        >
          Cancel
        </button>
      </Card>
    </div>
  );
};


export default Signup;

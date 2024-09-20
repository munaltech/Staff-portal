import { Card } from "../components";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pVisibility, setPVisibility] = useState("invisible");
  const [cpVisibility, setCPVisibility] = useState("invisible");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();


  const goToUsers = () => {
    navigate("/users");
  };

  const togglePVisibility = () => {
    if (pVisibility === "visible") {
      // If the password is currently visible, hide it
      setPVisibility("invisible");
    } else {
      // If the password is currently hidden, show it
      setPVisibility("visible");
    }
  };

  const toggleCPVisibility = () => {
    if (cpVisibility === "visible") {
      // If the password is currently visible, hide it
      setCPVisibility("invisible");
    } else {
      // If the password is currently hidden, show it
      setCPVisibility("visible");
    }
  };

  const signup = (e) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <div className="bg-gray-800/10 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <Card className="mx-4 h-fit inter-regular">
        <h1 className="text-2xl space-grotesk-bold text-center">Sign Up</h1>

        <form
          method="post"
          onSubmit={signup}
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
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={loading}
          >
            <option value="0">Admin</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
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
            onChange={(e) => setUsername(e.target.value)}
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

          <label htmlFor="confirmPassword" hidden>
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={cpVisibility === "visible" ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full rounded-md border border-gray-200 p-2"
              onChange={(e) => setPassword(e.target.value)}
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
              "Sign Up"
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

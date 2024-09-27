import { Card } from "../components";
import { ClipLoader } from "react-spinners";
import { useState } from "react";

const Login = () => {
  const [visibility, setVisibility] = useState("invisible");

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const toggleVisibility = () => {
    if (visibility === "visible") {
      // If the password is currently visible, hide it
      setVisibility("invisible");
    } else {
      // If the password is currently hidden, show it
      setVisibility("visible");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem("refresh_token", result.data.refresh_token);
        setLoading(false);
        window.location.href = "/";
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col py-8 items-center gap-4">
      <img
        src="../assets/munal_logo_opacity.png"
        alt="logo"
        width={100}
        height={100}
      />
      <Card className="min-w-fit mx-4 h-fit">
        <h1 className="text-2xl space-grotesk-bold text-center">Login</h1>

        <form
          method="post"
          onSubmit={login}
          className="space-y-4 inter-regular mt-4"
        >
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
              type={visibility === "visible" ? "text" : "password"}
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
              src={`https://img.icons8.com/fluency-systems-regular/25/${visibility}--v1.png`}
              alt="visiblity"
              onClick={toggleVisibility}
              className="absolute top-1/3 right-2 cursor-pointer"
            />
          </div>

          {/* <div className="flex items-center justify-end">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="w-4 h-4"
              onChange={(e) => setRemember(e.target.checked)}
              disabled={loading}
            />
            <label htmlFor="remember" className="text-gray-700 ms-2">
              Remember Me
            </label>
          </div> */}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 p-2 text-white"
          >
            {loading ? (
              <ClipLoader loading={loading} color="white" size={15} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Login;

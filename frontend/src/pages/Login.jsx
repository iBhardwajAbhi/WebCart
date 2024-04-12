import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const loginHandler = async () => {
    const res = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(res.data.token));
    setUser(res.data.user);
    navigate("/");
    console.log(res.data.user);
    console.log(res.data.token);
  };
  return (
    <div className="login-form">
      <p>Login</p>
      <label htmlFor="">Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="">Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button
        onClick={loginHandler}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Login
      </button>
    </div>
  );
};

export default Login;

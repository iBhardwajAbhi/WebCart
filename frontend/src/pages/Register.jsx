import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await axios.post("/api/auth/register", {
      name,
      email,
      password,
      phone,
      address,
    });
    console.log(res);
    navigate("/login");
  };
  return (
    <div className="register-form">
      <p>Register</p>
      <input
        type="text"
        placeholder="enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <textarea
        placeholder="enter address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Sign up
      </button>
    </div>
  );
};

export default Register;

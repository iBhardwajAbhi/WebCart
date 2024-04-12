import React, { useContext, useEffect } from "react";
import { UserContext } from "../utils/userContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }, []);
  return <div>Logout</div>;
};

export default Logout;

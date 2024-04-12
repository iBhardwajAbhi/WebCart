import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Logout from "./pages/Logout";
import Cart from "./pages/Cart";
import { UserContext } from "./utils/userContext";
import MyOrders from "./pages/MyOrders";

function App() {
  const { user, setUser } = useContext(UserContext);
  const getAllProducts = async () => {
    const res = await axios.get("/api/product/get");
    console.log(res);
  };
  useEffect(() => {
    getAllProducts();
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="orders" element={<MyOrders />}></Route>

          <Route path="logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

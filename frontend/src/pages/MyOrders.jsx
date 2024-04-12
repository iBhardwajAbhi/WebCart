import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/userContext";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios.get("/api/order/get").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
      }}
    >
      <div className="head">MyOrders</div>
      {orders &&
        orders.map((item) => {
          return (
            item.placedBy === user._id && (
              <div className="card">
                <div>date: {item.createdAt}</div>
                <div>Total Items: {item.products.length}</div>
                <div>Total Price: {item.totalPrice}</div>
                <h2>Status : {item.status}</h2>
              </div>
            )
          );
        })}
    </div>
  );
};

export default MyOrders;

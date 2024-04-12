import React, { useEffect, useState } from "react";
import axios from "axios";
const ManageOrders = () => {
  const [orders, setOrders] = useState();
  const [status, setStatus] = useState();

  const saveHandler = async (id) => {
    const res = axios.put("/api/order/update", { id, status });
    console.log(res);
  };
  useEffect(() => {
    axios.get("/api/order/get").then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <div>
      ManageOrders
      {orders && (
        <div className="right">
          {" "}
          {orders.map((item) => {
            return (
              <div className="card">
                <div>User id : {item.placedBy}</div>
                <div>Price : {item.totalPrice}</div>
                <div>Update Status</div>
                <select
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  name=""
                  id=""
                >
                  <option disabled selected value>
                    {" "}
                    -- select an option --{" "}
                  </option>
                  <option value="PLACED">Placed</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                <button
                  onClick={() => {
                    saveHandler(item._id);
                  }}
                >
                  Save
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;

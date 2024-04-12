import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import braintree from "braintree-web-drop-in";
import { UserContext } from "../utils/userContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [price, setPrice] = useState();
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [braintreeInstance, setBraintreeInstance] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const getItems = async () => {
    const price = JSON.parse(localStorage.getItem("price"));
    const cart = JSON.parse(localStorage.getItem("cart"));

    setPrice(price);
    setCart(cart);

    try {
      const res = await axios.get("/api/product/get");
      const filteredItems = res.data.filter((item) => cart.includes(item._id));
      setItems(filteredItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const resetCart = () => {
    localStorage.setItem("price", JSON.stringify(0));
    localStorage.setItem("cart", JSON.stringify([]));
    setItems(null);
    setPrice(0);
    setCart([]);
  };
  useEffect(() => {
    getItems();
    const initializeBraintree = () => {
      if (!containerRef.current) {
        setTimeout(initializeBraintree, 100);
        return;
      }

      braintree.create(
        {
          authorization: "client_token",
          container: containerRef.current,
        },
        (error, instance) => {
          if (error)
            return console.error("Drop-in UI initialization error:", error);
          setBraintreeInstance(instance);
        }
      );
    };

    initializeBraintree();
  }, []);

  const onSubmit = () => {
    if (!braintreeInstance) return;
    braintreeInstance.requestPaymentMethod((error, payload) => {
      if (error) return console.error("Payment error:", error);
      console.log("Payment method nonce:", payload.nonce);
      axios.post("/api/order/place", {
        placedBy: user._id,
        payment: payload.nonce,
        totalPrice: price,
        products: cart,
      });

      setCart([]);
      setItems([]);
      setPrice([]);
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("price", JSON.stringify(0));
      navigate("/orders");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          margin: "auto",
        }}
      >
        <div className="head">Cart Summary :</div>
        <div className="head">Total price : {price || 0}</div>
        <div className="head">Total items : {cart ? cart.length : 0}</div>
        <button onClick={resetCart}>Reset Cart</button>
        {user ? (
          <div className="pay">
            <div ref={containerRef}></div>
            <button onClick={onSubmit}>Pay Now</button>
          </div>
        ) : (
          <div>Please Login to check out .. </div>
        )}
        <div className="head">Listing all items below</div>
        <div className="right">
          {items ? (
            items.map((item) => {
              return (
                <div id={item._id} className="card">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <h2>price : {item.price}</h2>
                  <img src={item.photo} width="50px" alt="" srcset="" />
                </div>
              );
            })
          ) : (
            <div>no items </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

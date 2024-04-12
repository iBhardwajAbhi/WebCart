import React from "react";

const ProductCard = ({ data }) => {
  const addToCart = async () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = JSON.parse(localStorage.getItem("price")) || 0;
    totalPrice += data.price;
    cart.push(data._id);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("price", JSON.stringify(totalPrice));
  };
  return (
    <div className="card">
      <img src={data.photo} alt="" />
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <h2>₹ {data.price}</h2>

      <button
        onClick={() => {
          addToCart();
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

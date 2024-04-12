import orderModel from "../models/orderModel.js";

export const recieveOrder = async (req, res) => {
  const { placedBy, products, payment, totalPrice } = req.body;
  try {
    const order = await orderModel.create({
      placedBy,
      products,
      payment,
      totalPrice,
      status: "PLACED",
    });
    res.send("Order placed successfully.");
  } catch (error) {
    res.send(error);
  }
};

export const statusUpdate = async (req, res) => {
  const { id, status } = req.body;
  try {
    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.send(order);
  } catch (error) {
    res.send(error);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.send(orders);
  } catch (error) {
    res.send(error);
  }
};

import productModel from "../models/productModel.js";
import fs from "fs";

const createProductHandler = async (req, res) => {
  // console.log("first");
  const { name, description, price, category, photo } = req.body;
  // console.log(req.headers.authorization);
  console.log(name);
  try {
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      photo,
    });
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const editProductHandler = async (req, res) => {
  const { id, name, description, price, category, image } = req.body;
  try {
    const product = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        image,
      },
      { new: true }
    );
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const getAllProductHandler = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.send(product);
  } catch (error) {
    res.send(error);
  }
};

const deleteProductHandler = async (req, res) => {
  const { id } = req.body;
  try {
    await productModel.findByIdAndDelete(id);
    res.send("Product deleted successfully");
  } catch (error) {
    res.send(error);
  }
};

const getProductImage = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await productModel.findById(id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.send(error);
  }
};
export {
  deleteProductHandler,
  editProductHandler,
  createProductHandler,
  getAllProductHandler,
  getProductImage,
};

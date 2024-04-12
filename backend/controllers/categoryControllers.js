import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOne({ name: name });
    if (category) {
      res.send("category already exist");
    } else {
      const category = await Category.create({ name });
      res.send(category);
    }
  } catch (error) {
    res.send(error);
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.send(error);
  }
};

export const deleteCategory = async (req, res) => {
  const { categoryId } = req.body;
  console.log(categoryId);
  try {
    await Category.findByIdAndDelete(categoryId);
    await res.send("category deleted");
  } catch (error) {
    res.send(error);
  }
};

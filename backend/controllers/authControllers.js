import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/encryption.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res.send("Email already registered.");
  } else {
    try {
      const hashedPassword = await hashPassword(password);

      const user = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        address: address,
      });
      const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET);
      res.send({
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
      // res.send(user);
    } catch (error) {
      res.send(error);
    }
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.send("Email not registered");
  } else {
    if (comparePassword(password, user.password)) {
      const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET);
      res.send({
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    } else {
      res.send("Wrong email or password");
    }
  }
};

const getController = async (req, res) => {
  const { id } = req.body;
  const user = await userModel.findById(id);
  res.send(user);
};
export { registerController, loginController, getController };

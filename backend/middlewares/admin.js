import User from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  try {
    const { id } = req.user;
    // console.log(req.user);
    // console.log(req.body);
    // console.log(id);
    const user = await User.findById(id);
    // console.log(user);
    if (user.role == 1) {
      // console.log("admin found");
      next();
    } else {
      res.send("Admin Access required");
    }
  } catch (error) {
    res.send(error);
  }
};

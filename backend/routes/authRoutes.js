import { Router } from "express";
import {
  registerController,
  loginController,
  getController,
} from "../controllers/authControllers.js";
const authRouter = new Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get", getController);

export default authRouter;

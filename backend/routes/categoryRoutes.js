import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/categoryControllers.js";
import { isSignedIn } from "../middlewares/authorization.js";
import { isAdmin } from "../middlewares/admin.js";

const categoryRouter = new Router();

categoryRouter.post("/create", isSignedIn, isAdmin, createCategory);
categoryRouter.get("/get", getAllCategory);
categoryRouter.delete("/delete", isSignedIn, isAdmin, deleteCategory);

export default categoryRouter;

import { Router } from "express";
import {
  deleteProductHandler,
  editProductHandler,
  createProductHandler,
  getAllProductHandler,
} from "../controllers/productControllers.js";
import { isSignedIn } from "../middlewares/authorization.js";
import { isAdmin } from "../middlewares/admin.js";
const productRouter = new Router();

productRouter.post("/create", isSignedIn, isAdmin, createProductHandler);
productRouter.get("/get", getAllProductHandler);
productRouter.put("/edit", isSignedIn, isAdmin, editProductHandler);
productRouter.delete("/delete", isSignedIn, isAdmin, deleteProductHandler);

export default productRouter;

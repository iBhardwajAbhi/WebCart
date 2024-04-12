import { Router } from "express";
import {
  getAllOrders,
  recieveOrder,
  statusUpdate,
} from "../controllers/orderController.js";

const orderRouter = new Router();

orderRouter.post("/place", recieveOrder);
orderRouter.put("/update", statusUpdate);
orderRouter.get("/get", getAllOrders);

export default orderRouter;

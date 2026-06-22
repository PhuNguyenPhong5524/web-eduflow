import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/authorizeRole.js";
import {
  addCartItem,
  checkout,
  clearCart,
  getCart,
  removeCartItem,
} from "../controllers/cart.js";

const routerCart = Router();
const customerOnly = [authMiddleware, authorizeRole("customer")];

routerCart.get("/cart", customerOnly, getCart);
routerCart.post("/cart/items", customerOnly, addCartItem);
routerCart.delete("/cart/items/:courseId", customerOnly, removeCartItem);
routerCart.delete("/cart", customerOnly, clearCart);
routerCart.post("/checkout", customerOnly, checkout);

export default routerCart;

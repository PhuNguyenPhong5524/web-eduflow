import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserStatus,
} from "../controllers/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/authorizeRole.js";

const routerUser = Router();
const adminOnly = [authMiddleware, authorizeRole("admin")];

routerUser.post("/users", createUser);
routerUser.get("/users", adminOnly, getAllUsers);
routerUser.get("/users/:id", adminOnly, getUserById);
routerUser.patch("/users/:id/status", adminOnly, updateUserStatus);

export default routerUser;

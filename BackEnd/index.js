
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import routerUser from "./routes/user.js";
import routerLogin from "./routes/auth/login.js";
import routerRegister from "./routes/auth/register.js";
import routerChangePassword from "./routes/auth/changePassword.js";
import routerCategory from "./routes/category.js";
import routerProvider from "./routes/provider.js";
import routerCourse from "./routes/course.js";
import routerCart from "./routes/cart.js";
import routerRefreshToken from "./routes/auth/refreshToken.js";
import routerForgotPassword from "./routes/auth/forgotPassword.js";
import routerLogout from "./routes/auth/logout.js";
import routerDashboard from "./routes/dashboard.js";
import routerQuizCourse from "./routes/quiz.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const allowedOrigins = new Set([
  FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Thiếu MONGODB_URI trong file .env");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Kết nối MongoDB thành công!");
  })
  .catch((error) => {
    console.error("Lỗi kết nối MongoDB:", error);
    process.exit(1);
  });

// Tài khoản
app.use("/", routerUser);

// Đăng nhập
app.use("/", routerLogin);

// Đăng ký
app.use("/", routerRegister);

// Đăng xuất
app.use("/", routerLogout);

// Đổi mật khẩu
app.use("/", routerChangePassword);

// Quên mật khẩu
app.use("/", routerForgotPassword);

// Danh mục
app.use("/", routerCategory);

// Nhà cung cấp
app.use("/", routerProvider);

// Khóa học
app.use("/", routerCourse);

// Câu hỏi
app.use("/", routerQuizCourse);

// Giỏ hàng + Checkout
app.use("/", routerCart);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Refresh token
app.use("/", routerRefreshToken);

app.use("/", routerDashboard);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

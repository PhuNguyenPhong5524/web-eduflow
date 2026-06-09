import userModel from "../models/user.js";
import mongoose from "mongoose";

const hiddenUserFields =
  "-password -refreshToken -resetPasswordToken -resetPasswordExpires -emailVerifyToken";
const allowedRoles = ["customer", "provider", "admin"];

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getSingleQueryValue = (value) => {
  return Array.isArray(value) ? value[0] : value;
};

// Tạo user mới
export const createUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const newUser = await userModel.create({
      email,
      username,
      password,
      role,
    });

    res.status(201).json({
      message: "Tạo user thành công",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Lấy tất cả user
export const getAllUsers = async (req, res) => {
  try {
    const page = Math.max(
      parseInt(getSingleQueryValue(req.query.page), 10) || 1,
      1,
    );
    const limit = Math.max(
      parseInt(getSingleQueryValue(req.query.limit), 10) || 10,
      1,
    );
    const skip = (page - 1) * limit;
    const search = getSingleQueryValue(req.query.search);
    const role = getSingleQueryValue(req.query.role);
    const isActive = getSingleQueryValue(req.query.isActive);
    const filter = {};

    if (search && search.trim()) {
      const searchRegex = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ email: searchRegex }, { username: searchRegex }];
    }

    if (allowedRoles.includes(role)) {
      filter.role = role;
    }

    if (isActive === "true" || isActive === "false") {
      filter.isActive = isActive === "true" ? { $ne: false } : false;
    }

    const [users, total] = await Promise.all([
      userModel
        .find(filter)
        .select(hiddenUserFields)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),
      userModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    const user = await userModel.findById(id).select(hiddenUserFields);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user id",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "isActive must be a boolean",
      });
    }

    if (req.user?.userId?.toString() === id) {
      return res.status(400).json({
        message: "Admin cannot lock or unlock their own account",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(id, { isActive }, { new: true, runValidators: true })
      .select(hiddenUserFields);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Đảm bảo 1 user chỉ có 1 hồ sơ Provider
    },
    provider_name: {
      type: String,
      required: true,
      trim: true,
    },
    career: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Định dạng email không hợp lệ"],
    },
    phone: {
      type: String,
      trim: true, 
    },
    avatar: {
      type: String, 
    },
    images: {
      type: [String], 
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejection_reason: {
      type: String, // Lý do từ chối, nếu có
      default: "",
    },
  },
  { timestamps: true },
);

const providerModel = mongoose.model("Provider", providerSchema);

export default providerModel;
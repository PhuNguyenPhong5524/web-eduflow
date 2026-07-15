
import notificationModel from "../models/NotificationModel.js";


// Lấy danh sách thông báo cho Admin
export const getAdminNotifications = async (req, res) => {
  try {
    const list = await notificationModel.find()
      .populate("sender", "name email avatar")
      .sort({ createdAt: -1 }) // Mới nhất xếp lên đầu
      .limit(20); // Lấy 20 cái gần nhất  
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Đánh dấu đọc tất cả
export const markAllAsRead = async (req, res) => {
  try {
    await notificationModel.updateMany({ isRead: false }, { $set: { isRead: true } });
    return res.status(200).json({ message: "Đã đọc tất cả" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
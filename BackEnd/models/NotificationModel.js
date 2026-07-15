import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    sender: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Người tạo ra sự kiện (User gửi form)
    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }, // Người nhận (Nếu gửi cho Admin cụ thể, hoặc để trống nếu gửi cho toàn bộ Admin)
    title: { 
        type: String, 
        required: true 
    }, // Tiêu đề: "Đăng ký đối tác mới"
    content: { 
        type: String, 
        required: true 
    }, // Nội dung: "Người dùng Nguyễn Văn A đã gửi hồ sơ chờ duyệt."
    type: { 
        type: String, 
        enum: ["registration", "system", "payment"], 
        default: "registration" 
    }, // Phân loại để sau này hiển thị icon khác nhau
    isRead: { type: Boolean, default: false }, // Trạng thái đọc
  },
  { timestamps: true } 
);

const notificationModel = mongoose.model("Notification", notificationSchema);

export default notificationModel;
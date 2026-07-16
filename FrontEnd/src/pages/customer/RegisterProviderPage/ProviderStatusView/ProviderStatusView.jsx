import React, { useState } from "react";
import { Result, Button, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import axios from "axios";

export default function ProviderStatusView({ providerData, onReRegister }) {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false); // State chặn double click

  // Lấy status từ props truyền vào
  const status = providerData?.status; 

  const handleGoToDashboard = async () => {
    if (isUpgrading) return;
    
    setIsUpgrading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

      const { data } = await axios.post(
        `${API_BASE_URL}/refresh-token`,
        {},
        { withCredentials: true }
      );

      localStorage.setItem("accessToken", data.accessToken);

      // Phát lệnh cập nhật State
      if (user) {
        updateUser({ ...user, role: "provider" });
      }

      // Trì hoãn điều hướng một chút để React update State hoàn tất
      setTimeout(() => {
        navigate("/provider");
      }, 50); // 50ms là mắt người không thể nhận ra, nhưng đủ cho React re-render xong AuthContext

    } catch (error) {
      console.error("Lỗi đồng bộ quyền đối tác:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsUpgrading(false);
    }
  };

  //TRẠNG THÁI CHỜ DUYỆT (pending)
  if (status === "pending") {
    return (
      <Result
        status="info"
        title="Hồ sơ đang được chờ duyệt"
        subTitle="Hệ thống đã ghi nhận yêu cầu của bạn. Admin sẽ kiểm tra và phản hồi trong thời gian sớm nhất."
      />
    );
  }

  //TRẠNG THÁI ĐÃ DUYỆT THÀNH CÔNG (approved)
  if (status === "approved") {
    return (
      <Result
        status="success"
        title="Chúc mừng! Bạn đã là đối tác"
        subTitle="Hồ sơ đăng ký nhà cung cấp của bạn đã được phê duyệt chính thức."
        extra={[
          /* 🟢 Thay vì gọi navigate trực tiếp, hãy gọi hàm handle vừa tạo */
          <Button 
            type="primary" 
            key="manage" 
            size="large" 
            className="bg-green-600 border-none" 
            onClick={handleGoToDashboard} 
          >
            Đi đến trang quản lý nhà cung cấp
          </Button>,
        ]}
      />
    );
  }

  // TRẠNG THÁI BỊ TỪ CHỐI (rejected)
  if (status === "rejected") {
    return (
      <div className="max-w-md mx-auto">
        <Result
          status="error"
          title="Yêu cầu bị từ chối"
          subTitle="Hồ sơ đăng ký chưa đạt yêu cầu của hệ thống."
          extra={[
            <Button type="primary" key="retry" size="large" onClick={onReRegister}>
              Đăng ký lại
            </Button>,
          ]}
        >
          {providerData.rejection_reason && (
            <Alert
              title="Lý do từ chối từ Admin:"
              description={providerData.rejection_reason}
              type="error"
              showIcon
            />
          )}
        </Result>
      </div>
    );
  }

  return null;
}
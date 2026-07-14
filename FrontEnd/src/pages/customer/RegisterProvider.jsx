import { useRef, useState } from "react";
import { Button, Card, Form, Input, Modal, message, Upload } from "antd";
import {
  UserOutlined,
  UploadOutlined,
  PlusOutlined,
  IdcardOutlined
} from "@ant-design/icons";
import useRegisterProvider from "../../hooks/useCourse/useRegisterProvider";

const RegisterProvider = () => {
  const [form] = Form.useForm();
  const fileInputRef = useRef(null);
  const { mutate, isPending } = useRegisterProvider();

  // State lưu file và ảnh preview cho Avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState(
    "https://i.pravatar.cc/300?img=68" // Ảnh mặc định
  );

  // State lưu danh sách file cho Chứng chỉ hành nghề (nhiều ảnh)
  const [certificateList, setCertificateList] = useState([]);

  // Xử lý khi chọn ảnh đại diện
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Tạo preview
    const previewUrl = URL.createObjectURL(file);
    setAvatarSrc(previewUrl);
    setAvatarFile(file); // Lưu file lại để submit sau
  };

  // Xử lý khi chọn/xóa ảnh chứng chỉ
  const handleCertificateChange = ({ fileList: newFileList }) => {
    setCertificateList(newFileList);
  };

  // Nút upload cho phần chứng chỉ
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  // Xử lý submit toàn bộ form
 const handleRegister = async (values) => {
    if (!avatarFile) {
      message.error("Vui lòng tải lên ảnh đại diện!");
      return;
    }
    if (certificateList.length === 0) {
      message.error("Vui lòng tải lên ít nhất 1 ảnh chứng chỉ!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("provider_name", values.provider_name);
      formData.append("email", values.email);
      formData.append("career", values.career);
      formData.append("avatar", avatarFile);

      certificateList.forEach((fileItem) => {
        if (fileItem.originFileObj) {
          formData.append("images", fileItem.originFileObj);
        }
      });

      // 3. Kích hoạt gọi API thông qua TanStack Query Mutation
      mutate(formData, {
        onSuccess: (data) => {
          message.success(data?.message || "Gửi yêu cầu đăng ký thành công!");
          
          // Reset form và state sau khi thành công
          form.resetFields();
          setCertificateList([]);
          setAvatarFile(null);
          setAvatarSrc("https://i.pravatar.cc/300?img=68");
        },
        onError: (error) => {
          // Trích xuất message lỗi từ backend trả về nếu có
          const errorMsg = error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại!";
          message.error(errorMsg);
        },
      });

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Trở thành nhà cung cấp</h1>
          <p className="text-gray-500 text-sm mt-2">
            Điền thông tin và tải lên các chứng chỉ cần thiết để đăng ký.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Avatar */}
          <Card className="rounded-2xl h-fit">
            <div className="flex flex-col items-center py-4">
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <UploadOutlined className="text-white text-3xl" />
                </div>
              </div>

              <h3 className="mt-5 text-2xl font-semibold">Ảnh đại diện</h3>
              <p className="text-center text-gray-500 mt-2 mb-5 text-sm">
                Tải lên ảnh chân dung rõ nét của bạn. <br/> (Bắt buộc)
              </p>

              <Button
                type="default"
                icon={<UploadOutlined />}
                onClick={() => fileInputRef.current?.click()}
              >
                Chọn ảnh
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </div>
          </Card>

          {/* Form Thông tin & Chứng chỉ */}
          <Card className="lg:col-span-2 rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <IdcardOutlined className="text-xl text-blue-600" />
              <h3 className="text-xl font-semibold">Thông tin đăng ký</h3>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleRegister}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Họ và tên (Tên nhà cung cấp)"
                  name="provider_name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên",
                    },
                  ]}
                >
                  <Input placeholder="VD: Nguyễn Văn A" size="large" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại liên hệ"
                    name="phone"
                    rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                    },
                    ]}
                >
                    <Input placeholder="VD: 0123456789" size="large" />
                </Form.Item>
              </div>

            
              <Form.Item
                label="Email liên hệ"
                name="email"
                rules={[
                {
                    required: true,
                    message: "Vui lòng nhập email",
                },
                {
                    type: "email",
                    message: "Email không hợp lệ",
                },
                ]}
                >
                  <Input placeholder="VD: email@example.com" size="large" />
                </Form.Item>
              <Form.Item
                label="Nghề nghiệp / Lĩnh vực chuyên môn"
                name="career"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nghề nghiệp",
                  },
                ]}
              >
                <Input placeholder="VD: Lập trình viên Front-end, Gia sư Toán..." size="large" />
              </Form.Item>

              <div className="mt-6 mb-2 border-t pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold">Chứng chỉ hành nghề (Bằng cấp, CV, v.v.)</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Vui lòng tải lên hình ảnh các chứng chỉ hoặc tài liệu chứng minh năng lực của bạn (Có thể tải lên nhiều ảnh).
                </p>
                
                <Form.Item name="images">
                  <Upload
                    listType="picture-card"
                    fileList={certificateList}
                    onChange={handleCertificateChange}
                    beforeUpload={() => false} // Ngăn chặn tự động upload để submit cùng form
                    multiple
                    accept="image/*"
                  >
                    {certificateList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </div>

              <div className="flex justify-end mt-8">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  loading={isPending} 
                >
                  Gửi yêu cầu đăng ký
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
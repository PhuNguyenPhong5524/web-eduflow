import React from 'react';
import { Breadcrumb, Button, Card, Divider, Tabs, Typography } from 'antd';
import {
  RightOutlined,
  PlayCircleFilled,
  YoutubeFilled,
  EditOutlined,
  BarcodeOutlined,
  CalendarOutlined,
  HistoryOutlined,
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  TagFilled,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ProviderCourseDetailManagementPage() {
  // Cấu hình Tabs cho Ant Design
  const tabItems = [
    {
      key: '1',
      label: <span className="font-['Geist'] text-[14px] font-bold tracking-[0.02em] text-[#3525cd]">Thông Tin Khóa Học</span>,
    },
    {
      key: '2',
      label: <span className="font-['Geist'] text-[14px] font-medium tracking-[0.02em] text-[#464555] hover:text-[#3525cd] transition-colors">Nội dung bài học</span>,
    },
    {
      key: '3',
      label: <span className="font-['Geist'] text-[14px] font-medium tracking-[0.02em] text-[#464555] hover:text-[#3525cd] transition-colors">Tổng Quan</span>,
    },
    {
      key: '4',
      label: <span className="font-['Geist'] text-[14px] font-medium tracking-[0.02em] text-[#464555] hover:text-[#3525cd] transition-colors">Yêu cầu</span>,
    },
  ];

  return (

    <div className="h-full w-full overflow-y-auto overflow-x-hidden text-[#0b1c30] bg-[#f8f9ff] font-['Inter',sans-serif] antialiased selection:bg-[#4f46e5] selection:text-[#dad7ff]">

      {/* Main Content Canvas */}
      <div className="w-full max-w-[1280px] mx-auto px-[16px] lg:px-[40px] py-[32px] flex-grow">
        
        {/* Breadcrumbs */}
        <Breadcrumb
          className="mb-4 text-[12px] font-['Geist'] font-semibold text-[#777587]"
          separator={<RightOutlined className="text-[10px]" />}
          items={[
            { title: <a href="#" className="hover:text-[#3525cd] transition-colors">Home</a> },
            { title: <a href="#" className="hover:text-[#3525cd] transition-colors">Course Management</a> },
            { title: <span className="text-[#0b1c30]">NodeJS Pro</span> },
          ]}
        />

        {/* Page Header */}
        <div className="mb-[32px]">
          <h1 className="font-['Geist'] text-[32px] font-semibold text-[#0b1c30] leading-[1.2] tracking-[-0.01em]">
            NodeJS Pro - Tự Học từ số 0 (MVC, REST APIs, SQL/MongoDB)
          </h1>
        </div>

        {/* Tabs Section */}
        <div className="mb-[32px]">
          <Tabs 
            defaultActiveKey="1" 
            items={tabItems} 
            className="custom-tabs" 
            tabBarStyle={{ borderBottom: '1px solid rgba(199, 196, 216, 0.3)', marginBottom: 0 }}
          />
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
          
          {/* Left Column: Media & Description */}
          <div className="lg:col-span-2">
            <div className="relative group aspect-video rounded-xl overflow-hidden shadow-md bg-[#d3e4fe] border border-[#c7c4d8]/30 cursor-pointer">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Course Thumbnail" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeCAj9VJ7BG_tn5tLOEE0WehVVHV6h4ARsa5r-pfabbor33UQSbQJ_RLczzLn8PX50W_ZFoxjJ4I5TrMAxA6JYPEn-f2jmNPVXs4aiYbepjr-NrhgUpz8UcCEmQuuRHkRr5e_-UwicTm_Ww-qLCtJhFORaPaKociwfNteVH6UXNXGGz4ak-akRv3457ZfTdYKqi0cGxnLcDdOWm30OHfBLIAkxQEze3TM5AJDNxdVi8YTKwWKQaEl8wr42vbjfuz0s24zeVm53y_c" 
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                <button className="w-20 h-20 bg-[#3525cd]/90 text-[#ffffff] rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-transform">
                  <PlayCircleFilled className="text-[48px]" />
                </button>
              </div>
              
              {/* Bottom Link Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="backdrop-blur-[8px] bg-white/70 px-4 py-2 rounded-full flex items-center gap-2 font-['Geist'] text-[14px] font-medium text-[#0b1c30] shadow-sm">
                  <YoutubeFilled className="text-[18px] text-[#ba1a1a]" />
                  Xem trên YouTube
                </div>
                <div className="backdrop-blur-[8px] bg-white/70 px-4 py-2 rounded-full font-['Geist'] text-[12px] font-semibold text-[#0b1c30] shadow-sm">
                  Full HD | 4K
                </div>
              </div>
            </div>

            {/* Description Section */}
            <section className="mt-[15px]">
              <h2 className="font-['Geist'] text-[24px] font-semibold mb-4 flex items-center gap-2 text-[#0b1c30]">
                <span className="w-2 h-8 bg-[#3525cd] rounded-full"></span>
                Mô tả khóa học
              </h2>
              <div className="bg-[#ffffff] px-[32px] h-[215px] rounded-xl border border-[#c7c4d8]/30 shadow-sm overflow-hidden">
                <p className="font-['Inter'] pt-[16px] text-[16px] text-[#464555] leading-relaxed line-clamp-[7]">
                  Online Notepad is a free browser-based text editor that allows you to create and edit multiple plain-text files in your browser. No registration or login required. It is great for writing quick notes and printing simple pages. What makes it special is the autosave functionality, which saves your draft every second. This prevents data loss in case you accidentally close the tab or the browser window suddenly crashes. The document you're working on will be automatically restored when you visit again, even when you close and reopen your browser. There's also support for saving documents directly to your computer. Online Notepad is packed with core features that your common text editor provides, including undo, redo, copy, cut, paste, find and replace, font formatting, character map, insert date and time, emoji list, spell checker, word counter, open and save files, and print page.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: Course Stats Card */}
          <div className="lg:col-span-1">
            <Card 
              className="bg-[#ffffff] rounded-xl border border-[#c7c4d8]/30 shadow-sm"
              bodyStyle={{ padding: '32px' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-['Geist'] text-[12px] font-semibold text-[#777587] uppercase tracking-wider">Chỉnh sửa khóa học</span>
                </div>
                <Button 
                  type="text" 
                  className="w-10 h-10 flex items-center justify-center bg-[#4f46e5] text-[#dad7ff] rounded-lg hover:shadow-md active:scale-95 transition-all hover:bg-[#4f46e5]/90"
                  icon={<EditOutlined className="text-[20px]" />}
                />
              </div>
              <h3 className="font-['Geist'] text-[24px] font-semibold text-[#0b1c30] ">Thông tin Khóa học</h3>
              <Divider />
              {/* Details List */}
              <div className="space-y-5">
                <div className="flex items-center justify-between py-1 border-b border-[#c7c4d8]/10">
                  <span className="font-['Geist'] text-[14px] font-medium text-[#464555] flex items-center gap-2">
                    <BarcodeOutlined className="text-[18px]" /> Course ID
                  </span>
                  <span className="font-['Geist'] text-[14px] font-bold font-mono text-[#0b1c30]">#NODE-PRO-001</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c7c4d8]/10">
                  <span className="font-['Geist'] text-[14px] font-medium text-[#464555] flex items-center gap-2">
                    <CalendarOutlined className="text-[18px]" /> Ngày tạo
                  </span>
                  <span className="font-['Geist'] text-[14px] font-medium text-[#0b1c30]">Jan 15, 2024</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c7c4d8]/10">
                  <span className="font-['Geist'] text-[14px] font-medium text-[#464555] flex items-center gap-2">
                    <HistoryOutlined className="text-[18px]" /> Cập nhật cuối
                  </span>
                  <span className="font-['Geist'] text-[14px] font-medium text-[#0b1c30]">March 20, 2024</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c7c4d8]/10">
                  <span className="font-['Geist'] text-[14px] font-medium text-[#464555] flex items-center gap-2">
                    <AppstoreOutlined className="text-[18px]" /> Danh mục
                  </span>
                  <span className="font-['Geist'] text-[14px] font-bold text-[#3525cd]">Phát triển web</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c7c4d8]/10">
                  <span className="font-['Geist'] text-[14px] font-medium text-[#464555] flex items-center gap-2">
                    <UserOutlined className="text-[18px]" /> Giảng viên
                  </span>
                  <span className="font-['Geist'] text-[14px] font-medium text-[#0b1c30]">Hỏi dân IT với Eric</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#c7c4d8]/10">
                  <span className="font-['Geist'] text-[14px] font-medium text-[#464555] flex items-center gap-2">
                    <TeamOutlined className="text-[18px]" /> Học viên
                  </span>
                  <span className="font-['Geist'] text-[14px] font-bold text-[#0b1c30]">1,200</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-['Geist'] text-[14px] font-medium text-[#464555] flex items-center gap-2">
                    <ClockCircleOutlined className="text-[18px]" /> Thời lượng
                  </span>
                  <span className="font-['Geist'] text-[14px] font-medium text-[#0b1c30]">55 giờ 36 phút</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mt-8 pt-8 border-t border-[#c7c4d8]/30">
                <div className="flex flex-col gap-1 mb-6">
                  <span className="font-['Geist'] text-[14px] font-semibold text-[#777587]">Giá khóa học</span>
                  <div className="flex flex-col gap-1 pt-2">
                    <span className="font-['Geist'] text-[24px] text-[#ba1a1a] font-bold leading-none tracking-[-0.02em]">1.349.000 VND</span>
                    <span className="font-['Geist'] text-[14px] font-medium text-[#777587] line-through tracking-[0.02em]">1.850.000 VND</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
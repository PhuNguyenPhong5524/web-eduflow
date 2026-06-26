import React from 'react';
import { Tabs, Button, Breadcrumb } from 'antd';
import {
  ArrowLeftOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
  SoundOutlined,
  ProfileOutlined,
  SettingOutlined,
  FullscreenOutlined,
  LikeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  BulbOutlined,
  CheckCircleFilled,
  UserOutlined,
  FilePdfOutlined,
  CodeOutlined,
  FilterOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  LockOutlined,
  RightOutlined
} from '@ant-design/icons';

const MyCoursePage = () => {
  // CSS dùng chung cho hiệu ứng Glassmorphism và Scrollbar
  const customStyles = `
    .glass-card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(226, 232, 240, 0.5);
    }
    .dark .glass-card {
        background: rgba(33, 49, 69, 0.7);
        border-color: rgba(70, 69, 85, 0.3);
    }
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #c7c4d8;
        border-radius: 10px;
    }
    .video-container {
        aspect-ratio: 16/9;
        background: #020617;
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
  `;

  // Nội dung Tab: Overview
  const OverviewContent = () => (
    <div className="pt-4 space-y-4">
      <p className="text-base text-[#464555] leading-relaxed">
        In this comprehensive session, we dive deep into the architecture of design tokens. Learn how to bridge the gap between Figma design systems and production-ready Tailwind configurations. We'll cover semantic naming conventions, fluid scaling, and dark-mode optimization strategies that ensure your UIs remain consistent across every screen size.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Takeaways */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="text-sm font-medium tracking-wide text-[#3525CD] mb-2 flex items-center gap-2">
            <BulbOutlined className="text-[18px]" /> Key Takeaways
          </h3>
          <ul className="text-sm text-[#464555] space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircleFilled className="text-[#0058be] text-[16px] mt-0.5" /> Understanding Primitive vs. Semantic tokens.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleFilled className="text-[#0058be] text-[16px] mt-0.5" /> Dynamic spacing systems for fluid hybrid grids.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleFilled className="text-[#0058be] text-[16px] mt-0.5" /> Automated handoff workflows.
            </li>
          </ul>
        </div>
        {/* Instructor */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="text-sm font-medium tracking-wide text-[#3525CD] mb-2 flex items-center gap-2">
            <UserOutlined className="text-[18px]" /> Instructor
          </h3>
          <div className="flex items-center gap-4">
            <img
              alt="Instructor Profile"
              className="h-12 w-12 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQfLdiRmLgEIH3_MUTbTiJTUAiygf_fhKIJcibFgXWpPbVbDPJH7eP_2o4uFh-CDzkQ6QFqeZAYt7HTWfW_Adb4OToLRcRRMXpV-jXtYyQs7GlUKgG0Qqx_SZhgmSIr7SfqhwnPEBbbIaLkAOjtpDPEdLP_qahGoyFIAV2fE7CiTK2LWR_gEu9vBoegljjY_o1EL3N4J2-eBQgvh9qGoN2xh3slUzr_52zYQecXG_P5rAl2AiyP-iR-kJCtN9MeimdcxGxBN1z4-o"
            />
            <div>
              <p className="text-sm font-medium tracking-wide text-[#0b1c30]">Prof. Adrian Sterling</p>
              <p className="text-sm text-[#464555]">Lead Architect at DesignSystems.io</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Nội dung Tab: Resources
  const ResourcesContent = () => (
    <div className="pt-4 space-y-2">
      <div className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-[#e5eeff] transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <FilePdfOutlined className="text-[#3525CD] text-2xl" />
          <div>
            <p className="text-sm font-medium tracking-wide">System Tokens Cheat Sheet.pdf</p>
            <p className="text-xs font-semibold text-[#464555]">2.4 MB • PDF Document</p>
          </div>
        </div>
        <DownloadOutlined className="text-[#777587] text-xl" />
      </div>
      <div className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-[#e5eeff] transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <CodeOutlined className="text-[#3525CD] text-2xl" />
          <div>
            <p className="text-sm font-medium tracking-wide">Tailwind-Config-Master.js</p>
            <p className="text-xs font-semibold text-[#464555]">14 KB • JavaScript Source</p>
          </div>
        </div>
        <DownloadOutlined className="text-[#777587] text-xl" />
      </div>
    </div>
  );

  // Items cho ANTD Tabs
  const tabItems = [
    { key: 'overview', label: 'Overview', children: <OverviewContent /> },
    { key: 'resources', label: 'Resources', children: <ResourcesContent /> },
    { key: 'reviews', label: 'Reviews', children: <div className="pt-4 text-[#464555]">Reviews section coming soon...</div> },
  ];

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30] text-base font-normal transition-colors duration-300 min-h-screen font-sans">
      <style>{customStyles}</style>

      <div className="pt-24 pb-8 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LECTURE CANVAS (LEFT SIDE) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-2">
              <Breadcrumb
                items={[
                  {
                    title: (
                      <a href="#" className="flex items-center text-[#3525CD] text-sm font-medium hover:underline group">
                        <ArrowLeftOutlined className="mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Course Overview
                      </a>
                    ),
                  },
                  { title: <span className="text-[#464555] text-sm font-medium">Module 3: Advanced UI Architecture</span> },
                ]}
              />
            </div>

            {/* Immersive Video Player */}
            <div className="video-container group">
              <img
                className="w-full h-full object-cover opacity-60"
                alt="Cinematic modern coding environment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeuMTHWDlsuahpn0uGYpshe2Tbhhy1rFHzi9vUNzwREAbcsLNnVS_UmcT5dRmYrQEyNGfzQia9oJfdcDat8mBM4-RAhMeCO74ou4uD1HJwMyzLJKMFEaNAYQhoy7edGsaWse41qWlhw-uPFQqHie6T3hh-jD6GrBhAcYyZABl3ComtMjQL6Odq4fVgj3fqQf7fhghM6A6rBoDC2P7MKJQGSLZmMxe6-e_HGtiM6oOhsT-KkmiaHxRA5Cgt7WOMXnXlBArTZRgR7EQ"
              />
              {/* Overlays & Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between text-white w-full">
                  <div className="flex items-center gap-4 text-2xl">
                    <CaretRightOutlined className="cursor-pointer hover:scale-110 transition-transform" />
                    <StepForwardOutlined className="cursor-pointer hover:scale-110 transition-transform" />
                    <SoundOutlined className="cursor-pointer hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium font-mono ml-2">12:45 / 24:00</span>
                  </div>
                  <div className="flex items-center gap-4 text-2xl">
                    <ProfileOutlined className="cursor-pointer hover:scale-110 transition-transform" />
                    <SettingOutlined className="cursor-pointer hover:scale-110 transition-transform" />
                    <FullscreenOutlined className="cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="w-full h-1 bg-white/30 rounded-full mt-4 cursor-pointer relative">
                  <div className="absolute top-0 left-0 h-full w-[53%] bg-[#3525CD] shadow-[0_0_8px_#3525CD] rounded-full"></div>
                </div>
              </div>
              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center group-hover:hidden transition-all">
                <div className="h-20 w-20 rounded-full bg-[#3525CD]/90 text-white flex items-center justify-center shadow-xl backdrop-blur-sm">
                  <CaretRightOutlined className="text-[48px]" />
                </div>
              </div>
            </div>

            {/* Video Metadata */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold leading-tight text-[#0b1c30]">3.4 Mastering System Design Tokens</h1>
                <p className="text-sm text-[#464555] mt-1">Uploaded Oct 24 • High-Performance Design Series</p>
              </div>
              <div className="flex items-center gap-2">
                <Button icon={<LikeOutlined />} size="large" className="rounded-xl border-[#c7c4d8] text-sm font-medium hover:bg-[#e5eeff]">
                  1.2k
                </Button>
                <Button icon={<ShareAltOutlined />} size="large" className="rounded-xl border-[#c7c4d8] text-sm font-medium hover:bg-[#e5eeff]">
                  Share
                </Button>
                <Button type="primary" icon={<DownloadOutlined />} size="large" className="rounded-xl bg-[#2170e4] border-none text-[#fefcff] text-sm font-medium hover:opacity-90">
                  Offline
                </Button>
              </div>
            </div>

            {/* ANTD Tabs Section */}
            <div className="mt-8">
              <Tabs
                defaultActiveKey="overview"
                items={tabItems}
                tabBarStyle={{ borderColor: 'rgba(199, 196, 216, 0.3)', marginBottom: '0' }}
              />
            </div>
          </div>

          {/* SIDEBAR CONTENT (RIGHT SIDE) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card rounded-2xl overflow-hidden sticky top-24 flex flex-col h-[calc(100vh-140px)]">
              
              <div className="p-4 border-b border-[#c7c4d8]/30 flex items-center justify-between bg-[#eff4ff]">
                <div>
                  <h2 className="text-sm font-medium tracking-wide text-[#0b1c30]">Course Content</h2>
                  <p className="text-xs font-semibold text-[#464555]">24% Complete • 12/48 Lessons</p>
                </div>
                <Button type="text" icon={<FilterOutlined className="text-xl text-[#777587]" />} />
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {/* Module 1 */}
                <div className="pt-4 pb-2 px-4">
                  <p className="text-xs font-bold text-[#464555] uppercase tracking-wider">Module 1: Foundations</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#3525CD]/5 cursor-pointer">
                  <CheckCircleFilled className="text-[#0058be] text-[20px]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">1.1 Introduction to Flow</p>
                    <p className="text-xs font-semibold text-[#464555]">08:24</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#3525CD]/5 cursor-pointer">
                  <CheckCircleFilled className="text-[#0058be] text-[20px]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">1.2 History of Design Systems</p>
                    <p className="text-xs font-semibold text-[#464555]">15:10</p>
                  </div>
                </div>

                {/* Module 2 */}
                <div className="pt-4 pb-2 px-4">
                  <p className="text-xs font-bold text-[#464555] uppercase tracking-wider">Module 2: Visual Language</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#3525CD]/10 border-l-4 border-[#3525CD]">
                  <PlayCircleFilled className="text-[#3525CD] text-[20px]" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#3525CD]">2.1 Color Theory & Accessibility</p>
                    <p className="text-xs font-semibold text-[#3525CD]">Now Playing</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#3525CD]/5 cursor-pointer">
                  <PlayCircleOutlined className="text-[#777587] text-[20px]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">2.2 Dynamic Typography Levels</p>
                    <p className="text-xs font-semibold text-[#464555]">12:30</p>
                  </div>
                </div>

                {/* Module 3 */}
                <div className="pt-4 pb-2 px-4">
                  <p className="text-xs font-bold text-[#464555] uppercase tracking-wider">Module 3: Advanced Architecture</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#3525CD]/5 cursor-pointer opacity-80">
                  <LockOutlined className="text-[#777587] text-[20px]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#464555]">3.1 State Logic & Transitions</p>
                    <p className="text-xs font-semibold text-[#464555]">19:45</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#3525CD]/5 cursor-pointer opacity-80">
                  <LockOutlined className="text-[#777587] text-[20px]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#464555]">3.2 Composable Layout Systems</p>
                    <p className="text-xs font-semibold text-[#464555]">22:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#3525CD]/5 cursor-pointer opacity-80">
                  <LockOutlined className="text-[#777587] text-[20px]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#464555]">3.3 Responsive Grid Mastering</p>
                    <p className="text-xs font-semibold text-[#464555]">14:15</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#d3e4fe]">
                <Button 
                  style={{ backgroundColor:"#3525CD", color:"white" }} 
                  size="large"
                  className="w-full bg-[#3525CD] text-white rounded-xl text-sm font-medium tracking-wide h-12 transition-all duration-300 ease-in-out hover:bg-[#3525CD]/90 border-none flex items-center justify-center"
                >
                  Next Lesson <RightOutlined />
                </Button>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default MyCoursePage;
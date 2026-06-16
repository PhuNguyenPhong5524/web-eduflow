import React, { useState, useEffect } from 'react';

const CourseDetailPage = () => {
  // Logic cho Sticky Sidebar
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScrollAndResize = () => {
      if (window.innerWidth >= 1024) {
        if (window.scrollY > 350) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);

    // Initial check
    handleScrollAndResize();

    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, []);

  //Hiệu ứng xuất hiện mượt mà khi scroll (Scroll Reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Khi phần tử lọt vào tầm mắt: Đưa về trạng thái hiển thị chuẩn
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            // Hủy theo dõi phần tử này sau khi đã hiện để tối ưu hiệu năng
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // Kích hoạt khi 15% phần tử xuất hiện trên màn hình
        rootMargin: '0px 0px -60px 0px', // Kích hoạt sớm hơn một chút trước khi chạm đáy màn hình
      }
    );

    // Tìm tất cả các section có class 'scroll-reveal' để theo dõi
    const hiddenElements = document.querySelectorAll('.scroll-reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Logic cho Accordion (Mở/Đóng nội dung khóa học)
  const [expandedSections, setExpandedSections] = useState({
    section1: true,
    section2: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const expandAll = () => {
    setExpandedSections({
      section1: true,
      section2: true,
    });
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen relative pt-[40px]">
      
      {/* Course Header (Phần Hero thông tin khóa học) */}
      <header className="bg-inverse-surface text-surface-container-lowest py-12">
        <div className="px-margin-desktop max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
          <div className="lg:col-span-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-on-surface-variant/80">
              <a className="font-label-md text-label-md hover:text-white transition-colors" href="#courses">Courses</a>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <a className="font-label-md text-label-md hover:text-white transition-colors" href="#design">Design</a>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="font-label-md text-label-md text-primary-fixed">Advanced UI/UX Principles</span>
            </nav>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">Advanced UI/UX Principles for Modern SaaS</h1>
            <p className="font-body-lg text-body-lg mb-6 max-w-3xl opacity-90">
              Master the psychological and structural frameworks used by top-tier product designers to build scalable, high-conversion SaaS interfaces.
            </p>
            <div className="flex flex-wrap items-center gap-stack-md text-sm mb-6">
              <div className="flex items-center gap-1">
                <span className="text-secondary-fixed font-bold">4.9</span>
                <div className="flex text-secondary-fixed">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="text-white/70">(2,450 ratings)</span>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <span className="text-white/70">12,840 students enrolled</span>
            </div>
            <p className="text-sm">Created by <a className="text-primary-fixed underline decoration-primary-fixed/30 hover:decoration-primary-fixed" href="#instructor">Marcus Sterling</a></p>
            <div className="flex items-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">new_releases</span>
                <span>Last updated 05/2024</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">language</span>
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-margin-desktop max-w-7xl mx-auto py-stack-lg relative mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Left Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/*Thêm class: scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out */}
            {/* What You'll Learn */}
            <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out p-6 border border-outline-variant/30 rounded-lg">
              <h2 className="font-headline-md text-headline-md mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">check</span>
                  <span className="text-sm">Understand cognitive biases that influence how users interact with complex dashboards.</span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">check</span>
                  <span className="text-sm">Learn to structure massive data sets into digestible, intuitive navigation systems.</span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">check</span>
                  <span className="text-sm">Build scalable component libraries that maintain consistency across large platforms.</span>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">check</span>
                  <span className="text-sm">Turn complex metrics into actionable insights through precise chart and graph design.</span>
                </div>
              </div>
            </section>

            {/* Course Content */}
            <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out">
              <h2 className="font-headline-md text-headline-md mb-4">Course content</h2>
              <div className="flex justify-between items-center mb-4 text-sm text-on-surface-variant">
                <span>2 sections • 12 lectures • 2h 5m total length</span>
                <button onClick={expandAll} className="text-primary font-semibold hover:text-primary-container transition-colors">
                  Expand all sections
                </button>
              </div>
              <div className="border border-outline-variant/30 rounded-lg overflow-hidden divide-y divide-outline-variant/30 bg-surface-container-lowest">
                
                {/* Section 1 */}
                <div>
                  <button 
                    onClick={() => toggleSection('section1')}
                    className="w-full flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container transition-colors text-left font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-lg transform transition-transform ${expandedSections.section1 ? 'rotate-180' : ''}`}>expand_more</span>
                      <span>Section 1: Foundations of SaaS Psychology</span>
                    </div>
                    <span className="text-xs font-normal">4 lectures • 45m</span>
                  </button>
                  <div className={`${expandedSections.section1 ? 'block' : 'hidden'} divide-y divide-outline-variant/10`}>
                    <div className="flex items-center justify-between p-4 text-sm hover:bg-surface-container-low/50">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">play_circle</span>
                        <span>The SaaS Business Model & Design</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-primary underline cursor-pointer">Preview</span>
                        <span className="text-on-surface-variant">12:45</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 text-sm hover:bg-surface-container-low/50">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">play_circle</span>
                        <span>Reducing Cognitive Load in Dashboards</span>
                      </div>
                      <span className="text-on-surface-variant">15:30</span>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <button 
                    onClick={() => toggleSection('section2')}
                    className="w-full flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container transition-colors text-left font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-lg transform transition-transform ${expandedSections.section2 ? 'rotate-180' : ''}`}>expand_more</span>
                      <span>Section 2: Advanced Layout & Grids</span>
                    </div>
                    <span className="text-xs font-normal">8 lectures • 1h 20m</span>
                  </button>
                  <div className={`${expandedSections.section2 ? 'block' : 'hidden'} divide-y divide-outline-variant/10`}>
                    <div className="flex items-center justify-between p-4 text-sm hover:bg-surface-container-low/50">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sm text-on-surface-variant">play_circle</span>
                        <span>Designing for Data-Heavy Interfaces</span>
                      </div>
                      <span className="text-on-surface-variant">15:30</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Requirements */}
            <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out">
              <h2 className="font-headline-md text-headline-md mb-4">Requirements</h2>
              <ul className="list-disc ml-5 space-y-2 text-sm text-on-surface-variant">
                <li>Basic understanding of UI design tools (Figma, Adobe XD, or Sketch).</li>
                <li>Familiarity with general UX principles and user-centered design processes.</li>
                <li>No coding knowledge required, but an interest in SaaS product strategy is helpful.</li>
              </ul>
            </section>

            {/* Description */}
            <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out">
              <h2 className="font-headline-md text-headline-md mb-4">Description</h2>
              <div className="prose prose-sm text-on-surface-variant space-y-4">
                <p>This comprehensive program takes you beyond simple design tools and into the strategic thinking required for modern software-as-a-service (SaaS) products. You will learn to bridge the gap between aesthetics and business goals, ensuring your designs aren't just beautiful, but functional and profitable.</p>
                <p>We'll dive deep into user psychology, cognitive load management, and the specific UI patterns that drive user retention and feature discovery in complex web applications. You'll walk away with a toolkit of reusable frameworks for any enterprise-grade design project.</p>
              </div>
            </section>

            {/* Instructor Bio */}
            <section className="scroll-reveal opacity-0 translate-y-12 transition-all duration-700 ease-out scroll-mt-24" id="instructor">
              <h2 className="font-headline-md text-headline-md mb-6">Instructor</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary underline underline-offset-4 decoration-primary/30">Marcus Sterling</h3>
                  <p className="text-on-surface-variant text-sm mt-1">Senior Product Design Lead @ TechNexus</p>
                </div>
                <div className="flex gap-8 items-start">
                  <img alt="Marcus Sterling" className="w-28 h-28 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvtcD6oC7w8QaKBKPo44FHxbvq-wIVSEWgTUZobOKYRYLAyGwFn6mxhmhUu_39HKM3_JEGptqciRfWcuZqapXIpQYd5PAsjjpP17uhsY-cnQrMu6VtCXBrTxYYvK-3ENJiLlC_ry72jdSzkHjj-umumKc2Mi5RFpJhz2gLwvCotyqf1WWMq-CoUrxQHsfHm06XjlcYkBpI5l_wtravSGxB0wQ2frm6CK-zhs9n4btb6WINfzO0Gp0nBETHem131JTL5grXnUyPv_8" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-lg text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-bold">4.9</span> Instructor Rating
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-lg text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>reviews</span>
                      <span className="font-bold">12,402</span> Reviews
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-lg text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                      <span className="font-bold">45,821</span> Students
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-lg text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                      <span className="font-bold">3</span> Courses
                    </div>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
                  Marcus has spent the last 15 years leading design teams at Fortune 500 companies and high-growth startups. His work focuses on making complex software feel invisible, allowing users to achieve their goals with zero friction.
                </p>
              </div>
            </section>

          </div>

          {/* Sticky Sidebar Card */}
        <aside className="lg:col-span-4 relative z-[50]">
            <div 
                className="w-full lg:max-w-[360px] bg-surface-container-lowest shadow-2xl border border-outline-variant/20 rounded-lg overflow-hidden z-[50] 
                        lg:sticky lg:top-20 lg:-mt-[320px] transition-all duration-300 ease-out"
            >
                {/* Course Preview */}
                <div className="relative aspect-video group cursor-pointer">
                    <img alt="Course Preview" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBpgvEnHqXyURpnUhJXzvvNMj2KpRM5O1vznB5IXyvj-Tomy_qlr9fsauTgHN0049SfaaAA9ZccAP6Ozm7whl02ISHWq9kDb3B-Oj3qwaUHZd-bxKsNSQucEMl-CMUxEEW-kHfhgAL8D264aUWQgoLu5Nak3KKNYgewQ4Dx6M99mDPZOnVnzCJxpKpSsg2EOblTXaEa5ZEHnUusMTbqpic7G_dUb7JxQjoCmUtqCUcMFoxKS2MZYDqeC5Jx9J6G3CgQ0hkxWezlt8" />
                    <div className="absolute inset-0 bg-on-background/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-on-background text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </div>
                    </div>
                    <p className="absolute bottom-4 left-0 right-0 text-center text-white font-bold text-sm">Preview this course</p>
                </div>
                
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl font-bold text-on-surface">$89.99</span>
                        <span className="text-on-surface-variant line-through text-lg">$149.99</span>
                        <span className="text-on-surface-variant">40% off</span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                        <button className="w-full py-4 bg-[#4f46e5] text-white font-bold rounded hover:opacity-90 active:scale-[0.98] transition-all">Add to cart</button>
                        <button className="w-full py-4 border border-on-surface text-on-surface font-bold rounded hover:bg-surface-container-low active:scale-[0.98] transition-all">Buy now</button>
                    </div>
                    
                    <p className="text-center text-xs text-on-surface-variant mb-6">30-Day Money-Back Guarantee</p>
                    
                    <div className="space-y-4">
                        <h4 className="font-bold text-sm text-on-surface">This course includes:</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-lg">video_library</span>
                                <span>12.5 hours on-demand video</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-lg">article</span>
                                <span>24 downloadable resources</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-lg">all_inclusive</span>
                                <span>Full lifetime access</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-lg">devices</span>
                                <span>Access on mobile and TV</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                                <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                <span>Certificate of completion</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
          
        </div>
      </div>

    </div>
  );
};

export default CourseDetailPage;
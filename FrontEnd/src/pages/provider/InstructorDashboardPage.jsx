import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "school", label: "My Courses", active: false },
  { icon: "favorite", label: "Wishlist", active: false },
  { icon: "settings", label: "Settings", active: false },
  { icon: "help", label: "Help Center", active: false },
];

const CHART_BARS = [40, 60, 45, 80, 65, 90, 100];

const COURSES = [
  {
    id: 1,
    title: "Advanced React Architecture",
    category: "Development",
    enrolled: 458,
    revenue: "$8,560.00",
    status: "Published",
    statusClass: "bg-green-100 text-green-700",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBySV8A7TJ8wbifncro2GkEzJCt1vti7TtKJ04kwlCfQHytBgS9Ze1g2NYitMDJp0LplapperEFFcN-jPig0QMej8Fev5DCn2h0hJ9KO_MMGViwUzfkYh53V-hOPHwTx9dm3dwmwDgzRYH6OEYUzN7B-eGmQrIuSD2VO0Xs8q-yeP4_qjDuUk7J8CVAqc-8ia_potNi2j8scxiLMtw_p3C_PlbGQoyNDlcrb-JwrQam8sf0xviOpKFz2IO6Q8svXwS95RKczZ_ClSY",
  },
  {
    id: 2,
    title: "Mastering Design Systems",
    category: "Design",
    enrolled: 285,
    revenue: "$5,240.00",
    status: "Published",
    statusClass: "bg-green-100 text-green-700",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5UrmebCqE8vHT3pkK5msvrv1TCd5pIr1AOFwrBGoLe99RLCYiRvFragj2U_Faw5jcqyYFPR2mXxZmgsZmDncJ8wXRciGpKlOKI-jNBnxS9_pTQqlst9pPXzyHjiXMQ0Hql-lu_r1b8eTn2CVe-CCq5Qq4gjvU6lWihmUfZlq15mha3OSMePHRAVZHIqvfHPW6vo7Tjjy_1ZCEgKt-POzbj0cxIkdxgYWTYK-kb1yNAqQdHccKyMPd6oRcuVWPrN0V2yuJV6gBFtE",
  },
  {
    id: 3,
    title: "Python: Zero to Hero",
    category: "Data Science",
    enrolled: 497,
    revenue: "$11,050.40",
    status: "Reviewing",
    statusClass: "bg-amber-100 text-amber-700",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOzT1oWvkqG7ZpnIyw3Mom2PNOiGjYz0hMsb85TVNbTxRSaXx17cgDXEj2KJU-Jfqvi-teK7W_JQymOY6RnuTCfriHu-OYpkjlY-8Qp76QmRTpOjSBkb-Kg6MR0E3v4iO42s9Dl_jDBN0u0LKKSthrp1haob_NpekHTqJDEz3mooqsdrfyGVxaB0AqH98rxpy58d0Lg4KuVVhxaWEzgDu9x3rZJG4dXdWfDQMUT_JDT_egyW3f3DO3P9xK6o9pTF2Gd_bO4jAY-qk",
  },
];

const ENGAGEMENT = [
  { label: "Video Completion", value: 92 },
  { label: "Quiz Participation", value: 64 },
  { label: "Forum Activity", value: 45 },
];

const ACTIVITIES = [
  {
    id: 1,
    icon: "forum",
    iconBg: "bg-tertiary-fixed",
    iconColor: "text-on-tertiary-fixed",
    name: "Sarah Miller",
    action: 'commented on "Lesson 04: React Hooks"',
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: "payments",
    iconBg: "bg-primary-fixed",
    iconColor: "text-on-primary-fixed",
    name: "David Chen",
    action: 'enrolled in "Mastering Design Systems"',
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: "verified",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed",
    name: "Emma Wilson",
    action: "completed the final assessment",
    time: "Yesterday",
  },
];

const MOBILE_NAV = [
  { icon: "dashboard", label: "Dashboard", active: true },
  { icon: "school", label: "Courses", active: false },
  { icon: "analytics", label: "Analytics", active: false },
  { icon: "settings", label: "Settings", active: false },
];

function EngagementBar({ value }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
      <div
        className="bg-primary h-full transition-all duration-1000"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function InstructorDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div className="bg-background text-on-background overflow-x-hidden">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm h-16">
        <div className="flex justify-between items-center w-full px-[40px] h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-[16px]">
            <span className="font-display text-headline-md font-bold text-primary">
              EduFlow
            </span>
            <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 ml-[32px]">
              <span className="material-symbols-outlined text-outline text-body-md mr-2">
                search
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 text-body-sm w-64 placeholder:text-on-surface-variant/50"
                placeholder="Search courses, students, reports..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <div className="hidden md:flex gap-[16px] mr-[16px]">
              {["Browse", "Mentors", "Pricing"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 border-l border-outline-variant/30 pl-[16px]">
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                notifications
              </button>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                shopping_cart
              </button>
              <div className="h-8 w-8 rounded-full bg-secondary-container overflow-hidden">
                <img
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  src={
                    user?.avatarUrl ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8bOjwGSqc2H0vTl4PB4uZF8ZzwuFTI0llrHXPMTtK0wGbcXrNFymtGVxXKnI6WpHeOPRbvaVPl0Yxzve_DCFGEuz0DOF1pELsi4bUY_nOEGLoCpEKhpe5OVPhsznvXkLpmhQtlAKTXn5SYilI2LdSlkul78O7GNPRtWEN6CjqY4AKt3J_IPw0pKsIvmZV8boUx4RfGr5yilgphITGovJlDZSmZoG6sxzM8A-29Y3MkoxEV2kgv2hBLc6AQo8yN7TgmVlb-x0Uyxw"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface border-r border-outline-variant/30 py-[32px] flex-col justify-between hidden md:flex">
          <div className="flex flex-col gap-[16px]">
            <div className="px-6 mb-[16px]">
              <span className="text-body-md font-bold text-on-surface block">
                {user?.fullName ?? "Instructor"}
              </span>
              <span className="text-label-sm text-on-surface-variant">
                Premium Learner
              </span>
            </div>
            <nav className="flex flex-col">
              {NAV_ITEMS.map(({ icon, label, active }) => (
                <a
                  key={label}
                  href="#"
                  className={`flex items-center gap-[16px] px-6 py-3 font-label-md text-label-md transition-all ${
                    active
                      ? "bg-primary-container/20 text-primary border-l-4 border-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined">{icon}</span>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="px-6 flex flex-col gap-[16px]">
            <button className="gradient-button text-white py-3 px-4 rounded-xl font-label-md text-label-md flex items-center justify-center gap-2 transition-transform active:scale-95">
              <span className="material-symbols-outlined text-[20px]">
                upgrade
              </span>
              Upgrade to Pro
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-[16px] py-3 text-on-surface-variant hover:text-error transition-colors font-label-md text-label-md"
            >
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-[16px] md:p-[40px] bg-surface-container-low min-h-screen pb-20 md:pb-[40px]">
          <div className="max-w-7xl mx-auto space-y-[32px]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-[16px]">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface">
                  Instructor Overview
                </h1>
                <p className="text-body-md text-on-surface-variant mt-1">
                  Review your revenue metrics and course performance.
                </p>
              </div>
              <button className="gradient-button text-white px-6 py-3 rounded-xl font-label-md text-label-md flex items-center gap-2 shadow-lg transition-all active:scale-95">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  add
                </span>
                Create New Course
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-[24px]">
              {/* Revenue Card */}
              <div className="md:col-span-2 bg-surface-container-lowest p-[32px] rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                      Total Revenue
                    </p>
                    <h2 className="text-display font-display text-on-surface mt-2">
                      $24,850.40
                    </h2>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      trending_up
                    </span>
                    +12.5%
                  </span>
                </div>
                {/* Bar Chart */}
                <div className="mt-[32px] h-24 flex items-end gap-1">
                  {CHART_BARS.map((h, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                      className={`flex-1 rounded-t-sm transition-colors cursor-pointer ${
                        hoveredBar === i ? "bg-primary" : "bg-primary/20"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* New Students */}
              <div className="bg-surface-container-lowest p-[32px] rounded-xl shadow-sm border border-outline-variant/30">
                <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                  New Students
                </p>
                <h2 className="text-headline-lg font-headline-lg text-on-surface mt-2">
                  1,240
                </h2>
                <p className="text-body-sm text-on-surface-variant mt-[16px]">
                  Average completion rate is{" "}
                  <span className="text-primary font-bold">78%</span>
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="text-label-sm bg-surface-container px-3 py-1 rounded-lg">
                    Active: 850
                  </span>
                  <span className="text-label-sm bg-surface-container px-3 py-1 rounded-lg">
                    Completed: 390
                  </span>
                </div>
              </div>

              {/* Avg Rating */}
              <div className="bg-surface-container-lowest p-[32px] rounded-xl shadow-sm border border-outline-variant/30 flex flex-col justify-between">
                <div>
                  <p className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">
                    Avg. Rating
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <h2 className="text-headline-lg font-headline-lg text-on-surface">
                      4.9
                    </h2>
                    <div className="flex text-amber-400">
                      {["star", "star", "star", "star", "star_half"].map(
                        (icon, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {icon}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-body-sm text-on-surface-variant">
                  Based on 452 student reviews across 6 courses.
                </p>
              </div>
            </div>

            {/* Course Management Table */}
            <section className="space-y-[16px]">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Course Management
                </h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-surface-container rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-surface-container rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                    Export CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-outline-variant/30 shadow-sm bg-surface-container-lowest">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30">
                      {[
                        "Course Name",
                        "Category",
                        "Enrolled",
                        "Revenue",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="p-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {COURSES.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-surface-container-low transition-colors"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-20 rounded-lg bg-surface-variant overflow-hidden shrink-0">
                              <img
                                alt={c.title}
                                className="w-full h-full object-cover"
                                src={c.img}
                              />
                            </div>
                            <span className="font-semibold text-body-md">
                              {c.title}
                            </span>
                          </div>
                        </td>
                        <td className="p-6 text-body-sm text-on-surface-variant">
                          {c.category}
                        </td>
                        <td className="p-6 text-body-sm">{c.enrolled}</td>
                        <td className="p-6 text-body-sm font-semibold">
                          {c.revenue}
                        </td>
                        <td className="p-6">
                          <span
                            className={`px-3 py-1 rounded-full text-label-sm font-label-sm ${c.statusClass}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="p-6">
                          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary p-2">
                            more_horiz
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Analytics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {/* Student Engagement */}
              <div className="bg-surface-container-lowest p-[32px] rounded-xl shadow-sm border border-outline-variant/30">
                <div className="flex items-center justify-between mb-[32px]">
                  <h4 className="text-body-md font-bold">Student Engagement</h4>
                  <select className="bg-surface-container border-none text-label-sm rounded-lg focus:ring-0">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
                <div className="space-y-[16px]">
                  {ENGAGEMENT.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1">
                      <div className="flex justify-between text-label-md">
                        <span>{label}</span>
                        <span>{value}%</span>
                      </div>
                      <EngagementBar value={value} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-surface-container-lowest p-[32px] rounded-xl shadow-sm border border-outline-variant/30">
                <h4 className="text-body-md font-bold mb-[32px]">
                  Recent Student Activity
                </h4>
                <div className="space-y-4">
                  {ACTIVITIES.map(
                    ({ id, icon, iconBg, iconColor, name, action, time }) => (
                      <div
                        key={id}
                        className="flex items-start gap-4 p-3 hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}
                        >
                          <span className="material-symbols-outlined">
                            {icon}
                          </span>
                        </div>
                        <div>
                          <p className="text-body-sm text-on-surface">
                            <strong>{name}</strong> {action}
                          </p>
                          <span className="text-label-sm text-on-surface-variant">
                            {time}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 h-16 md:hidden flex items-center justify-around px-4 z-50">
        {/* First 2 items */}
        {MOBILE_NAV.slice(0, 2).map(({ icon, label, active }) => (
          <a
            key={label}
            href="#"
            className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-on-surface-variant"}`}
          >
            <span
              className="material-symbols-outlined"
              style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {icon}
            </span>
            <span className="text-[10px] font-label-md">{label}</span>
          </a>
        ))}
        {/* FAB */}
        <button className="bg-primary text-white p-3 rounded-full -translate-y-6 shadow-xl active:scale-90 transition-transform">
          <span className="material-symbols-outlined">add</span>
        </button>
        {/* Last 2 items */}
        {MOBILE_NAV.slice(2).map(({ icon, label, active }) => (
          <a
            key={label}
            href="#"
            className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-on-surface-variant"}`}
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-[10px] font-label-md">{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

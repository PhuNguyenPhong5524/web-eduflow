import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", active: true, filled: true },
  { icon: "school", label: "My Courses", active: false },
  { icon: "favorite", label: "Wishlist", active: false },
  { icon: "settings", label: "Settings", active: false },
  { icon: "help", label: "Help Center", active: false },
];

const COURSES = [
  {
    id: 1,
    title: "Mastering React 18 & Next.js",
    tag: "Software",
    instructor: "Sarah Jenkins",
    completed: 24,
    total: 45,
    progress: 53,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv4Lum4i0_ugxFL4OOYffRKTCq9769lWml9S6D5y7A47SvtZx2-ljqJ0Zc5_a0HR3ayGJH31M5UK1RHwp5BY7F0hDAXknWsK4eELP1LIEhERcRA4Vo_zzDRNZOcE1Hr5RaKZpyA37GAMxF0to2wi9jyMTeO6uf3G6aYilCZ3QE1ZnC-y3FSIyH8X9Ol1K-gDIah_meeZHUnSbLuPfXeFDq8B0_jZyF7VnoJznyCyW1NnlJ2nh3E38LCs1I0-yVClLNmy8na-YBEDs",
    started: true,
  },
  {
    id: 2,
    title: "Data Science with Python A-Z",
    tag: "Data",
    instructor: "Dr. Emily Chen",
    completed: 82,
    total: 90,
    progress: 91,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYQpVsjBKm8MReWXqYzzKfd8eoBUC5M1_Kc225teRPjUFijm2UV8VgZoapjUte5PzaJHCuVm5abq69eLPuRmVPMvakOnXgjTp6DeXqv9GZISFbwDKzNvwLyTwW_1Q-KiEKszyNuwFFVR3qpMSWkoPJ499kS8fN-BaEWlwbGFT0VNWXllCUrkrncya1ozi1gx3DCL6EJ2Hdm-62CbvmYO8O2synUCspEvCFUAqHltj9EoeCYVUZdbWgE6uVrUR1tbaVhR8N1uZaYjw",
    started: true,
  },
  {
    id: 3,
    title: "Digital Brand Storytelling",
    tag: "Marketing",
    instructor: "Marcus Thorne",
    completed: 0,
    total: 20,
    progress: 0,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3pmXAlKoGRTyR66oCjo6YQaxfeBEscIBqqiTIEtup-wFGOIb6ltI8YRckLlsFIS_IZcZzNxwYIO6udEc-wHWT0-9BqEmrj5Rwnj5bY8Uzw2W4xjaosuhRpOvNucsGvRN2imqbO7I8_Ulzu7ES57h3uUr7196DEyXoLZMrA_aXXztgEc6BRAe8Rd-60FKxuwsbx-9WostUQprXyDDC3HxUUniB0D2YRVV-4XC16u3Im6tSy5pUGcIjPjLMetfF6tFBLr92M",
    started: false,
  },
];

const WISHLIST = [
  {
    id: 1,
    title: "Startup Fundamentals",
    meta: "Business • 12 hours",
    price: "$49.99",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz5NCse7Yc9oVHCH-d6nv7NqMttJZzUpLp-MKqJ2KJOTcrDN06-AivVY1KQiQB6XKwZWuCzlH9EeOeTX96tna--7k3LnwIao0Cm34FbFXAITpLxWV9jyLCcFykGvXPfFDYvKxInKi_v0mY2GXpgyNcQqQYga3xYDTz8Jm_O2ccK2-218kodzQ48zY1awY7g3K1d5nc3yI537HXkdvpAxfDZZJfMtHQknjKaI6uVTbaqBAk77xNzSJlrv0AlhyWXiVcw3b0kL6bgSg",
  },
  {
    id: 2,
    title: "Cloud Architecture Masterclass",
    meta: "DevOps • 24 hours",
    price: "$129.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIgZI6Y-QUMl8nOwtm1MxU1v_aiPd7uB8icMqvVan5-QgY5ZMehJvM_-5dSHNCx1zo5-FE84p9l6PsTHugew67QZB4RDMhZ8VElwPM-odxH1kLBi-kuAyPncf5YzasKA5sxNqjiApxTVmEAHfkpJ-fDO0M7UL0DpJxmNcGhzWCejx0VRzf5AdKs-VrnbP6hQq-_xUScIqwZPQ5KkgMe8pneSaoV5gNsxerKRVI52MjO8Bdxq9vPo1p6Ky3n9DRLZ1f_qgAvyJh0Xo",
  },
];

const ORDERS = [
  {
    id: "#ORD-4921",
    date: "Oct 12, 2023",
    amount: "$129.00",
    status: "Success",
    statusClass: "bg-green-100 text-green-700",
  },
  {
    id: "#ORD-4850",
    date: "Sep 28, 2023",
    amount: "$59.00",
    status: "Success",
    statusClass: "bg-green-100 text-green-700",
  },
  {
    id: "#ORD-4721",
    date: "Sep 15, 2023",
    amount: "$0.00",
    status: "Free",
    statusClass: "bg-surface-container-highest text-on-surface-variant",
  },
];

function AnimatedBar({ progress }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);
  return (
    <div className="h-1.5 w-full bg-surface-container rounded-full">
      <div
        className="h-full bg-primary rounded-full transition-all duration-1500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function HeroContinueBar({ progress }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);
  return (
    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary-container rounded-full relative transition-all duration-1500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ width: `${width}%` }}
      >
        <div className="absolute inset-0 shimmer" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-surface font-body-md text-on-surface">
      {/* TopNavBar */}
      <header className="fixed top-0 z-50 w-full bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm h-16 flex justify-between items-center px-margin-desktop max-w-container-max left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-stack-lg">
          <span className="font-display text-headline-md font-bold text-primary">
            EduFlow
          </span>
          <nav className="hidden md:flex gap-stack-md">
            {["Browse", "Mentors", "Pricing"].map((item) => (
              <a
                key={item}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                href="#"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-stack-md">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              placeholder="Search courses..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-stack-sm">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-full">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
            <img
              alt="User avatar"
              className="w-full h-full object-cover"
              src={
                user?.avatarUrl ||
                "https://lh3.googleusercontent.com/aida-public/AB6AXuA50Z4hKK9pTXUteuK39W5tsmY_ejDjF8D5-bKxXNFJnuAsjrAVgt5Od123Ncfj86_63jNw9lW_Ak2qB5BBAv1oAJmRvfMbG3SILZT-nbjxH0Q-eMjwrZYxCHJhOFEyNtsH410XfedNnQvXqHN34lQa-rfc_5hoOObAB4Zw-pb64SPmYKQ4V43X0ya0oflV3s4cuS5gjFddDDTGpGyGDXqtAw8VXHYLxJcXCCRCHUHeywRuCusURyuL-AEfPoJxD1uBwi4QW7abj-o"
              }
            />
          </div>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface pt-20 pb-stack-lg flex-col gap-stack-md border-r border-outline-variant/30 hidden lg:flex">
          <div className="px-6 mb-stack-md">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                {user?.fullName?.[0] ?? "U"}
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface">
                  {user?.fullName ?? "User"}
                </p>
                <p className="font-body-sm text-[11px] text-on-surface-variant">
                  Premium Learner
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {NAV_ITEMS.map(({ icon, label, active, filled }) => (
              <a
                key={label}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-md transition-all ${
                  active
                    ? "bg-primary-container/20 text-primary border-l-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
                href="#"
              >
                <span
                  className="material-symbols-outlined"
                  style={
                    filled ? { fontVariationSettings: "'FILL' 1" } : undefined
                  }
                >
                  {icon}
                </span>
                {label}
              </a>
            ))}
          </nav>

          <div className="px-6 mt-auto">
            <div className="p-4 rounded-2xl primary-gradient text-on-primary text-center space-y-3 shadow-lg shadow-primary/20">
              <p className="font-label-md text-label-md">Unlock Full Access</p>
              <p className="text-[12px] opacity-90 leading-tight">
                Get certificates for every course you finish.
              </p>
              <button className="w-full py-2 bg-white text-primary rounded-lg font-label-md scale-95 active:scale-90 transition-transform">
                Upgrade to Pro
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 mt-4 text-error font-label-md hover:bg-error-container/10 rounded-xl transition-all"
            >
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-margin-mobile md:p-margin-desktop bg-surface-container-lowest pb-20 lg:pb-0">
          <div className="max-w-6xl mx-auto space-y-stack-lg">
            {/* Welcome */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-headline-lg text-on-surface">
                  Welcome back, Alex! 👋
                </h1>
                <p className="font-body-md text-on-surface-variant">
                  You&apos;ve completed 75% of your weekly goal. Keep it up!
                </p>
              </div>
              <div className="flex gap-stack-sm">
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">
                    workspace_premium
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">
                    12 Badges
                  </span>
                </div>
                <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">
                    local_fire_department
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">
                    15 Day Streak
                  </span>
                </div>
              </div>
            </header>

            {/* Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Continue Learning */}
              <div className="md:col-span-2 relative overflow-hidden rounded-4xl bg-on-surface text-on-primary-container p-8 group">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[100px]" />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <span className="bg-primary/20 text-primary-fixed-dim px-3 py-1 rounded-full text-label-sm w-fit mb-4">
                    In Progress
                  </span>
                  <h2 className="font-headline-md text-headline-md text-white mb-2">
                    Advanced UI/UX Principles for Modern SaaS
                  </h2>
                  <p className="text-on-primary-container/70 font-body-sm mb-8 max-w-md">
                    Master the art of complex interface design with focus on
                    conversion and accessibility.
                  </p>
                  <div className="mt-auto space-y-4">
                    <div className="flex justify-between text-label-sm text-white">
                      <span>Progress</span>
                      <span>68%</span>
                    </div>
                    <HeroContinueBar progress={68} />
                    <button className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-label-md inline-flex items-center gap-2 hover:translate-x-1 transition-transform">
                      Continue Module 4
                      <span className="material-symbols-outlined text-[18px]">
                        play_arrow
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="flex flex-col gap-6">
                <div className="glass-card p-6 rounded-4xl flex-1 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-secondary-container/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-[28px]">
                        timer
                      </span>
                    </div>
                    <div>
                      <p className="text-on-surface-variant font-label-sm">
                        Total Study Time
                      </p>
                      <p className="text-headline-md font-bold text-on-surface">
                        42h 15m
                      </p>
                    </div>
                  </div>
                  <div className="text-green-600 font-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      trending_up
                    </span>
                    +12% from last week
                  </div>
                </div>
                <div className="glass-card p-6 rounded-4xl flex-1 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-tertiary-container/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-tertiary text-[28px]">
                        done_all
                      </span>
                    </div>
                    <div>
                      <p className="text-on-surface-variant font-label-sm">
                        Courses Finished
                      </p>
                      <p className="text-headline-md font-bold text-on-surface">
                        08
                      </p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant font-body-sm">
                    4 certificates earned
                  </p>
                </div>
              </div>
            </section>

            {/* My Courses */}
            <section>
              <div className="flex justify-between items-center mb-stack-md">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  My Courses
                </h3>
                <a
                  className="text-primary font-label-md flex items-center gap-1 hover:underline"
                  href="#"
                >
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES.map((course) => (
                  <div
                    key={course.id}
                    className="glass-card rounded-3xl overflow-hidden group"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={course.img}
                      />
                      <span className="absolute top-3 right-3 glass-card px-3 py-1 rounded-full text-label-sm text-on-surface bg-white/80">
                        {course.tag}
                      </span>
                    </div>
                    <div className="p-5 space-y-4">
                      <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[12px] text-on-surface-variant">
                          <span>
                            {course.completed}/{course.total} Lessons
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <AnimatedBar progress={course.progress} />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-dim" />
                          <span className="text-body-sm text-on-surface-variant">
                            {course.instructor}
                          </span>
                        </div>
                        <button
                          className={`p-2 rounded-lg ${
                            course.started
                              ? "bg-primary-container/10 text-primary hover:bg-primary-container/20"
                              : "bg-primary text-on-primary"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            play_arrow
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wishlist + Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg">
              {/* Wishlist */}
              <section>
                <div className="flex justify-between items-center mb-stack-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Wishlist
                  </h3>
                </div>
                <div className="space-y-4">
                  {WISHLIST.map((item) => (
                    <div
                      key={item.id}
                      className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20"
                    >
                      <div className="w-20 h-14 rounded-lg bg-surface-container overflow-hidden shrink-0">
                        <img
                          alt={item.title}
                          className="w-full h-full object-cover"
                          src={item.img}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-on-surface text-body-sm">
                          {item.title}
                        </p>
                        <p className="text-[12px] text-on-surface-variant">
                          {item.meta}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary">{item.price}</p>
                        <button className="text-[12px] text-secondary hover:underline">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Orders */}
              <section>
                <div className="flex justify-between items-center mb-stack-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Recent Orders
                  </h3>
                </div>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low border-b border-outline-variant/10">
                      <tr>
                        <th className="px-6 py-4 font-label-md text-on-surface-variant">
                          Order ID
                        </th>
                        <th className="px-6 py-4 font-label-md text-on-surface-variant">
                          Date
                        </th>
                        <th className="px-6 py-4 font-label-md text-on-surface-variant">
                          Amount
                        </th>
                        <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {ORDERS.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 text-body-sm font-medium">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 text-body-sm text-on-surface-variant">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 text-body-sm font-bold text-on-surface">
                            {order.amount}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-bold ${order.statusClass}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant/30 flex justify-around py-3 px-4 z-50 shadow-lg">
        {[
          { icon: "dashboard", label: "Home", active: true },
          { icon: "school", label: "Courses", active: false },
          { icon: "favorite", label: "Saved", active: false },
          { icon: "person", label: "Profile", active: false },
        ].map(({ icon, label, active }) => (
          <a
            key={label}
            className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-on-surface-variant"}`}
            href="#"
          >
            <span
              className="material-symbols-outlined"
              style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {icon}
            </span>
            <span className={`text-[10px] ${active ? "font-bold" : ""}`}>
              {label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}

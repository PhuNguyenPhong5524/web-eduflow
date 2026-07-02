import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const COURSES = [
  {
    id: 1,
    title: "NodeJS Pro - Tự Học từ số 0 (MVC, REST APIs, SQL/MongoDB)",
    tag: "Phát triển web",
    instructor: "Hoi dan IT voi Eric",
    avatar: "https://img-c.udemycdn.com/user/200_H/182016480_1578_2.jpg",
    completed: 24,
    total: 45,
    progress: 53,
    img: "https://img-c.udemycdn.com/course/240x135/4947234_f0db_5.jpg",
    started: true,
  },
  {
    id: 2,
    title: "Optimize Frontend for Beginner (Vietnamese)",
    tag: "Phát triển web",
    instructor: "Thien Pham Dinh",
    avatar: "https://img-c.udemycdn.com/course/240x135/6718707_1a8a_2.jpg",
    completed: 82,
    total: 90,
    progress: 91,
    img: "https://img-c.udemycdn.com/course/240x135/6718707_1a8a_2.jpg",
    started: true,
  },
  {
    id: 3,
    title: "Phân tích và trực quan hóa dữ liệu với Tableau",
    tag: "Khoa học dữ liệu",
    instructor: "Chuc Nguyen Van",
    avatar: "https://img-c.udemycdn.com/course/240x135/6747975_541f_3.jpg",
    completed: 0,
    total: 20,
    progress: 0,
    img: "https://img-c.udemycdn.com/course/240x135/6747975_541f_3.jpg",
    started: false,
  },
];

const WISHLIST = [
  {
    id: 1,
    title: "Startup Fundamentals",
    meta: "Business • 12 hours",
    price: "1.299.000đ",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz5NCse7Yc9oVHCH-d6nv7NqMttJZzUpLp-MKqJ2KJOTcrDN06-AivVY1KQiQB6XKwZWuCzlH9EeOeTX96tna--7k3LnwIao0Cm34FbFXAITpLxWV9jyLCcFykGvXPfFDYvKxInKi_v0mY2GXpgyNcQqQYga3xYDTz8Jm_O2ccK2-218kodzQ48zY1awY7g3K1d5nc3yI537HXkdvpAxfDZZJfMtHQknjKaI6uVTbaqBAk77xNzSJlrv0AlhyWXiVcw3b0kL6bgSg",
  },
  {
    id: 2,
    title: "Cloud Architecture Masterclass",
    meta: "DevOps • 24 hours",
    price: "1.299.000đ",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIgZI6Y-QUMl8nOwtm1MxU1v_aiPd7uB8icMqvVan5-QgY5ZMehJvM_-5dSHNCx1zo5-FE84p9l6PsTHugew67QZB4RDMhZ8VElwPM-odxH1kLBi-kuAyPncf5YzasKA5sxNqjiApxTVmEAHfkpJ-fDO0M7UL0DpJxmNcGhzWCejx0VRzf5AdKs-VrnbP6hQq-_xUScIqwZPQ5KkgMe8pneSaoV5gNsxerKRVI52MjO8Bdxq9vPo1p6Ky3n9DRLZ1f_qgAvyJh0Xo",
  },
];

const ORDERS = [
  {
    id: "#ORD-4921",
    date: "30/03/2026",
    amount: "1.229.000đ",
    status: "Success",
    statusClass: "bg-green-100 text-green-700",
  },
  {
    id: "#ORD-4850",
    date: "28/05/2026",
    amount: "729.000đ",
    status: "Success",
    statusClass: "bg-green-100 text-green-700",
  },
  {
    id: "#ORD-4721",
    date: "03/06/2026",
    amount: "0đ",
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
  const { addToCart } = useCart();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-stack-lg">
      {/* Welcome */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-headline-lg text-on-surface">
            Chào mừng <span className="text-primary">{user.username}</span> 👋
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Tiếp tục hành trình học tập của bạn hoặc khám phá các khóa học mới!
          </p>
        </div>
      </header>

      {/* My Courses */}
      <section>
        <div className="flex justify-between items-center mb-stack-md">
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Khóa học của tôi
          </h3>
          <a
            className="text-primary font-label-md flex items-center gap-1 hover:underline"
            href="#"
          >
            Xem tất cả
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
                <Link to={`/my-courses/69e393ad5c45fbef7efaacc6`} className="block">
                  <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                    {course.title}
                  </h4>
                </Link>
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
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img
                        alt={course.instructor}
                        className="w-full h-full object-cover"
                        src={course.avatar}
                      />
                    </div>
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
              Danh sách yêu thích
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
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="text-[12px] text-secondary hover:underline"
                  >
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
              Đơn hàng gần đây
            </h3>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-outline-variant/10">
                <tr>
                  <th className="px-6 py-4 font-label-md text-[11px] text-on-surface-variant">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-4 font-label-md text-[11px] text-on-surface-variant">
                    Ngày đặt hàng
                  </th>
                  <th className="px-6 py-4 font-label-md text-[11px] text-on-surface-variant">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-4 font-label-md text-[11px] text-on-surface-variant text-right">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {ORDERS.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-[12px] font-medium">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-[12px] text-on-surface-variant">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-[12px] font-bold text-on-surface">
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
  );
}

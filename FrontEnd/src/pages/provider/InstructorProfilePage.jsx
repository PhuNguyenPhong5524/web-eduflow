import { useMemo, useState } from "react";

const tabs = [
  { id: "courses", label: "Courses (18)" },
  { id: "reviews", label: "Reviews" },
  { id: "about", label: "About" },
  { id: "resources", label: "Resources" },
];

const stats = [
  { value: "124,502", label: "Total Students" },
  { value: "18", label: "Courses" },
  { value: "4.9", label: "Avg Rating", icon: "star" },
  { value: "42,118", label: "Reviews" },
];

const courses = [
  {
    id: 1,
    badge: "Bestseller",
    title: "Mastering Advanced Figma Components & Systems",
    category: "UI Design",
    duration: "12.5 Hours",
    rating: "4.9",
    reviews: "(12.4k)",
    price: "$89.99",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnHWFhCLx2J0Hdp90ILe-xGRXW2PGhxwRG4MAOcCdxNakzwpdINR8dZlvf_wJaay40pm5sCcuZxYGw5H9_owoi03h9lerzmfzWqG6dGs0obgMsHVVj9_xvAc2hLr4nKmgfWG27vpYwxQUR_rmX-sfq0Bv3WrLDL65jBCDAEItJuKoX-epHD3yYcBwnUxGQrFy1rDO5mkG2Sir6KCc-OabV0FSYvIsRWujrhRZ8XGUoeqLmV__Qe_x-wKQR_J1HGyK_tdSzX6O8Z-U",
    stars: 5,
  },
  {
    id: 2,
    title: "Psychology-Driven Interface Design",
    category: "UX Research",
    duration: "8 Hours",
    rating: "4.7",
    reviews: "(8.2k)",
    price: "$74.99",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCURoQIUQK4VMzuusuEDj1k7C_mtF1BDGNb1mBcH88Vdw5cLQanmxIKBNsaAACcveCtHE_wCHTcCYHs86WCjcjlahtAPqIYP4nwroS9qImyen9llh8bxj_mMc9Mqb5JdFy_ZKVnIX8cf0gHdyIbeh7HJ15eTGCtxxDGSFsfnas5E8FO3ZunnKvXGKtVKu4Gq9T-XeWeAdzxfmNBZ9HBgv2B1zhnjIsm7KHIiXdeD0Jx5VaHpTfTFh_1BDvX74XevIBFZ0tna7Sm7c4",
    stars: 4.5,
  },
  {
    id: 3,
    badge: "New",
    title: "iOS 17 Design Guidelines & Swift UI Essentials",
    category: "Mobile",
    duration: "15 Hours",
    rating: "4.0",
    reviews: "(156)",
    oldPrice: "$129.99",
    price: "$99.99",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMJheo9Tb1pGJoa4p2d3Dw6YlZ7s4GnwaZjrsXno0CY62Ns_qU1PN32cYK8QJv--tS-HzR4dQm6a35UB1oF6lG0PZmDAUFpg-lru8Uk8O27Tkmdk9JaobFZiq4AmMApnXmnl7r3CwmhTrrYmFCnIa5aaw2FrV1pI0Mvp5j8gsCbAMySEGRjqM5tYgAa0KMUi6Dr3Zyeup0pIbXea9dANwt_3aP6kqacCQ5xj8-WOJW3qJvaPARmxwLsqHfI5AtMsdfgXP1TfqfHj0",
    stars: 4,
  },
];

function RatingStars({ stars }) {
  const full = Math.floor(stars);
  const half = stars % 1 !== 0;

  return (
    <div className="flex text-primary">
      {Array.from({ length: full }).map((_, i) => (
        <span
          key={`f-${i}`}
          className="material-symbols-outlined text-sm"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {half ? (
        <span
          className="material-symbols-outlined text-sm"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star_half
        </span>
      ) : null}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <span
          key={`e-${i}`}
          className="material-symbols-outlined text-sm"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function InstructorProfilePage() {
  const [activeTab, setActiveTab] = useState("courses");
  const [isFollowing, setIsFollowing] = useState(false);

  const content = useMemo(() => {
    if (activeTab === "courses") {
      return (
        <>
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              All Courses
            </h2>
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-xl focus:outline-none focus:border-primary transition-colors font-body-sm text-body-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  {course.badge ? (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-primary-container/80 backdrop-blur-md text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {course.badge}
                      </span>
                    </div>
                  ) : null}
                  <img
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={course.image}
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-secondary/10 text-secondary text-label-sm font-label-sm px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-on-surface-variant text-label-sm font-label-sm">
                      • {course.duration}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-[20px] leading-tight text-on-surface group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <RatingStars stars={course.stars} />
                    <span className="text-on-surface font-label-sm text-label-sm">
                      {course.rating}
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">
                      {course.reviews}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <div className="flex flex-col">
                      {course.oldPrice ? (
                        <span className="text-on-surface-variant text-[12px] line-through">
                          {course.oldPrice}
                        </span>
                      ) : null}
                      <span className="text-on-surface font-bold text-headline-md">
                        {course.price}
                      </span>
                    </div>
                    <button className="bg-primary-container/10 text-primary hover:bg-primary-container hover:text-on-primary p-2.5 rounded-xl transition-all duration-300">
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      );
    }

    if (activeTab === "about") {
      return (
        <div className="glass-card p-8 rounded-3xl mt-8">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
            Teaching Philosophy
          </h3>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            I believe that design is not just about how things look, but how
            they work and feel. My courses focus on the why behind design
            decisions and practical workflows.
          </p>
        </div>
      );
    }

    return (
      <div className="glass-card p-8 rounded-3xl mt-8">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
          {activeTab === "reviews" ? "Learner Reviews" : "Resources"}
        </h3>
        <p className="text-on-surface-variant">
          This section can be connected to API data later.
        </p>
      </div>
    );
  }, [activeTab]);

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 max-w-7xl mx-auto">
          <span className="font-headline-md text-headline-md font-bold text-primary">
            EduFlow
          </span>
          <div className="hidden md:flex items-center gap-6">
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary"
              href="#"
            >
              Browse
            </a>
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary"
              href="#"
            >
              My Courses
            </a>
            <a
              className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1"
              href="#"
            >
              Instructors
            </a>
            <a
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary"
              href="#"
            >
              Resources
            </a>
          </div>
          <button className="bg-primary-container text-on-primary px-6 py-2.5 rounded-xl font-label-md text-label-md">
            Get Started
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-stack-lg">
        <header className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
          <div className="relative overflow-hidden rounded-3xl bg-surface-container-low p-stack-lg md:p-12 border border-outline-variant/20 shadow-sm">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row gap-stack-lg items-center md:items-start text-center md:text-left">
              <img
                alt="Instructor Avatar"
                className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover border-4 border-white shadow-xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd6iIr3wnF1O2aqEhHFWdARgZBjFD1kNH4FP1tkCz3MUS-Qmk4ljXdCwGwxA2rqvY7iCnIvw7CVp8Ywu3VHvtipk3tJgAMbKwshCC5XloBcG-RuDJ4Ds0E-jEpzwZEwHcdi6D8xQ_IDROcIign-OYdem7ev7KhR_6H1XKg2mL62OejyZsKhDjzITui1C3QLGt9ETnR2w1mg5LglksHepQgE9Ll_4gUE9mufThSHj73nmMZVOrMrIJCo9NXbnbYpzA_30dcYgrRbyU"
              />

              <div className="flex-1 space-y-4">
                <h1 className="font-display text-display text-on-surface">
                  Alex Sterling
                </h1>
                <p className="font-body-lg text-body-lg text-secondary font-medium italic">
                  Senior UI/UX Designer at TechNexus
                </p>
                <p className="font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                  With over 12 years of industry experience, I specialize in
                  crafting digital experiences and mentoring the next generation
                  of designers.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-card p-4 rounded-2xl flex flex-col items-center md:items-start"
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-headline-md text-headline-md text-primary">
                          {stat.value}
                        </span>
                        {stat.icon ? (
                          <span
                            className="material-symbols-outlined text-primary text-xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {stat.icon}
                          </span>
                        ) : null}
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsFollowing((p) => !p)}
                  className="w-full md:w-48 bg-primary-container text-on-primary font-label-md text-label-md py-4 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">
                    {isFollowing ? "person_remove" : "person_add"}
                  </span>
                  {isFollowing ? "Following" : "Follow Instructor"}
                </button>
                <button className="w-full md:w-48 border-2 border-primary text-primary font-label-md text-label-md py-4 rounded-xl hover:bg-primary/5">
                  Message
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="border-b border-outline-variant/30 mb-8 overflow-x-auto">
            <div className="flex gap-stack-lg min-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`font-label-md text-label-md px-4 py-4 border-b-2 transition-all ${isActive ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {content}
        </section>
      </main>

      <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-stack-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto gap-stack-md">
          <span className="font-headline-md text-headline-md font-bold text-on-surface">
            EduFlow
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary"
              href="#"
            >
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

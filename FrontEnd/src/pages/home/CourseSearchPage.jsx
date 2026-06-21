import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCourses } from "../../services/courseService";
import FilterSidebar from "../../components/FilterSidebar";
import CourseList from "../../components/CourseList";

const ITEMS_PER_PAGE = 12;

export default function CourseSearchPage() {
  // ── URL search params as single source of truth ──────────
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filters from URL
  const category = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";
  const price = searchParams.get("price") || null;
  const rating = searchParams.get("rating") || null;
  const level = searchParams.get("level") || null;
  const page = Number(searchParams.get("page")) || 1;

  // ── Data query (URL params are the source of truth) ───────
  const { data, isLoading } = useQuery({
    queryKey: ["courses", q, category, price, rating, level, page],
    queryFn: async () => {
      const { data: res } = await getCourses({
        category: category || undefined,
        q: q || undefined,
        price: price || undefined,
        rating: rating || undefined,
        level: level || undefined,
        page,
        limit: ITEMS_PER_PAGE,
      });
      return res;
    },
    placeholderData: (previousData) => previousData,
  });

  const courses = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const loading = isLoading;

  // ── Update URL params (filter change resets to page 1) ────
  const handleFilterChange = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      // Reset to page 1 on filter change
      next.delete("page");
      return next;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newPage > 1) {
        next.set("page", String(newPage));
      } else {
        next.delete("page");
      }
      return next;
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Filters object for sidebar ────────────────────────────
  const filters = { price, rating, level };

  return (
    <main className="pt-24 pb-stack-lg min-h-screen">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-stack-md">
          <a
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary"
            href="/"
          >
            Home
          </a>
          <span className="material-symbols-outlined text-[16px] text-outline">
            chevron_right
          </span>
          <span className="font-label-md text-label-md text-primary">
            {q ? `Kết quả cho "${q}"` : category || "All Courses"}
          </span>
        </nav>

        {/* Category Header */}
        <section className="mb-stack-lg p-stack-lg rounded-xl bg-linear-to-br from-primary-container to-secondary-container text-on-primary-container relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-display text-display mb-4">
              {q ? `Kết quả cho "${q}"` : category || "All Courses"}
            </h1>
            <p className="font-body-lg text-body-lg opacity-90 leading-relaxed">
              Master the art of building robust, scalable applications. From web
              development to machine learning, our expert-led courses provide
              hands-on experience with the industry&apos;s most in-demand
              technologies.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
            <span
              className="material-symbols-outlined text-[240px]"
              style={{ fontVariationSettings: "'wght' 100" }}
            >
              code
            </span>
          </div>
        </section>

        {/* Content: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-gutter">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <CourseList
            courses={courses}
            loading={loading}
            total={total}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            categoryName={category}
            keyword={q}
          />
        </div>
      </div>
    </main>
  );
}

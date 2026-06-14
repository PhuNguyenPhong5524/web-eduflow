import { useState } from "react";

const ratingOptions = [
  { id: "rating-4", label: "4.0 & Up", stars: 4 },
  { id: "rating-3", label: "3.0 & Up", stars: 3 },
];

const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const priceOptions = ["Paid", "Free"];
const durationOptions = ["0-3 Hours", "3-7 Hours", "7+ Hours"];

/**
 * FilterSidebar — collapsible filter panel for course list page.
 *
 * Props:
 *   - filters      : { price: string|null, rating: string|null, level: string|null }
 *   - onFilterChange: (key: string, value: any) => void
 */
export default function FilterSidebar({ filters, onFilterChange }) {
  const [openSections, setOpenSections] = useState({
    rating: true,
    level: true,
    price: true,
    duration: true,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 space-y-stack-lg">
        <div>
          <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-4">
            Filters
          </h3>

          {/* ── Rating ─────────────────────────────────── */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("rating")}
              className="w-full font-label-md text-label-md text-on-surface mb-3 flex items-center justify-between"
            >
              Rating
              <span
                className="material-symbols-outlined text-[18px] transition-transform"
                style={{
                  transform: openSections.rating
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                expand_more
              </span>
            </button>
            {openSections.rating ? (
              <div className="space-y-2">
                {ratingOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      type="checkbox"
                      checked={filters.rating === String(option.stars)}
                      onChange={() => {
                        const newVal =
                          filters.rating === String(option.stars)
                            ? null
                            : String(option.stars);
                        onFilterChange("rating", newVal);
                      }}
                    />
                    <span className="flex items-center text-body-sm text-on-surface-variant group-hover:text-on-surface">
                      <span className="flex text-yellow-500 mr-2">
                        {Array.from({ length: option.stars }).map((_, i) => (
                          <span
                            key={`${option.id}-${i}`}
                            className="material-symbols-outlined text-[16px]"
                            style={{
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            star
                          </span>
                        ))}
                        {Array.from({ length: 5 - option.stars }).map(
                          (_, i) => (
                            <span
                              key={`${option.id}-empty-${i}`}
                              className="material-symbols-outlined text-[16px]"
                            >
                              star
                            </span>
                          ),
                        )}
                      </span>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          {/* ── Level ──────────────────────────────────── */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("level")}
              className="w-full font-label-md text-label-md text-on-surface mb-3 flex items-center justify-between"
            >
              Level
              <span
                className="material-symbols-outlined text-[18px] transition-transform"
                style={{
                  transform: openSections.level
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                expand_more
              </span>
            </button>
            {openSections.level ? (
              <div className="space-y-2">
                {levelOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      className="w-4 h-4 rounded border-outline-variant text-primary"
                      type="checkbox"
                      checked={filters.level === option}
                      onChange={() => {
                        const newVal =
                          filters.level === option ? null : option;
                        onFilterChange("level", newVal);
                      }}
                    />
                    <span className="text-body-sm text-on-surface-variant">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          {/* ── Price ──────────────────────────────────── */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("price")}
              className="w-full font-label-md text-label-md text-on-surface mb-3 flex items-center justify-between"
            >
              Price
              <span
                className="material-symbols-outlined text-[18px] transition-transform"
                style={{
                  transform: openSections.price
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                expand_more
              </span>
            </button>
            {openSections.price ? (
              <div className="space-y-2">
                {priceOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      className="w-4 h-4 border-outline-variant text-primary"
                      name="price"
                      type="radio"
                      checked={filters.price === option}
                      onChange={() => {
                        // Toggle off if clicking the same option
                        const newVal =
                          filters.price === option ? null : option;
                        onFilterChange("price", newVal);
                      }}
                    />
                    <span className="text-body-sm text-on-surface-variant">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          {/* ── Duration ──────────────────────────────── */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("duration")}
              className="w-full font-label-md text-label-md text-on-surface mb-3 flex items-center justify-between"
            >
              Duration
              <span
                className="material-symbols-outlined text-[18px] transition-transform"
                style={{
                  transform: openSections.duration
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                expand_more
              </span>
            </button>
            {openSections.duration ? (
              <div className="space-y-2">
                {durationOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      className="w-4 h-4 rounded border-outline-variant text-primary"
                      type="checkbox"
                    />
                    <span className="text-body-sm text-on-surface-variant">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}

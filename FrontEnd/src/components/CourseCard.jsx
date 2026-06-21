/**
 * StarRow – renders 5 stars (filled / half / empty) based on a numeric rating.
 */
function StarRow({ stars }) {
  const wholeStars = Math.floor(stars);
  const hasHalf = stars % 1 >= 0.25; // 0.5 → half star

  return (
    <div className="flex text-yellow-500">
      {Array.from({ length: wholeStars }).map((_, idx) => (
        <span
          key={`whole-${idx}`}
          className="material-symbols-outlined text-[14px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {hasHalf ? (
        <span
          className="material-symbols-outlined text-[14px]"
          style={{ fontVariationSettings: "'FILL' 0.5" }}
        >
          star_half
        </span>
      ) : null}
      {Array.from({ length: 5 - wholeStars - (hasHalf ? 1 : 0) }).map(
        (_, idx) => (
          <span
            key={`empty-${idx}`}
            className="material-symbols-outlined text-[14px]"
          >
            star
          </span>
        ),
      )}
    </div>
  );
}

/**
 * Format price for display.
 * price_promotion takes priority over price.
 */
function formatPrice(price, pricePromotion) {
  const effectivePrice =
    pricePromotion !== null && pricePromotion !== undefined
      ? pricePromotion
      : price;

  if (effectivePrice === 0) return "Free";
  return `$${effectivePrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

/**
 * CourseCard — single course card matching the static HTML design.
 *
 * Props:
 *   - course: { _id, course_title, provider, image_url, price, price_promotion, students, feature, ... }
 */
export default function CourseCard({ course }) {
  const {
    course_title,
    provider,
    image_url,
    price,
    price_promotion,
    students,
    feature,
  } = course;

  // Determine badge text
  const badge = feature ? "Best Seller" : null;

  // Stars / rating placeholder — schema chưa có rating, dùng giá trị cứng
  const stars = 4.5;
  const ratingText = "4.5";
  const reviewCount = students
    ? `(${students.toLocaleString("en-US")})`
    : "";

  return (
    <div className="group bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={course_title}
          src={
            image_url ||
            "https://placehold.co/400x225/4f46e5/ffffff?text=No+Image"
          }
        />
        {badge ? (
          <div className="absolute top-3 right-3 glass-panel px-2 py-1 rounded text-primary font-label-sm text-label-sm shadow-sm">
            {badge}
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-headline-md text-headline-md leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {course_title}
        </h3>
        <p className="text-body-sm text-on-surface-variant">
          {provider || "Unknown Instructor"}
        </p>

        {/* Rating row */}
        <div className="flex items-center gap-1">
          <span className="font-label-md text-label-md text-on-surface">
            {ratingText}
          </span>
          <StarRow stars={stars} />
          {reviewCount ? (
            <span className="text-body-sm text-on-surface-variant">
              {reviewCount}
            </span>
          ) : null}
        </div>

        {/* Price & Favorite */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md text-on-surface">
              {formatPrice(price, price_promotion)}
            </span>
            {price_promotion !== null &&
              price_promotion !== undefined &&
              price_promotion < price && (
                <span className="text-body-sm text-on-surface-variant line-through">
                  ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              )}
          </div>
          <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">
            favorite
          </button>
        </div>
      </div>
    </div>
  );
}

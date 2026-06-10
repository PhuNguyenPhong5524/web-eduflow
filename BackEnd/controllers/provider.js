import providerModel from "../models/provider.js";
import courseModel from "../models/course/course.js";
import categoryModel from "../models/category.js";
import { seedCoursesForProvider } from "./coursesOfProviderSeed.js";

const DEFAULT_TITLES = [
  "Complete {topic} Masterclass",
  "{topic} Fundamentals for Beginners",
  "Advanced {topic} Bootcamp",
  "Practical {topic} Projects",
  "{topic} from Zero to Hero",
  "Professional {topic} Workflow",
];

const DEFAULT_TOPICS = {
  development: ["React", "Node.js", "TypeScript", "Next.js", "MongoDB"],
  design: ["UI Design", "Figma", "Design Systems", "UX Research"],
  data: ["Python", "Data Analysis", "Machine Learning", "SQL"],
  mobile: ["Flutter", "React Native", "SwiftUI", "Android"],
  language: ["English", "Japanese", "Korean", "Chinese"],
  game: ["Unity", "Game Design", "3D Modeling", "Unreal Engine"],
};

const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const buildCourseTitle = (categoryName) => {
  const key = categoryName.toLowerCase();
  const topics = Object.entries(DEFAULT_TOPICS).find(([group]) =>
    key.includes(group),
  )?.[1] ?? [categoryName];
  const topic = getRandomItem(topics);
  const template = getRandomItem(DEFAULT_TITLES);
  return template.replace("{topic}", topic);
};

const buildSeedCourse = (providerId, category, index) => {
  const basePrice = 149000 + index * 50000;
  const pricePromotion = index % 3 === 0 ? Math.floor(basePrice * 0.8) : null;

  return {
    category_id: category._id,
    provider_id: providerId,
    course_title: buildCourseTitle(category.cate_name),
    price: basePrice,
    price_promotion: pricePromotion,
    image_url: `https://picsum.photos/seed/eduflow-${providerId}-${index}/900/600`,
    video_url: null,
    description: `A practical ${category.cate_name.toLowerCase()} course created for instructor demo data.`,
    total_sections: 4 + (index % 4),
    total_lectures: 16 + index * 2,
    students: 120 + index * 35,
    duration: `${8 + index}h`,
    feature: index < 3,
    isActive: true,
  };
};

export const getProviders = async (req, res) => {
  try {
    const providers = await providerModel.find();
    return res.json({ message: "success", data: providers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProviderCourses = async (req, res) => {
  try {
    const { providerId } = req.params;

    const courses = await courseModel
      .find({ provider_id: providerId })
      .populate({ path: "category_id", select: "cate_name" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Lấy danh sách khóa học giảng viên thành công",
      total: courses.length,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const seedProviderCourses = async (req, res) => {
  try {
    const { providerId } = req.params;
    const requestedCount = Number.parseInt(req.body?.count, 10);
    const count =
      Number.isFinite(requestedCount) && requestedCount > 0
        ? requestedCount
        : 6;

    const result = await seedCoursesForProvider({
      providerId,
      count,
      replaceExisting: false,
    });

    return res.status(201).json({
      message: "Generated instructor course data successfully",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

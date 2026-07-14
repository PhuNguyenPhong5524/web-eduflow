import providerModel from "../models/provider.js";
import courseModel from "../models/course/course.js";
import categoryModel from "../models/category.js";
import { seedCoursesForProvider } from "./coursesOfProviderSeed.js";
import { v2 as cloudinary } from "cloudinary";

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

export const getAdminRequestProvidersDetail = async (req, res) => {
  try {
    const { providerId } = req.params;

    const provider = await providerModel
      .findById(providerId)
      .lean(); 

    if (!provider) {
      return res.status(404).json({
        message: "Không tìm thấy chi tiết yêu cầu đăng ký của người dùng này",
      });
    }

    return res.status(200).json({
      message: "Lấy chi tiết yêu cầu đối tác thành công",
      data: provider,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Mã yêu cầu (ID) không đúng định dạng",
      });
    }
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



// Hàm helper upload file từ memory buffer lên Cloudinary
const uploadToCloudinary = async (file) => {
  const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const fileName = file.originalname.split(".")[0];
  
  const result = await cloudinary.uploader.upload(dataUrl, {
    public_id: fileName,
    resource_type: "auto",
  });
  return result.secure_url; // Trả về link ảnh dạng https
};

export const createProvider = async (req, res) => {
  try {
    const user_id = req.user.userId; 
    const { provider_name, career, email, phone} = req.body;

    if (!provider_name || !email) {
      return res.status(400).json({ message: "Thiếu provider_name hoặc email!" });
    }

    // Chặn gửi trùng (mỗi user chỉ 1 hồ sơ)
    const existed = await providerModel.findOne({ user_id });
    if (existed) {
      return res.status(400).json({ message: "Bạn đã gửi đăng ký trước đó!" });
    }

    let avatarUrl = "";
    let imageUrls = [];

    // Kiểm tra xem người dùng có truyền file lên không
    if (req.files) {
      // Xử lý upload ảnh đại diện (Avatar)
      if (req.files.avatar && req.files.avatar[0]) {
        avatarUrl = await uploadToCloudinary(req.files.avatar[0]);
      }

      // Xử lý upload danh sách chứng chỉ (Nhiều ảnh dùng Promise.all để chạy song song)
      if (req.files.images && req.files.images.length > 0) {
        const uploadPromises = req.files.images.map((file) => uploadToCloudinary(file));
        imageUrls = await Promise.all(uploadPromises);
      }
    }

    // Lưu thông tin vào Database
    const provider = await providerModel.create({
      user_id,
      provider_name,
      career,
      email,
      phone,            
      avatar: avatarUrl, 
      images: imageUrls, 
      status: "pending",
    });

    return res.status(201).json({
      message: "Gửi đăng ký thành công, vui lòng chờ admin duyệt",
      data: provider,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Lấy thông tin yêu cầu trở thành giảng viên của người dùng 

export const getAdminRequestProviders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    
    const pageNum = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const limitNum = !isNaN(parsedLimit) && parsedLimit > 0 ? Math.min(50, parsedLimit) : 10;
    const skip = (pageNum - 1) * limitNum;

    // 2. QUERY DỮ LIỆU
    const [providers, total] = await Promise.all([
      providerModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
        
      providerModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      message: "Lấy danh sách yêu cầu đối tác thành công",
      data: providers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.max(1, Math.ceil(total / limitNum)),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
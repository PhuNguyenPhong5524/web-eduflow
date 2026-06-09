import categoryModel from "../models/category.js";

export const getCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.json({ message: "Success", data: categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

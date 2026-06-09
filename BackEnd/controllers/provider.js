import providerModel from "../models/provider.js";

export const getProviders = async (req, res) => {
  try {
    const providers = await providerModel.find();
    return res.json({ message: "success", data: providers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

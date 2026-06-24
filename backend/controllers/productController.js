import ProductModel from "../models/ProductModel";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const where = {};
    if (category && category !== "all") where.category = category;
    if (search) where.name = { $regex: search, $options: "i" };

    const products = await ProductModel.find(where);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import ProductModel from "../models/ProductModel.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, limit } = req.query;
    const filter = {};

    if (category && category !== "all") filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    let sortBy = { createdAt: -1 };
    if (sort === "rating") sortBy = { rating: -1 };
    if (sort === "price-low") sortBy = { price: 1 };
    if (sort === "price-high") sortBy = { price: -1 };

    const products = await Product.find(filter) // ← plural "products"
      .sort(sortBy)
      .limit(limit ? Number(limit) : 0);

    const productsWithDiscount = products.map((p) => {
      // ← plural "products"
      const discount =
        p.originalPrice && p.originalPrice > p.price
          ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
          : 0;
      return { ...p.toObject(), discount };
    });

    res.json({ products: productsWithDiscount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

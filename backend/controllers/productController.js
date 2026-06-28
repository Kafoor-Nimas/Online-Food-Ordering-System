import ProductModel from "../models/ProductModel.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, limit, page, minPrice, maxPrice, organic } =
      req.query;

    const filter = {};
    if (category && category !== "all") filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };
    if (organic === "true") filter.organic = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortBy = { createdAt: -1 };
    if (sort === "rating") sortBy = { rating: -1 };
    if (sort === "price_asc") sortBy = { price: 1 };
    if (sort === "price_desc") sortBy = { price: -1 };
    if (sort === "name") sortBy = { name: 1 };

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 12;
    const skip = (pageNum - 1) * limitNum;

    const total = await ProductModel.countDocuments(filter);
    const pages = Math.ceil(total / limitNum);

    const products = await ProductModel.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limitNum);

    const productsWithDiscount = products.map((p) => {
      const discount =
        p.originalPrice && p.originalPrice > p.price
          ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
          : 0;
      return { ...p.toObject(), discount };
    });

    res.json({ products: productsWithDiscount, pages, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

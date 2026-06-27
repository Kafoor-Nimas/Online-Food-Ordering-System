import ProductModel from "../models/ProductModel.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, search, sort, limit } = req.query;
    const filter = {};

    if (category && category !== "all") filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    let sortBy = { createdAt: -1 }; // default newest first
    if (sort === "rating") sortBy = { rating: -1 };
    if (sort === "price-low") sortBy = { price: 1 };
    if (sort === "price-high") sortBy = { price: -1 };

    const products = await ProductModel.find(filter).sort(sortBy);

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get products with discount
const productsWithDiscount = products.map((p) => {
  const product = p.toObject();
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;
  return { ...product, discount };
});

res.json({ products: productsWithDiscount });

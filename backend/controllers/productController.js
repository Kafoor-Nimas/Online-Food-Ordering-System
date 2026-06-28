import ProductModel from "../models/ProductModel.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({ message: "Access denied. Admins only"});
        return;
    }
    try{
        const data = {};
        data.productId = req.body.productId;

        if(!req.body.name) return res.status(400).json({ message: "Product name is required"});
        data.name = req.body.name;
        data.description = req.body.description || "";

        if(!req.body.price) return res.status(400).json({ message: "Product price is required"});
        data.price = req.body.price;
        data.originalPrice = req.body.originalPrice || req.body.price;
        data.image = req.body.image || "/images/default-product.png"; 
        data.category = req.body.category || "Others";
        data.stock = req.body.stock || 0;
        data.isAvailable = req.body.isAvailable === false ? false : true; 
        const newProduct = new ProductModel(data);
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch(error){
        res.status(500).json({ message: "Error creating product", error });
    }
}

//for admin panel (shows all products including unavailable)
export async function getProducts(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({ message: "Access denied. Admins only"});
        return;
    }
    try{
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({ message: "Error fetching products", error });
    }
}

// for menu page (with filters, sorting, pagination)
export const getProductsForMenu = async (req, res) => {
  try {
    const { category, search, sort, limit, page, minPrice, maxPrice } = req.query;
    const filter = { isAvailable: true };

    if (category && category !== "all") filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortBy = { createdAt: -1 };
    if (sort === "rating")     sortBy = { rating: -1 };
    if (sort === "price_asc")  sortBy = { price: 1 };
    if (sort === "price_desc") sortBy = { price: -1 };
    if (sort === "name")       sortBy = { name: 1 };

    const pageNum  = Number(page)  || 1;
    const limitNum = Number(limit) || 12;
    const skip     = (pageNum - 1) * limitNum;

    const total    = await ProductModel.countDocuments(filter);
    const pages    = Math.ceil(total / limitNum);
    const products = await ProductModel.find(filter).sort(sortBy).skip(skip).limit(limitNum);

    const productsWithDiscount = products.map((p) => {
      const discount = p.originalPrice && p.originalPrice > p.price
        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
        : 0;
      return { ...p.toObject(), discount };
    });

    res.json({ products: productsWithDiscount, pages, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function deleteProduct(req, res){
    if(!isAdmin(req)) return res.status(403).json({ message: "Access denied. Admins only"});
    try{
        await ProductModel.deleteOne({ productId: req.params.productId });
        res.status(200).json({ message: "Product deleted successfully"});
    } catch(error){
        res.status(500).json({ message: "Error deleting product", error });
    }
}

export async function updateProduct(req, res) {
    if(!isAdmin(req)) return res.status(403).json({ message: "Access denied. Admins only"});
    try{
        const data = {};
        if(!req.body.name) return res.status(400).json({ message: "Product name is required"});
        data.name = req.body.name;
        data.description = req.body.description || "";
        if(!req.body.price) return res.status(400).json({ message: "Product price is required"});
        data.price = req.body.price;
        data.originalPrice = req.body.originalPrice || req.body.price;
        data.category = req.body.category || "Others";
        data.image = req.body.image || "/images/default-product.png";
        data.isAvailable = req.body.isAvailable === false ? false : true;
        data.stock = req.body.stock || 0;

        await ProductModel.updateOne({ productId: req.params.productId }, data);
        res.status(200).json({ message: "Product updated successfully"});
    } catch(error){
        res.status(500).json({ message: "Error updating product", error });
    }
}

export async function getProductById(req, res){
    try{
        const product = await ProductModel.findOne({ productId: req.params.productId });
        if(!product) return res.status(404).json({ message: "Product not found"});
        if(!product.isAvailable && !isAdmin(req)) return res.status(404).json({ message: "Product not found"});
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({ message: "Error fetching product", error });
    }
}

export async function searchProducts(req, res){
    const query = req.params?.query || "";
    try{
        const products = await ProductModel.find({
            $or: [
                { name: { $regex: query, $options: "i" }},
                { description: { $regex: query, $options: "i" }},
            ],
            isAvailable: true
        });
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({ message: "Error searching products", error });
    }
}
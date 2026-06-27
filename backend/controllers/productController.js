import ProductModel from "../models/ProductModel.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {

    if(!isAdmin(req)){
        res.status(403).json({ message : "Access denied. Admins only"});
        return;
    }

    try{

        const existingProduct = await ProductModel.findOne({
            productId : req.body.productId
        });

        if(existingProduct){
            res.status(400).json({ message : "Product with given productId already exists"});
            return;
        }

        const data = {};

        data.productId = req.body.productId;

        if(req.body.name == null){
            res.status(400).json({ message : "Product name is required"});
            return;
        }

        data.name = req.body.name;
        data.description = req.body.description || ""

        if(req.body.price == null){
            res.status(400).json({message : "Product price is required"});
            return
        }

        data.price = req.body.price;
        data.originalPrice = req.body.originalPrice || req.body.price
        data.images = req.body.images || ["/images/default-product-1.png", "/images/default-product-2.png"]
        data.category = req.body.category || "Others"
        data.stock = req.body.stock || 0
        data.isAvailable = req.body.isAvailable || true
        

        const newProduct = new ProductModel(data);

        await newProduct.save();

        res.status(201).json({message : "Product created successfully", product: newProduct});

    

    } catch(error){
        res.status(500).json({ message : "Error creating product", error: error});
    }
}

export async function getProducts(req, res) {
        
        try{

            if(isAdmin(req)){
                const products = await ProductModel.find();
                res.status(200).json(products);
            } else {
                const products = await ProductModel.find({ isAvailable: true});
                res.status(200).json(products);
            }

        } catch(error){
            res.status(500).json({message : "Error fetching products", error:error})
        }
}

export async function deleteProduct(req, res){
    if(!isAdmin(req)){
        res.status(403).json({message: "Access denied. Admins only"});
        return;
    }
    try{

        const productId = req.params.productId;

        await ProductModel.deleteOne({productId});

        res.status(200).json({ message : "Product deleted successfully"});

    }catch(error) {
        res.status(500).json({message: "Error deleting product", error: error});
    }
}

export async function updateProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({ message : "Access denied. Admins only"});
        return;
    }

    try{

        const productId = req.params.productId;

        const data = {};
       
        if(req.body.name == null){
            res.status(400).json({ message : "Product name is required"});
            return;
        }

        data.name = req.body.name;
        data.description = req.body.description || ""

        if(req.body.price == null){
            res.status(400).json({message : "Product price is required"});
            return
        }

        data.price = req.body.price;
        data.originalPrice = req.body.originalPrice || req.body.price
        data.category = req.body.category || "Others"
        data.images = req.body.images || ["/images/default-product-1.png", "/images/default-product-2.png"]
        data.isAvailable = req.body.isAvailable || true
        data.stock = req.body.stock || 0

        await ProductModel.updateOne({productId: productId}, data);

        res.status(200).json({message : "Product updated successfully"});

    

    } catch(error){
        res.status(500).json({ message : "Error updating product", error: error});
    }
}

export async function getProductById(req, res){

    try{
        const productId = req.params.productId;
        const product = await ProductModel.findOne({productId: productId});

        if(product == null){
            res.status(404).json({message : "Product not found"});
            return;
        }

        if(!product.isAvailable){
            if(!isAdmin(req)){
                res.status(404).json({message : "Product not found"});
                return;
            }
        }
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({message : "Error fetching product", error : error});
    }

}

export async function searchProducts(req , res){

	const query = req.params?.query||"";

	try{

		const products = await ProductModel.find(
			{ 
				$or : [
					{ name : { $regex : query , $options : "i" } },
					{description : { $regex : query , $options : "i" } },
				],
				isAvailable : true				
			}
		)

		res.status(200).json(products);



	}catch(error){
		res.status(500).json({message : "Error searching products" , error : error});
	}

}



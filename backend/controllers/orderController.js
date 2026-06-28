import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";
import { isAdmin } from "./authController.js";

export async function createOrder(req, res) {
	
    if (!req.user == null) {
        console.log(req.user)
        res.status(401).json({ message: "Unauthorized. Please log in to place an order." });
        return;
    }

	try {
		const orderData = {
			orderId: "ORD000001",
            userId: req.user._id,
            name: req.body.name,
            items: [],
			shippingAddress: req.body.shippingAddress,
			paymentMethod: req.body.paymentMethod || "cash",
            total: 0,
            status: req.body.status || "Placed",
			email: req.body.email,
			phone: req.body.phone,
			
		};

        if(orderData.name == ""){
            orderData.name = req.user.name
        }
        if(orderData.shippingAddress == ""){
            res.status(400).json({ message : "Shipping address is required" })
            return
        }
        

		const lastOrder = await OrderModel.findOne().sort({ date: -1 });

		if (lastOrder != null) {
			const lastOrderId = lastOrder.orderId; 

			const lastOrderNumberInString = lastOrderId.replace("ORD", ""); 

			const lastOrderNumber = parseInt(lastOrderNumberInString);

			const newOrderNumber = lastOrderNumber + 1;

			const newOrderNumberInString = newOrderNumber.toString().padStart(6, "0");
			orderData.orderId = "ORD" + newOrderNumberInString;


		}

        for(let i = 0; i< req.body.items.length; i++){

            const item = req.body.items[i]

            const product = await ProductModel.findOne({ productId : item.productId })

            if(product == null){

                res.status(404).json({ message : "Product with id " + item.productId + " not found. Please remove it from your cart and try again." })
                return
            }

            if(product.isAvailable == false){
                res.status(404).json({ message : "Product with id " + item.productId + " is not available. Please remove it from your cart and try again." })
                return
            }

            orderData.items.push({
                productId : product.productId,
                name : product.name,
                price : product.price,
                originalPrice : product.originalPrice,
                image : product.image[0],
                quantity : item.quantity
            })

            orderData.total += product.price * item.quantity
        }
        
        const order = new OrderModel(orderData);
        await order.save();

        res.status(201).json({ message: "Order created successfully", orderId : orderData.orderId });

	} catch (error) {
		console.log("Error creating order", error);
		res.status(500).json({ message: "Error creating order", error: error });
	}
}

export async function getOrders(req,res){

    if (req.user == null) {
        res.status(401).json({ message: "Unauthorized. Please log in to view your orders." });
        return;
    }

    const pageSizeInString = req.params.pageSize || "10"

    const pageNumberInString = req.params.pageNumber || "1"

    const pageSize = parseInt(pageSizeInString)

    const pageNumber = parseInt(pageNumberInString)

    try{

        if(isAdmin(req)){

            const numberOfOrders = await OrderModel.countDocuments()

            const numberOfPages = Math.ceil(numberOfOrders / pageSize)

            const orders = await OrderModel.find().sort({ date : -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize)

            res.json({
                orders : orders,
                totalPages : numberOfPages
            })
        }else{
            const numberOfOrders = await OrderModel.countDocuments()

            const numberOfPages = Math.ceil(numberOfOrders / pageSize)

            const orders = await OrderModel.find({email : req.user.email}).sort({ date : -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize)

            res.json({
                orders : orders,
                totalPages : numberOfPages
            })
        }

}   catch(error){
        console.log("Error fetching orders", error)
        res.status(500).json({ message : "Error fetching orders", error : error })
    }

}

export async function updateOrderStatusAndNotes(req,res){

    if(isAdmin(req)){

        const orderId = req.params.orderId
        try{

            await OrderModel.updateOne({ orderId : orderId }, { status : req.body.status, notes : req.body.notes })

            res.json({ message : "Order status and notes updated successfully" })

        }catch(error){
            console.log("Error updating order status and notes", error)
            res.status(500).json({ message : "Error updating order status and notes", error : error })
            return
        }       

    }
    else{
        res.status(403).json({ message : "Forbidden. Only admins can update order status and notes." })
    }
}

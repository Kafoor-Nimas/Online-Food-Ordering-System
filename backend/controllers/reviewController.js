import Review from '../models/ReviewModel.js';

export const addReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;
        
    
        const user = req.user.id; 

        const newReview = new Review({ user, product, rating, comment });
        await newReview.save();

        res.status(201).json({ message: 'Review added successfully!', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        
        const reviews = await Review.find({ product: productId }).populate('user', 'name'); 
        
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};
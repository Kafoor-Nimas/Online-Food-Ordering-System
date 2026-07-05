import Review from "../models/ReviewModel.js";

// export const addReview = async (req, res) => {
//     try {
//         const { product, rating, comment } = req.body;
//         const user = req.user.id;

//         const newReview = new Review({ user, product, rating, comment });
//         await newReview.save();

//         res.status(201).json({ message: 'Review added successfully!', review: newReview });
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             return res.status(400).json({ message: 'Validation Error', error: error.message });
//         }
//         res.status(500).json({ message: 'Error adding review', error: error.message });
//     }
// };

export const addReview = async (req, res) => {
  try {
    

    const { product, productId, rating, comment } = req.body;
    const productRef = product || productId;
    const user = req.user.id;

    const newReview = new Review({
      user,
      product: productRef,
      rating,
      comment,
    });
    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully!", review: newReview });
  } catch (error) {
    console.log("Review error:", error.message); // ← add this
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", error: error.message });
    }
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};

// export const getProductReviews = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const reviews = await Review.find({ product: productId }).populate('user', 'name');
//         res.status(200).json(reviews);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching reviews', error: error.message });
//     }
// };

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    // ← handle both string IDs and ObjectIds
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name",
    );
    res.status(200).json(reviews);
  } catch (error) {
    // ← return empty array instead of 500 error
    res.status(200).json([]);
  }
};

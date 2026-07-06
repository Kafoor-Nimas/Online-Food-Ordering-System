import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Star, Send } from "lucide-react"; 

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0); 
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";
        const response = await fetch(`${baseUrl}/reviews/${productId}`);
        const data = await response.json();
        if (response.ok) {
          setReviews(data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  // Review Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");

    if (!token) {
      return toast.error("Please login to submit a review!");
    }

    if (!comment.trim()) {
      return toast.error("Please write a comment!");
    }

    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${baseUrl}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product: productId, rating, comment }),
      });

      if (response.ok) {
        // Backend
        const savedData = await response.json();
        console.log("✅ Saved Review in DB:", savedData);

        toast.success("Review added successfully!");
        setComment("");
        setRating(5);
      
        // get new reviews
        const updatedRes = await fetch(`${baseUrl}/reviews/${productId}`, {
        cache: 'no-store'});
        const updatedData = await updatedRes.json();
        console.log("📥 Fetched Data from DB:", updatedData);
        
        setReviews(updatedData);
      } else {
        toast.error("Failed to add review.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
      <h2 className="text-2xl font-bold text-app-green mb-6">Customer Reviews</h2>

      {/* Review Modern UI */}
      <div className="bg-app-cream/30 p-5 sm:p-6 rounded-2xl mb-8 border border-gray-50">
        <h3 className="text-lg font-semibold text-zinc-700 mb-4">Write a Review</h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Interactive Star Rating */}
          <div>
            <label className="block text-sm font-medium text-app-text-light mb-2">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-8 cursor-pointer transition-all duration-200 hover:scale-110 ${
                    star <= (hoverRating || rating)
                      ? "text-app-warning fill-app-warning" 
                      : "text-gray-200 fill-transparent"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              ))}
              <span className="ml-3 text-sm font-medium text-app-text-light">
                {rating} out of 5
              </span>
            </div>
          </div>

          {/* Modern Text Area */}
          <div>
            <label className="block text-sm font-medium text-app-text-light mb-2">
              Your Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this product? Share your experience..."
              rows="4"
              className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-app-orange/30 focus:border-app-orange transition-all duration-300 resize-none text-zinc-700"
            />
          </div>

          {/* Submit Button - Theme Orange */}
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-app-orange text-white text-sm font-semibold rounded-xl hover:bg-app-orange-dark active:scale-95 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  Submit Review <Send className="size-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/*  Modern Cards */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-700 mb-4 border-b border-gray-100 pb-2">
          Recent Reviews ({reviews.length})
        </h3>
        
        {reviews.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <p className="text-app-text-light">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {reviews.map((rev, index) => (
              <div 
                key={index} 
                className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* User Avatar Placeholder */}
                    <div className="size-10 rounded-full bg-app-cream-dark flex items-center justify-center text-app-green font-bold text-lg">
                      {rev.user?.name ? rev.user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-800 text-sm">
                        {rev.user?.name || "Awesome Customer"}
                      </p>
                      {/* Read Only Stars */}
                      <div className="flex gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-3 ${
                              star <= rev.rating
                                ? "text-app-warning fill-app-warning"
                                : "text-gray-200 fill-transparent"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pl-13">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
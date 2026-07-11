import { useParams } from "react-router-dom";
import ReviewSection from "../components/ReviewSection";
import { useEffect, useState } from "react";
import api from "../config/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen bg-app-cream pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* product details */}
        {product ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-8 items-center">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[300px] object-cover rounded-lg shadow-sm"
              />
            </div>
            {/* Name and Price */}
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-app-green mb-3">
                {product.name}
              </h1>
              <p className="text-2xl text-app-orange font-semibold mb-4">
                Rs. {product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description ||
                  "Experience the best taste with our premium ingredients and authentic recipes made just for you."}
              </p>

              <div className="inline-block bg-app-cream-dark px-4 py-2 rounded-lg text-sm text-app-text font-medium">
                Category: {product.category}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 text-center">
            <p className="text-app-text-light">Loading product details...</p>
          </div>
        )}

        {/* Review Section */}
        <ReviewSection productId={id} />
      </div>
    </div>
  );
};

export default ProductDetails;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import ProductCard from "./ProductCard";
import { food_list_home } from "../assets/assets";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const formatted = food_list_home.slice(0, 10).map((p) => ({
      ...p,
      rating: 4.5,
    }));
    setProducts(formatted);
  }, []);

  return (
    <section className="pb-8 sm:pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">
              Popular Products
            </h2>
            <p className="text-sm text-app-text-light mt-1">
              Top-rated products this season
            </p>
          </div>
          <Link
            to={"/menu"}
            className="text-sm font-semibold text-app-orange hover:text-app-orange-dark flex items-center gap-1 transition-colors"
          >
            View All <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 xl:gap-8">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;

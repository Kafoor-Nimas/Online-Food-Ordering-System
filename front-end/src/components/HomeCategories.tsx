import { Link } from "react-router-dom";
import { categoriesData } from "../assets/assets";

const HomeCategories = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            Explore our menu
          </h2>
          <p className="text-sm text-app-text-light mt-1">
            Something delicious for every craving
          </p>
        </div>

        <div className="flex items-center mt-6 sm:mt-8 overflow-x-scroll no-scrollbar gap-1 sm:gap-2">
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              to={`/menu?category=${cat.slug}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-center gap-2 sm:gap-3 p-2 sm:p-4 shrink-0"
            >
              <div className="size-16 sm:size-20 md:size-24 lg:size-26 p-1 sm:p-2 rounded-2xl overflow-hidden bg-orange-100 group-hover:ring-2 ring-orange-300/75 transition-all">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain transition-all"
                />
              </div>
              <span className="text-xs font-medium text-zinc-600 text-center leading-tight w-14 sm:w-16 md:w-20">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;

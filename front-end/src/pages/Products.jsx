import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, Home, SlidersHorizontal, XIcon } from "lucide-react";
import FilterPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";
import { categories_Data, food_list } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const { searchQuery } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const organic = searchParams.get("organic") || "";

  const totalPages = 1;
  const page = 1;

  useEffect(() => {
    let filtered = [...food_list];

    // search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(String(searchQuery).toLowerCase()),
      );
    }
    if (category)
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    if (minPrice)
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    if (maxPrice)
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    if (sort === "price_asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") filtered.sort((a, b) => b.price - a.price);
    if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

    setProducts(filtered);
  }, [category, sort, minPrice, maxPrice, searchQuery]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams({});
  const activeCategory = categories_Data.find((c) => c.slug === category);
  const hasFilters = category || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-app-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrump */}
        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to={"/"} className="hover:text-app-green transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">
            {activeCategory ? activeCategory.name : "All  Products"}
          </span>
        </nav>

        <div className="flex gap-8 xl:gap-10">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-4 sticky top-24">
              <FilterPanel
                categories={categories_Data}
                category={category}
                organics={organic}
                minPrice={minPrice}
                maxPrice={maxPrice}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-app-green">
                  {activeCategory ? activeCategory.name : "All Products"}
                </h1>
                <p className="text-sm text-app-text-light mt-0.5">
                  {products.length} products found
                </p>
              </div>

              <div className="flex flex-col lg:items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-xl border border-app-border hover:bg-app-cream transition-colors"
                >
                  <SlidersHorizontal className="size-4" /> Filters
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-app-border focus:border-app-green outline-none cursor-pointer"
                  >
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A to Z</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-light pointer-events-none" />
                </div>
              </div>
            </div>
            {/* Product Grid */}
            {/* {loading ? (
              <Loading />
            ) :  */}
            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-app-green mb-2">
                  No products found
                </p>
                <p className="text-sm text-app-text-light mb-4">
                  Try adjusting your filter or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 text-sm font-medium bg-app-green text-white rounded-xl hover:bg-app-green-light transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
            {/* } */}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex-center gap-2 mt-16">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      updateFilter("page", String(i + 1));
                      scrollTo(0, 0);
                    }}
                    className={`size-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? "bg-app-green text-white " : "bg-white text-app-text-light hover:bg-app-cream"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-in-up">
            <div className="flex items-center justify-between p-4 border-b border-app-border">
              <h3 className="text-lg font-semibold text-app-green">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-app-cream rounded-lg"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="p-4">
              <FilterPanel
                categories={categories_Data}
                category={category}
                organics={organic}
                minPrice={minPrice}
                maxPrice={maxPrice}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;

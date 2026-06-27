import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HomeCategories from "../components/HomeCategories";
import PopularProducts from "../components/PopularProducts";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Features />
        <HomeCategories />
        <PopularProducts />
      </div>
    </div>
  );
};

export default Home;

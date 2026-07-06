import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../../utils/mediaUpload";

export default function AdminAddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("piece");
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  async function handleAddProduct() {
    try {
      const token = localStorage.getItem("auth_token");

      if (token == null) {
        toast.error("You must be logged in to add a product");
        window.location.href = "/login";
        return;
      }

      const fileUploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        fileUploadPromises[i] = uploadFile(files[i]);
      }

      const imageURLs = await Promise.all(fileUploadPromises);

      await axios.post(
        import.meta.env.VITE_BASE_URL + "/products",
        {
          productId,
          name,
          description,
          price,
          originalPrice,
          category,
          unit,
          rating,
          reviewCount,
          isAvailable,

          image: imageURLs[0], // send a single image URL
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {

    console.log(err.response);

    console.log(err.response?.data);

    toast.error(
        err.response?.data?.message ||
        "Failed to add product"
    );

}
  }

  return (
    <div className="w-full h-full flex flex-col bg-app-cream rounded-2xl shadow overflow-hidden">
      <h1 className="w-full text-xl sm:text-2xl lg:text-3xl font-bold text-app-text sticky top-0 z-10 bg-white/95 backdrop-blur px-4 sm:px-6 py-4 sm:py-5 border-b border-app-border">
        Add New Food Item
      </h1>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-5">
          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Product ID :
            </label>
            <input
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
              type="text"
              placeholder="Ex: ID001"
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Name :
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Ex: Laptop"
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Description :
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Ex: Laptop"
              rows={4}
              className="border border-app-border rounded-lg p-3.5 text-sm sm:text-base text-app-text bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Price :
            </label>
            <input
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="text"
              placeholder="Ex: 2500"
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Original Price :
            </label>
            <input
              value={originalPrice}
              onChange={(e) => {
                setOriginalPrice(e.target.value);
              }}
              type="text"
              placeholder="Ex: 2800"
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Images :
            </label>
            <input
              multiple
              type="file"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3 py-2 text-sm text-app-text-light bg-white file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-primary file:text-white file:text-sm file:font-medium hover:file:bg-primary-dull file:cursor-pointer cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Category :
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            >
              <option value="Others">Others</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwiche">Sandwiche</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Biriyani">Biriyani</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Unit :
            </label>
            <input
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
              type="text"
              placeholder="Ex: kg"
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Rating :
            </label>
            <input
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
              type="text"
              placeholder="Ex: 4.5"
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Review Count :
            </label>
            <input
              value={reviewCount}
              onChange={(e) => {
                setReviewCount(e.target.value);
              }}
              type="text"
              placeholder="Ex: 100"
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm text-app-text mb-1.5 ml-0.5">
              Is Available :
            </label>
            <select
              value={isAvailable}
              onChange={(e) => {
                setIsAvailable(e.target.value);
              }}
              className="border border-app-border rounded-lg h-11 sm:h-12 px-3.5 text-sm sm:text-base text-app-text bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full sticky bottom-0 bg-white border-t border-app-border rounded-b-2xl flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 p-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-gray-200 text-app-text font-semibold px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleAddProduct}
          className="bg-primary text-white font-semibold px-6 py-2.5 sm:py-3 rounded-lg hover:bg-primary-dull transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

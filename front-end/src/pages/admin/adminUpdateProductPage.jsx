import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../../utils/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminUpdateProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [originalPrice, setOriginalPrice] = useState(
    location.state.originalPrice,
  );
  const [category, setCategory] = useState(location.state.category);
  const [unit, setUnit] = useState(location.state.unit);
  const [rating, setRating] = useState(location.state.rating);
  const [reviewCount, setReviewCount] = useState(location.state.reviewCount);
  const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
  const [files, setFiles] = useState(location.state.files);
  const navigate = useNavigate();

  async function handleUpdateProduct() {
    try {
      const token = localStorage.getItem("auth_token");

      if (token == null) {
        toast.error("You must be logged in to update a product");
        window.location.href = "/login";
        return;
      }

      const fileUploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        fileUploadPromises[i] = uploadFile(files[i]);
      }

      let imageURLs = await Promise.all(fileUploadPromises);

      if (imageURLs.length == 0) {
        imageURLs = location.state.images;
      }

      await axios.put(
        import.meta.env.VITE_BASE_URL + "/products/" + productId,
        {
          name: name,
          description: description,
          price: price,
          originalPrice: originalPrice,
          images: imageURLs,
          category: category,
          unit: unit,
          rating: rating,
          reviewCount: reviewCount,
          isAvailable: isAvailable,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update product");
      return;
    }
  }

  const inputClass =
    "w-full border border-app-border rounded-xl h-11 px-3.5 bg-white text-app-text placeholder:text-app-text-light/60 focus:outline-none focus:ring-2 focus:ring-app-orange/30 focus:border-app-orange transition-colors";
  const labelClass =
    "text-xs font-semibold tracking-wide text-app-text-light uppercase mb-1.5";

  return (
    <div className="w-full h-full flex flex-col bg-app-cream">
      <div className="w-full px-8 pt-8 pb-5 shrink-0">
        <p className="text-xs font-semibold tracking-[0.2em] text-app-orange uppercase mb-1">
          Inventory
        </p>
        <h1 className="text-2xl font-semibold text-app-green">Edit Product</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-8">
        <div className="w-full bg-white rounded-2xl shadow-lg shadow-app-green/5 border border-app-border p-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="flex flex-col">
              <label className={labelClass}>Product ID</label>
              <input
                value={productId}
                disabled
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
                type="text"
                placeholder="Ex: ID001"
                className={`${inputClass} bg-app-cream-dark text-app-text-light cursor-not-allowed`}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Ex: Chicken Sandwich"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col sm:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Ex: Food provides essential nutrients for overall health and well-being"
                rows={3}
                className={`${inputClass} h-auto py-2.5 resize-none`}
              />
            </div>

            <div className="flex flex-col sm:col-span-2">
              <label className={labelClass}>Images</label>
              <input
                multiple
                type="file"
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                className="w-full border border-dashed border-app-border rounded-xl px-3.5 py-3 bg-app-cream/60 text-sm text-app-text-light file:mr-4 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:bg-app-orange file:text-white file:text-xs file:font-semibold hover:file:bg-app-orange-dark file:cursor-pointer cursor-pointer transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Price</label>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="text"
                placeholder="Ex: 5000"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Original Price</label>
              <input
                value={originalPrice}
                onChange={(e) => {
                  setOriginalPrice(e.target.value);
                }}
                type="text"
                placeholder="Ex: 60000"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className={`${inputClass} appearance-none`}
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
              <label className={labelClass}>Unit</label>
              <input
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                type="text"
                placeholder="Ex: 60000"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Rating</label>
              <input
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                type="text"
                placeholder="Ex: 60000"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Review Count</label>
              <input
                value={reviewCount}
                onChange={(e) => {
                  setReviewCount(e.target.value);
                }}
                type="text"
                placeholder="Ex: 60000"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Is Available</label>
              <select
                value={isAvailable}
                onChange={(e) => {
                  setIsAvailable(e.target.value);
                }}
                className={`${inputClass} appearance-none`}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="h-6"></div>
      </div>

      <div className="w-full shrink-0 bg-white border-t border-app-border flex justify-end items-center gap-3 px-8 py-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-app-cream-dark text-app-text font-semibold px-6 py-2.5 rounded-xl hover:bg-app-border transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateProduct}
          className="bg-app-orange text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-app-orange-dark shadow-md shadow-app-orange/20 transition-colors"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}

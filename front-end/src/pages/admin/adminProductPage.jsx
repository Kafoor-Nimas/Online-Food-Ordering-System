import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../components/Loading';
import axios from 'axios';
import { CiEdit } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';

export default function AdminProductPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

//         const sampleProducts = [
//   {
//     _id: "1",
//     productId: "P001",
//     name: "Cheese Burger",
//     description: "Juicy beef burger with cheddar cheese, lettuce and tomato.",
//     price: 8.99,
//     category: "Burger",
//     unit: "piece",
//     rating: 4.8,
//     images: [
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
//     ],
//     isAvailable: true,
//   },
//   {
//     _id: "2",
//     productId: "P002",
//     name: "Pepperoni Pizza",
//     description: "Large pizza topped with pepperoni and mozzarella.",
//     price: 14.99,
//     category: "Pizza",
//     unit: "piece",
//     rating: 4.9,
//     images: [
//       "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300"
//     ],
//     isAvailable: true,
//   },
//   {
//     _id: "3",
//     productId: "P003",
//     name: "Chicken Fried Rice",
//     description: "Fresh fried rice with chicken, vegetables and egg.",
//     price: 10.50,
//     category: "Rice",
//     unit: "plate",
//     rating: 4.5,
//     images: [
//       "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300"
//     ],
//     isAvailable: true,
//   },
//   {
//     _id: "4",
//     productId: "P004",
//     name: "French Fries",
//     description: "Golden crispy fries served with ketchup.",
//     price: 4.99,
//     category: "Snacks",
//     unit: "box",
//     rating: 4.2,
//     images: [
//       "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300"
//     ],
//     isAvailable: false,
//   },
//   {
//     _id: "5",
//     productId: "P005",
//     name: "Chocolate Milkshake",
//     description: "Creamy chocolate milkshake topped with whipped cream.",
//     price: 5.99,
//     category: "Drinks",
//     unit: "glass",
//     rating: 4.7,
//     images: [
//       "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300"
//     ],
//     isAvailable: true,
//   },
//   {
//     _id: "6",
//     productId: "P006",
//     name: "Caesar Salad",
//     description: "Fresh lettuce with parmesan cheese and Caesar dressing.",
//     price: 7.50,
//     category: "Salad",
//     unit: "bowl",
//     rating: 4.4,
//     images: [
//       "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300"
//     ],
//     isAvailable: true,
//   },
// ];

    
    useEffect(() => {
        if(loading){
            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_BASE_URL + "/products", {
                headers: {
                    Authorization: "Bearer " + token
                },
            })
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                //setProducts(sampleProducts);
                setLoading(false);
            });
        }
    }, [loading]);


    return(
        <div className="w-full h-full overflow-y-auto bg-app-cream">

            <div className="w-full px-8 pt-8 pb-4 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-app-orange uppercase mb-1">Inventory</p>
                    <h1 className="text-2xl font-semibold text-app-green">Products</h1>
                </div>
                {!loading && (
                    <div className="hidden sm:flex items-center gap-2 bg-white border border-app-border rounded-full px-4 py-2 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-app-success"></span>
                        <span className="text-sm text-app-text-light">{products.length} {products.length === 1 ? "item" : "items"} listed</span>
                    </div>
                )}
            </div>

            <div className="w-full px-8 pb-28">
              <div className="w-full bg-white rounded-2xl shadow-lg shadow-app-green/5 border border-app-border overflow-hidden">
               {loading ? (
                   <div className="w-full py-24 flex justify-center items-center">
                       <LoadingComponent />
                   </div>
               ) : products.length === 0 ? (
                   <div className="w-full py-24 flex flex-col justify-center items-center text-center">
                       <p className="text-lg font-medium text-app-green">No products yet</p>
                       <p className="text-sm text-app-text-light mt-1">Add your first product to see it listed here.</p>
                   </div>
               ) : (
                <div className="overflow-x-auto">
                   <table className="w-full border-collapse text-sm">
    
    {/* Table Head */}
    <thead>
      <tr className="bg-app-green text-app-cream">
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Product ID</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Name</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase">Description</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Price</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Category</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Unit</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Rating</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Image</th>
        <th className="px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Available</th>
        <th className="px-5 py-4 text-center text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Actions</th>
      </tr>
    </thead>

    {/* Table Body */}
    <tbody className="text-app-text divide-y divide-app-border">
      {products.map((item, index) => {
        return (
          <tr key={index}
            className="odd:bg-app-cream/40 hover:bg-app-orange/5 transition-colors">

            <td className="px-5 py-4 whitespace-nowrap text-app-text-light">#{item.productId || index + 1}</td>
            <td className="px-5 py-4 font-medium text-app-green whitespace-nowrap">{item.name}</td>
            <td className="px-5 py-4 max-w-xs truncate text-app-text-light">{item.description}</td>
            <td className="px-5 py-4 font-semibold text-app-green whitespace-nowrap">${item.price}</td>
            <td className="px-5 py-4 whitespace-nowrap">
              <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-app-green-lighter/10 text-app-green-light">
                {item.category}
              </span>
            </td>
            <td className="px-5 py-4 whitespace-nowrap text-app-text-light">{item.unit}</td>
            <td className="px-5 py-4 whitespace-nowrap">
              <span className="inline-flex items-center gap-1 text-app-warning font-medium">
                ★ {item.rating || 0}
              </span>
            </td>

            {/* Image */}
            <td className="px-5 py-4">
              {item.images && item.images[0] ? (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-xl border border-app-border shadow-sm"
                />
              ) : (
                <span className="text-app-text-light text-xs italic">No image</span>
              )}
            </td>

            {/* Availability Badge */}
            <td className="px-5 py-4 whitespace-nowrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-semibold ${
                  item.isavailable || item.isAvailable
                    ? "bg-app-success/10 text-app-success"
                    : "bg-app-error/10 text-app-error"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  item.isavailable || item.isAvailable ? "bg-app-success" : "bg-app-error"
                }`}></span>
                {item.isavailable || item.isAvailable ? "Available" : "Not Available"}
              </span>
            </td>

            <td className="px-5 py-4">
              <div className="flex justify-center items-center">
                <Link
                  to="/admin/update-product"
                  state={item}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-app-text-light hover:text-app-orange hover:bg-app-orange/10 transition-colors" title="Edit product">
                  <CiEdit className="text-lg"/>
                </Link>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>

  </table>
  </div>
               )}
</div>
</div>

             <Link
               to="/admin/add-product"
               className="group text-white bg-app-orange hover:bg-app-orange-dark w-14 h-14 flex justify-center items-center text-2xl rounded-2xl hover:rounded-full fixed bottom-10 right-10 shadow-lg shadow-app-orange/30 transition-all duration-300"
               title="Add product"
             >
                <FaPlus className="transition-transform duration-300 group-hover:rotate-90"/>
             </Link>
        </div>
    )
}
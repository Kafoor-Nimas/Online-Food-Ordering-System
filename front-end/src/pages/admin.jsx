import React, { useState } from "react";
import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";

import { FiMenu, FiUsers, FiShoppingBag, FiPackage, FiX, FiLogOut } from "react-icons/fi";

import AdminProductPage from "./admin/adminProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menu = [
    {
      title: "Products",
      icon: <FiPackage size={20} />,
      path: "/admin/products",
    },
    {
      title: "Orders",
      icon: <FiShoppingBag size={20} />,
      path: "/admin/orders",
    },
    {
      title: "Users",
      icon: <FiUsers size={20} />,
      path: "/admin/users",
    },
  ];

   function logout(){

        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}

      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-5 lg:px-8">

        <div className="flex items-center gap-3">

          {/* Mobile Menu */}

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>

          <Link
            to="/admin"
            className="text-2xl font-bold text-orange-500"
          >
            🍕 FoodOrder
          </Link>

        </div>

        <button onClick={() => {logout();}}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
        >
          <FiLogOut />
          Logout
        </button>

      </header>

      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-white shadow-lg z-50 transform transition-transform duration-300

        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }

        lg:translate-x-0`}
      >

        {/* Mobile Close */}

        <div className="lg:hidden flex justify-end p-4">

          <button onClick={() => setSidebarOpen(false)}>
            <FiX size={24} />
          </button>

        </div>

        <div className="px-6">

          <h2 className="text-xl font-bold mb-8 text-gray-800">
            Admin Panel
          </h2>

          <nav className="space-y-2">

            {menu.map((item) => (

              <NavLink
                key={item.title}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition

                  ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-orange-100"
                  }`
                }
              >
                {item.icon}

                {item.title}

              </NavLink>

            ))}

          </nav>

        </div>

      </aside>

      {/* ================= CONTENT ================= */}

      <main className="pt-20 lg:ml-72 p-6">

        <Routes>

          {/* Dashboard */}

          <Route
            path="/"
            element={
              <div>

                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                  Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  {/* Products */}

                  <div className="bg-white rounded-2xl shadow p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-gray-500">
                          Products
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                          0
                        </h2>

                      </div>

                      <div className="bg-orange-100 p-4 rounded-full">

                        <FiPackage
                          size={30}
                          className="text-orange-500"
                        />

                      </div>

                    </div>

                  </div>

                  {/* Orders */}

                  <div className="bg-white rounded-2xl shadow p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-gray-500">
                          Orders
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                          0
                        </h2>

                      </div>

                      <div className="bg-orange-100 p-4 rounded-full">

                        <FiShoppingBag
                          size={30}
                          className="text-orange-500"
                        />

                      </div>

                    </div>

                  </div>

                  {/* Users */}

                  <div className="bg-white rounded-2xl shadow p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-gray-500">
                          Users
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                          0
                        </h2>

                      </div>

                      <div className="bg-orange-100 p-4 rounded-full">

                        <FiUsers
                          size={30}
                          className="text-orange-500"
                        />

                      </div>

                    </div>

                  </div>

                </div>

                <div className="bg-white rounded-2xl shadow mt-8 p-8">

                  <h2 className="text-2xl font-semibold mb-3">
                    Welcome 👋
                  </h2>

                  <p className="text-gray-500">
                    Manage your products, users, and customer orders from
                    this dashboard.
                  </p>

                </div>

              </div>
            }
          />

          {/* Products */}

          <Route
            path="/products"
            element={<AdminProductPage />}
          />

          <Route
            path="/add-product"
            element={<AdminAddProductPage />}
          />

          <Route
            path="/update-product/:id"
            element={<AdminUpdateProductPage />}
          />

          {/* Orders */}

          <Route
            path="/orders"
            element={<AdminOrdersPage />}
          />

          {/* Users */}

          <Route
            path="/users"
            element={<AdminUsersPage />}
          />

        </Routes>

      </main>

    </div>
  );
}
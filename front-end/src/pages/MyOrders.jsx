import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "Rs.";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data.orders || []);
      } catch (error) {
        toast.error("Unable to load orders. Please log in and try again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-app-cream pt-28 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-app-text">My orders</h1>
          <p className="text-sm text-app-text-light mt-2">
            Review your past orders and delivery details.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl border border-app-border p-8 shadow-sm text-center text-app-text-light">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-app-border p-8 shadow-sm text-center">
            <p className="text-lg font-semibold text-app-text mb-2">No orders found</p>
            <p className="text-sm text-app-text-light">
              Place an order first and it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-3xl border border-app-border p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-app-text-light">Order ID</p>
                    <p className="text-lg font-semibold text-app-text">
                      {order.orderId || order._id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-app-text-light">Status</p>
                    <p className="font-semibold text-app-orange">{order.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-app-text-light">Date</p>
                    <p className="font-medium text-app-text">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-app-text-light">Total</p>
                    <p className="font-semibold text-app-text">
                      {currency}
                      {(order.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl bg-app-cream p-4">
                    <h3 className="text-sm font-semibold text-app-text mb-2">Shipping address</h3>
                    <p className="text-sm text-app-text-light leading-relaxed">
                      {order.shippingAddress}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-app-cream p-4">
                    <h3 className="text-sm font-semibold text-app-text mb-2">Items</h3>
                    <p className="text-sm text-app-text-light">
                      {Array.isArray(order.items) ? order.items.length : 0} item{order.items?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

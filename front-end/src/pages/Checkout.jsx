import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "Rs.";

  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [saveInfo, setSaveInfo] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please log in to place an order.");
      navigate("/login");
      return;
    }

    if (!address.trim()) {
      toast.error("Please provide a shipping address.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please provide a phone number.");
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty.");
      navigate("/menu");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      image: item.image,
    }));

    const payload = {
      shippingAddress: address,
      phone,
      paymentMethod,
      items: orderItems,
    };

    try {
      setSubmitting(true);
      await api.post("/orders", payload);

      if (saveInfo) {
        await updateProfile({
          name: fullName,
          address,
          phone,
        });
      }

      clearCart();
      toast.success("Order placed successfully.");
      navigate("/my-orders");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to place order. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-app-cream pt-28 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-app-border p-8 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-app-text mb-3">
              No items to checkout
            </h1>
            <p className="text-sm text-app-text-light mb-6">
              Add items to the cart first, then return here to complete your
              purchase.
            </p>
            <button
              onClick={() => navigate("/menu")}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-app-orange text-white text-sm font-semibold hover:bg-app-orange-dark transition"
            >
              Browse menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-cream pt-28 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-app-text">Checkout</h1>
          <p className="text-sm text-app-text-light mt-2">
            Confirm your order details and shipping information.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr]">
          <div className="bg-white rounded-3xl border border-app-border p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-app-text mb-5">
              Shipping details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-app-text">
                    Full name
                  </span>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-app-border bg-app-cream px-4 py-3 text-sm text-app-text outline-none focus:border-app-orange focus:ring-2 focus:ring-app-orange/20"
                    placeholder="Enter your full name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-app-text">
                    Email address
                  </span>
                  <input
                    value={email}
                    readOnly
                    className="mt-2 w-full rounded-2xl border border-app-border bg-app-cream px-4 py-3 text-sm text-app-text outline-none focus:border-app-orange focus:ring-2 focus:ring-app-orange/20"
                    placeholder="Your email"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-app-text">
                  Phone number
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-app-border bg-app-cream px-4 py-3 text-sm text-app-text outline-none focus:border-app-orange focus:ring-2 focus:ring-app-orange/20"
                  placeholder="Enter your phone number"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-app-text">
                  Shipping address
                </span>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 w-full min-h-[120px] rounded-3xl border border-app-border bg-app-cream px-4 py-3 text-sm text-app-text outline-none focus:border-app-orange focus:ring-2 focus:ring-app-orange/20 resize-none"
                  placeholder="Enter your delivery address"
                  required
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-app-text">
                    Payment method
                  </span>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-app-border bg-app-cream px-4 py-3 text-sm text-app-text outline-none focus:border-app-orange focus:ring-2 focus:ring-app-orange/20"
                  >
                    <option value="cash">Cash on delivery</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                  </select>
                </label>

                <label className="flex items-center gap-3 rounded-3xl border border-app-border bg-app-cream px-4 py-4">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="h-4 w-4 rounded border-app-border text-app-orange focus:ring-app-orange"
                  />
                  <span className="text-sm text-app-text">
                    Save address for future orders
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-app-orange px-6 py-3 text-white text-sm font-semibold hover:bg-app-orange-dark transition disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => window.scrollTo(0, 0)}
              >
                {submitting ? "Placing order..." : "Place order"}
              </button>
            </form>
          </div>

          <aside className="bg-white rounded-3xl border border-app-border p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-app-text mb-5">
              Order summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-3xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-app-text">{item.name}</p>
                    <p className="text-sm text-app-text-light">
                      {item.quantity} × {currency}
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-app-text">
                    {currency}
                    {(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-app-border pt-5 space-y-3 text-sm text-app-text-light">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-app-text">
                <span>Total</span>
                <span>
                  {currency}
                  {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

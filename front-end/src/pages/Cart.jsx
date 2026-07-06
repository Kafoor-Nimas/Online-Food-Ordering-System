import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    totalAmount,
    cartQuantity,
  } = useCart();
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "Rs.";

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-app-cream pt-28 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-app-border p-8 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-app-text mb-3">Your cart is empty</h1>
            <p className="text-sm text-app-text-light mb-6">
              Add your favorite items to the cart and continue to checkout.
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
          <h1 className="text-3xl font-semibold text-app-text">Shopping Cart</h1>
          <p className="text-sm text-app-text-light mt-2">
            {cartQuantity} item{cartQuantity > 1 ? "s" : ""} in your cart.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-app-border p-5 shadow-sm flex flex-col md:flex-row gap-4 items-start"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="h-32 w-full md:w-32 rounded-3xl object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-app-text mb-1">
                    {item.name}
                  </h2>
                  <p className="text-sm text-app-text-light mb-4">
                    {currency}
                    {item.price.toFixed(2)} / {item.unit || "piece"}
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2 rounded-full border border-app-border bg-app-cream px-3 py-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white border border-app-border text-app-text font-semibold hover:bg-app-cream transition"
                      >
                        -
                      </button>
                      <span className="min-w-[36px] text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-app-border text-app-text font-semibold hover:bg-app-cream transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-app-orange hover:text-app-orange-dark"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-lg font-semibold text-app-text">
                    {currency}
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-white rounded-3xl border border-app-border p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-app-text mb-4">Order summary</h2>
            <div className="space-y-3 text-sm text-app-text-light">
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
            </div>

            <div className="mt-5 border-t border-app-border pt-5">
              <div className="flex items-center justify-between text-base font-semibold text-app-text">
                <span>Total</span>
                <span>
                  {currency}
                  {totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 px-5 py-3 rounded-full bg-app-orange text-white font-semibold hover:bg-app-orange-dark transition"
            >
              Proceed to checkout
            </button>
            <Link
              to="/menu"
              className="block text-center mt-4 text-sm text-app-text-light hover:text-app-orange transition"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;

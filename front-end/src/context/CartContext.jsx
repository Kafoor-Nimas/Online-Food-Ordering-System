import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "cart_items";

const getStoredCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getStoredCart());

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to persist cart items", error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const productId = product._id || product.id || product.productId;
    if (!productId) return;

    setCartItems((current) => {
      const existing = current.find((item) => item.id === productId);
      if (existing) {
        return current.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...current,
        {
          id: productId,
          name: product.name,
          price: product.price,
          images: product.images,
          unit: product.unit,
          quantity,
        },
      ];
    });
  };

  const updateItemQuantity = (productId, quantity) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, Number(quantity)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * Number(item.price || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        clearCart,
        cartQuantity,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

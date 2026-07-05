import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderTracker from "../components/OrderTracker";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load order");

      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading order...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details-page">
      <h1>Order Details</h1>

      <div className="order-summary">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Shipping:</strong> {order.shippingAddress}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Subtotal:</strong> Rs. {order.subtotal}</p>
        <p><strong>Delivery Fee:</strong> Rs. {order.deliveryFee}</p>
        <p><strong>Total:</strong> Rs. {order.total}</p>
      </div>

      <OrderTracker status={order.status} />

      <div className="order-items">
        <h2>Items</h2>
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.image} alt={item.name} width="80" />
            <div>
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: Rs. {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
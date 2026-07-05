import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminOrderStatus from "../../components/AdminOrderStatus";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
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
    <div>
      <h1>Admin Order Details</h1>

      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Shipping:</strong> {order.shippingAddress}</p>
      <p><strong>Total:</strong> Rs. {order.total}</p>

      <AdminOrderStatus
        orderId={order._id}
        currentStatus={order.status}
        onUpdated={(updatedOrder) => setOrder(updatedOrder)}
      />

      <h2>Items</h2>
      {order.items.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>Qty: {item.quantity}</p>
          <p>Price: Rs. {item.price}</p>
        </div>
      ))}
    </div>
  );
}
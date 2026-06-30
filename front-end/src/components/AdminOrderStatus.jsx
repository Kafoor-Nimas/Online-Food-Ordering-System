import { useState } from "react";

export default function AdminOrderStatus({ orderId, currentStatus, onUpdated }) {
  const [status, setStatus] = useState(currentStatus);

  const saveStatus = async () => {
    const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (res.ok) {
      onUpdated?.(data.order);
    } else {
      alert(data.message || "Update failed");
    }
  };

  return (
    <div className="admin-order-status">
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Placed">Placed</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Preparing">Preparing</option>
        <option value="Out for Delivery">Out for Delivery</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <button onClick={saveStatus}>Save</button>
    </div>
  );
}
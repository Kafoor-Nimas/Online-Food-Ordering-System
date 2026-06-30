const steps = ["Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];

export default function OrderTracker({ status }) {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="order-tracker">
      {steps.map((step, index) => (
        <div key={step} className={`tracker-step ${index <= currentIndex ? "active" : ""}`}>
          <div className="tracker-circle">{index + 1}</div>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}
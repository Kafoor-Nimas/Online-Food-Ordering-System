import { useState } from "react";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";
import axios from "axios";
import getFormattedPrice from "../../utils/price-format";
import getFormattedDate from "../../utils/format-date";

const statusStyles = {
    Pending: "bg-app-warning/15 text-app-warning",
    Shipped: "bg-blue-500/15 text-blue-600",
    Delivered: "bg-app-success/15 text-app-success",
    Cancelled: "bg-app-error/15 text-app-error",
};

export default function ViewOrderInfoModel({ order }) {

    const [isVisible, setIsVisible] = useState(false);

    if (!order) return null;

    const [status, setStatus] = useState(order.status || "Pending");
    const [notes, setNotes] = useState(order.notes || "");
    const [saving, setSaving] = useState(false);

    async function handleChange() {

        try {

            setSaving(true);

            const token = localStorage.getItem("auth_token");

            await axios.put(
                import.meta.env.VITE_BASE_URL + "/orders/" + order.orderId,
                {
                    status,
                    notes
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Order updated successfully");

            window.location.reload();

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update order"
            );

        } finally {

            setSaving(false);

        }

    }

    return (
        <>

            <button
                className="bg-app-orange text-white text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-app-orange-dark transition-colors shadow-sm shadow-app-orange/20"
                onClick={() => {
                    console.log("View clicked", order);
                    setIsVisible(true);
                }}
            >
                View Details
            </button>

            {
                isVisible && (

                    <div className="fixed inset-0 bg-app-green/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                        <div className="w-full max-w-[600px] max-h-[85vh] bg-white rounded-2xl relative shadow-2xl flex flex-col overflow-hidden">

                            <button
                                className="absolute w-9 h-9 bg-white text-app-text-light rounded-full hover:bg-app-error hover:text-white right-4 top-4 flex items-center justify-center shadow-md cursor-pointer transition-colors z-10"
                                onClick={() => setIsVisible(false)}
                            >
                                <CgClose />
                            </button>

                            {/* Header */}

                            <div className="shrink-0 bg-app-green px-6 py-6">

                                <div className="flex justify-between items-center">

                                    <h2 className="text-xl text-white font-semibold">
                                        {order.orderId}
                                    </h2>

                                    <span className="text-app-cream/60 text-sm mr-10">
                                        {order.date ? getFormattedDate(order.date) : "-"}
                                    </span>

                                </div>

                                <div className="flex justify-between mt-2 flex-wrap gap-2">

                                    <div>

                                        <h3 className="text-app-cream/90 font-medium">
                                            {order.firstName} {order.lastName}
                                        </h3>

                                        <p className="text-app-cream/60 text-sm">
                                            {order.email}
                                        </p>

                                    </div>

                                    <h3 className="text-white font-bold text-lg">
                                        {getFormattedPrice(order.total || 0)}
                                    </h3>

                                </div>

                                <div className="w-full h-px bg-white/10 my-4"></div>

                                <div className="flex justify-between items-center flex-wrap gap-3">

                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
                                    >
                                        {status}
                                    </span>

                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="text-sm px-3 py-1.5 rounded-lg bg-white text-app-text border-0 focus:outline-none focus:ring-2 focus:ring-app-orange/50 cursor-pointer"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>

                                </div>

                                <div className="mt-4">

                                    <label className="text-xs font-semibold tracking-wide text-app-cream/60 uppercase mb-1.5 block">
                                        Notes
                                    </label>

                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full text-sm rounded-lg p-2.5 bg-white/10 border border-white/15 text-white placeholder:text-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-app-orange/50 focus:border-transparent"
                                        rows={3}
                                        placeholder="Add notes..."
                                    />

                                </div>

                            </div>

                            {/* Items */}

                            <div className="flex-1 overflow-y-auto p-6">

                                <p className="text-xs font-semibold tracking-wide text-app-text-light uppercase mb-3">
                                    Order Items
                                </p>

                                {
                                    Array.isArray(order.items) && order.items.length > 0 ? (

                                        <div className="flex flex-col gap-2">

                                        {order.items.map((item, index) => (

                                            <div
                                                key={index}
                                                className="w-full flex justify-between items-center border border-app-border bg-app-cream/40 hover:bg-app-cream transition-colors rounded-xl p-2.5"
                                            >

                                                <div className="flex items-center gap-3">

                                                    <img
                                                        src={item.images}
                                                        alt={item.name}
                                                        className="w-12 h-12 rounded-lg object-cover border border-app-border"
                                                    />

                                                    <div className="flex flex-col">

                                                        <span className="text-sm font-semibold text-app-green">
                                                            {item.name}
                                                        </span>

                                                        <span className="text-xs text-app-text-light">
                                                            Qty: {item.qty}
                                                        </span>

                                                    </div>

                                                </div>

                                                <span className="text-sm font-semibold text-app-green">
                                                    {getFormattedPrice(item.price)}
                                                </span>

                                            </div>

                                        ))}

                                        </div>

                                    ) : (

                                        <div className="text-center py-10 text-app-text-light text-sm">
                                            No items found.
                                        </div>

                                    )
                                }

                            </div>

                            {(status !== order.status || notes !== (order.notes || "")) && (

                                <div className="shrink-0 border-t border-app-border px-6 py-4 flex justify-end">

                                    <button
                                        onClick={handleChange}
                                        disabled={saving}
                                        className="bg-app-orange hover:bg-app-orange-dark text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-app-orange/20 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                )
            }

        </>
    );
}
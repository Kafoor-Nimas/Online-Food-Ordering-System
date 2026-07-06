import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import ViewOrderInfoModel from "../../components/viewOrderInfoModel";

const statusStyles = {
  Placed: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Preparing: "bg-orange-100 text-orange-700",
  "Out for Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  //     const sampleOrders = [
  //   {
  //     _id: "1",
  //     orderId: "ORD-1001",
  //     firstName: "John",
  //     lastName: "Smith",
  //     email: "john.smith@gmail.com",
  //     date: "2026-07-04T10:15:00Z",
  //     total: 28.99,
  //     status: "Pending",
  //   },
  //   {
  //     _id: "2",
  //     orderId: "ORD-1002",
  //     firstName: "Emma",
  //     lastName: "Wilson",
  //     email: "emma@gmail.com",
  //     date: "2026-07-04T09:30:00Z",
  //     total: 45.50,
  //     status: "Shipped",
  //   },
  //   {
  //     _id: "3",
  //     orderId: "ORD-1003",
  //     firstName: "Michael",
  //     lastName: "Brown",
  //     email: "michael@gmail.com",
  //     date: "2026-07-03T18:20:00Z",
  //     total: 17.75,
  //     status: "Delivered",
  //   },
  //   {
  //     _id: "4",
  //     orderId: "ORD-1004",
  //     firstName: "Sophia",
  //     lastName: "Johnson",
  //     email: "sophia@gmail.com",
  //     date: "2026-07-03T15:10:00Z",
  //     total: 62.00,
  //     status: "Cancelled",
  //   },
  //   {
  //     _id: "5",
  //     orderId: "ORD-1005",
  //     firstName: "David",
  //     lastName: "Lee",
  //     email: "david@gmail.com",
  //     date: "2026-07-02T12:45:00Z",
  //     total: 19.99,
  //     status: "Pending",
  //   },
  //   {
  //     _id: "6",
  //     orderId: "ORD-1006",
  //     firstName: "Olivia",
  //     lastName: "Taylor",
  //     email: "olivia@gmail.com",
  //     date: "2026-07-02T11:20:00Z",
  //     total: 38.25,
  //     status: "Delivered",
  //   },
  //   {
  //     _id: "7",
  //     orderId: "ORD-1007",
  //     firstName: "Daniel",
  //     lastName: "White",
  //     email: "daniel@gmail.com",
  //     date: "2026-07-01T16:40:00Z",
  //     total: 21.80,
  //     status: "Shipped",
  //   },
  //   {
  //     _id: "8",
  //     orderId: "ORD-1008",
  //     firstName: "Charlotte",
  //     lastName: "Hall",
  //     email: "charlotte@gmail.com",
  //     date: "2026-07-01T14:15:00Z",
  //     total: 54.95,
  //     status: "Pending",
  //   },
  //   {
  //     _id: "9",
  //     orderId: "ORD-1009",
  //     firstName: "James",
  //     lastName: "Martin",
  //     email: "james@gmail.com",
  //     date: "2026-06-30T19:30:00Z",
  //     total: 31.45,
  //     status: "Delivered",
  //   },
  //   {
  //     _id: "10",
  //     orderId: "ORD-1010",
  //     firstName: "Amelia",
  //     lastName: "Moore",
  //     email: "amelia@gmail.com",
  //     date: "2026-06-30T13:10:00Z",
  //     total: 26.30,
  //     status: "Pending",
  //   },
  // ];

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("auth_token");

      axios
        .get(
          import.meta.env.VITE_BASE_URL +
            "/orders/" +
            pageSize +
            "/" +
            pageNumber,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        )
        .then((response) => {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          //setOrders(sampleOrders);
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <div className="w-full h-full overflow-y-auto relative bg-gray-50">
      <div className="flex items-center justify-between gap-3 px-8 pt-8 pb-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-orange-500 uppercase mb-1">
            Sales
          </p>
          <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
        </div>
        {!loading && (
          <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600">
              {orders.length} on this page
            </span>
          </div>
        )}
      </div>

      <div className="w-full px-8 pb-28">
        <div className="w-full bg-white rounded-2xl shadow-lg shadow-gray-400/10 border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="w-full py-24 flex justify-center items-center">
              <Loading />
            </div>
          ) : orders.length === 0 ? (
            <div className="w-full py-24 flex flex-col justify-center items-center text-center">
              <p className="text-lg font-medium text-gray-800">No orders yet</p>
              <p className="text-sm text-gray-600 mt-1">
                Orders will show up here once customers start buying.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full text-sm relative">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Order ID
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Customer Name
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Total Amount
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order._id || order.id}
                      className="odd:bg-gray-50 hover:bg-orange-50 transition-colors"
                    >
                      <td className="px-5 py-4 whitespace-nowrap font-medium text-gray-800">
                        {order.orderId || order._id}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {(order.firstName || "") + " " + (order.lastName || "")}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-600">
                        {order.email || "-"}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-gray-600">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap font-semibold text-gray-800">
                        Rs.{order.total?.toFixed(2) || "0.00"}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status] || "bg-gray-200 text-gray-700"}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <ViewOrderInfoModel order={order} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="w-full absolute bottom-6 left-0 h-[56px] flex justify-center items-center px-4">
        <div className="w-full max-w-[520px] h-full bg-white shadow-xl shadow-gray-400/10 border border-gray-200 rounded-full flex items-center justify-center px-2 gap-1">
          <button
            className="bg-orange-500 w-[100px] text-white text-sm font-semibold py-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={pageNumber <= 1}
            onClick={() => {
              if (pageNumber > 1) {
                setPageNumber(pageNumber - 1);
                setLoading(true);
              } else {
                toast.success("You are on the first page");
              }
            }}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700 w-[100px] text-center">
            Page {pageNumber} of {totalPages}
          </span>
          <button
            className="bg-orange-500 text-white text-sm font-semibold py-2 rounded-full w-[100px] cursor-pointer hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={pageNumber >= totalPages}
            onClick={() => {
              if (pageNumber < totalPages) {
                setPageNumber(pageNumber + 1);
                setLoading(true);
              } else {
                toast.success("You are on the last page");
              }
            }}
          >
            Next
          </button>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setLoading(true);
            }}
            className="ml-3 border border-gray-200 rounded-full px-3 py-2 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
          >
            {/* <option value={2}>2 per page</option>
                        <option value={5}>5 per page</option> */}
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

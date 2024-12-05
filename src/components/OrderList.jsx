import { useState, useEffect } from "react";
import { useTradingService } from "../hooks/use-trading";
import OrderDetail from "./OrderDetail";
import Alert from "./Alert";

export default function OrderList({ accountNo }) {
  const { getOrders, cancelOrder } = useTradingService();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(accountNo);
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách lệnh:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accountNo) {
      fetchOrders();
    }
  }, [accountNo]);

  const handleCancelOrder = async (orderId) => {
    try {
      setError(null);
      await cancelOrder(orderId, accountNo);
      const data = await getOrders(accountNo);
      setOrders(data.orders || []);
    } catch (error) {
      setError(error.message || "Lỗi khi hủy lệnh");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="my-6">
      {error && <Alert message={error} onClose={() => setError(null)} />}
      <h2 className="text-xl font-bold mb-4">Sổ lệnh</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Mã CK</th>
              <th className="px-4 py-2">Loại</th>
              <th className="px-4 py-2">KL đặt</th>
              <th className="px-4 py-2">Giá đặt</th>
              <th className="px-4 py-2">KL khớp</th>
              <th className="px-4 py-2">Giá TB</th>
              <th className="px-4 py-2">Trạng thái</th>
              <th className="px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="px-4 py-2">{order.symbol}</td>
                <td className="px-4 py-2">
                  {order.side === "NB" ? "Mua" : "Bán"}
                </td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">{order.price}</td>
                <td className="px-4 py-2">{order.fillQuantity}</td>
                <td className="px-4 py-2">{order.averagePrice}</td>
                <td className="px-4 py-2">{order.orderStatus}</td>
                <td className="px-4 py-2">
                  {["new", "partiallyFilled"].includes(order.orderStatus) && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hủy
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderDetail
          orderId={selectedOrder.id}
          accountNo={accountNo}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

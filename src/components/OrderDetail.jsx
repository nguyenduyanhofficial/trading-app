import { useState, useEffect } from "react";
import { useTradingService } from "../hooks/use-trading";

export default function OrderDetail({ orderId, accountNo, onClose }) {
  const { getOrderDetail } = useTradingService();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const data = await getOrderDetail(orderId, accountNo);
        setOrder(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết lệnh:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && accountNo) {
      fetchOrderDetail();
    }
  }, [orderId, accountNo]);

  if (loading) return <div>Đang tải...</div>;
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chi tiết lệnh #{order.id}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Mã CK:</p>
            <p>{order.symbol}</p>
          </div>
          <div>
            <p className="font-semibold">Loại:</p>
            <p>{order.side === "NB" ? "Mua" : "Bán"}</p>
          </div>
          <div>
            <p className="font-semibold">Trạng thái:</p>
            <p>{order.orderStatus}</p>
          </div>
          <div>
            <p className="font-semibold">Loại lệnh:</p>
            <p>{order.orderType}</p>
          </div>
          <div>
            <p className="font-semibold">Giá đặt:</p>
            <p>{order.price?.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">KL đặt:</p>
            <p>{order.quantity?.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">KL khớp:</p>
            <p>{order.fillQuantity?.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Giá TB:</p>
            <p>{order.averagePrice?.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">KL chưa khớp:</p>
            <p>{order.leaveQuantity?.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">KL đã huỷ:</p>
            <p>{order.canceledQuantity?.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Ngày GD:</p>
            <p>{order.transDate}</p>
          </div>
          <div>
            <p className="font-semibold">Thời gian đặt:</p>
            <p>{new Date(order.createdDate).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

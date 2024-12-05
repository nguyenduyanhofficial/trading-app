import { useState, useEffect } from "react";
import { useTradingService } from "../hooks/use-trading";
import OTPVerification from "./OTPVerification";
import Alert from "./Alert";

export default function OrderForm() {
  const { placeOrder, getSubAccounts, getLoanPackages, getPPSE } =
    useTradingService();
  const [hasTradeToken, setHasTradeToken] = useState(
    !!localStorage.getItem("trading_token")
  );
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [subAccounts, setSubAccounts] = useState({ accounts: [] });

  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("NB");
  const [orderType, setOrderType] = useState("LO");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const [loanPackages, setLoanPackages] = useState([]);
  const [selectedLoanPackage, setSelectedLoanPackage] = useState(null);
  const [ppse, setPPSE] = useState(null);

  const [error, setError] = useState(null);

  const isFormDisabled = !hasTradeToken;

  useEffect(() => {
    const fetchSubAccounts = async () => {
      try {
        const accounts = await getSubAccounts();
        setSubAccounts(accounts);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài khoản:", error);
      }
    };
    fetchSubAccounts();
  }, []);

  useEffect(() => {
    const fetchLoanPackages = async () => {
      if (accountNo) {
        try {
          const packages = await getLoanPackages(accountNo);
          setLoanPackages(packages.loanPackages || []);
        } catch (error) {
          console.error("Lỗi khi lấy gói vay:", error);
        }
      }
    };
    fetchLoanPackages();
  }, [accountNo]);

  useEffect(() => {
    const calculatePPSE = async () => {
      if (accountNo && symbol && price && selectedLoanPackage) {
        try {
          const ppseData = await getPPSE(
            accountNo,
            symbol,
            price,
            selectedLoanPackage.id
          );
          setPPSE(ppseData);
        } catch (error) {
          console.error("Lỗi khi tính sức mua:", error);
        }
      }
    };
    calculatePPSE();
  }, [accountNo, symbol, price, selectedLoanPackage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!hasTradeToken) {
      setShowOTPVerification(true);
      return;
    }

    try {
      const vietnamTime = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
      );
      const hours = vietnamTime.getHours();
      const minutes = vietnamTime.getMinutes();
      const currentTimeInMinutes = hours * 60 + minutes;

      const morningSessionStart = 9 * 60;
      const morningSessionEnd = 11 * 60 + 30;

      const afternoonSessionStart = 13 * 60;
      const afternoonSessionEnd = 14 * 60 + 30;

      const isInTradingHours =
        (currentTimeInMinutes >= morningSessionStart &&
          currentTimeInMinutes <= morningSessionEnd) ||
        (currentTimeInMinutes >= afternoonSessionStart &&
          currentTimeInMinutes <= afternoonSessionEnd);

      if (
        orderType === "ATO" &&
        currentTimeInMinutes > morningSessionStart + 15
      ) {
        throw new Error("Lệnh ATO chỉ được đặt trong 15 phút đầu phiên sáng");
      }

      if (
        orderType === "ATC" &&
        currentTimeInMinutes < afternoonSessionEnd - 15
      ) {
        throw new Error("Lệnh ATC chỉ được đặt trong 15 phút cuối phiên chiều");
      }

      if (!isInTradingHours && !["ATO", "ATC"].includes(orderType)) {
        throw new Error("Không thể đặt lệnh ngoài giờ giao dịch");
      }

      if (side === "NB" && !selectedLoanPackage) {
        throw new Error("Vui lòng chọn gói vay");
      }

      const orderPayload = {
        symbol,
        side,
        orderType,
        price: Number(price),
        quantity: Number(quantity),
        accountNo,
        loanPackageId: side === "NB" ? selectedLoanPackage?.id : null,
      };

      await placeOrder(orderPayload);
      console.log("Đặt lệnh thành công");
    } catch (error) {
      setError(error.message || "Đặt lệnh thất bại");
    }
  };

  const isSubmitDisabled =
    isFormDisabled || (side === "NB" && !selectedLoanPackage);

  if (showOTPVerification) {
    return (
      <OTPVerification
        onSuccess={() => {
          setHasTradeToken(true);
          setShowOTPVerification(false);
        }}
      />
    );
  }

  return (
    <div>
      {error && <Alert message={error} onClose={() => setError(null)} />}
      <h2 className="text-xl font-bold mb-4">Đặt lệnh</h2>
      {isFormDisabled && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700">
            Thời gian giao dịch:
            <br />
            - Phiên sáng: 09:00 - 11:30
            <br />
            - Phiên chiều: 13:00 - 14:30
            <br />
            - ATO: 15 phút đầu phiên sáng
            <br />- ATC: 15 phút cuối phiên chiều
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
          className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={isFormDisabled}
        >
          <option value="">Chọn tài khoản</option>
          {subAccounts?.accounts?.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.id} - {acc.accountTypeName}
            </option>
          ))}
        </select>
        {side === "NB" && (
          <select
            value={selectedLoanPackage?.id || ""}
            onChange={(e) => {
              const selected = loanPackages.find(
                (pkg) => pkg.id === Number(e.target.value)
              );
              setSelectedLoanPackage(selected);
            }}
            className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isFormDisabled}
          >
            <option value="">Chọn gói vay</option>
            {loanPackages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} - Tỷ lệ ký quỹ {pkg.initialRate}%
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Mã cổ phiếu"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={isFormDisabled}
        />
        <select
          value={side}
          onChange={(e) => setSide(e.target.value)}
          className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={isFormDisabled}
        >
          <option value="NB">Mua</option>
          <option value="NS">Bán</option>
        </select>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={isFormDisabled}
        >
          <option value="LO">Lệnh giới hạn (LO)</option>
          <option value="MP">Lệnh thị trường (MP)</option>
          <option value="ATO">Lệnh ATO</option>
          <option value="ATC">Lệnh ATC</option>
          <option value="MOK">Lệnh MOK</option>
          <option value="MAK">Lệnh MAK</option>
        </select>
        {orderType === "LO" && (
          <div>
            <input
              type="number"
              placeholder="Giá"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={isFormDisabled}
            />
          </div>
        )}
        {orderType === "MP" && null}
        <input
          type="number"
          placeholder="Khối lượng"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
          disabled={isFormDisabled}
        />
        {ppse && side === "NB" && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Thông tin sức mua:</h3>
            <div className="space-y-1">
              <p>Sức mua: {ppse.ppse?.toLocaleString()} đ</p>
              <p>Số lượng tối đa: {ppse.qmax?.toLocaleString()} cp</p>
            </div>
          </div>
        )}
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            side === "NB" ? "bg-green-500" : "bg-red-500"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isSubmitDisabled}
        >
          {side === "NB" ? "Đặt lệnh mua" : "Đặt lệnh bán"}
        </button>
      </form>
    </div>
  );
}

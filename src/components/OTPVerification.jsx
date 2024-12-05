import { useState } from "react";
import { useTradingService } from "@/hooks/use-trading";

export default function OTPVerification({ onSuccess }) {
  const { verifyOTP } = useTradingService();
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      const res = await verifyOTP(token, otp);
      localStorage.setItem("trading_token", res.tradingToken);
      onSuccess?.();
    } catch (error) {
      console.error("Xác thực OTP thất bại", error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Nhập Mã bảo mật / OTP để giao dịch"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleVerifyOTP}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Xác nhận OTP
      </button>
    </div>
  );
}

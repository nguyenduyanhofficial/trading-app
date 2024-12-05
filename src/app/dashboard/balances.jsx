import { useState, useEffect } from "react";
import { getCookie } from "@/utils/cookies";
import api from "@/utils/api";

const Balances = ({ account }) => {
  const [balances, setBalances] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      const token = getCookie("jwt_token");
      const { data } = await api.get(
        `/dnse-order-service/account-balances/${account}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBalances(data);
    };
    fetchBalances();
  }, [account]);

  return balances ? (
    <div>
      <p>Tổng tài sản: {formatMoney(balances.totalAsset)}</p>
      <p>Tiền mặt: {formatMoney(balances.cashBalance)}</p>
      <p>Sức mua: {formatMoney(balances.buyingPower)}</p>
    </div>
  ) : (
    <p>Đang tải...</p>
  );
};

export default Balances;

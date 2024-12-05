"use client";

import { useState, useEffect } from "react";
import { useTradingService } from "@/hooks/use-trading";

export default function AccountInfo({ onSelectAccount }) {
  const { getAccountInfo, getSubAccounts, getBalance } = useTradingService();
  const [accountInfo, setAccountInfo] = useState(null);
  const [subAccounts, setSubAccounts] = useState({
    default: null,
    accounts: [],
  });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountData = await getAccountInfo();
        setAccountInfo(accountData);

        const accountsData = await getSubAccounts();
        setSubAccounts(accountsData);

        if (accountsData.accounts.length > 0) {
          const defaultAccount = accountsData.default || accountsData.accounts[0];
          setSelectedAccount(defaultAccount);
          onSelectAccount?.(defaultAccount.id);

          const balanceData = await getBalance(defaultAccount.id);
          setBalance(balanceData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin:", error);
      }
    };

    fetchData();
  }, [getAccountInfo, getSubAccounts, getBalance, onSelectAccount]);

  const handleAccountChange = async (accountId) => {
    try {
      const selectedAcc = subAccounts.accounts.find(
        (acc) => acc.id === accountId
      );
      setSelectedAccount(selectedAcc);
      onSelectAccount?.(accountId);

      const balanceData = await getBalance(accountId);
      setBalance(balanceData);
    } catch (error) {
      console.error("Lỗi khi đổi tiểu khoản:", error);
    }
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Thông tin tài khoản */}
      {accountInfo && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Thông tin tài khoản</h2>
          <div className="grid grid-cols-2 gap-2">
            <p>Mã KH: {accountInfo.investorId}</p>
            <p>Họ tên: {accountInfo.name}</p>
            <p>Số lưu ký: {accountInfo.custodyCode}</p>
            <p>SĐT: {accountInfo.mobile}</p>
            <p>Email: {accountInfo.email}</p>
          </div>
        </div>
      )}

      {/* Chọn tài khoản */}
      {subAccounts.accounts.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Tài khoản</h2>
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handleAccountChange(e.target.value)}
            value={selectedAccount?.id || ""}
          >
            {subAccounts.accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.id} - {acc.accountTypeName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Thông tin tiền */}
      {balance && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Thông tin tiền</h2>
          <div className="grid grid-cols-2 gap-2">
            <p>Tổng tiền: {formatMoney(balance.totalCash)}</p>
            <p>Tiền mặt: {formatMoney(balance.availableCash)}</p>
            <p>Tổng nợ: {formatMoney(balance.totalDebt)}</p>
            <p>Tiền có thể rút: {formatMoney(balance.withdrawableCash)}</p>
            <p>Nợ margin: {formatMoney(balance.marginDebt)}</p>
            <p>Giá trị CK: {formatMoney(balance.stockValue)}</p>
            <p>Tài sản ròng: {formatMoney(balance.netAssetValue)}</p>
            <p>Tiền chờ về: {formatMoney(balance.receivingAmount)}</p>
            <p>Tiền khớp trong ngày: {formatMoney(balance.secureAmount)}</p>
            <p>Cổ tức chờ về: {formatMoney(balance.cashDividendReceiving)}</p>
            <p>Phí lưu ký: {formatMoney(balance.depositFeeAmount)}</p>
            <p>Lãi tiền gửi: {formatMoney(balance.depositInterest)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

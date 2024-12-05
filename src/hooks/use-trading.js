import { useMemo } from "react";
import { createTradingService } from "../services";

export function useTradingService() {
  const service = useMemo(() => createTradingService(), []);

  const getAuth = () => ({
    token: localStorage.getItem("jwt_token"),
    tradingToken: localStorage.getItem("trading_token"),
  });

  const placeOrder = async (orderData) => {
    const auth = getAuth();
    if (!auth.token || !auth.tradingToken) {
      throw new Error("Vui lòng đăng nhập lại");
    }
    return service.placeOrder(orderData, auth);
  };

  const getAccountInfo = async () => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getAccountInfo(token);
  };

  const getSubAccounts = async () => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getSubAccounts(token);
  };

  const getBalance = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getBalance(token, accountNo);
  };

  const getLoanPackages = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getLoanPackages(token, accountNo);
  };

  const getPPSE = async (accountNo, symbol, price, loanPackageId) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getPPSE(token, accountNo, symbol, price, loanPackageId);
  };

  const getOrders = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getOrders(token, accountNo);
  };

  const getOrderDetail = async (orderId, accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getOrderDetail(token, orderId, accountNo);
  };

  const cancelOrder = async (orderId, accountNo) => {
    const auth = getAuth();
    if (!auth.token || !auth.tradingToken) {
      throw new Error("Vui lòng đăng nhập lại");
    }
    return service.cancelOrder(
      auth.token,
      auth.tradingToken,
      orderId,
      accountNo
    );
  };

  const getDeals = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return service.getDeals(token, accountNo);
  };

  return {
    login: service.login.bind(service),
    verifyOTP: service.verifyOTP.bind(service),
    placeOrder,
    getAccountInfo,
    getSubAccounts,
    getBalance,
    getLoanPackages,
    getPPSE,
    getOrders,
    getOrderDetail,
    cancelOrder,
    getDeals,
  };
}

import { getCookie } from "@/utils/cookies";
import { useBroker } from "@/providers/BrokerProvider";

export function useTradingService() {
  const { tradingService } = useBroker();

  const getAuth = () => ({
    token: getCookie("jwt_token"),
    tradingToken: getCookie("trading_token"),
  });

  const placeOrder = async (orderData) => {
    const auth = getAuth();
    if (!auth.token || !auth.tradingToken) {
      throw new Error("Vui lòng đăng nhập lại");
    }
    return tradingService.placeOrder(orderData, auth);
  };

  const getAccountInfo = async () => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getAccountInfo(token);
  };

  const getSubAccounts = async () => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getSubAccounts(token);
  };

  const getBalance = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getBalance(token, accountNo);
  };

  const getLoanPackages = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getLoanPackages(token, accountNo);
  };

  const getPPSE = async (accountNo, symbol, price, loanPackageId) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getPPSE(
      token,
      accountNo,
      symbol,
      price,
      loanPackageId
    );
  };

  const getOrders = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getOrders(token, accountNo);
  };

  const getOrderDetail = async (orderId, accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getOrderDetail(token, orderId, accountNo);
  };

  const cancelOrder = async (orderId, accountNo) => {
    const auth = getAuth();
    if (!auth.token || !auth.tradingToken) {
      throw new Error("Vui lòng đăng nhập lại");
    }
    return tradingService.cancelOrder(
      auth.token,
      auth.tradingToken,
      orderId,
      accountNo
    );
  };

  const getDeals = async (accountNo) => {
    const { token } = getAuth();
    if (!token) throw new Error("Vui lòng đăng nhập lại");
    return tradingService.getDeals(token, accountNo);
  };

  return {
    login: tradingService.login.bind(tradingService),
    verifyOTP: tradingService.verifyOTP.bind(tradingService),
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

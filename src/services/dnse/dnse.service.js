import { BaseTradingService } from "../base/base-trading.service";
import { DNSE_ENDPOINTS } from "./constants";

export class DNSEService extends BaseTradingService {
  constructor() {
    super(DNSE_ENDPOINTS.BASE_URL);
  }

  async login(username, password) {
    return this.request({
      method: "POST",
      url: DNSE_ENDPOINTS.AUTH.LOGIN,
      data: { username, password },
      headers: { "Content-Type": "application/json" },
    });
  }

  async verifyOTP(token, otp) {
    return this.request({
      method: "POST",
      url: DNSE_ENDPOINTS.AUTH.VERIFY_OTP,
      headers: {
        Authorization: `Bearer ${token}`,
        "smart-otp": otp,
      },
    });
  }

  async getAccountInfo(token) {
    return this.request({
      method: "GET",
      url: DNSE_ENDPOINTS.USER.GET_INFO,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getSubAccounts(token) {
    const response = await this.request({
      method: "GET",
      url: DNSE_ENDPOINTS.TRADING.GET_ACCOUNTS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      default: response.default,
      accounts: response.accounts || [],
    };
  }

  async getBalance(token, accountNo) {
    return this.request({
      method: "GET",
      url: `${DNSE_ENDPOINTS.TRADING.GET_BALANCE}/${accountNo}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async placeOrder(orderData, auth) {
    const { token, tradingToken } = auth;
    return this.request({
      method: "POST",
      url: DNSE_ENDPOINTS.TRADING.PLACE_ORDER,
      data: orderData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Trading-Token": tradingToken,
        "Content-Type": "application/json",
      },
    });
  }

  async getLoanPackages(token, accountNo) {
    return this.request({
      method: "GET",
      url: DNSE_ENDPOINTS.TRADING.GET_LOAN_PACKAGES.replace(
        "{account}",
        accountNo
      ),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getPPSE(token, accountNo, symbol, price, loanPackageId) {
    return this.request({
      method: "GET",
      url: `${DNSE_ENDPOINTS.TRADING.GET_PPSE.replace(
        "{account}",
        accountNo
      )}?symbol=${symbol}&price=${price}&loanPackageId=${loanPackageId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getOrders(token, accountNo) {
    return this.request({
      method: "GET",
      url: `${DNSE_ENDPOINTS.TRADING.GET_ORDERS}?accountNo=${accountNo}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getOrderDetail(token, orderId, accountNo) {
    return this.request({
      method: "GET",
      url: `${DNSE_ENDPOINTS.TRADING.GET_ORDER_DETAIL.replace(
        "{id}",
        orderId
      )}?accountNo=${accountNo}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async cancelOrder(token, tradingToken, orderId, accountNo) {
    return this.request({
      method: "DELETE",
      url: `${DNSE_ENDPOINTS.TRADING.CANCEL_ORDER.replace(
        "{id}",
        orderId
      )}?accountNo=${accountNo}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Trading-Token": tradingToken,
      },
    });
  }

  async getDeals(token, accountNo) {
    return this.request({
      method: "GET",
      url: `${DNSE_ENDPOINTS.TRADING.GET_DEALS}?accountNo=${accountNo}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

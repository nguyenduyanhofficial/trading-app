import { BaseTradingService } from "../base/base-trading.service";
import { SSI_ENDPOINTS } from "./constants";
import { SSIAdapter } from "./ssi.adapter";

export class SSIService extends BaseTradingService {
  constructor() {
    super(SSI_ENDPOINTS.BASE_URL);
  }

  async login(username, password) {
    try {
      const response = await this.request({
        method: "POST",
        url: SSI_ENDPOINTS.AUTH.LOGIN,
        data: { username, password },
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyOTP(token, otp) {
    try {
      const response = await this.request({
        method: "POST",
        url: SSI_ENDPOINTS.AUTH.VERIFY_OTP,
        headers: {
          Authorization: `Bearer ${token}`,
          "OTP-Code": otp,
        },
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAccountInfo(token) {
    try {
      const response = await this.request({
        method: "GET",
        url: SSI_ENDPOINTS.USER.GET_INFO,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getSubAccounts(token) {
    try {
      const response = await this.request({
        method: "GET",
        url: SSI_ENDPOINTS.TRADING.GET_ACCOUNTS,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return SSIAdapter.transformAccountResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getBalance(token, accountNo) {
    try {
      const response = await this.request({
        method: "GET",
        url: SSI_ENDPOINTS.TRADING.GET_BALANCE.replace("{account}", accountNo),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return SSIAdapter.transformBalanceResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getLoanPackages(token, accountNo) {
    try {
      const response = await this.request({
        method: "GET",
        url: SSI_ENDPOINTS.TRADING.GET_LOAN_PACKAGES.replace(
          "{account}",
          accountNo
        ),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return SSIAdapter.transformLoanPackagesResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPPSE(token, accountNo, symbol, price, loanPackageId) {
    try {
      const response = await this.request({
        method: "GET",
        url: `${SSI_ENDPOINTS.TRADING.GET_PPSE.replace(
          "{account}",
          accountNo
        )}`,
        params: { symbol, price, loanPackageId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return SSIAdapter.transformPPSEResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async placeOrder(orderData, auth) {
    try {
      const transformedData = SSIAdapter.transformOrderRequest(orderData);
      const response = await this.request({
        method: "POST",
        url: SSI_ENDPOINTS.TRADING.PLACE_ORDER,
        data: transformedData,
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Trading-Session": auth.tradingToken,
        },
      });
      return SSIAdapter.transformOrderResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOrders(token, accountNo) {
    try {
      const response = await this.request({
        method: "GET",
        url: SSI_ENDPOINTS.TRADING.GET_ORDERS,
        params: { accountNo },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return SSIAdapter.transformOrdersResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOrderDetail(token, orderId, accountNo) {
    try {
      const response = await this.request({
        method: "GET",
        url: SSI_ENDPOINTS.TRADING.GET_ORDER_DETAIL.replace("{id}", orderId),
        params: { accountNo },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async cancelOrder(token, tradingToken, orderId, accountNo) {
    try {
      const response = await this.request({
        method: "DELETE",
        url: SSI_ENDPOINTS.TRADING.CANCEL_ORDER.replace("{id}", orderId),
        params: { accountNo },
        headers: {
          Authorization: `Bearer ${token}`,
          "Trading-Session": tradingToken,
        },
      });
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getDeals(token, accountNo) {
    try {
      const response = await this.request({
        method: "GET",
        url: SSI_ENDPOINTS.TRADING.GET_DEALS,
        params: { accountNo },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return SSIAdapter.transformDealsResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export const DNSE_ENDPOINTS = {
  BASE_URL: "https://services.entrade.com.vn",
  AUTH: {
    LOGIN: "/dnse-auth-service/login",
    VERIFY_OTP: "/dnse-order-service/trading-token",
  },
  USER: {
    GET_INFO: "/dnse-user-service/api/me",
  },
  TRADING: {
    PLACE_ORDER: "/dnse-order-service/v2/orders",
    GET_ACCOUNTS: "/dnse-order-service/accounts",
    GET_BALANCE: "/dnse-order-service/account-balances",
    GET_LOAN_PACKAGES: "/dnse-order-service/accounts/{account}/loan-packages",
    GET_PPSE: "/dnse-order-service/accounts/{account}/ppse",
    GET_ORDERS: "/dnse-order-service/v2/orders",
    GET_ORDER_DETAIL: "/dnse-order-service/v2/orders/{id}",
    CANCEL_ORDER: "/dnse-order-service/v2/orders/{id}",
    GET_DEALS: "/dnse-deal-service/deals",
  },
};

export const SSI_ENDPOINTS = {
  BASE_URL: "https://api.ssi.com.vn",
  AUTH: {
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    REFRESH_TOKEN: "/auth/refresh-token",
  },
  USER: {
    GET_INFO: "/api/v2/user",
    UPDATE_PROFILE: "/api/v2/user/profile",
    CHANGE_PASSWORD: "/api/v2/user/password",
  },
  TRADING: {
    GET_ACCOUNTS: "/api/v2/accounts",
    GET_BALANCE: "/api/v2/accounts/{account}/balance",
    GET_LOAN_PACKAGES: "/api/v2/accounts/{account}/loan-packages",
    GET_PPSE: "/api/v2/accounts/{account}/ppse",
    PLACE_ORDER: "/api/v2/orders",
    GET_ORDERS: "/api/v2/orders",
    GET_ORDER_DETAIL: "/api/v2/orders/{id}",
    CANCEL_ORDER: "/api/v2/orders/{id}",
    GET_DEALS: "/api/v2/deals",
    GET_PORTFOLIO: "/api/v2/accounts/{account}/portfolio",
    GET_CASH_STATEMENT: "/api/v2/accounts/{account}/cash-statement",
    GET_STOCK_STATEMENT: "/api/v2/accounts/{account}/stock-statement",
  },
  MARKET: {
    GET_SECURITIES: "/api/v2/securities",
    GET_MARKET_DATA: "/api/v2/market-data",
    GET_STOCK_INFO: "/api/v2/securities/{symbol}",
  },
};

export const SSI_CONFIG = {
  HEADERS: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_SSI_API_KEY,
  },
  ORDER_TYPES: {
    LIMIT: "LO",
    MARKET: "MP",
    MOK: "MOK",
    MAK: "MAK",
    ATO: "ATO",
    ATC: "ATC",
  },
  ORDER_SIDES: {
    BUY: "buy",
    SELL: "sell",
  },
};

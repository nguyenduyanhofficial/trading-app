export class SSIAdapter {
  static transformOrderRequest(orderData) {
    return {
      stockCode: orderData.symbol,
      orderType: orderData.side === "NB" ? "buy" : "sell",
      orderMethod: orderData.orderType,
      orderPrice: Number(orderData.price),
      orderQuantity: Number(orderData.quantity),
      accountNumber: orderData.accountNo,
      loanId: orderData.loanPackageId,
    };
  }

  static transformOrderResponse(response) {
    return {
      orderId: response.orderId,
      status: response.status,
      message: response.message || "Success",
      data: response,
    };
  }

  static transformBalanceResponse(response) {
    return {
      totalAsset: response.totalEquity,
      cashBalance: response.cash,
      buyingPower: response.buyingPower,
      fee: response.fee,
      data: response,
    };
  }

  static transformAccountResponse(response) {
    return {
      default: response.defaultAccount,
      accounts: response.accounts || [],
      data: response,
    };
  }

  static transformLoanPackagesResponse(response) {
    return {
      loanPackages: response.packages || [],
      data: response,
    };
  }

  static transformPPSEResponse(response) {
    return {
      maxQuantity: response.maxQty,
      estimatedFee: response.fee,
      data: response,
    };
  }

  static transformOrdersResponse(response) {
    return {
      orders: (response.orders || []).map((order) => ({
        id: order.orderId,
        symbol: order.stockCode,
        side: order.orderType === "buy" ? "NB" : "NS",
        orderType: order.orderMethod,
        price: order.orderPrice,
        quantity: order.orderQuantity,
        status: order.status,
      })),
      data: response,
    };
  }

  static transformDealsResponse(response) {
    return {
      deals: (response.deals || []).map((deal) => ({
        id: deal.dealId,
        orderId: deal.orderId,
        symbol: deal.stockCode,
        side: deal.orderType === "buy" ? "NB" : "NS",
        price: deal.matchPrice,
        quantity: deal.matchQuantity,
        time: deal.matchTime,
      })),
      data: response,
    };
  }

  static transformGetPPSEResponse(response) {
    return {
      maxQuantity: response.maxQuantity,
      estimatedFee: response.fee,
      buyingPower: response.buyingPower,
      data: response,
    };
  }
}

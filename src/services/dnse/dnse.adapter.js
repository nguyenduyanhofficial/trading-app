export class DNSEAdapter {
  static transformOrderRequest(orderData) {
    return {
      symbol: orderData.symbol,
      side: orderData.side,
      orderType: orderData.orderType,
      price: Number(orderData.price),
      quantity: Number(orderData.quantity),
      accountNo: orderData.accountNo,
      loanPackageId: orderData.loanPackageId,
    };
  }

  static transformOrderResponse(response) {
    return {
      orderId: response.id,
      status: response.orderStatus,
      message: response.message || "Success",
      data: response,
    };
  }

  static transformBalanceResponse(response) {
    return {
      totalAsset: response.totalAsset,
      cashBalance: response.cashBalance,
      buyingPower: response.buyingPower,
      fee: response.fee,
      data: response,
    };
  }

  static transformAccountResponse(response) {
    return {
      default: response.default,
      accounts: response.accounts || [],
      data: response,
    };
  }

  static transformLoanPackagesResponse(response) {
    return {
      loanPackages: response.loanPackages || [],
      data: response,
    };
  }
}

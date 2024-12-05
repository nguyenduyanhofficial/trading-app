import { DNSEService } from "./dnse-service";

export const createTradingService = (broker = "DNSE") => {
  switch (broker) {
    case "DNSE":
      return new DNSEService();
    // SSI...
    default:
      throw new Error("Broker không được hỗ trợ");
  }
};

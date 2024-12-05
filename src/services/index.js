import { DNSEService } from "./dnse/dnse.service";

export const BROKERS = {
  DNSE: "DNSE",
};

export const createTradingService = (broker = BROKERS.DNSE) => {
  switch (broker) {
    case BROKERS.DNSE:
      return new DNSEService();
    default:
      throw new Error(`Broker ${broker} không được hỗ trợ`);
  }
};

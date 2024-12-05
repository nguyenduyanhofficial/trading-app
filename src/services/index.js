import { DNSEService } from "./dnse/dnse.service";
import { SSIService } from "./ssi/ssi.service";

export const BROKERS = {
  DNSE: "DNSE",
  SSI: "SSI",
};

export const createTradingService = (broker = BROKERS.DNSE) => {
  switch (broker) {
    case BROKERS.DNSE:
      return new DNSEService();
    case BROKERS.SSI:
      return new SSIService();
    default:
      throw new Error(`Broker ${broker} không được hỗ trợ`);
  }
};

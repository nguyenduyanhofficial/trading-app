"use client";

import { createContext, useContext, useState } from "react";
import { BROKERS, createTradingService } from "@/services";
import { getUserBroker, saveBrokerChoice } from "@/utils/broker";

const BrokerContext = createContext(null);

export function BrokerProvider({ children }) {
  const [currentBroker, setCurrentBroker] = useState(() => {
    return getUserBroker() || BROKERS.DNSE;
  });
  const tradingService = createTradingService(currentBroker);

  const switchBroker = (broker) => {
    setCurrentBroker(broker);
    saveBrokerChoice(broker);
  };

  return (
    <BrokerContext.Provider
      value={{ currentBroker, switchBroker, tradingService }}
    >
      {children}
    </BrokerContext.Provider>
  );
}

export const useBroker = () => useContext(BrokerContext);

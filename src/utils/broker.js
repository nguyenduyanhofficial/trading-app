import { BROKERS } from "@/services";

export const saveBrokerChoice = (broker) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`user_broker`, broker);
  }
};

export const getUserBroker = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(`user_broker`) || BROKERS.DNSE;
};

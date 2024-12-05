import { BROKERS } from "@/services";

export const saveBrokerChoice = (broker) => {
  localStorage.setItem(`user_broker`, broker);
};

export const getUserBroker = () => {
  return localStorage.getItem(`user_broker`) || BROKERS.DNSE;
};

import { useState } from "react";
import { BROKERS } from "@/services";
import { DNSELoginForm } from "./DNSELoginForm";
import { SSILoginForm } from "./SSILoginForm";
import { useBroker } from "@/providers/BrokerProvider";

export function LoginForm({ onSubmit }) {
  const { currentBroker, switchBroker } = useBroker();
  const [selectedBroker, setSelectedBroker] = useState(currentBroker);

  const handleBrokerChange = (broker) => {
    setSelectedBroker(broker);
    switchBroker(broker);
  };

  const handleSubmit = (formData) => {
    onSubmit({ ...formData, broker: selectedBroker });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center">
        {Object.values(BROKERS).map((broker) => (
          <button
            key={broker}
            onClick={() => handleBrokerChange(broker)}
            className={`px-4 py-2 rounded ${
              selectedBroker === broker
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {broker}
          </button>
        ))}
      </div>

      {selectedBroker === BROKERS.DNSE && (
        <DNSELoginForm onSubmit={handleSubmit} />
      )}
      {selectedBroker === BROKERS.SSI && (
        <SSILoginForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}

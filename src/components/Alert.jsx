import { useEffect, useState } from "react";

export default function Alert({
  message,
  type = "error",
  onClose,
  autoClose = 5000,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "error" ? "bg-red-100" : "bg-yellow-100";
  const textColor = type === "error" ? "text-red-700" : "text-yellow-700";

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg ${bgColor} ${textColor} max-w-md shadow-lg`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">{message}</div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

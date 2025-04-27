import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState(null); // "success" | "error"

  const showNotification = (msg, notificationType) => {
    setMessage(msg);
    setType(notificationType);
    setTimeout(() => {
      clearNotification();
    }, 3000); // Tự động ẩn sau 8 giây
  };

  const clearNotification = () => {
    setMessage("");
    setType(null);
  };

  return (
    <NotificationContext.Provider value={{ message, type, showNotification, clearNotification }}>
      {children}
      {message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

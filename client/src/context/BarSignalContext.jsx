import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../core/socketInstance.js";
import { log } from "../core/logWrapper.js";

const BarSignalContext = createContext();

export const useBarSignal = () => useContext(BarSignalContext);

export const BarSignalProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBarSignal = ({ message, duration = 3000 }) => {
      log("Received barSignal:", message);

      setMessage(message);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, duration);
    };

    socket.on("barSignal", handleBarSignal);

    return () => {
      socket.off("barSignal", handleBarSignal);
    };
  }, []);

  return (
    <BarSignalContext.Provider value={{ message, isVisible }}>
      {children}
    </BarSignalContext.Provider>
  );
};

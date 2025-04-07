import { createContext, useContext, useEffect, useState } from "react";
import apiv1 from "../utils/axiosClient"; // hoặc đường dẫn tương ứng

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const fetchCurrentEvent = async () => {
      try {
        const response = await apiv1.get("/event/current");
        if (response.status === 200 && response.data.data) {
          setCurrentEvent(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching current event:", err);
      }
    };

    fetchCurrentEvent();
  }, []);

  return <EventContext.Provider value={{ currentEvent, setCurrentEvent }}>{children}</EventContext.Provider>;
};

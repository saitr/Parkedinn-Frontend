import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingInfo, setBookingInfo] = useState({
    username: "",
    userId: null,
    vehicleNumber: "",
    timerRunning: false,
    bookingId: null,
  });

  return (
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  return useContext(BookingContext);
}

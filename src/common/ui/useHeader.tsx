import { useState, useEffect, ReactElement } from "react";
import { useLocation } from "react-router-dom";

interface HeaderState {
  title: string;
  showSearch: boolean;
  showNotification: boolean;
  buttonComponent: ReactElement | null;
}

export const useHeader = (handleButtonClick: (identifier: string) => void) => {
  const location = useLocation();
  const [header, setHeader] = useState<HeaderState>({
    title: "Dashboard",
    showSearch: true,
    showNotification: true,
    buttonComponent: null,
  });

  useEffect(() => {
    switch (location.pathname) {
      case "/waybill":
        setHeader({
          title: "Waybill",
          showSearch: true,
          showNotification: true,
          buttonComponent: (
            <button
              onClick={() => handleButtonClick("waybill")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + New Waybill
            </button>
          ),
        });
        break;
      case "/transactions":
        setHeader({
          title: "Transaction History",
          showSearch: false,
          showNotification: false,
          buttonComponent: (
            <button
              onClick={() => handleButtonClick("transactions")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Export Transactions
            </button>
          ),
        });
        break;
      case "/incidents":
        setHeader({
          title: "Incident Reporting",
          showSearch: true,
          showNotification: true,
          buttonComponent: (
            <button
              onClick={() => handleButtonClick("incidents")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Report Incident
            </button>
          ),
        });
        break;
      default:
        setHeader({
          title: "Dashboard",
          showSearch: true,
          showNotification: true,
          buttonComponent: null, // Default runtime value
        });
    }
  }, [location.pathname, handleButtonClick]);

  return header;
};

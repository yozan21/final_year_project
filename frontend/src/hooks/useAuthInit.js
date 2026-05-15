import { useState, useEffect } from "react";
import axios from "axios";
import { refreshTokenURL } from "../services/apiEndpoints";

export const useInitAuth = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await axios.post(
          refreshTokenURL,
          {},
          {
            withCredentials: true,
          },
        );
      } finally {
        setIsReady(true); // always ready after attempt
      }
    };
    init();
  }, []);

  return isReady;
};

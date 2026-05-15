import { useState, useEffect } from "react";
import axios from "axios";

export const useInitAuth = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await axios.post(
          "http://localhost:3210/api/v1/user/refresh",
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

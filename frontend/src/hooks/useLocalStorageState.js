import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      if (value === null) {
        localStorage.removeItem(key); // remove instead of writing "null"
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [value, key]
  );

  return [value, setValue];
}

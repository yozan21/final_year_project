import { useContext } from "react";
import ModalContext from "../context/ModelContext";

// Custom hook for easier usage
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal context was used outside the context provider!");

  return context;
};

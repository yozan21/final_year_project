import { useNavigate } from "react-router-dom";

export default function useNavigateBack() {
  const navigate = useNavigate();

  return () => navigate(-1);
}

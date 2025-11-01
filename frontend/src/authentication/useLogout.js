import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../services/apiAuth";

export function useLogout() {
  const [, setToken] = useLocalStorageState(null, "auth-token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear token
      setToken(null);
      localStorage.removeItem("auth-token");

      // Invalidate cached user query
      queryClient.removeQueries({ queryKey: ["user"] });

      // Redirect
      navigate("/login", { replace: true });

      window.location.reload();
    },
  });

  return { logout, isPending };
}

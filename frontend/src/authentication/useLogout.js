import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../services/apiAuth";
import { clearToken } from "../hooks/tokenStore";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear token
      clearToken();
      localStorage.removeItem("auth-token");

      // Update auth-related cache without forcing a full page reload.
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["rooms"] });

      // Redirect
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}

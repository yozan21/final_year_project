import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Update auth-related cache without forcing a full page reload.
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["rooms"] });
      queryClient.clear();

      // Redirect
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}

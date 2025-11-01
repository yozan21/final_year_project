import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { getCurrentUserApi } from "../services/apiAuth";

export const useUser = () => {
  const [token] = useLocalStorageState(null, "auth-token");
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!token) return null;
      return await getCurrentUserApi(token);
    },
    // enabled: !!token,
    retry: false,
  });

  return { user, isPending, isAuthenticated: !!user?.role, role: user?.role };
};

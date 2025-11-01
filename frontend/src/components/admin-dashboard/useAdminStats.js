import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getAdminStats } from "../../services/apiAdmin";

export function useAdminStats() {
  const [token] = useLocalStorageState(null, "auth-token");

  const { data: stats, isPending } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      if (!token) return null;
      return await getAdminStats(token);
    },
    // enabled: !!token,
    retry: false,
  });

  return { stats, isPending };
}

import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "../../services/apiAdmin";
import { getToken } from "../../hooks/tokenStore";

export function useAdminStats() {
  const token = getToken();

  const { data: stats, isPending } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      if (!token) return null;
      return await getAdminStats();
    },
    // enabled: !!token,
    retry: false,
  });

  return { stats, isPending };
}

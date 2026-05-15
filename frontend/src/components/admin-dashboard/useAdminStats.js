import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "../../services/apiAdmin";

export function useAdminStats() {
  const { data: stats, isPending } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      return await getAdminStats();
    },
    // enabled: !!token,
    retry: false,
  });

  return { stats, isPending };
}

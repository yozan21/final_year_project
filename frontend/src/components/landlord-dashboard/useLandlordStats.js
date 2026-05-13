import { useQuery } from "@tanstack/react-query";
import { getLandlordStats } from "../../services/apiLandlord";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useLandlordStats() {
  const [token] = useLocalStorageState(null, "auth-token");

  const { data: stats, isPending } = useQuery({
    queryKey: ["landlord-stats"],
    queryFn: async () => {
      if (!token) return null;
      return await getLandlordStats(token);
    },
    // enabled: !!token,
    retry: false,
  });

  return { stats, isPending };
}

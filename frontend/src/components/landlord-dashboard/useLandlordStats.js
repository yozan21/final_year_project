import { useQuery } from "@tanstack/react-query";
import { getLandlordStats } from "../../services/apiLandlord";

export function useLandlordStats() {
  const { data: stats, isPending } = useQuery({
    queryKey: ["landlord-stats"],
    queryFn: async () => {
      return await getLandlordStats();
    },
    // enabled: !!token,
    retry: false,
  });

  return { stats, isPending };
}

import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../services/apiAuth";

export const useUser = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await getCurrentUserApi();
    },
    // enabled: !!token,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { user, isPending, isAuthenticated: !!user?.role, role: user?.role };
};

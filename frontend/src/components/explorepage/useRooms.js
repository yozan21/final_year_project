import { useQuery } from "@tanstack/react-query";
import { getRoomsApi } from "../../services/apiRoom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useRooms() {
  const [token] = useLocalStorageState(null, "auth-token");
  const {
    data: rooms,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      if (!token) return null;
      return await getRoomsApi(token);
    },
    enabled: !!token,
    retry: false,
  });

  return { rooms, isPending, error, isError };
}

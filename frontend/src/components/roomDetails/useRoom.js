import { useQuery } from "@tanstack/react-query";
import { getRoomApi } from "../../services/apiRoom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

export function useRoom(id) {
  const [token] = useLocalStorageState(null, "auth-token");
  const {
    data: room,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: [`room-${id}`],
    queryFn: async () => {
      if (!token) return null;
      return await getRoomApi(token, id);
    },
    enabled: !!token,
    retry: false,
  });

  return { room, isPending, error, isError };
}

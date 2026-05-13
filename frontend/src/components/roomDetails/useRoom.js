import { useQuery } from "@tanstack/react-query";
import { getRoomApi } from "../../services/apiRoom";

export function useRoom(id) {
  const {
    data: room,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: [`room-${id}`],
    queryFn: async () => {
      return await getRoomApi(id);
    },
    retry: false,
  });

  return { room, isPending, error, isError };
}

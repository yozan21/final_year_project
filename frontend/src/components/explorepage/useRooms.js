import { useQuery } from "@tanstack/react-query";
import { getRoomsApi } from "../../services/apiRoom";

export function useRooms() {
  const {
    data: rooms,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      return await getRoomsApi();
    },
  });

  return { rooms, isPending, error, isError };
}

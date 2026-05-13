import { useQuery } from "@tanstack/react-query";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { getNearbyRoomsApi, getRoomsInBoundsApi } from "../../services/apiRoom";

export function useNearbyRooms(coordinates) {
  const [token] = useLocalStorageState(null, "auth-token");

  const { data: rooms = [], isPending } = useQuery({
    queryKey: ["rooms-nearby", coordinates],
    queryFn: () => getNearbyRoomsApi(token, coordinates),
    enabled: !!token && !!coordinates?.lat && !!coordinates?.lng,
    retry: false,
  });

  return { rooms, isPending };
}

export function useRoomsInBounds(bounds, filters) {
  const [token] = useLocalStorageState(null, "auth-token");

  const { data: rooms = [], isPending } = useQuery({
    queryKey: ["rooms-map", bounds, filters],
    queryFn: () => getRoomsInBoundsApi(token, { bounds, filters }),
    enabled: !!token && !!bounds,
    retry: false,
  });

  return { rooms, isPending };
}

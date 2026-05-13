import { useQuery } from "@tanstack/react-query";
import { getNearbyRoomsApi, getRoomsInBoundsApi } from "../../services/apiRoom";
import { getToken } from "../../hooks/tokenStore";

export function useNearbyRooms(coordinates) {
  const token = getToken();
  const { data: rooms = [], isPending } = useQuery({
    queryKey: ["rooms-nearby", coordinates],
    queryFn: () => getNearbyRoomsApi(coordinates),
    enabled: !!token && !!coordinates?.lat && !!coordinates?.lng,
    retry: false,
  });

  return { rooms, isPending };
}

export function useRoomsInBounds(bounds, filters) {
  const token = getToken();

  const { data: rooms = [], isPending } = useQuery({
    queryKey: ["rooms-map", bounds, filters],
    queryFn: () => getRoomsInBoundsApi({ bounds, filters }),
    enabled: !!token && !!bounds,
    retry: false,
  });

  return { rooms, isPending };
}

import { useQuery } from "@tanstack/react-query";
import { getNearbyRoomsApi, getRoomsInBoundsApi } from "../../services/apiRoom";

export function useNearbyRooms(coordinates) {
  const { data: rooms = [], isPending } = useQuery({
    queryKey: ["rooms-nearby", coordinates],
    queryFn: () => getNearbyRoomsApi(coordinates),
    enabled: !!coordinates?.lat && !!coordinates?.lng,
    retry: false,
  });

  return { rooms, isPending };
}

export function useRoomsInBounds(bounds, filters) {
  const { data: rooms = [], isPending } = useQuery({
    queryKey: ["rooms-map", bounds, filters],
    queryFn: () => getRoomsInBoundsApi({ bounds, filters }),
    enabled: !!bounds,
    retry: false,
  });

  return { rooms, isPending };
}

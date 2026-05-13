import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { deleteRoomApi } from "../../services/apiRoom";

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  const [token] = useLocalStorageState(null, "auth-token");

  const {
    mutate: deleteRoom,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (id) => await deleteRoomApi(token, id),
    onSuccess: (id) => {
      queryClient.setQueryData(["rooms"], (old = []) =>
        old.filter((room) => room.id !== id),
      );

      queryClient.invalidateQueries({
        queryKey: ["rooms"],
        refetchType: "active", // only refetch if query is currently mounted
      });

      queryClient.removeQueries([`room-${id}`]);
      toast.success("Room deleted successfully");
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || "Something went wrong!");
      console.log("Error:", e.response);
    },
  });

  return { deleteRoom, isPending, isSuccess };
}

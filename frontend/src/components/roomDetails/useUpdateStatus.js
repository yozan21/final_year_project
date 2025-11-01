import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoomStatusApi } from "../../services/apiRoom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import toast from "react-hot-toast";

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const [token] = useLocalStorageState(null, "auth-token");

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, status }) =>
      await updateRoomStatusApi(token, id, status),

    onSuccess: (room) => {
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
        refetchType: "active", // only refetch if query is currently mounted
      });
      queryClient.invalidateQueries({
        queryKey: [`room-${room.id}`],
        refetchType: "active", // only refetch if query is currently mounted
      });
      console.log(room);
      toast.success("Room status updated");
    },

    onError: (err) => {
      console.log(err);
      toast.error("Error updating status");
    },
  });

  return { updateStatus, isPending };
}

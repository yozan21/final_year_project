import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoomStatusApi } from "../../services/apiRoom";
import toast from "react-hot-toast";

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, status }) => await updateRoomStatusApi(id, status),

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

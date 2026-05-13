import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoomApi } from "../../services/apiRoom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateRoom() {
  const [token] = useLocalStorageState(null, "auth-token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateRoom, isPending } = useMutation({
    mutationFn: async ({ id, formData }) =>
      await updateRoomApi(token, id, formData),
    onSuccess: (room) => {
      queryClient.setQueryData([`room-${room.id}`, room]);
      navigate(`/room/${room.id}`);
      toast.success("Room updated successfully");
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || "Something went wrong!");
      console.log("Error:", e.response);
    },
  });

  return { updateRoom, isPending };
}

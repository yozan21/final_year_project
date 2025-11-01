import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoomApi } from "../../services/apiRoom";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateRoom() {
  const [token] = useLocalStorageState(null, "auth-token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createRoom, isPending } = useMutation({
    mutationFn: async (formData) => await createRoomApi(token, formData),
    onSuccess: (room) => {
      queryClient.setQueryData([`room-${room.id}`]);
      navigate(`/room/${room.id}`);
      toast.success("Room created successfully");
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || "Something went wrong!");
      console.log("Error:", e.response);
    },
  });

  return { createRoom, isPending };
}

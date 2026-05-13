import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoomApi } from "../../services/apiRoom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export function useCreateRoom() {
  const [fieldErrors, setFieldErrors] = useState();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createRoom, isPending } = useMutation({
    mutationFn: async (formData) => await createRoomApi(formData),
    onSuccess: (room) => {
      queryClient.setQueryData([`room-${room.id}`]);
      navigate(`/room/${room.id}`);
      toast.success("Room created successfully");
    },
    onError: (e) => {
      const { errors, message } = e.response?.data || {};
      if (errors) {
        setFieldErrors(errors); // { email: "...", name: "..." }
      } else {
        toast.error(message || "Something went wrong!");
      }
    },
  });

  return { createRoom, isPending, fieldErrors };
}

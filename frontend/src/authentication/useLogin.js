import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToken } from "../hooks/tokenStore";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ email, password }) =>
      await loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data.user);
      setToken(user.token);
      if (user.data.user.role === "admin") {
        navigate("/admin");
      } else if (user.data.user.role === "landlord") {
        navigate("/landlord-dashboard");
      } else {
        navigate("/");
      }
      toast.success("Successfully logged in!");
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || "Something went wrong!");
      console.log("Error:", e.response);
    },
  });

  return { login, isPending };
};

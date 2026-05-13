import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import toast from "react-hot-toast";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [_, setToken] = useLocalStorageState(null, "auth-token");

  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({
      name,
      email,
      address,
      phone,
      phoneSecond = "",
      role = "client",
      password,
      confirmPassword,
    }) =>
      signupApi({
        name,
        email,
        address,
        phone,
        phoneSecond,
        role,
        password,
        confirmPassword,
      }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data.user);
      setToken(`Bearer ${user.token}`);
      navigate(user.data.user.role === "client" ? "/" : "/landlord-dashboard");
      toast.success(`Signed up as ${user.data.user.role}. Welcome!!`);
    },
    onError: (e) => {
      toast.error(e.response?.data?.message || "Something went wrong!");
      console.log("Error:", e.response);
    },
  });

  return { signup, isPending };
};

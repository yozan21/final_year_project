import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export const useSignup = () => {
  const [fieldErrors, setFieldErrors] = useState();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      navigate(user.data.user.role === "client" ? "/" : "/landlord-dashboard");
      toast.success(`Signed up as ${user.data.user.role}. Welcome!!`);
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

  return { signup, isPending, fieldErrors };
};

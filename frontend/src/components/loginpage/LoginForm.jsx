import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLogin } from "../../authentication/useLogin";

import SpinnerMini from "../../ui/SpinnerMini";

const Form = styled.form`
  background: var(--surface);
  border-radius: 0.5rem;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  position: relative;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  border: 1.5px solid var(--mutedText);
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: border 0.2s;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const Error = styled.span`
  color: #e74c3c;
  font-size: 0.97rem;
  margin-top: 0.1rem;
`;

const Button = styled.button`
  background: var(--primary);
  color: #fff;
  font-weight: 600;
  font-size: 1.3rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.9rem 0;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  &:hover {
    background: var(--accent);
  }
`;

const ShowPasswordBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 5px;
  top: 43px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    // Handle login logic here
    console.log(data, isPending);
    const { email, password } = data;
    login({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jondoe@example.com"
          name="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Password"
          name="password"
          {...register("password", { required: "Password is required" })}
        />
        <ShowPasswordBtn
          type="button"
          onClick={() => setShowPassword((sh) => !sh)}
        >
          {!showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </ShowPasswordBtn>

        {errors.password && <Error>{errors.password.message}</Error>}
      </FormGroup>
      <Button type="submit" disabled={isPending}>
        {isPending ? <SpinnerMini /> : "Log In"}
        {/* <SpinnerMini /> */}
      </Button>
    </Form>
  );
};

export default LoginForm;

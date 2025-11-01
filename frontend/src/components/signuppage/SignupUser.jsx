import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button } from "../../styles/buttons";
import { FiEye, FiEyeOff } from "react-icons/fi";

import SpinnerMini from "../../ui/SpinnerMini";
import { useSignup } from "../../authentication/useSignup";

const Form = styled.form`
  background: var(--surface);
  border-radius: 1rem;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  color: var(--primary);
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
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
  font-size: 1.1rem;
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

const SignupUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle signup logic here
    const {
      fName,
      lName,
      phone,
      email,
      address,
      phoneSecond = "",
      password,
      confirmPassword,
    } = data;
    const name = `${fName} ${lName}`;
    const role = "client";

    signup({
      name,
      phone,
      email,
      address,
      phoneSecond,
      role,
      password,
      confirmPassword,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Sign Up</Title>
      <Grid>
        <FormGroup>
          <Label htmlFor="fName">First Name</Label>
          <Input
            id="fName"
            type="text"
            placeholder="First Name"
            {...register("fName", { required: "First name is required" })}
          />
          {errors.fName && <Error>{errors.fName.message}</Error>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lName">Last Name</Label>
          <Input
            id="lName"
            type="text"
            placeholder="Last Name"
            {...register("lName", { required: "lName is required" })}
          />
          {errors.lName && <Error>{errors.lName.message}</Error>}
        </FormGroup>
      </Grid>
      <Grid>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <Error>{errors.address.message}</Error>}
        </FormGroup>
      </Grid>
      <Grid>
        <FormGroup>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[0-9\-\s]{7,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && <Error>{errors.phone.message}</Error>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phoneSecond">Secondary Phone Number</Label>
          <Input
            id="phoneSecond"
            type="tel"
            placeholder="Secondary Phone Number"
            {...register("phoneSecond", {
              pattern: {
                value: /^\+?[0-9\-\s]{7,15}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phoneSecond && <Error>{errors.phoneSecond.message}</Error>}
        </FormGroup>
      </Grid>
      <Grid>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <ShowPasswordBtn
            type="button"
            onClick={() => setShowPassword((sh) => !sh)}
          >
            {!showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </ShowPasswordBtn>
          {errors.password && <Error>{errors.password.message}</Error>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <ShowPasswordBtn
            type="button"
            onClick={() => setShowConfirmPassword((sh) => !sh)}
          >
            {!showConfirmPassword ? (
              <FiEye size={20} />
            ) : (
              <FiEyeOff size={20} />
            )}
          </ShowPasswordBtn>
          {errors.confirmPassword && (
            <Error>{errors.confirmPassword.message}</Error>
          )}
        </FormGroup>
      </Grid>
      <Button type="submit" disabled={isPending}>
        {isPending ? <SpinnerMini /> : "Sign Up"}
      </Button>
    </Form>
  );
};

export default SignupUser;

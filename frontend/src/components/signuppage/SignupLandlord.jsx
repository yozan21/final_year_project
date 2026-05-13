import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button } from "../../styles/buttons";
import { useSignup } from "../../authentication/useSignup";

import SpinnerMini from "../../ui/SpinnerMini";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LocationSelector from "../../features/location/LocationSelector";

const Form = styled.form`
  background: var(--surface);
  border-radius: 8px;
  border: 1px solid var(--border);
  box-shadow: 0 14px 34px var(--boxShadow);
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
  color: var(--text);
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

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  position: relative;
`;

const Label = styled.label`
  font-weight: 800;
  font-size: 0.92rem;
  color: var(--text);
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  padding: 0.9rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: border 0.2s;
  &:focus {
    border-color: var(--primary);
    outline: none;
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

const Error = styled.p`
  color: #e74c3c;
  font-size: 0.97rem;
  margin-top: 0.1rem;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const SignupLandlord = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [address, setAddress] = useState({});

  const { signup, isPending, fieldErrors } = useSignup();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle landlord signup logic here
    const {
      name,
      phone,
      email,
      phoneSecond = "",
      password,
      confirmPassword,
    } = data;
    const role = "landlord";

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

  useEffect(() => {
    if (!fieldErrors) return;
    Object.entries(fieldErrors).forEach(([field, message]) => {
      setError(field, { type: "server", message });
    });
  }, [fieldErrors, setError]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Landlord Sign Up</Title>
      <Grid>
        <FormGroup>
          <Label htmlFor="name">Full Name*</Label>
          <Input
            id="name"
            type="text"
            placeholder="Jon Doe"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email*</Label>
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
      </Grid>
      <FullWidth>
        <LocationSelector value={address} onChange={setAddress} required />
      </FullWidth>
      <Grid>
        <FormGroup>
          <Label htmlFor="phone">Phone Number*</Label>
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
          <Label htmlFor="password">Password*</Label>
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
          <Label htmlFor="confirmPassword">Confirm Password*</Label>
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

export default SignupLandlord;

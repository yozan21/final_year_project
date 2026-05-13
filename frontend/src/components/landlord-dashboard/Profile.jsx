import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiSave,
  FiX,
  FiEye,
  FiEyeOff,
  FiCamera,
} from "react-icons/fi";
import { useUI } from "../../context/UIContext";
import toast from "react-hot-toast";

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.1rem;
  margin: 0;
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const AvatarSection = styled.div`
  position: relative;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarUpload = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.primary};
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }

  input {
    display: none;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ProfileName = styled.h2`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.5rem 0;
`;

const ProfileEmail = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mutedText};
`;

const EditButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.accent};
    transform: translateY(-1px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div``;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.primary}20;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? "#ef4444" : theme.mutedText)};
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? "#ef4444" : theme.mutedText)};
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s;
  resize: vertical;
  min-height: 100px;
  font-family: ${({ theme }) => theme.fontBody};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const PasswordSection = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const PasswordInput = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;
  padding: 0.25rem;
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: ${({ theme }) => theme.primary};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.accent};
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.mutedText};

    &:hover {
      background: ${({ theme }) => theme.background};
    }
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const Profile = () => {
  const { theme } = useUI();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      bio: "Experienced landlord with over 10 years in property management. I specialize in providing quality housing solutions for students and young professionals.",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Profile data:", data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setIsChangingPassword(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    reset();
  };

  const getInitials = () => {
    const firstName = watch("firstName") || "John";
    const lastName = watch("lastName") || "Doe";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <ProfileContainer>
      <PageHeader>
        <PageTitle theme={theme}>Profile Settings</PageTitle>
        <PageSubtitle theme={theme}>
          Manage your account information and preferences.
        </PageSubtitle>
      </PageHeader>

      <ProfileCard theme={theme}>
        <ProfileHeader>
          <AvatarSection>
            <Avatar theme={theme}>
              {avatar ? (
                <AvatarImage src={avatar} alt="Profile" />
              ) : (
                getInitials()
              )}
            </Avatar>
            <AvatarUpload theme={theme}>
              <FiCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </AvatarUpload>
          </AvatarSection>

          <ProfileInfo>
            <ProfileName theme={theme}>
              {watch("firstName")} {watch("lastName")}
            </ProfileName>
            <ProfileEmail theme={theme}>
              <FiMail />
              {watch("email")}
            </ProfileEmail>
            <ProfileStats>
              <Stat>
                <StatValue theme={theme}>12</StatValue>
                <StatLabel theme={theme}>Properties</StatLabel>
              </Stat>
              <Stat>
                <StatValue theme={theme}>24</StatValue>
                <StatLabel theme={theme}>Reviews</StatLabel>
              </Stat>
              <Stat>
                <StatValue theme={theme}>4.8</StatValue>
                <StatLabel theme={theme}>Rating</StatLabel>
              </Stat>
            </ProfileStats>
          </ProfileInfo>

          {!isEditing && (
            <EditButton theme={theme} onClick={() => setIsEditing(true)}>
              <FiEdit />
              Edit Profile
            </EditButton>
          )}
        </ProfileHeader>

        {isEditing ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormSection>
              <SectionTitle theme={theme}>Personal Information</SectionTitle>
              <FormGrid>
                <FormGroup>
                  <Label theme={theme}>First Name *</Label>
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    theme={theme}
                    hasError={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Last Name *</Label>
                  <Input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    theme={theme}
                    hasError={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Email *</Label>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    theme={theme}
                    hasError={!!errors.email}
                  />
                  {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Phone</Label>
                  <Input
                    {...register("phone")}
                    theme={theme}
                    hasError={!!errors.phone}
                  />
                  {errors.phone && (
                    <ErrorMessage>{errors.phone.message}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Location</Label>
                  <Input
                    {...register("location")}
                    theme={theme}
                    hasError={!!errors.location}
                  />
                  {errors.location && (
                    <ErrorMessage>{errors.location.message}</ErrorMessage>
                  )}
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionTitle theme={theme}>About</SectionTitle>
              <FormGroup>
                <Label theme={theme}>Bio</Label>
                <TextArea
                  {...register("bio")}
                  placeholder="Tell us about yourself..."
                  theme={theme}
                  hasError={!!errors.bio}
                />
                {errors.bio && (
                  <ErrorMessage>{errors.bio.message}</ErrorMessage>
                )}
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle theme={theme}>Change Password</SectionTitle>
              <PasswordSection theme={theme}>
                <FormGrid>
                  <FormGroup>
                    <Label theme={theme}>Current Password</Label>
                    <PasswordInput>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...register("currentPassword")}
                        theme={theme}
                        hasError={!!errors.currentPassword}
                      />
                      <PasswordToggle
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        theme={theme}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </PasswordToggle>
                    </PasswordInput>
                    {errors.currentPassword && (
                      <ErrorMessage>
                        {errors.currentPassword.message}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label theme={theme}>New Password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("newPassword", {
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      theme={theme}
                      hasError={!!errors.newPassword}
                    />
                    {errors.newPassword && (
                      <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label theme={theme}>Confirm New Password</Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        validate: (value) =>
                          value === watch("newPassword") ||
                          "Passwords do not match",
                      })}
                      theme={theme}
                      hasError={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <ErrorMessage>
                        {errors.confirmPassword.message}
                      </ErrorMessage>
                    )}
                  </FormGroup>
                </FormGrid>
              </PasswordSection>
            </FormSection>

            <FormActions theme={theme}>
              <Button
                type="button"
                className="secondary"
                theme={theme}
                onClick={handleCancel}
              >
                <FiX />
                Cancel
              </Button>
              <Button
                type="submit"
                className="primary"
                theme={theme}
                disabled={isSubmitting}
              >
                <FiSave />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </FormActions>
          </Form>
        ) : (
          <div>
            <FormSection>
              <SectionTitle theme={theme}>Personal Information</SectionTitle>
              <FormGrid>
                <FormGroup>
                  <Label theme={theme}>First Name</Label>
                  <Input value={watch("firstName")} disabled theme={theme} />
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Last Name</Label>
                  <Input value={watch("lastName")} disabled theme={theme} />
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Email</Label>
                  <Input value={watch("email")} disabled theme={theme} />
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Phone</Label>
                  <Input value={watch("phone")} disabled theme={theme} />
                </FormGroup>

                <FormGroup>
                  <Label theme={theme}>Location</Label>
                  <Input value={watch("location")} disabled theme={theme} />
                </FormGroup>
              </FormGrid>
            </FormSection>

            <FormSection>
              <SectionTitle theme={theme}>About</SectionTitle>
              <FormGroup>
                <Label theme={theme}>Bio</Label>
                <TextArea value={watch("bio")} disabled theme={theme} />
              </FormGroup>
            </FormSection>
          </div>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;

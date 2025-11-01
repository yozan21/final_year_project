import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiSettings,
  FiSave,
  FiRefreshCw,
  FiShield,
  FiBell,
  FiDatabase,
  FiGlobe,
  FiMail,
  FiLock,
  FiUsers,
  FiHome,
  FiDollarSign,
  FiAlertTriangle,
} from "react-icons/fi";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.1rem;
  margin: 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const SettingsSection = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SectionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ color }) => `${color}20`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const SectionDescription = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
`;

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.mutedText}30;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.mutedText}30;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.mutedText}30;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const ToggleInfo = styled.div`
  flex: 1;
`;

const ToggleTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const ToggleDescription = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mutedText};
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.primary};
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.mutedText}40;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &.primary {
    background: ${({ theme }) => theme.primary};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.accent};
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.mutedText}30;

    &:hover {
      background: ${({ theme }) => theme.surface};
    }
  }

  &.danger {
    background: "#FEE2E2";
    color: "#EF4444";
    border: 1px solid "#FECACA";

    &:hover {
      background: "#FEE2E2";
      color: "#DC2626";
    }
  }
`;

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "GharSajilo",
    siteDescription: "Find your perfect rental home",
    contactEmail: "admin@GharSajilo.com",
    supportPhone: "+977-9800000000",

    // Security Settings
    requireEmailVerification: true,
    requirePhoneVerification: false,
    enableTwoFactorAuth: true,
    maxLoginAttempts: 5,

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,

    // Room Settings
    autoApproveListings: false,
    requireLandlordVerification: true,
    maxImagesPerListing: 10,
    maxListingsPerUser: 5,

    // Payment Settings
    enablePayments: true,
    currency: "NPR",
    transactionFee: 2.5,
  });

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleChange = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving settings:", settings);
    // Here you would typically save to backend
  };

  const handleReset = () => {
    // Reset to default values
    console.log("Resetting settings");
  };

  return (
    <Container>
      <Header>
        <Title>System Settings</Title>
        <Subtitle>Configure platform settings and preferences</Subtitle>
      </Header>

      <SettingsGrid>
        {/* General Settings */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SectionHeader>
            <SectionIcon color="#7B61FF">
              <FiSettings />
            </SectionIcon>
            <div>
              <SectionTitle>General Settings</SectionTitle>
              <SectionDescription>
                Basic platform configuration and contact information
              </SectionDescription>
            </div>
          </SectionHeader>

          <SettingsForm>
            <FormGroup>
              <Label>Site Name</Label>
              <Input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Site Description</Label>
              <Textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  handleInputChange("siteDescription", e.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Support Phone</Label>
              <Input
                type="tel"
                value={settings.supportPhone}
                onChange={(e) =>
                  handleInputChange("supportPhone", e.target.value)
                }
              />
            </FormGroup>
          </SettingsForm>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <SectionHeader>
            <SectionIcon color="#EF4444">
              <FiShield />
            </SectionIcon>
            <div>
              <SectionTitle>Security Settings</SectionTitle>
              <SectionDescription>
                Configure security and authentication settings
              </SectionDescription>
            </div>
          </SectionHeader>

          <SettingsForm>
            <ToggleContainer>
              <ToggleInfo>
                <ToggleTitle>Require Email Verification</ToggleTitle>
                <ToggleDescription>
                  Users must verify their email before accessing the platform
                </ToggleDescription>
              </ToggleInfo>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={() =>
                    handleToggleChange("requireEmailVerification")
                  }
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>

            <ToggleContainer>
              <ToggleInfo>
                <ToggleTitle>Require Phone Verification</ToggleTitle>
                <ToggleDescription>
                  Users must verify their phone number
                </ToggleDescription>
              </ToggleInfo>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={settings.requirePhoneVerification}
                  onChange={() =>
                    handleToggleChange("requirePhoneVerification")
                  }
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>

            <ToggleContainer>
              <ToggleInfo>
                <ToggleTitle>Enable Two-Factor Authentication</ToggleTitle>
                <ToggleDescription>
                  Require 2FA for admin accounts
                </ToggleDescription>
              </ToggleInfo>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={settings.enableTwoFactorAuth}
                  onChange={() => handleToggleChange("enableTwoFactorAuth")}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>

            <FormGroup>
              <Label>Maximum Login Attempts</Label>
              <Input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) =>
                  handleInputChange(
                    "maxLoginAttempts",
                    parseInt(e.target.value)
                  )
                }
                min="1"
                max="10"
              />
            </FormGroup>
          </SettingsForm>
        </SettingsSection>

        {/* Room Management Settings */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <SectionHeader>
            <SectionIcon color="#10B981">
              <FiHome />
            </SectionIcon>
            <div>
              <SectionTitle>Room Management</SectionTitle>
              <SectionDescription>
                Configure room listing and approval settings
              </SectionDescription>
            </div>
          </SectionHeader>

          <SettingsForm>
            <ToggleContainer>
              <ToggleInfo>
                <ToggleTitle>Auto-Approve Listings</ToggleTitle>
                <ToggleDescription>
                  Automatically approve new room listings
                </ToggleDescription>
              </ToggleInfo>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={settings.autoApproveListings}
                  onChange={() => handleToggleChange("autoApproveListings")}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>

            <ToggleContainer>
              <ToggleInfo>
                <ToggleTitle>Require Landlord Verification</ToggleTitle>
                <ToggleDescription>
                  Landlords must be verified before posting listings
                </ToggleDescription>
              </ToggleInfo>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={settings.requireLandlordVerification}
                  onChange={() =>
                    handleToggleChange("requireLandlordVerification")
                  }
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>

            <FormGroup>
              <Label>Maximum Images Per Listing</Label>
              <Input
                type="number"
                value={settings.maxImagesPerListing}
                onChange={(e) =>
                  handleInputChange(
                    "maxImagesPerListing",
                    parseInt(e.target.value)
                  )
                }
                min="1"
                max="20"
              />
            </FormGroup>

            <FormGroup>
              <Label>Maximum Listings Per User</Label>
              <Input
                type="number"
                value={settings.maxListingsPerUser}
                onChange={(e) =>
                  handleInputChange(
                    "maxListingsPerUser",
                    parseInt(e.target.value)
                  )
                }
                min="1"
                max="20"
              />
            </FormGroup>
          </SettingsForm>
        </SettingsSection>

        {/* Payment Settings */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <SectionHeader>
            <SectionIcon color="#F59E0B">
              <FiDollarSign />
            </SectionIcon>
            <div>
              <SectionTitle>Payment Settings</SectionTitle>
              <SectionDescription>
                Configure payment processing and fees
              </SectionDescription>
            </div>
          </SectionHeader>

          <SettingsForm>
            <ToggleContainer>
              <ToggleInfo>
                <ToggleTitle>Enable Payments</ToggleTitle>
                <ToggleDescription>
                  Allow users to process payments through the platform
                </ToggleDescription>
              </ToggleInfo>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={settings.enablePayments}
                  onChange={() => handleToggleChange("enablePayments")}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </ToggleContainer>

            <FormGroup>
              <Label>Currency</Label>
              <Select
                value={settings.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              >
                <option value="NPR">NPR (Nepalese Rupee)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Transaction Fee (%)</Label>
              <Input
                type="number"
                value={settings.transactionFee}
                onChange={(e) =>
                  handleInputChange(
                    "transactionFee",
                    parseFloat(e.target.value)
                  )
                }
                min="0"
                max="10"
                step="0.1"
              />
            </FormGroup>
          </SettingsForm>
        </SettingsSection>

        {/* Action Buttons */}
        <SettingsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ActionButtons>
            <Button className="primary" onClick={handleSave}>
              <FiSave />
              Save Settings
            </Button>
            <Button className="secondary" onClick={handleReset}>
              <FiRefreshCw />
              Reset to Defaults
            </Button>
          </ActionButtons>
        </SettingsSection>
      </SettingsGrid>
    </Container>
  );
};

export default SystemSettings;

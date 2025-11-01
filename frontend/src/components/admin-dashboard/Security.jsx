import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiShield,
  FiLock,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEyeOff,
  FiKey,
  FiUser,
  FiClock,
  FiMapPin,
  FiActivity,
} from "react-icons/fi";

const Container = styled.div`
  max-width: 1400px;
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

const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SecurityCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.boxShadowHover};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CardIcon = styled.div`
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

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
`;

const SecurityStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({ status, theme }) => {
    switch (status) {
      case "secure":
        return "#10B98120";
      case "warning":
        return "#F59E0B20";
      case "danger":
        return "#EF444420";
      default:
        return theme.mutedText + "20";
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "secure":
        return "#10B981";
      case "warning":
        return "#F59E0B";
      case "danger":
        return "#EF4444";
      default:
        return theme.mutedText;
    }
  }};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ActivitySection = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.mutedText}10;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary}30;
    background: ${({ theme }) => `${theme.primary}05`};
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ color }) => `${color}20`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const ActivityDetails = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mutedText};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.mutedText};
`;

const SettingsSection = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  margin-bottom: 1rem;
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

const Security = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: false,
    auditLogging: true,
    dataEncryption: true,
  });

  const handleToggleChange = (field) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Mock security activity data
  const securityActivity = [
    {
      id: 1,
      title: "Failed login attempt",
      details: "IP: 192.168.1.100",
      time: "2 minutes ago",
      type: "warning",
      icon: <FiAlertTriangle />,
      color: "#F59E0B",
    },
    {
      id: 2,
      title: "Admin login successful",
      details: "User: admin@GharSajilo.com",
      time: "15 minutes ago",
      type: "secure",
      icon: <FiCheckCircle />,
      color: "#10B981",
    },
    {
      id: 3,
      title: "Suspicious activity detected",
      details: "Multiple failed attempts",
      time: "1 hour ago",
      type: "danger",
      icon: <FiXCircle />,
      color: "#EF4444",
    },
    {
      id: 4,
      title: "Security settings updated",
      details: "Two-factor authentication enabled",
      time: "2 hours ago",
      type: "secure",
      icon: <FiShield />,
      color: "#10B981",
    },
    {
      id: 5,
      title: "New admin user created",
      details: "User: ravi.admin@GharSajilo.com",
      time: "3 hours ago",
      type: "secure",
      icon: <FiUser />,
      color: "#7B61FF",
    },
  ];

  const securityMetrics = [
    {
      id: 1,
      title: "Active Sessions",
      value: "12",
      status: "secure",
      icon: <FiActivity />,
      color: "#10B981",
    },
    {
      id: 2,
      title: "Failed Attempts",
      value: "3",
      status: "warning",
      icon: <FiAlertTriangle />,
      color: "#F59E0B",
    },
    {
      id: 3,
      title: "Blocked IPs",
      value: "1",
      status: "danger",
      icon: <FiXCircle />,
      color: "#EF4444",
    },
    {
      id: 4,
      title: "Security Score",
      value: "95%",
      status: "secure",
      icon: <FiShield />,
      color: "#7B61FF",
    },
  ];

  return (
    <Container>
      <Header>
        <Title>Security Dashboard</Title>
        <Subtitle>Monitor and manage platform security</Subtitle>
      </Header>

      <SecurityGrid>
        {securityMetrics.map((metric, index) => (
          <SecurityCard
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <CardHeader>
              <CardIcon color={metric.color}>{metric.icon}</CardIcon>
              <div>
                <CardTitle>{metric.title}</CardTitle>
                <CardDescription>Current security metric</CardDescription>
              </div>
            </CardHeader>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#1F2937",
                }}
              >
                {metric.value}
              </div>
              <SecurityStatus status={metric.status}>
                {metric.status === "secure" && <FiCheckCircle />}
                {metric.status === "warning" && <FiAlertTriangle />}
                {metric.status === "danger" && <FiXCircle />}
                {metric.status}
              </SecurityStatus>
            </div>
          </SecurityCard>
        ))}
      </SecurityGrid>

      <ContentGrid>
        <ActivitySection>
          <SectionTitle>Security Activity</SectionTitle>
          <ActivityList>
            {securityActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ActivityItem>
                  <ActivityIcon color={activity.color}>
                    {activity.icon}
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>{activity.title}</ActivityTitle>
                    <ActivityDetails>
                      <span>{activity.details}</span>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityDetails>
                  </ActivityContent>
                </ActivityItem>
              </motion.div>
            ))}
          </ActivityList>
        </ActivitySection>

        <SettingsSection>
          <SectionTitle>Security Settings</SectionTitle>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleTitle>Two-Factor Authentication</ToggleTitle>
              <ToggleDescription>
                Require 2FA for all admin accounts
              </ToggleDescription>
            </ToggleInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={() => handleToggleChange("twoFactorAuth")}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ToggleContainer>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleTitle>Audit Logging</ToggleTitle>
              <ToggleDescription>
                Log all admin actions for security
              </ToggleDescription>
            </ToggleInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={securitySettings.auditLogging}
                onChange={() => handleToggleChange("auditLogging")}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ToggleContainer>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleTitle>Data Encryption</ToggleTitle>
              <ToggleDescription>Encrypt sensitive user data</ToggleDescription>
            </ToggleInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={securitySettings.dataEncryption}
                onChange={() => handleToggleChange("dataEncryption")}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ToggleContainer>

          <ToggleContainer>
            <ToggleInfo>
              <ToggleTitle>IP Whitelist</ToggleTitle>
              <ToggleDescription>
                Restrict admin access to specific IPs
              </ToggleDescription>
            </ToggleInfo>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={securitySettings.ipWhitelist}
                onChange={() => handleToggleChange("ipWhitelist")}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ToggleContainer>
        </SettingsSection>
      </ContentGrid>
    </Container>
  );
};

export default Security;

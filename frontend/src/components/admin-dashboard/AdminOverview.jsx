import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiHome,
  FiTrendingUp,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiDollarSign,
  FiShield,
  FiSettings,
  FiBarChart2,
  FiBriefcase,
} from "react-icons/fi";
import { useAdminStats } from "./useAdminStats";
import SpinnerContainer from "../../ui/SpinnerContainer";
import Spinner from "../../ui/Spinner";

const OverviewContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.1rem;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.boxShadowHover};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${({ color }) => `${color}20`};
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.mutedText};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const StatChange = styled.div`
  font-size: 0.875rem;
  color: ${({ isPositive }) => (isPositive ? "#10B981" : "#EF4444")};
  font-weight: 500;
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

const RecentActivitySection = styled.div`
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

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.mutedText};
`;

const QuickActionsSection = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.accent};
    transform: translateY(-1px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatusCard = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const StatusValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const StatusLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.mutedText};
`;

const AdminOverview = () => {
  const { stats, isPending } = useAdminStats();
  // Calculate statistics

  if (isPending)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  const {
    totalUsers,
    totalRooms,
    activeRooms,
    pendingRooms,
    bookedRooms,
    totalClient,
    totalLandlord,
    totalAdmin,
    verifiedUsers,
  } = stats;

  const recentActivity = [
    {
      id: 1,
      title: "New landlord registration",
      time: "2 hours ago",
      icon: <FiUsers />,
      color: "#7B61FF",
    },
    {
      id: 2,
      title: "Room listing approved",
      time: "4 hours ago",
      icon: <FiCheckCircle />,
      color: "#10B981",
    },
    {
      id: 3,
      title: "User verification completed",
      time: "6 hours ago",
      icon: <FiShield />,
      color: "#F59E0B",
    },
    {
      id: 4,
      title: "New room listing submitted",
      time: "1 day ago",
      icon: <FiHome />,
      color: "#C084FC",
    },
  ];

  const statsArr = [
    {
      id: 1,
      label: "Total Users",
      value: totalUsers?.toString(),
      change: "+12%",
      isPositive: true,
      icon: <FiUsers />,
      color: "#7B61FF",
    },
    {
      id: 2,
      label: "Total Rooms",
      value: totalRooms?.toString(),
      change: "+8%",
      isPositive: true,
      icon: <FiHome />,
      color: "#C084FC",
    },
    {
      id: 3,
      label: "Booked Rooms",
      value: bookedRooms.toString(),
      change: "0%",
      isPositive: true,
      icon: <FiBriefcase />,
      color: "#7b61ff",
    },
    {
      id: 4,
      label: "Active Listings",
      value: activeRooms.toString(),
      change: "+15%",
      isPositive: true,
      icon: <FiTrendingUp />,
      color: "#10B981",
    },
    {
      id: 5,
      label: "Pending Approvals",
      value: pendingRooms.toString(),
      change: "-5%",
      isPositive: false,
      icon: <FiClock />,
      color: "#F59E0B",
    },

    {
      id: 6,
      label: "Verified Users",
      value: verifiedUsers.toString(),
      change: "-5%",
      isPositive: false,
      icon: <FiCheckCircle />,
      color: "#10B981",
    },
  ];

  return (
    <OverviewContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome to Admin Dashboard 👋</WelcomeTitle>
        <WelcomeSubtitle>
          Monitor and manage your GharSajilo platform from here.
        </WelcomeSubtitle>
      </WelcomeSection>

      <StatsGrid>
        {statsArr.map((stat, index) => (
          <StatCard
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <StatHeader>
              <StatIcon color={stat.color}>{stat.icon}</StatIcon>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
            <StatChange isPositive={stat.isPositive}>
              {stat.change} from last month
            </StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid>
        <RecentActivitySection>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityList>
            {recentActivity.map((activity, index) => (
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
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityContent>
                </ActivityItem>
              </motion.div>
            ))}
          </ActivityList>
        </RecentActivitySection>

        <QuickActionsSection>
          <SectionTitle>Quick Actions</SectionTitle>
          <ActionButton>
            <FiUsers />
            Manage Users
          </ActionButton>
          <ActionButton>
            <FiHome />
            Review Listings
          </ActionButton>
          <ActionButton>
            <FiSettings />
            System Settings
          </ActionButton>
          <ActionButton>
            <FiBarChart2 />
            View Reports
          </ActionButton>

          <SectionTitle style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            User Breakdown
          </SectionTitle>
          <StatusGrid>
            <StatusCard>
              <StatusValue>{totalLandlord}</StatusValue>
              <StatusLabel>Landlords</StatusLabel>
            </StatusCard>
            <StatusCard>
              <StatusValue>{totalClient}</StatusValue>
              <StatusLabel>Clients</StatusLabel>
            </StatusCard>
            <StatusCard>
              <StatusValue>{totalAdmin}</StatusValue>
              <StatusLabel>Admins</StatusLabel>
            </StatusCard>
          </StatusGrid>
        </QuickActionsSection>
      </ContentGrid>
    </OverviewContainer>
  );
};

export default AdminOverview;

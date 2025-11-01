import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiHome,
  FiDollarSign,
  FiEye,
  FiDownload,
  FiCalendar,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";
import { users, rooms } from "../../data/mockData";

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

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const DateFilter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.mutedText}30;
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
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

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.mutedText}30;
  border-radius: 8px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
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

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
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

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ isPositive }) => (isPositive ? "#10B981" : "#EF4444")};
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

const ChartSection = styled.div`
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

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}10,
    ${({ theme }) => theme.accent}10
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.mutedText};
  font-size: 1.1rem;
  border: 2px dashed ${({ theme }) => theme.mutedText}30;
`;

const TopListSection = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  margin-bottom: 0.75rem;
  border: 1px solid ${({ theme }) => theme.mutedText}10;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary}30;
    background: ${({ theme }) => `${theme.primary}05`};
  }
`;

const ListItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ListItemAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ListItemDetails = styled.div`
  flex: 1;
`;

const ListItemTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const ListItemSubtitle = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mutedText};
`;

const ListItemValue = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const ReportsSection = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
`;

const ReportCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary}30;
    transform: translateY(-1px);
  }
`;

const ReportInfo = styled.div`
  flex: 1;
`;

const ReportTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const ReportDescription = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mutedText};
`;

const ReportButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 500;
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

const ReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [reportType, setReportType] = useState("all");

  // Calculate statistics
  const totalUsers = users.length;
  const totalRooms = rooms.length;
  const activeRooms = rooms.filter((room) => room.status === "active").length;
  const pendingRooms = rooms.filter((room) => room.status === "pending").length;
  const landlords = users.filter((user) => user.role === "landlord").length;
  const clients = users.filter((user) => user.role === "client").length;
  const totalViews = rooms.reduce((sum, room) => sum + room.views, 0);

  // Mock data for top performers
  const topLandlords = users
    .filter((user) => user.role === "landlord")
    .sort((a, b) => (b.totalListings || 0) - (a.totalListings || 0))
    .slice(0, 5);

  const topRooms = rooms.sort((a, b) => b.views - a.views).slice(0, 5);

  const stats = [
    {
      id: 1,
      label: "Total Users",
      value: totalUsers.toString(),
      change: "+12%",
      isPositive: true,
      icon: <FiUsers />,
      color: "#7B61FF",
    },
    {
      id: 2,
      label: "Total Rooms",
      value: totalRooms.toString(),
      change: "+8%",
      isPositive: true,
      icon: <FiHome />,
      color: "#C084FC",
    },
    {
      id: 3,
      label: "Total Views",
      value: totalViews.toString(),
      change: "+15%",
      isPositive: true,
      icon: <FiEye />,
      color: "#10B981",
    },
    {
      id: 4,
      label: "Pending Approvals",
      value: pendingRooms.toString(),
      change: "-5%",
      isPositive: false,
      icon: <FiTrendingDown />,
      color: "#F59E0B",
    },
  ];

  const reports = [
    {
      id: 1,
      title: "User Growth Report",
      description: "Monthly user registration and growth trends",
      type: "users",
    },
    {
      id: 2,
      title: "Room Performance Report",
      description: "Room listing performance and engagement metrics",
      type: "rooms",
    },
    {
      id: 3,
      title: "Revenue Analytics",
      description: "Platform revenue and transaction analysis",
      type: "revenue",
    },
    {
      id: 4,
      title: "System Health Report",
      description: "Platform performance and system metrics",
      type: "system",
    },
  ];

  const handleGenerateReport = (reportId) => {
    console.log("Generating report:", reportId);
  };

  return (
    <Container>
      <Header>
        <Title>Reports & Analytics</Title>
        <Subtitle>Monitor platform performance and generate insights</Subtitle>
      </Header>

      <ControlsSection>
        <DateFilter>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </Select>
          <Select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="all">All Reports</option>
            <option value="users">User Reports</option>
            <option value="rooms">Room Reports</option>
            <option value="revenue">Revenue Reports</option>
          </Select>
        </DateFilter>

        <ActionButton>
          <FiRefreshCw />
          Refresh Data
        </ActionButton>
      </ControlsSection>

      <StatsGrid>
        {stats.map((stat, index) => (
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
              {stat.isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
              {stat.change} from last month
            </StatChange>
          </StatCard>
        ))}
      </StatsGrid>

      <ContentGrid>
        <ChartSection>
          <SectionTitle>Platform Growth</SectionTitle>
          <ChartPlaceholder>
            Chart visualization would be implemented here
          </ChartPlaceholder>
        </ChartSection>

        <TopListSection>
          <SectionTitle>Top Landlords</SectionTitle>
          {topLandlords.map((landlord, index) => (
            <ListItem key={landlord.id}>
              <ListItemInfo>
                <ListItemAvatar src={landlord.avatar} alt={landlord.name} />
                <ListItemDetails>
                  <ListItemTitle>{landlord.name}</ListItemTitle>
                  <ListItemSubtitle>
                    {landlord.totalListings || 0} listings
                  </ListItemSubtitle>
                </ListItemDetails>
              </ListItemInfo>
              <ListItemValue>{landlord.rating || "N/A"}</ListItemValue>
            </ListItem>
          ))}
        </TopListSection>
      </ContentGrid>

      <ReportsSection>
        <SectionTitle>Generate Reports</SectionTitle>
        {reports.map((report) => (
          <ReportCard key={report.id}>
            <ReportInfo>
              <ReportTitle>{report.title}</ReportTitle>
              <ReportDescription>{report.description}</ReportDescription>
            </ReportInfo>
            <ReportButton onClick={() => handleGenerateReport(report.id)}>
              <FiDownload />
              Generate
            </ReportButton>
          </ReportCard>
        ))}
      </ReportsSection>
    </Container>
  );
};

export default ReportsAnalytics;

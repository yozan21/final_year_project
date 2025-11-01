import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiHome,
  FiEdit,
  FiTrash2,
  FiEye,
  FiBriefcase,
  FiCheckCircle,
  FiRefreshCw,
  FiPlus,
} from "react-icons/fi";
import formatCurrency from "../../utils/formatCurrency";
import {
  ActionButton,
  EmptyIcon,
  EmptyState,
  EmptyText,
  EmptyTitle,
  ListingActions,
  ListingCard,
  ListingContent,
  ListingDetails,
  ListingHeader,
  ListingImage,
  ListingLocation,
  ListingPrice,
  ListingStats,
  ListingTitle,
  Stat,
  StatusBadge,
} from "../../ui/ListingUI";
import { formatSmartDate } from "../../utils/formatSmartDate";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/useUser";
import { useLandlordStats } from "./useLandlordStats";
import { useRooms } from "../explorepage/useRooms";
import Spinner from "../../ui/Spinner";
import SpinnerContainer from "../../ui/SpinnerContainer";
import { useModal } from "../../hooks/useModal";
import PerformAction from "../../ui/PerformAction";
import { useDeleteRoom } from "./useDeleteRoom";

const OverviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 2rem;
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
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  font-weight: 500;
`;

const RecentListingsSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const DashboardOverview = () => {
  const navigate = useNavigate();

  const { stats: stat, isPending: isLoadingStats } = useLandlordStats();
  const { user, isPending: isLoadingUser } = useUser();
  const { rooms, isPending: isLoadingRooms } = useRooms();
  const { deleteRoom, isPending: isDeletingRoom } = useDeleteRoom();

  const { openModal } = useModal();

  const stats = [
    {
      id: 1,
      label: "Total Listings",
      value: stat?.totalListings,
      icon: <FiHome />,
      color: "#7B61FF",
    },
    {
      id: 2,
      label: "Total Views",
      value: stat?.totalViews,
      icon: <FiEye />,
      color: "#C084FC",
    },
    {
      id: 3,
      label: "Bookings",
      value: stat?.bookedRooms,
      icon: <FiBriefcase />,
      color: "#6B7280",
    },
  ];

  // const fifteenDaysAgo = subDays(new Date(), 15);

  const recentListings = rooms?.slice(0, 3);

  const handleView = (id) => {
    navigate(`/room/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/landlord-dashboard/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete listing:", id);
    openModal(
      <PerformAction id={id} operation={deleteRoom} actionType="delete" />
    );
  };
  if (isLoadingUser || isLoadingStats)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );

  return (
    <OverviewContainer>
      <WelcomeSection>
        <WelcomeTitle>
          Welcome back, {user?.name.split(" ").at(0)}! 👋
        </WelcomeTitle>
        <WelcomeSubtitle>
          Here's what's happening with your properties today.
        </WelcomeSubtitle>
      </WelcomeSection>

      <StatsGrid>
        {stats?.map((stat, index) => (
          <StatCard
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <StatHeader>
              <StatIcon color={stat.color}>{stat.icon}</StatIcon>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <RecentListingsSection>
        <SectionTitle>Recent Listings</SectionTitle>
        {isLoadingRooms || isDeletingRoom ? (
          <Spinner />
        ) : (
          <ListingsGrid>
            {!recentListings?.length ? (
              <EmptyState>
                <EmptyIcon>
                  <FiPlus />
                </EmptyIcon>
                <EmptyTitle>No any listings found</EmptyTitle>
                <EmptyText>Create one today.</EmptyText>
              </EmptyState>
            ) : (
              recentListings?.map((listing, index) => (
                <ListingCard
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <ListingImage img={listing.thumbnail.url}>
                    <StatusBadge className={listing.status}>
                      {listing.status}
                    </StatusBadge>
                  </ListingImage>
                  <ListingContent>
                    <ListingHeader>
                      <ListingTitle>{listing.title}</ListingTitle>
                    </ListingHeader>
                    <ListingLocation>{listing.location}</ListingLocation>
                    <ListingDetails>
                      <ListingPrice>
                        {formatCurrency(listing.price)} / month
                      </ListingPrice>
                      <ListingStats>
                        <Stat title="Views">
                          <FiEye /> {listing.views}
                        </Stat>
                        <Stat title="Created At">
                          <FiCheckCircle /> {formatSmartDate(listing.createdAt)}
                        </Stat>
                      </ListingStats>
                    </ListingDetails>
                    <ListingActions>
                      <ActionButton
                        className="view"
                        onClick={() => handleView(listing.id)}
                      >
                        <FiEye />
                        View
                      </ActionButton>
                      {(listing.status === "active" ||
                        listing.status === "pending") && (
                        <ActionButton
                          className="edit"
                          onClick={() => handleEdit(listing.id)}
                        >
                          <FiEdit />
                          Edit
                        </ActionButton>
                      )}
                      {listing.status === "booked" && (
                        <ActionButton>
                          <FiRefreshCw />
                          Make active
                        </ActionButton>
                      )}
                      <ActionButton
                        className="delete"
                        onClick={() => handleDelete(listing.id)}
                      >
                        <FiTrash2 />
                        Delete
                      </ActionButton>
                    </ListingActions>
                  </ListingContent>
                </ListingCard>
              ))
            )}
          </ListingsGrid>
        )}
      </RecentListingsSection>
    </OverviewContainer>
  );
};

export default DashboardOverview;

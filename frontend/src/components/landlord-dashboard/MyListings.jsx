import styled from "styled-components";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
  FiCheck,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
  ListingsGrid,
  ListingStats,
  ListingTitle,
  Stat,
  StatusBadge,
} from "../../ui/ListingUI";
import { formatSmartDate } from "../../utils/formatSmartDate";
import { useState } from "react";
import { useRooms } from "../explorepage/useRooms";
import SpinnerContainer from "../../ui/SpinnerContainer";
import Spinner from "../../ui/Spinner";

const ListingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderLeft = styled.div``;

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

const FilterTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.surface};
  padding: 0.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const FilterTab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ active, theme }) =>
    active ? theme.primary : "transparent"};
  color: ${({ active, theme }) => (active ? "white" : theme.text)};

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.primary : theme.background};
  }
`;

const MyListings = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  // Mock data - in real app this would come from React Query
  const { isPending, rooms } = useRooms();

  const filters = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "book-pending", label: "Book Pending" },
    { id: "active", label: "Active" },
    { id: "booked", label: "Booked" },
    { id: "rejected", label: "Rejected" },
    { id: "inactive", label: "Inactive" },
  ];

  const listings = rooms?.filter(
    (room) => activeFilter === "all" || room.status === activeFilter
  );

  const handleView = (id) => {
    console.log("View listing:", id);
    navigate(`/room/${id}`);
  };

  const handleEdit = (id) => {
    console.log("Edit listing:", id);
    navigate(`/landlord-dashboard/edit/${id}`);
  };

  const handleUpdateStatusActive = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log("Delete listing:", id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "active";
      case "booked":
        return "booked";
      case "pending":
        return "pending";
      case "book-pending":
        return "book-pending";
      case "rejected":
        return "rejected";
      default:
        return "inactive";
    }
  };

  return (
    <ListingsContainer>
      <PageHeader>
        <HeaderLeft>
          <PageTitle>My Listings</PageTitle>
          <PageSubtitle>
            Manage your property listings and track their performance.
          </PageSubtitle>
        </HeaderLeft>
      </PageHeader>

      <FilterTabs>
        {filters.map((filter) => (
          <FilterTab
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </FilterTab>
        ))}
      </FilterTabs>

      <ListingsGrid>
        {isPending ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : !listings.length ? (
          <EmptyState>
            <EmptyIcon>
              <FiPlus />
            </EmptyIcon>
            <EmptyTitle>No any listings found</EmptyTitle>
            <EmptyText>Create one today.</EmptyText>
          </EmptyState>
        ) : (
          listings.map((listing, index) => (
            <ListingCard
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ListingImage img={listing.thumbnail.url}>
                {/* <img src={listing.thumbnail} /> */}
                <StatusBadge className={getStatusColor(listing.status)}>
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
                    <ActionButton
                      className="chActive"
                      onClick={handleUpdateStatusActive(listing.id)}
                    >
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
    </ListingsContainer>
  );
};

export default MyListings;

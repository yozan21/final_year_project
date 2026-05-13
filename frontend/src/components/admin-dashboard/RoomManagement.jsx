import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiHome,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiClock,
  FiUser,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
} from "react-icons/fi";
import { rooms, users } from "../../data/mockData";
import formatCurrency from "../../utils/formatCurrency";
import { formatSmartDate } from "../../utils/formatSmartDate";
import { useRooms } from "../explorepage/useRooms";
import { useNavigate } from "react-router-dom";
import SpinnerContainer from "../../ui/SpinnerContainer";
import Spinner from "../../ui/Spinner";
import { ActionButton, StatusBadge } from "../../ui/ListingUI";
import { useUpdateStatus } from "../roomDetails/useUpdateStatus";
import { useModal } from "../../hooks/useModal";
import PerformAction from "../../ui/PerformAction";
import { useDeleteRoom } from "../landlord-dashboard/useDeleteRoom";

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

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.mutedText}30;
  border-radius: 12px;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.mutedText};
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.mutedText};
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.mutedText}30;
  border-radius: 8px;
  background: ${({ theme, active }) =>
    active ? theme.primary : theme.surface};
  color: ${({ theme, active }) => (active ? "white" : theme.text)};
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.accent : theme.background};
  }
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const RoomCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.boxShadowHover};
  }
`;

const RoomImage = styled.div`
  height: 200px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}20,
    ${({ theme }) => theme.accent}20
  );
  background-image: ${({ img }) => (img ? `url(${img})` : "none")};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 1rem;
`;

// const StatusBadge = styled.div`
//   padding: 0.5rem 1rem;
//   border-radius: 20px;
//   font-size: 0.8rem;
//   font-weight: 600;
//   background: ${({ status, theme }) => {
//     switch (status) {
//       case "active":
//         return "#10b9811f";
//       case "pending":
//         return "#F59E0B20";
//       case "booked":
//         return "#3B82F620";
//       default:
//         return theme.mutedText + "20";
//     }
//   }};
//   color: ${({ status, theme }) => {
//     switch (status) {
//       case "active":
//         return "#10B981";
//       case "pending":
//         return "#F59E0B";
//       case "booked":
//         return "#3B82F6";
//       default:
//         return theme.mutedText;
//     }
//   }};
// `;

const RoomContent = styled.div`
  padding: 1.5rem;
`;

const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const RoomTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
  flex: 1;
`;

const RoomPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const RoomLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RoomDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mutedText};
`;

const RoomActions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const RoomManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { rooms, isPending: isLoadingRooms } = useRooms();

  const { updateStatus, isPending: isUpdatingStatus } = useUpdateStatus();

  const { deleteRoom, isPending: isDeletingRoom } = useDeleteRoom();

  const { openModal } = useModal();

  const navigate = useNavigate();

  const filteredRooms = rooms?.filter((room) => {
    const matchesSearch =
      room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  console.log(filteredRooms);

  const handleApproveRoom = (roomId) => {
    console.log("Approve room:", roomId);
    openModal(
      <PerformAction
        id={roomId}
        operation={updateStatus}
        actionType="approve"
      />
    );
  };

  const handleRejectRoom = (roomId) => {
    console.log("Reject room:", roomId);
    openModal(
      <PerformAction id={roomId} operation={updateStatus} actionType="reject" />
    );
  };

  const handleBookApproval = (roomId) => {
    openModal(
      <PerformAction
        id={roomId}
        operation={updateStatus}
        actionType="approve-book"
      />
    );
  };

  const handleDeleteRoom = (roomId) => {
    console.log("Delete room:", roomId);
    openModal(
      <PerformAction id={roomId} operation={deleteRoom} actionType="delete" />
    );
  };

  const handleViewRoom = (roomId) => {
    console.log("View room:", roomId);
    navigate(`/room/${roomId}`);
  };

  if (isLoadingRooms || isUpdatingStatus || isDeletingRoom || isUpdatingStatus)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );

  return (
    <Container>
      <Header>
        <Title>Room Management</Title>
        <Subtitle>Manage and approve room listings</Subtitle>
      </Header>

      <ControlsSection>
        <SearchBar>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search rooms by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <FilterSection>
          <FilterButton
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          >
            <FiHome />
            All ({rooms?.length})
          </FilterButton>
          <FilterButton
            active={statusFilter === "active"}
            onClick={() => setStatusFilter("active")}
          >
            <FiCheckCircle />
            Active ({rooms?.filter((r) => r.status === "active").length})
          </FilterButton>
          <FilterButton
            active={statusFilter === "pending"}
            onClick={() => setStatusFilter("pending")}
          >
            <FiClock />
            Pending ({rooms?.filter((r) => r.status === "pending").length})
          </FilterButton>
          <FilterButton
            active={statusFilter === "booked"}
            onClick={() => setStatusFilter("booked")}
          >
            <FiEye />
            Booked ({rooms?.filter((r) => r.status === "booked").length})
          </FilterButton>
        </FilterSection>
      </ControlsSection>

      <RoomsGrid>
        {filteredRooms?.map((room, index) => (
          <RoomCard
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <RoomImage img={room.thumbnail.url}>
              <StatusBadge className={room.status}>{room.status}</StatusBadge>
            </RoomImage>

            <RoomContent>
              <RoomHeader>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomPrice>{formatCurrency(room.price)}</RoomPrice>
              </RoomHeader>

              <RoomLocation>
                <FiMapPin />
                {room.location}, {room.area}
              </RoomLocation>

              <RoomDetails>
                <DetailItem>
                  <FiHome />
                  {room.type}
                </DetailItem>
                <DetailItem>
                  <FiEye />
                  {room.views} views
                </DetailItem>
                <DetailItem>
                  <FiClock />
                  {formatSmartDate(room.createdAt)}
                </DetailItem>
                <DetailItem>{formatCurrency(room.price)}/month</DetailItem>
              </RoomDetails>

              <RoomActions>
                <ActionButton
                  className="view"
                  onClick={() => handleViewRoom(room.id)}
                >
                  <FiEye />
                  View
                </ActionButton>
                {room.status === "pending" && (
                  <>
                    <ActionButton
                      className="chActive"
                      onClick={() => handleApproveRoom(room.id)}
                    >
                      <FiCheckCircle />
                      Approve
                    </ActionButton>
                    <ActionButton
                      className="delete"
                      onClick={() => handleRejectRoom(room.id)}
                    >
                      <FiXCircle />
                      Reject
                    </ActionButton>
                  </>
                )}
                {room.status === "book-pending" && (
                  <ActionButton
                    className="pending"
                    onClick={() => handleBookApproval(room.id)}
                  >
                    <FiBriefcase />
                    Confirm book
                  </ActionButton>
                )}
                <ActionButton
                  className="delete"
                  onClick={() => handleDeleteRoom(room.id)}
                >
                  <FiTrash2 />
                  Delete
                </ActionButton>
              </RoomActions>
            </RoomContent>
          </RoomCard>
        ))}
      </RoomsGrid>
    </Container>
  );
};

export default RoomManagement;

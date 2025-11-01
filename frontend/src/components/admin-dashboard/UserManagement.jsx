import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiShield,
  FiEye,
  FiMoreVertical,
  FiUser,
  FiHome,
  FiSettings,
} from "react-icons/fi";
import { users } from "../../data/mockData";

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

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const UserCard = styled(motion.div)`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px ${({ theme }) => theme.boxShadow};
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.boxShadowHover};
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.25rem;
`;

const UserEmail = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  margin: 0;
`;

const UserRole = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${({ role, theme }) => {
    switch (role) {
      case "admin":
        return `${theme.primary}20`;
      case "landlord":
        return `${theme.accent}20`;
      case "client":
        return `${theme.mutedText}20`;
      default:
        return `${theme.mutedText}20`;
    }
  }};
  color: ${({ role, theme }) => {
    switch (role) {
      case "admin":
        return theme.primary;
      case "landlord":
        return theme.accent;
      case "client":
        return theme.mutedText;
      default:
        return theme.mutedText;
    }
  }};
`;

const RoleIcon = styled.div`
  font-size: 0.9rem;
`;

const getRoleIcon = (role) => {
  switch (role) {
    case "admin":
      return <FiSettings />;
    case "landlord":
      return <FiHome />;
    case "client":
      return <FiUser />;
    default:
      return <FiUser />;
  }
};

const UserStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0.75rem;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.mutedText};
`;

const UserActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  background: ${({ variant, theme }) => {
    switch (variant) {
      case "verify":
        return `${theme.primary}20`;
      case "edit":
        return `${theme.accent}20`;
      case "delete":
        return "#FEE2E220";
      default:
        return theme.background;
    }
  }};
  color: ${({ variant, theme }) => {
    switch (variant) {
      case "verify":
        return theme.primary;
      case "edit":
        return theme.accent;
      case "delete":
        return "#EF4444";
      default:
        return theme.text;
    }
  }};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px ${({ theme }) => theme.boxShadow};
  }
`;

const VerificationBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ verified }) => (verified ? "#10B98120" : "#F59E0B20")};
  color: ${({ verified }) => (verified ? "#10B981" : "#F59E0B")};
`;

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleVerifyUser = (userId) => {
    console.log("Verify user:", userId);
  };

  const handleEditUser = (userId) => {
    console.log("Edit user:", userId);
  };

  const handleDeleteUser = (userId) => {
    console.log("Delete user:", userId);
  };

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
        <Subtitle>Manage all users on the platform</Subtitle>
      </Header>

      <ControlsSection>
        <SearchBar>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <FilterSection>
          <FilterButton
            active={roleFilter === "all"}
            onClick={() => setRoleFilter("all")}
          >
            <FiUsers />
            All ({users.length})
          </FilterButton>
          <FilterButton
            active={roleFilter === "landlord"}
            onClick={() => setRoleFilter("landlord")}
          >
            <FiHome />
            Landlords ({users.filter((u) => u.role === "landlord").length})
          </FilterButton>
          <FilterButton
            active={roleFilter === "client"}
            onClick={() => setRoleFilter("client")}
          >
            <FiUser />
            Clients ({users.filter((u) => u.role === "client").length})
          </FilterButton>
          <FilterButton
            active={roleFilter === "admin"}
            onClick={() => setRoleFilter("admin")}
          >
            <FiSettings />
            Admins ({users.filter((u) => u.role === "admin").length})
          </FilterButton>
        </FilterSection>
      </ControlsSection>

      <UsersGrid>
        {filteredUsers.map((user, index) => (
          <UserCard
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <UserHeader>
              <UserInfo>
                <UserAvatar src={user.avatar} alt={user.name} />
                <UserDetails>
                  <UserName>{user.name}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserDetails>
              </UserInfo>
              <UserRole role={user.role}>
                <RoleIcon>{getRoleIcon(user.role)}</RoleIcon>
                {user.role}
              </UserRole>
            </UserHeader>

            <UserStats>
              <StatItem>
                <StatValue>{user.rating || "N/A"}</StatValue>
                <StatLabel>Rating</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{user.totalListings || 0}</StatValue>
                <StatLabel>Listings</StatLabel>
              </StatItem>
            </UserStats>

            <div style={{ marginBottom: "1rem" }}>
              <VerificationBadge verified={user.verified}>
                {user.verified ? <FiCheckCircle /> : <FiXCircle />}
                {user.verified ? "Verified" : "Unverified"}
              </VerificationBadge>
            </div>

            <UserActions>
              {!user.verified && (
                <ActionButton
                  variant="verify"
                  onClick={() => handleVerifyUser(user.id)}
                >
                  <FiCheckCircle />
                  Verify
                </ActionButton>
              )}
              <ActionButton
                variant="edit"
                onClick={() => handleEditUser(user.id)}
              >
                <FiEdit />
                Edit
              </ActionButton>
              <ActionButton
                variant="delete"
                onClick={() => handleDeleteUser(user.id)}
              >
                <FiTrash2 />
                Delete
              </ActionButton>
            </UserActions>
          </UserCard>
        ))}
      </UsersGrid>
    </Container>
  );
};

export default UserManagement;

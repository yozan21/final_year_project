import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FiUsers,
  FiHome,
  FiSettings,
  FiShield,
  FiAlertTriangle,
  FiMenu,
  FiX,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";
import { useModal } from "../../hooks/useModal";
import PerformAction from "../../ui/PerformAction";
import { useLogout } from "../../authentication/useLogout";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const Sidebar = styled(motion.aside)`
  width: 280px;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.mutedText}20;
  padding: 2rem 0;
  overflow-y: auto;
  box-shadow: 2px 0 10px ${({ theme }) => theme.boxShadow};

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  }
`;

const SidebarHeader = styled.div`
  padding: 0 1.5rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.mutedText}20;
  margin-bottom: 1rem;
`;

const AdminTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin: 0;
`;

const AdminSubtitle = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  margin: 0.25rem 0 0;
`;

const NavMenu = styled.nav`
  padding: 0 1rem;
`;

const NavSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mutedText};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.75rem 1rem;
`;

const NavItem = styled(motion.div)`
  margin-bottom: 0.25rem;
`;

const NavItemLink = styled(NavLink)`
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;

  &:hover {
    background: ${({ theme }) => `${theme.primary}10`};
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    background: ${({ theme }) => `${theme.primary}20`};
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
`;

const NavItemButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.25rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;

  &:hover {
    background: ${({ theme }) => `${theme.primary}10`};
    color: ${({ theme }) => theme.primary};
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 2px 4px ${({ theme }) => theme.boxShadow};

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.mutedText}20;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const navItems = [
  {
    section: "Overview",
    items: [{ id: "overview", label: "Dashboard", icon: <FiBarChart2 /> }],
  },
  {
    section: "Management",
    items: [
      { id: "users", label: "User Management", icon: <FiUsers /> },
      { id: "rooms", label: "Room Management", icon: <FiHome /> },
    ],
  },
  {
    section: "System",
    items: [
      { id: "reports", label: "Reports & Analytics", icon: <FiBarChart2 /> },
      { id: "settings", label: "System Settings", icon: <FiSettings /> },
      { id: "security", label: "Security", icon: <FiShield /> },
    ],
  },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout } = useLogout();

  const { openModal } = useModal();

  const handleClick = () => {
    openModal(<PerformAction id="-" operation={logout} actionType="logout" />);
  };

  return (
    <DashboardContainer>
      <Sidebar
        isOpen={sidebarOpen}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <SidebarHeader>
          <AdminTitle>Admin Panel</AdminTitle>
          <AdminSubtitle>GharSajilo Management</AdminSubtitle>
        </SidebarHeader>

        <NavMenu>
          {navItems.map((section) => (
            <NavSection key={section.section}>
              <SectionTitle>{section.section}</SectionTitle>
              {section.items.map((item) => (
                <NavItem key={item.id}>
                  <NavItemLink
                    to={`${item.id}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </NavItemLink>
                </NavItem>
              ))}
            </NavSection>
          ))}
          <NavSection>
            <SectionTitle>Profile</SectionTitle>
            <NavItem>
              <NavItemButton onClick={() => handleClick()}>
                <FiLogOut />
                Logout
              </NavItemButton>
            </NavItem>
          </NavSection>
        </NavMenu>
      </Sidebar>

      <MainContent>
        <TopBar>
          <MobileMenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </TopBar>

        <ContentArea>{children}</ContentArea>
      </MainContent>

      {sidebarOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </DashboardContainer>
  );
};

export default AdminLayout;

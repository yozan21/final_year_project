import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  HiOutlineBellAlert,
  HiOutlineChartBar,
  HiOutlineDocumentPlus,
  HiOutlineHome,
} from "react-icons/hi2";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: radial-gradient(
    circle at left,
    ${({ theme }) => theme.surface},
    35%,
    ${({ theme }) => theme.background}
  );
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.mutedText}20;
`;

const Sidebar = styled(motion.aside)`
  width: 280px;
  padding: 2rem 0;
  overflow-y: auto;

  @media (max-width: 768px) {
    transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  }
`;

const NavMenu = styled.nav`
  padding: 0 1rem;
`;

const NavItem = styled(motion.div)`
  margin-bottom: 0.5rem;
`;

const NavItemLink = styled(NavLink)`
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.95rem;
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
  & span {
    font-size: 1.3rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const navItems = [
  { id: "overview", label: "Dashboard", icon: <HiOutlineChartBar /> },
  { id: "create", label: "Create Room", icon: <HiOutlineDocumentPlus /> },
  { id: "listings", label: "My Listings", icon: <HiOutlineHome /> },
  { id: "notifications", label: "Notifications", icon: <HiOutlineBellAlert /> },
];

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <DashboardContainer>
      <Sidebar
        isOpen={sidebarOpen}
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <NavMenu>
          {navItems.map((item) => (
            <NavItem key={item.id}>
              <NavItemLink
                to={`${item.id}`}
                onClick={() => {
                  setSidebarOpen(false);
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </NavItemLink>
            </NavItem>
          ))}
        </NavMenu>
      </Sidebar>

      <MainContent>
        <ContentArea>{children}</ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;

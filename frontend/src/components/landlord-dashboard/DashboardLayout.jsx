import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineBellAlert,
  HiOutlineChartBar,
  HiOutlineDocumentPlus,
  HiOutlineHome,
} from "react-icons/hi2";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import NavLogo from "../NavLogo";
import { useUser } from "../../authentication/useUser";
import { useLogout } from "../../authentication/useLogout";

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 292px minmax(0, 1fr);
  min-height: calc(100vh - 74px);
  background:
    radial-gradient(
      circle at 5% 4%,
      ${({ theme }) => theme.accentSoft},
      transparent 28%
    ),
    ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 1rem;
  gap: 1rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled(motion.aside)`
  padding: 1rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 0 18px 44px ${({ theme }) => theme.boxShadow};
  position: sticky;
  top: 1rem;
  height: calc(100vh - 2.5rem);
  display: flex;
  flex-direction: column;

  @media (max-width: 980px) {
    display: none;
  }
`;

/* Full-height mobile drawer */
const MobileDrawer = styled.aside`
  position: fixed;
  z-index: 100;
  inset: 0 auto 0 0;
  width: min(292px, calc(100vw - 3rem));
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-105%")});
  transition: transform 0.25s ease;
  padding: 1.2rem 1rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.border};
  box-shadow: 4px 0 32px ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;

  @media (min-width: 981px) {
    display: none;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  @media (min-width: 981px) {
    display: none;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 1rem;

  p {
    color: ${({ theme }) => theme.mutedText};
    font-size: 0.86rem;
    margin-top: 0.4rem;
    line-height: 1.5;
  }
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.text};
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  align-self: flex-start;
`;

const SidebarHeader = styled.div`
  padding: 0.7rem 0.8rem 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  margin-bottom: 1rem;

  p {
    color: ${({ theme }) => theme.mutedText};
    font-size: 0.86rem;
    margin-top: 0.4rem;
    line-height: 1.5;
  }
`;

const NavMenu = styled.nav`
  display: grid;
  gap: 0.45rem;
`;

const NavItem = styled(motion.div)`
  margin-bottom: 0.5rem;
`;

const NavItemLink = styled(NavLink)`
  width: 100%;
  padding: 0.95rem 1rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    font-weight: 600;
    box-shadow: 0 12px 26px rgba(254, 98, 24, 0.22);
  }

  & span {
    font-size: 1.3rem;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.95rem 1rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: ${({ theme }) => theme.surfaceAlt};
    color: ${({ theme }) => theme.primary};
  }

  & span {
    font-size: 1.3rem;
  }
`;

const MainContent = styled.main`
  min-width: 0;
`;

const ContentArea = styled.div`
  padding: 0;
  overflow-y: auto;
`;

const TopBar = styled.header`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  h1 {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${({ theme }) => theme.mutedText};
    font-size: 0.9rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;

  @media (max-width: 980px) {
    display: grid;
    place-items: center;
  }
`;

const ProfilePill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.45rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 999px;
  background: ${({ theme }) => theme.surfaceAlt};
  font-weight: 800;
  color: ${({ theme }) => theme.text};

  span {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

const navItems = [
  { id: "overview", label: "Dashboard", icon: <HiOutlineChartBar /> },
  { id: "create", label: "Create Room", icon: <HiOutlineDocumentPlus /> },
  { id: "listings", label: "My Listings", icon: <HiOutlineHome /> },
  { id: "notifications", label: "Notifications", icon: <HiOutlineBellAlert /> },
];

const NavLinks = ({ onNavigate }) => (
  <NavMenu>
    {navItems.map((item) => (
      <NavItem key={item.id}>
        <NavItemLink to={item.id} onClick={onNavigate}>
          <span>{item.icon}</span>
          {item.label}
        </NavItemLink>
      </NavItem>
    ))}
  </NavMenu>
);

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();
  const location = useLocation();
  const { logout } = useLogout();

  const close = () => setSidebarOpen(false);

  const activePage =
    navItems.find((item) => location.pathname.includes(item.id))?.label ||
    "landlord-dashboard";

  return (
    <DashboardContainer>
      {/* Desktop sidebar */}
      <Sidebar
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <SidebarHeader>
          <NavLogo />
          <p>Landlord workspace for listings, bookings, and rental updates.</p>
        </SidebarHeader>
        <NavLinks />
        <NavMenu style={{ marginTop: "auto" }}>
          <NavItem>
            <LogoutButton onClick={() => logout()}>
              <span>
                <FiLogOut />
              </span>
              Logout
            </LogoutButton>
          </NavItem>
        </NavMenu>
      </Sidebar>

      {/* Mobile overlay */}
      <Overlay $isOpen={sidebarOpen} onClick={close} />

      {/* Mobile full-height drawer */}
      <MobileDrawer $isOpen={sidebarOpen}>
        <DrawerHeader>
          <div>
            <NavLogo />
            <p>
              Landlord workspace for listings, bookings, and rental updates.
            </p>
          </div>
          <CloseButton onClick={close}>
            <FiX />
          </CloseButton>
        </DrawerHeader>
        <NavLinks onNavigate={close} />
        <NavMenu style={{ marginTop: "auto" }}>
          <NavItem>
            <LogoutButton
              onClick={() => {
                logout();
                close();
              }}
            >
              <span>
                <FiLogOut />
              </span>
              Logout
            </LogoutButton>
          </NavItem>
        </NavMenu>
      </MobileDrawer>

      <MainContent>
        <TopBar>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <MenuButton onClick={() => setSidebarOpen((o) => !o)}>
              <FiMenu />
            </MenuButton>
            <div>
              <h1>{activePage}</h1>
              <p>Manage your rooms with a cleaner, faster workflow.</p>
            </div>
          </div>
          <ProfilePill>
            <span>{user?.name?.charAt(0) || "L"}</span>
            {user?.name?.split(" ").at(0) || "Landlord"}
          </ProfilePill>
        </TopBar>
        <ContentArea>{children}</ContentArea>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardLayout;

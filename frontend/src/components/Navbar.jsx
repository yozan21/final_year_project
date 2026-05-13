import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useUI } from "../context/UIContext.jsx";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiHome, FiLogOut, FiMapPin, FiSearch } from "react-icons/fi";
import { Button } from "../styles/buttons";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../authentication/useUser.js";
import UserAvatar from "../ui/UserAvatar.jsx";
import { useLogout } from "../authentication/useLogout.js";
import NavLogo from "./NavLogo.jsx";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ $compact }) =>
    $compact ? "min(1180px, calc(100% - 2rem))" : "100%"};
  margin: ${({ $compact }) => ($compact ? "0.75rem auto 0" : "0")};
  border-radius: ${({ $compact }) => ($compact ? "999px" : "0")};
  padding: ${({ $compact }) =>
    $compact
      ? "0.48rem 1.5rem 0.48rem 1rem"
      : "0.85rem clamp(1rem, 4vw, 4rem)"};
  background: ${({ $compact }) =>
    $compact ? "rgba(255, 255, 255, 0.78)" : "rgba(255, 255, 255, 0.64)"};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ $compact, theme }) =>
    $compact ? `0 12px 34px ${theme.boxShadow}` : "none"};
  position: sticky;
  top: ${({ $compact }) => ($compact ? "0.75rem" : "0")};
  z-index: 20;
  backdrop-filter: blur(16px);
  transition:
    padding 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    width 0.25s ease,
    margin 0.25s ease,
    border-radius 0.25s ease,
    top 0.25s ease;

  ${({ theme }) =>
    theme.background === "#17110E" &&
    `
      background: rgba(33, 23, 19, 0.72);
    `}
`;

const Logo = styled(motion.create(Link))`
  font-family: var(--font-heading);
  font-size: ${({ $compact }) => ($compact ? "1.2rem" : "1.45rem")};
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  transition: font-size 0.25s ease;

  opacity: 1;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  height: 100%;

  @media (max-width: 760px) {
    gap: 0.45rem;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  width: 42px;
  height: 42px;
  border-radius: 8px;
  color: var(--primary);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.surfaceAlt};
  }
`;

const NavBarLink = styled(NavLink)`
  align-self: center;
  font-size: 0.98rem;
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 700;
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.45rem;

  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceAlt};
    box-shadow: none;
  }

  @media (max-width: 760px) {
    span {
      display: none;
    }
  }
`;

const BrandSlot = styled.div`
  min-width: 178px;
  display: flex;
  align-items: center;
`;

const Navbar = ({ showBrand = true }) => {
  const { theme, toggleTheme } = useUI();
  const { user, isAuthenticated, role } = useUser();
  const { logout, isPending } = useLogout();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Nav $compact={compact}>
      <BrandSlot>
        <AnimatePresence mode="popLayout">
          {showBrand && (
            <Logo
              key="navbar-brand"
              to="/"
              $compact={compact}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 1 }}
            >
              <NavLogo size="sm" />
            </Logo>
          )}
        </AnimatePresence>
      </BrandSlot>
      <NavLinks>
        {role === "client" && (
          <>
            <NavBarLink to="/">
              <FiHome />
              <span>Home</span>
            </NavBarLink>
            <NavBarLink to="/explore">
              <FiSearch />
              <span>Explore</span>
            </NavBarLink>
            <NavBarLink to="/explore-map">
              <FiMapPin />
              Map explore
            </NavBarLink>
          </>
        )}
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
        {/* <UserAvatar user={user} /> */}
        {isAuthenticated ? (
          <>
            <UserAvatar user={user} />
            <Button
              variant="outline"
              onClick={() => logout()}
              disabled={isPending}
              title="logout"
            >
              <FiLogOut />
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

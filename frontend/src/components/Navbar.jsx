import React from "react";
import styled from "styled-components";
import { useUI } from "../context/UIContext.jsx";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button } from "../styles/buttons";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../authentication/useUser.js";
import UserAvatar from "../ui/UserAvatar.jsx";
import { useLogout } from "../authentication/useLogout.js";

const Nav = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  background: radial-gradient(
    circle at left,
    ${({ theme }) => theme.surface},
    35%,
    ${({ theme }) => theme.background}
  );
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

const Logo = styled(Link)`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -1px;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  height: 100%;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const NavBarLink = styled(NavLink)`
  align-self: center;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 500;
  padding: 0.5rem 0;
  background-color: transparent;

  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.accent};
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
  &.active {
    border-bottom: 4px solid ${({ theme }) => theme.accent};
    box-shadow: none;
  }
`;

const Navbar = () => {
  const { theme, toggleTheme } = useUI();
  const { user, isAuthenticated, role } = useUser();
  const { logout, isPending } = useLogout();
  return (
    <Nav>
      <Logo to="/">GharSajilo</Logo>
      <NavLinks>
        {role === "client" && (
          <>
            <NavBarLink to="/">Home</NavBarLink>
            <NavBarLink to="/explore">Explore</NavBarLink>
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
            >
              Logout
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

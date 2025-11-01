import React from "react";
import styled from "styled-components";
import { Button } from "../../styles/buttons";
import { motion } from "framer-motion";
import { FaSearch, FaUserTie } from "react-icons/fa";
import { Section, Div } from "../../ui";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/useUser";

const COZY_APT_IMG =
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Remove HeroWrap, HeroText, Title, and CTAGroup styled components

const HeroSectionWrap = styled(Section)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 87vh;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)),
    url(${COZY_APT_IMG}) center/cover no-repeat;
  position: relative;
  overflow: hidden;
  padding: 4rem 1.5rem 0 4rem;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0.5rem 1rem;
    min-height: 0;
  }
`;

const HeroText = styled(Div)`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 2rem;
  }
  h1 {
    font-size: 3rem;
    color: #ffff;
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  max-width: 430px;
`;

const SearchBar = styled(motion.div)`
  display: flex;
  align-items: center;
  background: #f7f7f7;
  border-radius: 0.8rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 0.8rem 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 470px;
  gap: 0.5rem;
  border: 1px solid #ececec;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1.05rem;
  flex: 1;
  background: transparent;
  color: var(--text);
`;

const CTAGroup = styled(Div)`
  display: flex;
  gap: 1.1rem;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  @media (max-width: 900px) {
    justify-content: center;
    width: 100%;
  }
`;

const HeroSection = function () {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  return (
    <HeroSectionWrap>
      <HeroText>
        <h1>
          Urban Living
          <span
            style={{
              color: "var(--primary)",
              background: "none",
              borderRadius: "0.2rem",
              padding: "0 0.3rem",
              marginLeft: "0.3rem",
              fontSize: "1em",
            }}
          >
            Made Simple
          </span>
        </h1>
        <Subtitle>
          Find your next room in the city. Clean, modern, and
          effortless—GharSajilo is your key to urban comfort.
        </Subtitle>
        <SearchBar
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaSearch color="var(--primary)" />
          <SearchInput placeholder="Search location..." disabled />
        </SearchBar>
        <CTAGroup>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.07 }}
            style={{ fontSize: "1.1rem" }}
            onClick={() => navigate("/explore")}
          >
            <FaSearch style={{ marginRight: 8 }} /> Explore Rooms
          </Button>
          {!isAuthenticated && (
            <Button
              as={motion.button}
              variant="outline"
              whileHover={{ scale: 1.07 }}
              style={{ fontSize: "1.1rem" }}
              onClick={() => navigate("/signup")}
            >
              <FaUserTie style={{ marginRight: 8 }} /> Become a User
            </Button>
          )}
        </CTAGroup>
      </HeroText>
    </HeroSectionWrap>
  );
};
export default HeroSection;

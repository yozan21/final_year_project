import React from "react";
import styled from "styled-components";
import { Button } from "../../styles/buttons";
import { motion } from "framer-motion";
import { FaSearch, FaUserTie } from "react-icons/fa";
import { FiShield, FiSliders, FiZap } from "react-icons/fi";
import { Section, Div } from "../../ui";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../authentication/useUser";

const COZY_APT_IMG =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop";

const HeroSectionWrap = styled(Section)`
  min-height: calc(96vh - 74px);
  background:
    linear-gradient(90deg, rgba(33, 23, 19, 0.88), rgba(33, 23, 19, 0.46)),
    url(${COZY_APT_IMG}) center/cover no-repeat;
  position: relative;
  overflow: hidden;
  padding: clamp(3rem, 6vw, 5.5rem) clamp(1rem, 5vw, 5rem);
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0 0;
    height: 120px;
    background: linear-gradient(
      0deg,
      ${({ theme }) => theme.background},
      transparent
    );
  }

  @media (max-width: 900px) {
    min-height: auto;
    padding: 4rem 1rem 5rem;
  }
`;

const HeroText = styled(Div)`
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;

  h1 {
    font-size: clamp(2.7rem, 6vw, 5.7rem);
    line-height: 0.98;
    color: #fff;
    margin-bottom: 1.1rem;
    max-width: 760px;

    span {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
  margin-bottom: 1.6rem;
  max-width: 520px;
`;

const SearchBar = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 8px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
  padding: 0.6rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 680px;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.4);

  svg {
    margin-left: 0.5rem;
  }

  button {
    white-space: nowrap;
  }

  @media (max-width: 620px) {
    flex-wrap: wrap;

    button {
      width: 100%;
    }
  }
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

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  width: min(680px, 100%);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ProofItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  padding: 0.8rem;
  backdrop-filter: blur(10px);

  svg {
    color: ${({ theme }) => theme.primary};
    flex: 0 0 auto;
  }
`;

const HeroSection = function () {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  return (
    <HeroSectionWrap>
      <HeroText>
        <h1>
          Find your next room, <span>Sajilai</span>
        </h1>
        <Subtitle>
          Premium room discovery across Nepal with verified listings, clear
          prices, and smarter filters.
        </Subtitle>
        <SearchBar
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaSearch color="var(--primary)" />
          <SearchInput
            placeholder="Search Kathmandu, Pokhara, Biratnagar..."
            disabled
          />
          <Button onClick={() => navigate("/explore")}>Explore</Button>
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
        <ProofGrid>
          <ProofItem>
            <FiShield />
            Verified listings
          </ProofItem>
          <ProofItem>
            <FiSliders />
            Smart filters
          </ProofItem>
          <ProofItem>
            <FiZap />
            Faster shortlists
          </ProofItem>
        </ProofGrid>
      </HeroText>
    </HeroSectionWrap>
  );
};
export default HeroSection;

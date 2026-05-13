import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FiHome, FiKey, FiShield } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  color: var(--text);
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 2.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 380px));
  gap: 1rem;
  justify-content: center;
  width: 100%;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const OptionCard = styled.div`
  background: var(--surface);
  border-radius: 8px;
  box-shadow: 0 14px 34px var(--boxShadow);
  padding: 2.2rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--border);
  transition:
    box-shadow 0.2s,
    transform 0.2s;
  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);
    transform: translateY(-6px) scale(1.03);
  }
`;

const CardTitle = styled.h3`
  color: var(--text);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
`;

const CardList = styled.ul`
  color: var(--text);
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  text-align: left;
  padding-left: 1.2rem;
  list-style: none;
  li {
    margin-bottom: 0.4rem;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const OptionButton = styled.button`
  background: var(--primary);
  color: #fff;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 0.85rem 2.2rem;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition:
    background 0.2s,
    transform 0.2s;
  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-2px) scale(1.04);
  }
`;

const SignupOptions = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <CardGrid>
        <OptionCard>
          <FiKey size={34} color="var(--primary)" />
          <CardTitle>Sign up as User</CardTitle>
          <CardList>
            <li>
              <FiShield /> Find verified rooms faster
            </li>
            <li>
              <FiHome /> Compare prices, areas, and amenities
            </li>
            <li>
              <FiKey /> Manage bookings in one place
            </li>
          </CardList>
          <OptionButton onClick={() => navigate("/signup/user")}>
            Sign up as User
          </OptionButton>
        </OptionCard>
        <OptionCard>
          <FiHome size={34} color="var(--primary)" />
          <CardTitle>Sign up as Landlord</CardTitle>
          <CardList>
            <li>
              <FiHome /> List rooms with stronger details
            </li>
            <li>
              <FiShield /> Build trust with renter-ready info
            </li>
            <li>
              <FiKey /> Manage booking interest from dashboard
            </li>
          </CardList>
          <OptionButton onClick={() => navigate("/signup/landlord")}>
            Sign up as Landlord
          </OptionButton>
        </OptionCard>
      </CardGrid>
    </Wrapper>
  );
};

export default SignupOptions;

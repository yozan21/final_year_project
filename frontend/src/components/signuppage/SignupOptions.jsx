import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 60vh;
  justify-content: center;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  color: var(--primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
`;

const CardGrid = styled.div`
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const OptionCard = styled.div`
  background: var(--surface);
  border-radius: 1.1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 2.2rem 2rem 2rem 2rem;
  max-width: 340px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 5px solid var(--primary);
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);
    transform: translateY(-6px) scale(1.03);
  }
`;

const CardTitle = styled.h3`
  color: var(--primary);
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
  border-radius: 0.7rem;
  padding: 0.85rem 2.2rem;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: var(--accent);
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
          <CardTitle>Sign up as User</CardTitle>
          <CardList>
            <li>
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              Find and book rooms easily
            </li>
            <li>
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              Secure payments
            </li>
            <li>
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              Access exclusive offers
            </li>
            <li>
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              Manage your bookings in one place
            </li>
          </CardList>
          <OptionButton onClick={() => navigate("/signup/user")}>
            Sign up as User
          </OptionButton>
        </OptionCard>
        <OptionCard>
          <CardTitle>Sign up as Landlord</CardTitle>
          <CardList>
            <li>
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              List your rooms for free
            </li>
            <li>
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              Manage listings and payments
            </li>
            <li>
              <span role="img" aria-label="check">
                ✅
              </span>{" "}
              Dashboard for tracking bookings
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

import React from "react";
import styled from "styled-components";
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaHeart } from "react-icons/fa";

const Wrapper = styled.section`
  background: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.primary};
`;

const Info = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Contact = styled.div`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.accent};
  }
`;

const Bio = styled.p`
  color: ${({ theme }) => theme.mutedText};
  margin-top: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--text);
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }
`;

const LandlordInfo = ({ landlord }) => {
  if (!landlord) return null;

  return (
    <Wrapper>
      <Avatar
        src={
          landlord.avatar.includes("default")
            ? `/${landlord.avatar}`
            : landlord.avatar
        }
        alt={landlord.name}
      />
      <Info>
        <Name>
          {landlord.name}
          {landlord.verified && (
            <FaCheckCircle color="#00A699" title="Verified" />
          )}
        </Name>

        <Contact>
          <div>
            <FaPhoneAlt />
            {landlord.phone}
          </div>
          <div>
            <FaEnvelope />
            {landlord.email}
          </div>
        </Contact>

        <Rating>
          <FaHeart color="#ed4343" />
          {landlord.likes} • {landlord.totalListings} Listings
        </Rating>

        <Bio>{landlord.bio}</Bio>

        <Button>Visit profile</Button>
      </Info>
    </Wrapper>
  );
};

export default LandlordInfo;

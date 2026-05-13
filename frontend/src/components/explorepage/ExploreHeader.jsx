import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.div`
  margin-bottom: 1.5rem;
  display: grid;
  gap: 1.2rem;
`;

const Title = styled.h1`
  font-size: clamp(2.1rem, 5vw, 4.2rem);
  color: var(--text);
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1;
`;

const Intro = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1.5rem;

  p {
    max-width: 560px;
    color: ${({ theme }) => theme.mutedText};
    line-height: 1.7;
  }

  @media (max-width: 760px) {
    display: block;
  }
`;

const ExploreHeader = () => (
  <HeaderWrap>
    <Intro>
      <div>
        <Title>Explore Rooms</Title>
        <p>
          Compare neighborhoods, price bands, room types, and amenities in one
          focused rental workspace.
        </p>
      </div>
    </Intro>
  </HeaderWrap>
);

export default ExploreHeader;

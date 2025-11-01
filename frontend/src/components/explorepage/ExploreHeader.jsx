import React from "react";
import styled from "styled-components";
import ExploreFilters from "./ExploreFilters";

const HeaderWrap = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 700;
`;
const ExploreHeader = () => (
  <HeaderWrap>
    <Title>Explore Rooms</Title>
    <ExploreFilters />
  </HeaderWrap>
);

export default ExploreHeader;

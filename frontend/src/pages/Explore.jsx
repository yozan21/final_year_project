import React from "react";
import ExploreHeader from "../components/explorepage/ExploreHeader";
import RoomGrid from "../components/explorepage/RoomGrid";
import styled from "styled-components";

const ExploreWrap = styled.div`
  padding: 2rem;
`;
const Explore = () => {
  return (
    <ExploreWrap>
      <ExploreHeader />
      <RoomGrid />
    </ExploreWrap>
  );
};

export default Explore;

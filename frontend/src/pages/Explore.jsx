import React, { useState } from "react";
import ExploreHeader from "../components/explorepage/ExploreHeader";
import RoomGrid from "../components/explorepage/RoomGrid";
import styled from "styled-components";

const ExploreWrap = styled.div`
  padding: clamp(1rem, 4vw, 3rem);
  min-height: calc(100vh - 74px);
  max-width: 1500px;
  margin: 0 auto;
`;
const Explore = () => {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    price: "",
    amenity: "",
    provinceId: "",
    districtId: "",
    localLevelId: "",
    ward: "",
  });

  return (
    <ExploreWrap>
      <ExploreHeader />
      <RoomGrid filters={filters} setFilters={setFilters} />
    </ExploreWrap>
  );
};

export default Explore;

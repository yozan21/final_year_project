// ExploreSkeleton.jsx
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

const Bone = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.border} 25%,
    ${({ theme }) => theme.surfaceAlt} 50%,
    ${({ theme }) => theme.border} 75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: ${({ $radius }) => $radius || "8px"};
  width: ${({ $w }) => $w || "100%"};
  height: ${({ $h }) => $h || "16px"};
  flex-shrink: 0;
`;

const ExploreShell = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 350px;
  gap: 1.2rem;
  align-items: start;

  @media (max-width: 1240px) {
    grid-template-columns: 270px minmax(0, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FilterPanel = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 96px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
  gap: 1.25rem;
`;

const CardSkeleton = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const MapPanel = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1rem;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 96px;

  @media (max-width: 1240px) {
    grid-column: 1 / -1;
    min-height: 360px;
    position: relative;
    top: auto;
  }
`;

const ExploreSkeleton = () => (
  <ExploreShell>
    {/* Filter sidebar */}
    <FilterPanel>
      <Bone $h="20px" $w="50%" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
        >
          <Bone $h="13px" $w="40%" />
          <Bone $h="38px" $radius="8px" />
        </div>
      ))}
      <Bone $h="42px" $radius="8px" style={{ marginTop: "0.5rem" }} />
    </FilterPanel>

    {/* Cards */}
    <main>
      <Row style={{ marginBottom: "1rem", justifyContent: "space-between" }}>
        <Bone $w="80px" $h="18px" />
        <Bone $w="140px" $h="18px" />
      </Row>
      <Grid>
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i}>
            <Bone $h="180px" $radius="0" />
            <CardBody>
              <Bone $w="75%" $h="20px" />
              <Bone $w="55%" $h="15px" />
              <Row>
                <Bone $h="15px" />
                <Bone $h="15px" />
              </Row>
              <Row>
                {[...Array(3)].map((_, j) => (
                  <Bone key={j} $h="28px" $radius="8px" />
                ))}
              </Row>
              <Bone $w="40%" $h="22px" />
              <Bone $h="40px" $radius="8px" />
            </CardBody>
          </CardSkeleton>
        ))}
      </Grid>
    </main>

    {/* Map panel */}
    <MapPanel>
      <Row style={{ justifyContent: "space-between" }}>
        <Bone $w="120px" $h="20px" />
        <Bone $w="80px" $h="16px" />
      </Row>
      <Bone $radius="8px" style={{ flex: 1 }} />
      <Bone $h="44px" $radius="8px" />
    </MapPanel>
  </ExploreShell>
);

export default ExploreSkeleton;

// DashboardSkeleton.jsx
import styled, { keyframes } from "styled-components";
import ListingSkeleton from "./ListingSkeleton";

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
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StatCardSkeleton = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const DashboardSkeleton = () => {
  return (
    <div>
      {/* Welcome */}
      <div
        style={{
          marginBottom: "1rem",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          padding: "clamp(1.2rem, 3vw, 2rem)",
        }}
      >
        <Bone
          $w="40%"
          $h="48px"
          $radius="10px"
          style={{ marginBottom: "0.75rem" }}
        />
        <Bone $w="60%" $h="20px" />
      </div>

      {/* Stats */}
      <StatsGrid>
        {[...Array(3)].map((_, i) => (
          <StatCardSkeleton key={i}>
            <Bone $w="48px" $h="48px" $radius="12px" />
            <Bone $w="50%" $h="36px" $radius="8px" />
            <Bone $w="70%" $h="16px" />
          </StatCardSkeleton>
        ))}
      </StatsGrid>

      {/* Section header */}
      <Row style={{ marginBottom: "1rem", justifyContent: "space-between" }}>
        <Bone $w="160px" $h="28px" $radius="8px" />
        <Bone $w="120px" $h="40px" $radius="10px" />
      </Row>

      {/* Listing cards */}
      <ListingSkeleton />
    </div>
  );
};

export default DashboardSkeleton;

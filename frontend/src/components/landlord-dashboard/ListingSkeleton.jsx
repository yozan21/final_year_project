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
`;
const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ListingCardSkeleton = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  overflow: hidden;
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

function ListingSkeleton() {
  return (
    <ListingsGrid>
      {[...Array(3)].map((_, i) => (
        <ListingCardSkeleton key={i}>
          <Bone $h="180px" $radius="0" />
          <CardBody>
            <Bone $w="75%" $h="20px" />
            <Bone $w="50%" $h="16px" />
            <Bone $w="40%" $h="22px" />
            <Row>
              <Bone $w="30%" $h="14px" />
              <Bone $w="40%" $h="14px" />
            </Row>
            <Row style={{ marginTop: "0.25rem" }}>
              <Bone $h="36px" $radius="8px" />
              <Bone $h="36px" $radius="8px" />
              <Bone $h="36px" $radius="8px" />
            </Row>
          </CardBody>
        </ListingCardSkeleton>
      ))}
    </ListingsGrid>
  );
}

export default ListingSkeleton;

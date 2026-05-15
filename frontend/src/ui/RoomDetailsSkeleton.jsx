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
  animation: ${shimmer} 1.6s infinite linear;
  border-radius: ${({ $radius }) => $radius || "6px"};
  width: ${({ $w }) => $w || "100%"};
  height: ${({ $h }) => $h || "16px"};
  flex-shrink: 0;
`;

const Page = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 3rem);
`;

const Card = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  padding: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: 1.2rem;
`;

/* Gallery */
const GalleryRow = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  grid-template-rows: 240px;
  gap: 0.75rem;
  margin-bottom: 1.2rem;

  @media (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 180px;
  }
`;

/* RoomInfo */
const HeroMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.2rem;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.2rem;
`;

const InfoCell = styled.div`
  background: ${({ theme }) => theme.surfaceAlt};
  border-radius: 8px;
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AmenityRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

/* LandlordInfo */
const LandlordWrap = styled(Card)`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const RoomDetailsSkeleton = () => (
  <Page>
    {/* Back button */}
    <Bone $w="80px" $h="36px" $radius="8px" style={{ marginBottom: "1rem" }} />

    {/* Gallery */}
    <GalleryRow>
      <Bone $h="100%" $radius="8px" />
      <Bone $h="100%" $radius="8px" />
      <Bone $h="100%" $radius="8px" />
    </GalleryRow>

    {/* RoomInfo */}
    <Card>
      <HeroMeta>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            flex: 1,
          }}
        >
          <Bone $w="65%" $h="52px" $radius="8px" />
          <Bone $w="40%" $h="18px" />
        </div>
        <Bone $w="140px" $h="40px" $radius="8px" />
      </HeroMeta>

      {/* Description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1.2rem",
        }}
      >
        <Bone $w="100%" $h="14px" />
        <Bone $w="92%" $h="14px" />
        <Bone $w="78%" $h="14px" />
      </div>

      {/* Info cells */}
      <InfoRow>
        {[1, 2, 3].map((i) => (
          <InfoCell key={i}>
            <Bone $w="50%" $h="14px" />
            <Bone $w="70%" $h="14px" />
          </InfoCell>
        ))}
      </InfoRow>

      {/* Amenities */}
      <Bone $w="90px" $h="14px" style={{ marginBottom: "0.6rem" }} />
      <AmenityRow>
        {[100, 80, 110, 90, 100].map((w, i) => (
          <Bone key={i} $w={`${w}px`} $h="38px" $radius="8px" />
        ))}
      </AmenityRow>
    </Card>

    {/* Map section */}
    <Card>
      <Bone
        $w="200px"
        $h="28px"
        $radius="6px"
        style={{ marginBottom: "0.5rem" }}
      />
      <Bone $w="55%" $h="14px" style={{ marginBottom: "1rem" }} />
      <Bone $w="100%" $h="300px" $radius="8px" />
    </Card>

    {/* LandlordInfo */}
    <LandlordWrap>
      <Bone $w="120px" $h="120px" $radius="50%" />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <Bone $w="45%" $h="24px" $radius="6px" />
        <Bone $w="35%" $h="14px" />
        <Bone $w="40%" $h="14px" />
        <Bone $w="25%" $h="14px" />
        <Bone $w="85%" $h="14px" />
        <Bone $w="70%" $h="14px" />
        <Bone $w="120px" $h="38px" $radius="8px" />
      </div>
    </LandlordWrap>
  </Page>
);

export default RoomDetailsSkeleton;

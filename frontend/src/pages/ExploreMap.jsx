import { useEffect, useState } from "react";
import styled from "styled-components";
import ListingMap from "../components/explorepage/ListingMap";
import { useRoomsInBounds } from "../components/explorepage/useMapRooms";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { NEPAL_CENTER } from "../features/location/locationUtils";

const Page = styled.div`
  min-height: calc(100vh - 74px);
  padding: 1rem;
  display: grid;
  grid-template-rows: auto minmax(620px, 1fr);
  gap: 1rem;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1rem 1.2rem;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};

  h1 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    margin-bottom: 0.35rem;
  }

  p {
    color: ${({ theme }) => theme.mutedText};
  }
`;

function ExploreMap() {
  const [center, setCenter] = useState(NEPAL_CENTER);
  const [bounds, setBounds] = useState(null);
  const debouncedBounds = useDebouncedValue(bounds, 650);
  const { rooms } = useRoomsInBounds(debouncedBounds, {});

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (position) =>
        setCenter([position.coords.latitude, position.coords.longitude]),
      () => setCenter(NEPAL_CENTER),
      { enableHighAccuracy: true, timeout: 7000 },
    );
  }, []);

  return (
    <Page>
      <Header>
        <h1>Map Search</h1>
        <p>Pan or zoom the map to find the listings.</p>
      </Header>
      <ListingMap
        rooms={rooms}
        center={center}
        onBoundsChange={setBounds}
        height="100%"
        minHeight="620px"
      />
    </Page>
  );
}

export default ExploreMap;

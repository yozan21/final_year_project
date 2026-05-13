import { useState } from "react";
import styled from "styled-components";
import { Card } from "../../ui";
import { motion } from "framer-motion";
import RoomImg from "../../ui/RoomImg";
import CardContent from "../../ui/CardContent";
import { FaArrowRight } from "react-icons/fa";
import DetailsBtn from "../../ui/Details";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import { FiClock, FiHome, FiMapPin, FiShield, FiWifi } from "react-icons/fi";
import { formatSmartDate } from "../../utils/formatSmartDate";
import { useRooms } from "./useRooms";
import ExploreFilters from "./ExploreFilters";
import ListingMap from "./ListingMap";
import { NEPAL_CENTER } from "../../features/location/locationUtils";
import ExploreSkeleton from "./ExploreSkeleton";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useRoomsInBounds } from "./useMapRooms";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
`;

const RoomTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const RoomLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
`;

const RoomDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mutedText};
`;

const RoomPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const ErrorMessage = styled.div`
  font-size: 1.1rem;
  padding: 2rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.mutedText};
`;

const ImageWrap = styled.div`
  position: relative;
`;

const StatusPill = styled.span`
  position: absolute;
  left: 0.8rem;
  top: 0.8rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.42rem 0.6rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.93);
  color: ${({ theme }) => theme.primary};
  font-size: 0.8rem;
  font-weight: 800;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
`;

const AmenityRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const AmenityChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.55rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.text};
  font-size: 0.82rem;
  font-weight: 700;
`;

const ResultsMeta = styled.div`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.mutedText};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

const MapPanel = styled.aside`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 12px 28px ${({ theme }) => theme.boxShadow};
  min-height: 560px;
  padding: 1rem;
  position: sticky;
  top: 80px;

  @media (max-width: 1240px) {
    grid-column: 1 / -1;
    min-height: 360px;
    position: relative;
    top: auto;
  }
`;

const MapTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.05rem;
    font-weight: 800;
  }

  span {
    color: ${({ theme }) => theme.mutedText};
    font-size: 0.85rem;
    font-weight: 700;
  }
`;

const MapLink = styled.button`
  width: 100%;
  margin-top: 0.8rem;
  border: 0;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:disabled {
    cursor: not-allowed;
  }
`;

const MapLinkOutline = styled(MapLink)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

const getRoomId = (room) => room.id || room._id;

const getThumbnail = (room) =>
  typeof room.thumbnail === "string" ? room.thumbnail : room.thumbnail?.url;

const matchesFilters = (room, filters) => {
  const locationQuery = filters.location.trim().toLowerCase();
  const searchableLocation = `${room.location || ""} ${room.area || ""} ${
    room.structuredLocation?.district || ""
  } ${room.structuredLocation?.localLevel || ""}`.toLowerCase();
  const roomType = String(room.type || "").toLowerCase();
  const amenities = (room.amenities || []).join(" ").toLowerCase();
  const price = Number(room.price || 0);

  const matchesLocation =
    !locationQuery || searchableLocation.includes(locationQuery);
  const matchesType = !filters.type || roomType === filters.type;
  const matchesAmenity =
    !filters.amenity || amenities.includes(filters.amenity);
  const matchesPrice =
    !filters.price ||
    (filters.price === "cheap" && price < 10000) ||
    (filters.price === "middle" && price >= 10000 && price <= 15000) ||
    (filters.price === "luxurious" && price > 15000);
  const matchesProvince =
    !filters.provinceId ||
    Number(room.structuredLocation?.provinceId) === Number(filters.provinceId);
  const matchesDistrict =
    !filters.districtId ||
    Number(room.structuredLocation?.districtId) === Number(filters.districtId);
  const matchesLocalLevel =
    !filters.localLevelId ||
    Number(room.structuredLocation?.localLevelId) ===
      Number(filters.localLevelId);
  const matchesWard =
    !filters.ward ||
    Number(room.structuredLocation?.ward) === Number(filters.ward);

  return (
    matchesLocation &&
    matchesType &&
    matchesAmenity &&
    matchesPrice &&
    matchesProvince &&
    matchesDistrict &&
    matchesLocalLevel &&
    matchesWard
  );
};

const RoomGrid = ({ filters, setFilters }) => {
  const navigate = useNavigate();
  const { rooms, isPending, isError } = useRooms();
  const [center, setCenter] = useState(NEPAL_CENTER);
  const [bounds, setBounds] = useState(null);
  const debouncedBounds = useDebouncedValue(bounds, 650);
  const { mapRooms } = useRoomsInBounds(debouncedBounds, {});
  const [locating, setLocating] = useState(false);
  const [isNearMe, setIsNearMe] = useState(false);

  const handleFindNearMe = () => {
    setLocating(true);
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
        setIsNearMe(true);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 7000 },
    );
  };

  if (isPending) return <ExploreSkeleton />;

  if (isError || !rooms) {
    return (
      <ErrorMessage>
        Couldn't find any rooms at this moment. Please try again later.
      </ErrorMessage>
    );
  }

  const filteredRooms = rooms.filter((room) => matchesFilters(room, filters));

  return (
    <ExploreShell>
      <ExploreFilters filters={filters} setFilters={setFilters} />
      <main>
        <ResultsMeta>
          <span>{filteredRooms.length} rooms</span>
          Match your search
        </ResultsMeta>
        <Grid>
          {filteredRooms.map((room) => (
            <Card
              key={getRoomId(room)}
              as={motion.div}
              whileHover={{ scale: 1.02 }}
              style={{
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ImageWrap>
                <StatusPill>
                  <FiShield /> Verified
                </StatusPill>
                <RoomImg bg={getThumbnail(room)} />
              </ImageWrap>
              <CardContent>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomLocation>
                  <FiMapPin />
                  {room.structuredLocation?.localLevel || room.area},{" "}
                  {room.structuredLocation?.district || room.location}
                </RoomLocation>
                <RoomDetails>
                  <DetailItem>
                    <FiHome />
                    {String(room.type).toUpperCase()}
                  </DetailItem>
                  <DetailItem>
                    <FiClock />
                    {formatSmartDate(room.createdAt)}
                  </DetailItem>
                </RoomDetails>
                <AmenityRow>
                  {(room.amenities || []).slice(0, 4).map((amenity) => (
                    <AmenityChip key={amenity}>
                      <FiWifi /> {amenity}
                    </AmenityChip>
                  ))}
                </AmenityRow>
                <PriceRow>
                  <RoomPrice>{formatCurrency(room.price)} / month</RoomPrice>
                </PriceRow>
                <DetailsBtn
                  as={motion.button}
                  whileHover={{ scale: 1.04 }}
                  variant="outline"
                  onClick={() => navigate(`/room/${getRoomId(room)}`)}
                >
                  Details <FaArrowRight />
                </DetailsBtn>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </main>

      <MapPanel>
        <MapTitle>
          <h2>{isNearMe ? "Rooms Near You" : "Kathmandu Area"}</h2>
          <span>Real listing pins</span>
        </MapTitle>
        <ListingMap
          rooms={mapRooms}
          center={center}
          onBoundsChange={setBounds}
          height="460px"
          minHeight="460px"
        />
        {!isNearMe && (
          <MapLink onClick={handleFindNearMe} disabled={locating}>
            {locating ? "Locating..." : "📍 Find rooms near me"}
          </MapLink>
        )}
        <MapLink onClick={() => navigate("/explore-map")}>
          Open full map search
        </MapLink>
      </MapPanel>
    </ExploreShell>
  );
};

export default RoomGrid;

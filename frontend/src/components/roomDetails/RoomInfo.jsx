import styled from "styled-components";
import { motion } from "framer-motion";
import formatCurrency from "../../utils/formatCurrency";
import { formatSmartDate } from "../../utils/formatSmartDate";
import { FiCalendar, FiHome, FiMapPin, FiShield, FiWifi } from "react-icons/fi";
import { formatStructuredLocation } from "../../features/location/locationUtils";

// ===== Styled Components =====

const Card = styled(motion.section)`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 14px 34px var(--boxShadow);
  padding: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: 1.2rem;
  display: grid;
  gap: 1.2rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3.6rem);
  color: var(--text);
  font-family: var(--font-heading, sans-serif);
  font-weight: 700;
  line-height: 1.3;
`;

const Address = styled.p`
  color: var(--mutedText);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 1.8rem;
  color: var(--primary);
  padding: 0.4rem 0rem;
  border-radius: 0.5rem;
`;

const Description = styled.p`
  color: var(--mutedText);
  font-size: 1.05rem;
  line-height: 1.6;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.75rem;
  font-size: 1rem;
  color: var(--mutedText);

  p {
    background: var(--surfaceAlt);
    padding: 0.85rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
`;

const Label = styled.span`
  font-weight: 800;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const Amenities = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Amenity = styled(motion.li)`
  background: var(--surfaceAlt);
  color: var(--text);
  border-radius: 8px;
  padding: 0.7rem 0.85rem;
  font-size: 0.95rem;
  border: 1px solid var(--border);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: background 0.3s ease;

  &:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
`;

const HeroMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
  flex-wrap: wrap;
`;

// ===== RoomInfo Component =====

const RoomInfo = ({ room }) => {
  if (!room) return <div>Room not found.</div>;
  const location = formatStructuredLocation(room.structuredLocation);
  return (
    <Card
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroMeta>
        <div>
          <Title>{room.title}</Title>
          <Address>
            <FiMapPin /> {location}
          </Address>
        </div>
        <Price>{formatCurrency(room.price)} / month</Price>
      </HeroMeta>
      <Description>{room.description}</Description>

      <InfoRow>
        <p>
          <Label>
            <FiHome /> Type
          </Label>{" "}
          <span style={{ textTransform: "uppercase" }}>{room.type}</span>
        </p>
        <p>
          <Label>
            <FiShield /> Status
          </Label>{" "}
          {room.status}
        </p>
        {room.status === "active" && (
          <p>
            <Label>
              <FiCalendar /> Available from
            </Label>{" "}
            {formatSmartDate(room?.availableFrom)}
          </p>
        )}
      </InfoRow>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label>Amenities:</Label>
        <Amenities>
          {room.amenities?.length > 0 ? (
            room.amenities.map((am, i) => (
              <Amenity
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FiWifi /> {am}
              </Amenity>
            ))
          ) : (
            <p style={{ color: "#888", marginTop: "0.5rem" }}>
              No amenities listed.
            </p>
          )}
        </Amenities>
      </div>
    </Card>
  );
};

export default RoomInfo;

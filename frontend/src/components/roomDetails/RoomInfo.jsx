import styled from "styled-components";
import { motion } from "framer-motion";
import formatCurrency from "../../utils/formatCurrency";
import { formatSmartDate } from "../../utils/formatSmartDate";

// ===== Styled Components =====

const Card = styled(motion.section)`
  background: var(--surface);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: var(--text);
  font-family: var(--font-heading, sans-serif);
  font-weight: 700;
  line-height: 1.3;
`;

const Address = styled.p`
  color: #6c6c6c;
  font-size: 1.1rem;
  margin-top: -0.5rem;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 1.6rem;
  color: #2f855a;
  padding: 0.4rem 0rem;
  border-radius: 0.5rem;
`;

const Description = styled.p`
  color: var(--muted-text);
  font-size: 1.05rem;
  line-height: 1.6;
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 1rem;
  color: #4a5568;

  p {
    background: var(--background);
    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #2b6cb0;
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
  background: #ebf8ff;
  color: #2b6cb0;
  border-radius: 1rem;
  padding: 0.4rem 1rem;
  font-size: 0.95rem;
  border: 1px solid #bee3f8;
  transition: background 0.3s ease;

  &:hover {
    background: #2b6cb0;
    color: white;
    border-color: #2b6cb0;
  }
`;

// ===== RoomInfo Component =====

const RoomInfo = ({ room }) => {
  if (!room) return <div>Room not found.</div>;

  return (
    <Card
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>{room.title}</Title>
      <Address>{room.address}</Address>
      <Price>{formatCurrency(room.price)} / month</Price>
      <Description>{room.description}</Description>

      <InfoRow>
        <p>
          <Label>Type:</Label>{" "}
          <span style={{ textTransform: "uppercase" }}>{room.type}</span>
        </p>
        <p>
          <Label>Location:</Label> {room.location}
        </p>
        <p>
          <Label>Area:</Label> {room.area}
        </p>
        {room.status === "active" && (
          <p>
            <Label>Available from:</Label>{" "}
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
                {am}
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

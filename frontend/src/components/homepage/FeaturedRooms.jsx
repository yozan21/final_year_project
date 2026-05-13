import React from "react";
import styled from "styled-components";
import { rooms, users } from "../../data/mockData";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { FiCheckCircle, FiMapPin, FiWifi } from "react-icons/fi";
import { Section, H2, H3, Card } from "../../ui";
import RoomImg from "../../ui/RoomImg";
import CardContent from "../../ui/CardContent";
import DetailsBtn from "../../ui/Details";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.4rem;
`;

const SectionHeader = styled.div`
  max-width: 720px;
  margin-bottom: 1.6rem;

  p {
    color: ${({ theme }) => theme.mutedText};
    line-height: 1.7;
  }
`;

const LandlordRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.7rem;
  margin-bottom: 0.5rem;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eee url(${({ img }) => img}) center/cover no-repeat;
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Chip = styled.span`
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

const ImageWrap = styled.div`
  position: relative;
`;

const PriceBadge = styled.div`
  position: absolute;
  left: 0.8rem;
  bottom: 0.8rem;
  background: rgba(255, 255, 255, 0.94);
  color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  padding: 0.55rem 0.7rem;
  font-weight: 900;
  box-shadow: 0 12px 28px rgba(33, 23, 19, 0.18);
`;

const FeaturedRooms = () => {
  const navigate = useNavigate();
  const featuredRooms = rooms.slice(0, 3);
  return (
    <Section style={{ padding: "4.5rem clamp(1rem, 5vw, 5rem)" }}>
      <SectionHeader>
        <H2 style={{ marginBottom: "0.6rem" }}>Rooms Worth Visiting</H2>
        <p>
          A polished first look at homes with the practical details Nepali
          renters ask about before calling.
        </p>
      </SectionHeader>
      <FeaturedGrid>
        {featuredRooms.map((room) => {
          const landlord = users.find((u) => u.id === room.landlordId);
          return (
            <Card
              as={motion.div}
              key={room.id}
              whileHover={{ scale: 1.02 }}
              style={{
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ImageWrap>
                <RoomImg bg={room.thumbnail} />
                <PriceBadge>{formatCurrency(room.price)} / month</PriceBadge>
              </ImageWrap>
              <CardContent>
                <LandlordRow>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Avatar img={landlord.avatar} />
                    <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>
                      {room.type.toUpperCase()}
                    </span>
                  </div>
                  <Chip>
                    <FiCheckCircle /> Verified
                  </Chip>
                </LandlordRow>
                <H3 style={{ marginBottom: "0.2rem" }}>{room.title}</H3>
                <p style={{ color: "var(--mutedText)", marginBottom: "0.2rem" }}>
                  <FiMapPin /> {room.area}, {room.location}
                </p>
                <ChipRow>
                  {room.amenities?.slice(0, 4).map((amenity) => (
                    <Chip key={amenity}>
                      <FiWifi /> {amenity}
                    </Chip>
                  ))}
                </ChipRow>
                <div style={{ flex: 1 }} />
                <DetailsBtn
                  as={motion.button}
                  whileHover={{ scale: 1.04 }}
                  variant="outline"
                  onClick={() => navigate(`/room/${room.id}`)}
                >
                  Details <FaArrowRight />
                </DetailsBtn>
              </CardContent>
            </Card>
          );
        })}
      </FeaturedGrid>
    </Section>
  );
};

export default FeaturedRooms;

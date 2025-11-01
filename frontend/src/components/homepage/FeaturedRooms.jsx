import React from "react";
import styled from "styled-components";
import { rooms, users } from "../../data/mockData";
import { motion } from "framer-motion";
import { FaStar, FaArrowRight, FaHeart } from "react-icons/fa";
import { Section, H2, H3, Card } from "../../ui";
import RoomImg from "../../ui/RoomImg";
import CardContent from "../../ui/CardContent";
import DetailsBtn from "../../ui/Details";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
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

const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-weight: 700;
  font-size: 1rem;
`;

const FeaturedRooms = () => {
  const navigate = useNavigate();
  const featuredRooms = rooms.slice(0, 3);
  return (
    <Section style={{ padding: "3rem" }}>
      <H2 style={{ marginBottom: "1.5rem" }}>Featured Rooms</H2>
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
              <RoomImg bg={room.thumbnail} />
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
                      {landlord?.name || "Landlord"}
                    </span>
                  </div>
                  <Rating>
                    <FaHeart color="#ed4343" size={22} /> {landlord.likes}
                  </Rating>
                </LandlordRow>
                <H3 style={{ marginBottom: "0.2rem" }}>{room.title}</H3>
                <p
                  style={{ color: "var(--mutedText)", marginBottom: "0.2rem" }}
                >
                  {room.location}, Nepal
                </p>
                <p style={{ fontWeight: 600, marginBottom: 0 }}>
                  {formatCurrency(room.price)} / month
                </p>
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

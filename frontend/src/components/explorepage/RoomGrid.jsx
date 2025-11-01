import styled from "styled-components";
import { Card } from "../../ui";
import { motion } from "framer-motion";
import RoomImg from "../../ui/RoomImg";
import CardContent from "../../ui/CardContent";
import { FaArrowRight, FaStar } from "react-icons/fa";
import DetailsBtn from "../../ui/Details";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";
import { FiClock, FiEye, FiHome, FiMapPin } from "react-icons/fi";
import { formatSmartDate } from "../../utils/formatSmartDate";
import { useRooms } from "./useRooms";
import Spinner from "../../ui/Spinner";
import SpinnerContainer from "../../ui/SpinnerContainer";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
`;

const RoomTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
  flex: 1;
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
  gap: 3.5rem;
  /* margin-bottom: 1rem; */
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
  font-size: 4rem;
`;

const RoomGrid = () => {
  const navigate = useNavigate();
  const { rooms, isPending, isError } = useRooms();

  if (isPending)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );

  return (
    <>
      {isError || rooms.length < 0 ? (
        <ErrorMessage>
          Couldn't find any rooms at this moment. Please try again later.😇
        </ErrorMessage>
      ) : (
        <Grid>
          {rooms?.map((room) => (
            <Card
              key={room.id}
              as={motion.div}
              whileHover={{ scale: 1.02 }}
              style={{
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <RoomImg bg={room.thumbnail.url} />
              <CardContent>
                <RoomTitle>{room.title}</RoomTitle>
                <RoomLocation>
                  <FiMapPin />
                  {room.location}, {room.area}
                </RoomLocation>
                <RoomDetails>
                  <DetailItem>
                    <FiHome />
                    {room.type.toUpperCase()}
                  </DetailItem>
                  <DetailItem>
                    <FiClock />
                    {formatSmartDate(room.createdAt)}
                  </DetailItem>
                </RoomDetails>
                <RoomPrice>{formatCurrency(room.price)} / month</RoomPrice>
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
          ))}
        </Grid>
      )}
    </>
  );
};

export default RoomGrid;

import { useParams } from "react-router-dom";
import styled from "styled-components";

import RoomGallery from "../components/roomDetails/RoomGallery";
import RoomInfo from "../components/roomDetails/RoomInfo";
import LandlordInfo from "../components/roomDetails/LandlordInfo";
import AdditionalInfo from "../components/roomDetails/AdditionalInfo";
import SpinnerContainer from "../ui/SpinnerContainer";
import Spinner from "../ui/Spinner";

import useNavigateBack from "../hooks/useNavigateBack";
import { useRoom } from "../components/roomDetails/useRoom";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { useUser } from "../authentication/useUser";
import { Button } from "../styles/buttons";
import RoomActionButtons from "../components/roomDetails/RoomActionButtons";
import Error from "../ui/Error";

const BackButton = styled.button`
  background-color: transparent;
  border-radius: 4px;
  padding: 0 0.8rem;
  color: var(--primary);
  text-align: center;
  border: none;
  cursor: pointer;
  font-size: 1.7rem;
  position: absolute;
  top: 5px;
  left: -40px;
  transition: all 0.3s cubic-bezier(0.895, 0.03, 0.685, 0.22);

  &:hover {
    transform: translateX(-3px);
  }
`;

const RoomDetails = () => {
  const { id } = useParams();
  const moveBack = useNavigateBack();

  const { room, isPending: isLoadingRoom, isError, error } = useRoom(id);
  const { role, isPending: isLoadingUser } = useUser();
  if (isLoadingRoom || isLoadingUser)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );

  if (isError) return <Error error={error} />;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 24,
        position: "relative",
      }}
    >
      <BackButton onClick={moveBack}>
        <HiMiniArrowLongLeft />
      </BackButton>
      <RoomGallery photos={room.images} />
      <RoomInfo room={room} />
      <LandlordInfo landlord={room.landlord} />
      <AdditionalInfo additionalInfo={room.additionalInfo} />
      <RoomActionButtons role={role} status={room.status} id={room.id} />
    </div>
  );
};

export default RoomDetails;

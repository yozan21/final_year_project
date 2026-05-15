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
import RoomActionButtons from "../components/roomDetails/RoomActionButtons";
import Error from "../ui/Error";
import RoomLocationMap from "../features/location/RoomLocationMap";
import { formatStructuredLocation } from "../features/location/locationUtils";
import RoomDetailsSkeleton from "../ui/RoomDetailsSkeleton";

const Page = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 3rem);
  position: relative;
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 0.5rem 0.85rem;
  color: var(--primary);
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  font-size: 1.45rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.895, 0.03, 0.685, 0.22);

  &:hover {
    transform: translateX(-3px);
  }
`;

const MapSection = styled.section`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  padding: clamp(1.2rem, 3vw, 2rem);
  margin-top: 1.2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }

  p {
    color: ${({ theme }) => theme.mutedText};
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const RoomDetails = () => {
  const { id } = useParams();
  const moveBack = useNavigateBack();

  const { room, isPending: isLoadingRoom, isError, error } = useRoom(id);
  const { role, isPending: isLoadingUser } = useUser();
  if (isLoadingRoom || isLoadingUser) return <RoomDetailsSkeleton />;

  if (isError) return <Error error={error} />;

  return (
    <Page>
      <BackButton onClick={moveBack}>
        <HiMiniArrowLongLeft />
      </BackButton>
      <RoomGallery photos={room.images} />
      <RoomInfo room={room} />
      <MapSection>
        <h2>Where you'll live</h2>
        <p>
          {formatStructuredLocation(room.structuredLocation) ||
            `${room.area}, ${room.location}`}
        </p>
        <RoomLocationMap room={room} />
      </MapSection>
      <LandlordInfo landlord={room.landlord} />
      <AdditionalInfo additionalInfo={room.additionalInfo} />
      <RoomActionButtons role={role} status={room.status} id={room.id} />
    </Page>
  );
};

export default RoomDetails;

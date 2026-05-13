import styled from "styled-components";
import { Button } from "../../styles/buttons";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useNavigate } from "react-router-dom";
import ActionDropdown from "../../ui/ActionDropdown";
import { useModal } from "../../hooks/useModal";
import PerformAction from "../../ui/PerformAction";
import { useDeleteRoom } from "../landlord-dashboard/useDeleteRoom";
import { useEffect } from "react";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledRoomActionButtons = styled.section`
  background: ${({ theme }) => theme.surface};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

function RoomActionButtons({ role, status, id }) {
  const goBack = useNavigateBack();
  const { openModal } = useModal();
  const navigate = useNavigate();

  const { deleteRoom, isPending, isSuccess } = useDeleteRoom();

  const handleClick = (id) => {
    openModal(
      <PerformAction id={id} operation={deleteRoom} actionType="delete" />,
    );
  };

  useEffect(() => {
    if (isSuccess) goBack();
  }, [isSuccess, goBack]);

  return (
    <StyledRoomActionButtons>
      <Button variant="outline" onClick={goBack}>
        Back
      </Button>
      {role === "client" && (
        <Button onClick={() => navigate(`/booking/${id}`)}>
          Book this room
        </Button>
      )}
      {role !== "client" && (
        <ActionDropdown role={role} status={status} id={id} />
      )}
      {role !== "client" && (
        <Button
          variant="delete"
          onClick={() => handleClick(id)}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <SpinnerMini /> Deleting
            </>
          ) : (
            "Delete"
          )}
        </Button>
      )}
    </StyledRoomActionButtons>
  );
}

export default RoomActionButtons;

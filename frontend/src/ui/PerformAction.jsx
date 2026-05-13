import styled from "styled-components";
import { Button } from "../styles/buttons";
import { useModal } from "../hooks/useModal";

const StyledActionDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const ActionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  color: var(--text);
  font-weight: 600;
  font-size: 1.2rem;
`;

const ActionButtons = styled.div`
  align-self: flex-end;
  display: flex;
  gap: 1rem;
`;

function PerformAction({ id, operation, actionType }) {
  const { closeModal } = useModal();
  const handleClick = () => {
    switch (actionType) {
      case "delete":
        operation(id);
        break;
      case "approve":
        operation({ id, status: "active" });
        break;
      case "reject":
        operation({ id, status: "rejected" });
        break;
      case "approve-book":
        operation({ id, status: "booked" });
        break;
      case "logout":
        operation();
        break;
    }

    closeModal();
  };
  return (
    <StyledActionDelete>
      <ActionTitle>
        Are you sure you want to {actionType} this listing?
      </ActionTitle>
      <ActionButtons>
        <Button variant="outline" onClick={closeModal}>
          CANCEL
        </Button>
        <Button variant={actionType} onClick={handleClick}>
          {actionType.toUpperCase()}
        </Button>
      </ActionButtons>
    </StyledActionDelete>
  );
}

export default PerformAction;

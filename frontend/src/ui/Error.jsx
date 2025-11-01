import styled from "styled-components";
import useNavigateBack from "../hooks/useNavigateBack";

const ErrorContainer = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.4rem;
  font-weight: 500;
  background: var(--surface);
  & p {
  }
`;

function Error({ error }) {
  const moveBack = useNavigateBack();

  return (
    <ErrorContainer>
      <p>{error.response.data.message}</p>
      <Button onClick={moveBack}>Go Back</Button>
    </ErrorContainer>
  );
}

export default Error;

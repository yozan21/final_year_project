import styled, { keyframes } from "styled-components";
import { ImSpinner2 } from "react-icons/im";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled(ImSpinner2)`
  height: 5rem;
  width: 5rem;
  animation: ${rotate} 1.5s infinite linear;
  color: ${({ theme }) => theme.primary};
`;
export default Spinner;

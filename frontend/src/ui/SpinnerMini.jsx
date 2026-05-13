import styled, { keyframes } from "styled-components";
import { ImSpinner2 } from "react-icons/im";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled(ImSpinner2)`
  height: 24px;
  width: 24px;
  animation: ${rotate} 1.5s infinite linear;
`;
export default Spinner;

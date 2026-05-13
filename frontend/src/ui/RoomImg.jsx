import styled from "styled-components";

const RoomImg = styled.div`
  width: 100%;
  height: 220px;
  background: var(--surfaceAlt);
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export default RoomImg;

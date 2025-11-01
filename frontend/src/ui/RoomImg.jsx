import styled from "styled-components";

const RoomImg = styled.div`
  width: 100%;
  height: 200px;
  background: #eee;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

export default RoomImg;

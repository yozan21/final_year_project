import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.text};
`;

const Subtle = styled.p`
  color: ${({ theme }) => theme.mutedText};
`;

function BookingHeader({ room }) {
  return (
    <Header>
      <div>
        <Title>Book this room</Title>
        <Subtle>
          {room?.name || "Room"} • {room?.location || "Location"}
        </Subtle>
      </div>
    </Header>
  );
}

export default BookingHeader;

import styled from "styled-components";

const AvatarBox = styled.div`
  align-self: stretch;
  display: flex;
  gap: 0.8rem;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.surface};
`;

const Avatar = styled.img`
  width: 3rem;
`;
const AvatarName = styled.p`
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.fontHeading};
  font-weight: 500;
  padding-right: 8px;
`;

function UserAvatar({ user }) {
  const { name, avatar } = user;
  return (
    <AvatarBox>
      <Avatar
        src={avatar.includes("default") ? `/${avatar}` : avatar}
        alt={`photo of ${name}`}
      />
      <AvatarName>Hello, {name.split(" ").at(0)}</AvatarName>
    </AvatarBox>
  );
}

export default UserAvatar;

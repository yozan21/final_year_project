import styled from "styled-components";

const AvatarBox = styled.div`
  align-self: stretch;
  display: flex;
  gap: 0.8rem;
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.accentSoft};
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const Avatar = styled.img`
  border-radius: 100%;
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
      <AvatarName>{name.split(" ").at(0)}</AvatarName>
    </AvatarBox>
  );
}

export default UserAvatar;

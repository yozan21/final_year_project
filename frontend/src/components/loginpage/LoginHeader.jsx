import React from "react";
import styled from "styled-components";

const Header = styled.h2`
  font-family: var(--font-heading);
  color: #fff;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  & span {
    color: ${({ theme }) => theme.primary};
  }
`;

const LoginHeader = () => (
  <Header>
    Welcome back to <span>GharSajilo</span>
  </Header>
);

export default LoginHeader;

import React from "react";
import styled from "styled-components";

const Header = styled.h2`
  font-family: var(--font-heading);
  color: var(--primary);
  font-size: 2.1rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.2rem;
`;

const LoginHeader = () => <Header>Login to GharSajilo</Header>;

export default LoginHeader;

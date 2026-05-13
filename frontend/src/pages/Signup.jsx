import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  min-height: calc(100vh - 74px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:
    linear-gradient(135deg, ${({ theme }) => theme.background}, ${({ theme }) => theme.surfaceAlt});
  padding: clamp(1rem, 4vw, 4rem);
`;

const Signup = () => (
  <Wrapper>
    <Outlet />
  </Wrapper>
);

export default Signup;

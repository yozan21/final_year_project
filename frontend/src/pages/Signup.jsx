import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background);
`;

const Signup = () => (
  <Wrapper>
    <Outlet />
  </Wrapper>
);

export default Signup;

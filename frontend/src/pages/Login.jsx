import React from "react";
import styled from "styled-components";
import LoginHeader from "../components/loginpage/LoginHeader";
import LoginForm from "../components/loginpage/LoginForm";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background);
`;

const Login = () => (
  <Wrapper>
    <LoginHeader />
    <LoginForm />
  </Wrapper>
);

export default Login;

import React from "react";
import styled from "styled-components";
import LoginHeader from "../components/loginpage/LoginHeader";
import LoginForm from "../components/loginpage/LoginForm";

const Wrapper = styled.div`
  min-height: calc(100vh - 74px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 440px;
  align-items: center;
  gap: clamp(1.5rem, 5vw, 5rem);
  padding: clamp(1rem, 5vw, 5rem);
  background:
    linear-gradient(90deg, rgba(33, 23, 19, 0.82), rgba(33, 23, 19, 0.28)),
    url("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop") center/cover no-repeat;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Copy = styled.div`
  color: #fff;

  h1 {
    font-size: clamp(2.4rem, 6vw, 5rem);
    line-height: 1;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.7;
    max-width: 560px;
    font-size: 1.1rem;
  }
`;

const Login = () => (
  <Wrapper>
    <Copy>
      <LoginHeader />
      <p>
        Continue your room search, manage bookings, and keep your shortlisted
        rentals in one clean workspace.
      </p>
    </Copy>
    <LoginForm />
  </Wrapper>
);

export default Login;

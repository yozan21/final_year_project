import React from "react";
import styled from "styled-components";
import { Button } from "../styles/buttons";
import useNavigateBack from "../hooks/useNavigateBack";

const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: var(--primary);
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.3rem;
  color: var(--mutedText);
  margin-bottom: 2rem;
`;

const NotFound = () => {
  const goBack = useNavigateBack();
  return (
    <Wrapper>
      <Title>404</Title>
      <Message>Oops! The page you are looking for does not exist.</Message>
      <Button onClick={goBack}>Go Back</Button>
    </Wrapper>
  );
};

export default NotFound;

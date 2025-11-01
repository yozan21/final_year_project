import styled from "styled-components";

export const Card = styled.div`
  background: var(--surface);
  border-radius: 0.4rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.2rem;
  transition: box-shadow 0.2s;
  min-height: 380px;
  &:hover {
    box-shadow: 0 6px 32px rgba(0, 0, 0, 0.14);
  }
`;

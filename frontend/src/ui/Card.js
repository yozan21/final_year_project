import styled from "styled-components";

export const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 14px 34px var(--boxShadow);
  padding: 1.2rem;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  min-height: 380px;
  &:hover {
    border-color: var(--primary);
    box-shadow: 0 18px 44px var(--boxShadow);
  }
`;

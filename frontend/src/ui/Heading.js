import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 2.5rem;
  font-family: ${({ theme }) => theme.fontHeading};
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 1.2rem;
`;

export const H2 = styled.h2`
  font-size: 2.3rem;
  font-family: ${({ theme }) => theme.fontHeading};
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1.1rem;
`;

export const H3 = styled.h3`
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.fontHeading};
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.7rem;
`;

import styled, { css } from "styled-components";

export const Button = styled.button`
  padding: 0.7rem 1.3rem;
  border-radius: 8px;
  border: none;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  background: ${({ search, theme }) =>
    search ? theme.surface : theme.primary};
  color: ${({ search, theme }) => (search ? theme.text : "#ffff")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.accent};
  }

  ${({ variant, theme }) =>
    variant === "outline" &&
    css`
      background: transparent;
      color: ${theme.primary};
      border: 2px solid ${theme.primary};
      &:hover {
        background: ${theme.primary};
        color: #fff;
      }
    `}

  ${({ variant, theme }) =>
    (variant === "delete" || variant === "reject") &&
    css`
      border: 2px solid ${theme.dangerSecondary};
      background: ${theme.dangerSecondary};
      color: #fff;
      &:hover {
        border: 2px solid ${theme.danger};
        background: ${theme.danger};
      }
    `}
    ${({ variant, theme }) =>
    variant === "approve" &&
    css`
      border: 2px solid ${theme.primary};
      background: ${theme.primary};
      color: white;
      &:hover {
        border: 2px solid #289528ff;
        background: #289528ff;
        color: white;
      }
    `}
`;

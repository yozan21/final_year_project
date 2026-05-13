import styled, { css } from "styled-components";

export const Button = styled.button`
  padding: 0.75rem 1.1rem;
  border-radius: 8px;
  border: 1px solid transparent;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  background: ${({ search, theme }) =>
    search ? theme.surface : theme.primary};
  color: ${({ search, theme }) => (search ? theme.text : "#fff")};
  box-shadow: 0 10px 24px ${({ theme }) => theme.boxShadow};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryDark || theme.accent};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
  }

  ${({ variant, theme }) =>
    variant === "outline" &&
    css`
      background: transparent;
      color: ${theme.primary};
      border: 1px solid ${theme.border};
      &:hover {
        background: ${theme.surfaceAlt};
        border-color: ${theme.primary};
        color: ${theme.primary};
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

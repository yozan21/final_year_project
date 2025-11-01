import styled from "styled-components";

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.mutedText};
  font-size: 1rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

export const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

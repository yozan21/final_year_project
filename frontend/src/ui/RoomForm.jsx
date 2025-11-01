import styled from "styled-components";

export const Form = styled.form`
  background: ${({ theme }) => theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

export const FormSection = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontHeading};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.primary}20;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fontBody};
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? "#ef4444" : theme.mutedText)};
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? "#ef4444" : theme.mutedText)};
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s;
  resize: vertical;
  min-height: 120px;
  font-family: ${({ theme }) => theme.fontBody};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? "#ef4444" : theme.mutedText)};
  font-size: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border 0.2s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;
  }
`;

export const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export const AmenityItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.mutedText}20;
  background: ${({ theme }) => theme.background};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}10;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.primary};
  }
`;

export const CustomAmenities = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const CustomAmenitiesGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
export const CustomItem = styled.span`
  background-color: ${({ theme }) => `${theme.primary}20`};
  border: 1px solid var(--primary);
  border-radius: 6px;
  padding: 0.7rem 0.5rem;
  position: relative;

  & .btn {
    position: absolute;
    padding: 0;
    top: 0;
    right: 0px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: var(--primary);
    }
  }
`;

export const ImageUploadSection = styled.div`
  border: 2px dashed
    ${({ theme, hasError }) => (hasError ? "#ef4444" : `${theme.mutedText}40`)};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: border 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const UploadIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.mutedText};
  margin-bottom: 1rem;
`;

export const UploadText = styled.p`
  color: ${({ theme }) => theme.mutedText};
  margin-bottom: 0.5rem;
`;

export const UploadHint = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mutedText}80;
`;

export const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const ImagePreview = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.mutedText}20;
`;

export const ImagePreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.mutedText}20;
`;

export const Button = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  font-family: ${({ theme }) => theme.fontBody};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: ${({ theme }) => theme.primary};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.accent};
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  &.secondary {
    background: transparent;
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.mutedText};

    &:hover {
      background: ${({ theme }) => theme.background};
    }
  }
`;

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

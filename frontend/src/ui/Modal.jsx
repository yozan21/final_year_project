import React from "react";
import styled from "styled-components";
import { useModal } from "../hooks/useModal";
import { FiX } from "react-icons/fi";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalWindow = styled.div`
  background: var(--background);
  color: var(--text);
  border-radius: 1.1rem;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  padding: 2.2rem 2rem 2rem 2rem;
  min-width: 320px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.4rem;
  right: 0.3rem;
  background: none;
  border: none;
  color: var(--mutedText);
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
  &:hover {
    color: var(--accent);
  }
`;

const Modal = () => {
  const { isOpen, closeModal, modalContent } = useModal();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>
        <CloseButton onClick={closeModal} aria-label="Close modal">
          <FiX />
        </CloseButton>
        {modalContent}
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;

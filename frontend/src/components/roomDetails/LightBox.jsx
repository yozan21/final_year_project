import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.93);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 3rem 5rem;

  @media (max-width: 600px) {
    padding: 3rem 1rem;
  }
`;

const LightboxImg = styled(motion.img)`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
  user-select: none;
  pointer-events: none;
`;

const IconBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }
`;

const CloseBtn = styled(IconBtn)`
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 1201;
`;

const NavRow = styled.div`
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1201;
`;

const Counter = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
  font-weight: 600;
  min-width: 48px;
  text-align: center;
`;

const imgVariants = {
  enter: (dir) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir * -60 }),
};

const Lightbox = ({ photos, startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(1);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <Backdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Inner onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <FiX size={18} />
        </CloseBtn>

        <AnimatePresence mode="wait" custom={direction}>
          <LightboxImg
            key={index}
            src={photos[index]}
            alt={`Photo ${index + 1}`}
            custom={direction}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>

        <NavRow>
          <IconBtn onClick={prev}>
            <FiChevronLeft size={20} />
          </IconBtn>
          <Counter>
            {index + 1} / {photos.length}
          </Counter>
          <IconBtn onClick={next}>
            <FiChevronRight size={20} />
          </IconBtn>
        </NavRow>
      </Inner>
    </Backdrop>,
    document.body,
  );
};

export default Lightbox;

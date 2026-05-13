import styled, { css } from "styled-components";
import { motion } from "framer-motion";

const letters = "GharSajilo".split("");

const logoTransition = {
  layout: {
    duration: 0.52,
    ease: [0.22, 1, 0.36, 1],
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.055,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Logo = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.primary};
  font-family: ${({ theme }) => theme.fontHeading};
  font-weight: 900;
  white-space: nowrap;
  opacity: 1;
  will-change: transform;

  ${({ $size }) =>
    $size === "lg"
      ? css`
          font-size: clamp(3rem, 8vw, 6rem);
          letter-spacing: 0.08em;
        `
      : css`
          font-size: 1.45rem;
          letter-spacing: 0.02em;
        `}
`;

const Letter = styled(motion.span)`
  display: inline-block;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

function NavLogo({ animate = false, size = "sm" }) {
  return (
    <Logo
      layoutId="gharsajilo-logo"
      layout
      $size={size}
      transition={logoTransition}
    >
      {letters.map((letter, i) => (
        <Letter
          key={`${letter}-${i}`}
          custom={i}
          variants={animate ? letterVariants : undefined}
          initial={animate ? "hidden" : false}
          animate={animate ? "visible" : false}
        >
          {letter}
        </Letter>
      ))}
    </Logo>
  );
}

export default NavLogo;

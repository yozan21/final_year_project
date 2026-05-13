import styled from "styled-components";
import { motion } from "framer-motion";
import NavLogo from "./NavLogo";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  pointer-events: none;
`;

const Backdrop = styled(motion.div)`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 50% 35%,
      ${({ theme }) => theme.accentSoft},
      transparent 38%
    ),
    ${({ theme }) => theme.background};
`;

const Glow = styled(motion.div)`
  position: absolute;
  width: min(420px, 80vw);
  height: 220px;
  border-radius: 999px;
  background: radial-gradient(
    ellipse,
    rgba(254, 98, 24, 0.18) 0%,
    transparent 70%
  );
  filter: blur(42px);
`;

const LoaderLine = styled(motion.div)`
  width: min(220px, 46vw);
  height: 1px;
  border-radius: 999px;
  background: ${({ theme }) => theme.border};
  overflow: hidden;
  margin: 1.4rem auto 0;
  position: relative;
  z-index: 1;

  span {
    display: block;
    width: 48%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary},
      transparent
    );
  }
`;

const Tagline = styled(motion.p)`
  margin-top: 1rem;
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  z-index: 1;
`;

function LoadingScreen() {
  return (
    <Overlay
      initial={false}
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <Backdrop
        initial={false}
        exit={{
          opacity: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
      />
      <Glow
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div>
        <motion.div
          initial={false}
          exit={{ opacity: 0, transition: { delay: 0.48, duration: 0.5 } }}
        >
          <NavLogo animate size="lg" />
        </motion.div>
        <Tagline
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Find. Compare. Move.
        </Tagline>
        <LoaderLine>
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "260%" }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </LoaderLine>
      </div>
    </Overlay>
  );
}

export default LoadingScreen;

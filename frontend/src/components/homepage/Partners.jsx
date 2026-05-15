import styled from "styled-components";
import { motion } from "framer-motion";
import { Section } from "../../ui";

const partners = [
  {
    name: "eSewa",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp",
  },
  {
    name: "Khalti",
    src: "./partnerLogos/Khalti_Digital_Wallet_Logo.png.jpg",
  },
  { name: "IME Pay", src: "./partnerLogos/IME-Pay-Logo_white.jpg" },
  { name: "ConnectIPS", src: "./partnerLogos/connect-ips.png" },
  { name: "Prabhu Pay", src: "./partnerLogos/prabhuPay.png" },
  { name: "CG Pay", src: "./partnerLogos/cgPay.jpg" },
  { name: "Namaste Pay", src: "./partnerLogos/namastePay-1.jpg" },
];

const PartnerWrap = styled(Section)`
  padding: 1.5rem 0 4.5rem;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
  max-width: 760px;
  margin: 0 auto 1.7rem;
  padding: 0 1rem;

  h2 {
    font-size: clamp(1rem, 4vw, 2.3rem);
    font-weight: 600;
    line-height: 1.05;
    margin-bottom: 0.7rem;
    color: ${({ theme }) => theme.text};
  }

  p {
    color: ${({ theme }) => theme.mutedText};
    line-height: 1.7;
  }
`;

const MarqueeMask = styled.div`
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: min(12vw, 120px);
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.background},
      transparent
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      270deg,
      ${({ theme }) => theme.background},
      transparent
    );
  }

  @media (max-width: 760px) {
    &::before,
    &::after {
      display: none;
    }
  }
`;

const Track = styled(motion.div)`
  display: flex;
  gap: 1rem;
  width: max-content;
  padding: 0.6rem 1rem;

  @media (max-width: 760px) {
    transform: none !important;
    width: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    padding: 0 1rem;
  }
`;

const Partner = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  background: white;
  border-radius: 8px;
  padding: 1rem 1.3rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fontHeading};
  font-weight: 900;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: ${({ theme }) => theme.text};
  min-width: 210px;
  min-height: 112px;
  display: grid;
  place-items: center;
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};

  img {
    max-width: 160px;
    max-height: 64px;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  @media (max-width: 760px) {
    display: ${({ $duplicate }) => ($duplicate ? "none" : "grid")};
    min-width: 0;
    min-height: 92px;
    font-size: 1.4rem;
  }
`;

function Partners() {
  const marqueeItems = [...partners, ...partners];

  return (
    <PartnerWrap>
      <Header>
        <h2>Trusted Local Partners</h2>
        <p>
          Designed around Nepal's payment habits, banking access, and everyday
          rental workflows.
        </p>
      </Header>
      <MarqueeMask>
        <Track
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((partner, index) => (
            <Partner
              key={`${partner.name}-${index}`}
              $duplicate={index >= partners.length}
            >
              {partner.src ? (
                <img src={partner.src} alt={`${partner.name} logo`} />
              ) : (
                partner.name
              )}
            </Partner>
          ))}
        </Track>
      </MarqueeMask>
    </PartnerWrap>
  );
}

export default Partners;

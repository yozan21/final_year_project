import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMapPin, FiNavigation, FiLayers, FiFilter } from "react-icons/fi";
import { Button } from "../../styles/buttons";
import { Section, Div } from "../../ui";
import { useNavigate } from "react-router-dom";

const MAP_PREVIEW_IMG = "./images/Map.png";

const ShowcaseWrap = styled(Section)`
  padding: clamp(4rem, 8vw, 7rem) clamp(1rem, 5vw, 5rem);
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 3rem 1rem;
  }
`;

const TextSide = styled(Div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
  z-index: 1;
`;

const Label = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary}18;
  border: 1px solid ${({ theme }) => theme.primary}33;
  padding: 0.3rem 0.8rem;
  border-radius: 100px;
`;

const Heading = styled.h2`
  font-size: clamp(1rem, 4vw, 2.3rem);
  font-weight: 600;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  margin: 0;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.mutedText};
  line-height: 1.7;
  max-width: 440px;
  margin: 0;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: ${({ theme }) => theme.surface || "rgba(255,255,255,0.04)"};
  border: 1px solid ${({ theme }) => theme.border || "rgba(255,255,255,0.08)"};
  border-radius: 10px;
  padding: 0.85rem 1rem;

  svg {
    color: ${({ theme }) => theme.primary};
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};
  }

  span {
    display: block;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textSecondary};
    margin-top: 0.1rem;
  }
`;

const MapSide = styled(motion.div)`
  flex: 1.1;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.28);
  aspect-ratio: 16 / 10;
  min-height: 320px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const MapOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(33, 23, 19, 0.18),
    rgba(33, 23, 19, 0.05)
  );
`;

const PinBadge = styled(motion.div)`
  position: absolute;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 10px;
  padding: 0.5rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  white-space: nowrap;

  &.pin1 {
    top: 50%;
    left: 40%;
  }
  &.pin2 {
    top: 60%;
    right: 16%;
  }
  &.pin3 {
    bottom: 15%;
    right: 0;
  }
`;

const FEATURES = [
  {
    icon: <FiMapPin size={18} />,
    title: "Pin-point locations",
    sub: "See exactly where each room is before you visit",
  },
  {
    icon: <FiNavigation size={18} />,
    title: "Proximity search",
    sub: "Filter by distance to colleges, offices, or landmarks",
  },
  {
    icon: <FiLayers size={18} />,
    title: "Neighbourhood view",
    sub: "Compare multiple listings on one map at a glance",
  },
  {
    icon: <FiFilter size={18} />,
    title: "Map + filter combo",
    sub: "Apply price, size, and amenity filters right on the map",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

const MapShowcase = () => {
  const navigate = useNavigate();

  return (
    <ShowcaseWrap>
      <TextSide>
        <Label>Map-powered search</Label>
        <Heading>
          Find rooms by <span>location</span>, not just listing
        </Heading>
        <Desc>
          Our interactive map puts every verified room on the map so you can
          judge the neighbourhood, commute, and surroundings before ever
          stepping inside.
        </Desc>

        <motion.div
          style={{ width: "100%" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FeatureList>
            {FEATURES.map((f) => (
              <FeatureItem key={f.title} variants={itemVariants}>
                {f.icon}
                <div>
                  <p>{f.title}</p>
                  <span>{f.sub}</span>
                </div>
              </FeatureItem>
            ))}
          </FeatureList>
        </motion.div>

        <Button
          as={motion.button}
          whileHover={{ scale: 1.06 }}
          style={{ fontSize: "1rem", marginTop: "0.5rem" }}
          onClick={() => navigate("/explore-map")}
        >
          <FiMapPin style={{ marginRight: 8 }} /> Explore on Map
        </Button>
      </TextSide>

      <MapSide
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <img src={MAP_PREVIEW_IMG} alt="Map view of room listings" />
        <MapOverlay />

        <PinBadge
          className="pin1"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <FiMapPin size={13} /> Pokhara · Rs 8,000
        </PinBadge>

        <PinBadge
          className="pin2"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <FiMapPin size={13} /> Kathmandu · Rs 10,500
        </PinBadge>

        <PinBadge
          className="pin3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          <FiMapPin size={13} /> Biratnagar · Rs 7,200
        </PinBadge>
      </MapSide>
    </ShowcaseWrap>
  );
};

export default MapShowcase;

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Section, H2 } from "../../ui";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Emily R.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "GharSajilo made finding my new room so easy and stress-free. The payment process was seamless and secure!",
  },
  {
    name: "Michael S.",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    text: "As a landlord, I love how simple it is to list and manage my rooms. The dashboard is intuitive and powerful.",
  },
  {
    name: "Priya K.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The support team is fantastic and the platform feels modern and trustworthy. Highly recommended!",
  },
];

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
`;

const TestimonialCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 1.5rem;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
  padding: 2.5rem 1.5rem 1.8rem 1.5rem;
  max-width: 340px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  border-top: 5px solid var(--primary);
  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.16);
    transform: translateY(-6px) scale(1.03);
  }
`;

const AvatarWrapper = styled.div`
  position: absolute;
  top: -48px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--background);
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Avatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--surface);
`;

const Name = styled.div`
  font-weight: 700;
  color: var(--primary);
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Text = styled.p`
  color: var(--text);
  font-size: 1.13rem;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  line-height: 1.6;
  position: relative;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: var(--accent);
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
`;

const Testimonials = () => (
  <Section style={{ textAlign: "center", margin: "4rem 0 2rem 0" }}>
    <H2 style={{ marginBottom: "3.5rem" }}>What Our Users Say</H2>
    <Grid>
      {testimonials.map((t, i) => (
        <TestimonialCard key={i} whileHover={{ scale: 1.04 }}>
          <AvatarWrapper>
            <Avatar src={t.avatar} alt={t.name} />
          </AvatarWrapper>
          <div style={{ height: 24 }} />
          <QuoteIcon />
          <Name>{t.name}</Name>
          <Text>“{t.text}”</Text>
        </TestimonialCard>
      ))}
    </Grid>
  </Section>
);

export default Testimonials;

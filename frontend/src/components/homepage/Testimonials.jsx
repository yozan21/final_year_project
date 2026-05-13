import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Section, H2 } from "../../ui";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Aashish Karki",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I had to shift near Baneshwor for work. GharSajilo helped me compare rent, water, parking, and area before visiting.",
  },
  {
    name: "Smriti Adhikari",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The listings felt clear and practical. I could shortlist rooms for my family without calling ten different numbers first.",
  },
  {
    name: "Niraj Shrestha",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    text: "As a student, I liked seeing the location, rent range, and basic facilities together. It made room hunting feel less confusing.",
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2.5rem;
`;

const TestimonialCard = styled(motion.div)`
  background: var(--surface);
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 14px 34px ${({ theme }) => theme.boxShadow};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 18px 44px ${({ theme }) => theme.boxShadowHover};
    transform: translateY(-4px);
  }
`;

const AvatarWrapper = styled.div`
  background: var(--surfaceAlt);
  border-radius: 50%;
  padding: 3px;
  margin-bottom: 1rem;
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
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Text = styled.p`
  color: var(--text);
  font-size: 1rem;
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
  line-height: 1.6;
  position: relative;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: var(--accent);
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const Testimonials = () => (
  <Section style={{ padding: "1rem clamp(1rem, 5vw, 5rem) 3rem" }}>
    <H2 style={{ marginBottom: "1.2rem" }}>Room Hunting, Made Local</H2>
    <Grid>
      {testimonials.map((t, i) => (
        <TestimonialCard key={i} whileHover={{ scale: 1.04 }}>
          <AvatarWrapper>
            <Avatar src={t.avatar} alt={t.name} />
          </AvatarWrapper>
          <QuoteIcon />
          <Name>{t.name}</Name>
          <Text>“{t.text}”</Text>
        </TestimonialCard>
      ))}
    </Grid>
  </Section>
);

export default Testimonials;

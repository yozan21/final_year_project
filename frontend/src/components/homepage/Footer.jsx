import React from "react";
import styled from "styled-components";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeadset,
  FaFileContract,
  FaShieldAlt,
  FaComments,
} from "react-icons/fa";
import { FiArrowRight, FiHome } from "react-icons/fi";

const FooterWrap = styled.footer`
  width: 100%;
  background: ${({ theme }) =>
    theme.background === "#17110E" ? "#0F0A08" : theme.text};
  color: #fff;
  padding: 4rem clamp(1rem, 5vw, 5rem) 1.5rem;
  margin-top: 3rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr repeat(3, 1fr);
  gap: 2rem;
  max-width: 1240px;
  margin: 0 auto 2.2rem auto;
  text-align: left;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const FooterCol = styled.div`
  min-width: 0;

  h4 {
    color: #fff;
    margin-bottom: 0.9rem;
    font-size: 1.02rem;
    font-weight: 900;
  }
`;

const Logo = styled.div`
  font-family: var(--font-heading);
  font-size: 1.7rem;
  font-weight: 900;
  color: ${({ theme }) =>
    theme.background === "#17110E" ? theme.primary : "#fff"};
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  span {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) =>
      theme.background === "#17110E" ? "#17110E" : "#fff"};
  }
`;

const Address = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Socials = styled.div`
  display: flex;
  gap: 0.65rem;
  margin-top: 1rem;
  a {
    color: #fff;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 8px;
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.primary};
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  a {
    color: rgba(255, 255, 255, 0.72);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.98rem;
  padding-top: 1.1rem;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
`;

const Footer = () => (
  <FooterWrap>
    <FooterGrid>
      <FooterCol>
        <Logo>
          <span>
            <FiHome />
          </span>
          GharSajilo
        </Logo>
        <Address>
          <FaMapMarkerAlt style={{ marginTop: 2 }} />
          <span>Helping renters find better rooms across Nepal.</span>
        </Address>
        <Socials>
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com"
            aria-label="X"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </Socials>
      </FooterCol>
      <FooterCol>
        <h4>Contact</h4>
        <FooterLinks>
          <a href="mailto:support@GharSajilo.com">
            <FaEnvelope style={{ marginRight: 7 }} /> support@GharSajilo.com
          </a>
          <a href="tel:+977-21-123456">
            <FaPhone style={{ marginRight: 7 }} /> +977-21-123456
          </a>
        </FooterLinks>
      </FooterCol>
      <FooterCol>
        <h4>Support</h4>
        <FooterLinks>
          <a href="/help">
            <FaHeadset style={{ marginRight: 7 }} /> Help Center
          </a>
          <a href="/contact">
            <FaComments style={{ marginRight: 7 }} /> Contact Us
          </a>
          <a href="/terms">
            <FaFileContract style={{ marginRight: 7 }} /> Terms of Service
          </a>
          <a href="/privacy">
            <FaShieldAlt style={{ marginRight: 7 }} /> Privacy Policy
          </a>
        </FooterLinks>
      </FooterCol>
      <FooterCol>
        <h4>Quick Links</h4>
        <FooterLinks>
          <a href="/explore">Explore <FiArrowRight /></a>
          <a href="/login">Login <FiArrowRight /></a>
          <a href="/signup">Sign Up <FiArrowRight /></a>
        </FooterLinks>
      </FooterCol>
    </FooterGrid>
    <Hr />
    <FooterBottom>
      &copy; {new Date().getFullYear()} GharSajilo. All rights reserved. Made in Nepal.
    </FooterBottom>
  </FooterWrap>
);

export default Footer;

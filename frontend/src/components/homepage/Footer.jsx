import React from "react";
import styled from "styled-components";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeadset,
} from "react-icons/fa";

const FooterWrap = styled.footer`
  width: 100%;
  background: var(--surface);
  color: var(--text);
  padding: 3rem 0 1.5rem 0;
  margin-top: 4rem;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 0.04);
`;

const FooterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem 5vw;
  max-width: 1100px;
  margin: 0 auto 2.2rem auto;
  text-align: left;
`;

const FooterCol = styled.div`
  min-width: 200px;
  flex: 1 1 220px;
`;

const Logo = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.7rem;
`;

const Address = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: var(--mutedText);
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Socials = styled.div`
  display: flex;
  gap: 1.1rem;
  margin-top: 0.7rem;
  a {
    color: var(--primary);
    font-size: 1.35rem;
    transition: color 0.2s;
    &:hover {
      color: var(--accent);
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  a {
    color: var(--mutedText);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s;
    &:hover {
      color: var(--primary);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  color: var(--mutedText);
  font-size: 0.98rem;
  padding-top: 1.1rem;
`;

const Hr = styled.hr`
  border: none;
  border-top: 0.5px solid var(--background);
  width: 95%;
`;

const Footer = () => (
  <FooterWrap>
    <FooterGrid>
      <FooterCol>
        <Logo>GharSajilo</Logo>
        <Address>
          <FaMapMarkerAlt style={{ marginTop: 2 }} />
          <span>Headquarters: Biratnagar, Nepal</span>
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
            href="https://twitter.com"
            aria-label="Twitter"
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
        </Socials>
      </FooterCol>
      <FooterCol>
        <h4
          style={{
            color: "var(--primary)",
            marginBottom: 8,
            fontSize: "1.08rem",
          }}
        >
          Contact
        </h4>
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
        <h4
          style={{
            color: "var(--primary)",
            marginBottom: 8,
            fontSize: "1.08rem",
          }}
        >
          Support
        </h4>
        <FooterLinks>
          <a href="/help">
            <FaHeadset style={{ marginRight: 7 }} /> Help Center
          </a>
          <a href="/contact">Contact Us</a>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </FooterLinks>
      </FooterCol>
      <FooterCol>
        <h4
          style={{
            color: "var(--primary)",
            marginBottom: 8,
            fontSize: "1.08rem",
          }}
        >
          Quick Links
        </h4>
        <FooterLinks>
          <a href="/explore">Explore</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </FooterLinks>
      </FooterCol>
    </FooterGrid>
    <Hr />
    <FooterBottom>
      &copy; {new Date().getFullYear()} GharSajilo. All rights reserved. | Made
      with ❤️ in Nepal
    </FooterBottom>
  </FooterWrap>
);

export default Footer;

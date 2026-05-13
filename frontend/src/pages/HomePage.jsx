import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import FeaturedRooms from "../components/homepage/FeaturedRooms";
import Partners from "../components/homepage/Partners";
import Testimonials from "../components/homepage/Testimonials";
import Footer from "../components/homepage/Footer";
import MapShowcase from "../components/homepage/MapShowcase";

const HomePage = () => (
  <>
    <HeroSection />
    <FeaturedRooms />
    <MapShowcase />
    <Partners />
    <Testimonials />
    <Footer />
  </>
);

export default HomePage;

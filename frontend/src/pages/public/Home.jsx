import React, { useState } from "react";
import { Briefcase, Menu, Dot, X, BadgeCheck } from "lucide-react";
import NavBar from "../../components/HomePage/NavBar";
import Hero from "../../components/HomePage/Hero";
import FeaturesGrid from "../../components/HomePage/FeatureGrid";
import SimpleStepsDirect from "../../components/HomePage/SimpleStepDirect";
import IsItFor from "../../components/HomePage/ItIsFor";
import FooterModal from "../../components/HomePage/FooterModal";
const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <FeaturesGrid />
      <SimpleStepsDirect />
      <IsItFor />
      <FooterModal />
    </>
  );
};

export default Home;
